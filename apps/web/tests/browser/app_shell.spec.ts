import SchoolYear from "#models/school_year"
import Level from "#models/level"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

test.group("Progressio App Shell", (group) => {
  group.setup(() => testUtils.db().migrate())

  test("keeps the workspace navigation usable when the sidebar collapses or becomes an overlay", async ({
    assert,
    visit,
  }) => {
    const today = DateTime.local().startOf("day")
    const schoolYear = await SchoolYear.create({
      label: "2025-2026",
      subject: "Mathématiques",
      startDate: today.minus({ months: 8 }),
      endDate: today.plus({ months: 4 }),
      firstTeachingDay: today.minus({ months: 8 }),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Première générale", shortCode: "1G" })

    const page = await visit("/")
    await page.setViewportSize({ width: 1280, height: 768 })
    await page.locator(".progressio-shell").waitFor({ state: "visible" })

    for (const destination of [
      "Vue d’ensemble",
      "Organisation",
      "Niveaux",
      "Classes",
      "Contenus",
      "Thèmes",
      "Chapitres",
      "Activités",
      "Progressions",
    ]) {
      await page.getByRole("link", { name: destination, exact: true }).waitFor({ state: "visible" })
    }

    await page.getByRole("link", { name: "Classes", exact: true }).click()
    await page.getByRole("heading", { name: "Classes", exact: true }).waitFor({ state: "visible" })
    await page.getByRole("link", { name: "1G · Première générale" }).click()
    await page.getByRole("heading", { name: "Classes de Première générale" }).waitFor({ state: "visible" })
    assert.isTrue(page.url().endsWith(`/organisation/classes?level=${level.id}`))

    const collapseButton = page.getByRole("button", { name: "Réduire le menu" })
    await collapseButton.press("Enter")
    const expandButton = page.getByRole("button", { name: "Étendre le menu" })
    await expandButton.hover()
    await page.getByRole("link", { name: "Vue d’ensemble", exact: true }).hover()
    await page.waitForTimeout(400)
    assert.isTrue(await page.getByRole("tooltip").isVisible())

    await page.waitForTimeout(100)
    await page.reload()
    await page.getByRole("button", { name: "Étendre le menu" }).waitFor({ state: "visible" })
    assert.isTrue(await page.locator(".progressio-sidebar").isVisible())
    assert.equal(await page.getByRole("main").getAttribute("class"), "progressio-content")

    await page.setViewportSize({ width: 768, height: 768 })
    await page.getByRole("button", { name: "Ouvrir le menu" }).click()
    await page.getByRole("navigation", { name: "Navigation principale" }).waitFor({ state: "visible" })
    await page.getByRole("link", { name: "Vue d’ensemble", exact: true }).click()
    assert.isFalse(await page.getByRole("navigation", { name: "Navigation principale" }).isVisible())
  })
})
