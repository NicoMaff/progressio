import SchoolYear from "#models/school_year"
import TeachingClass from "#models/class"
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
    await SchoolYear.create({
      label: "2025-2026",
      subject: "Mathématiques",
      startDate: today.minus({ months: 8 }),
      endDate: today.plus({ months: 4 }),
      firstTeachingDay: today.minus({ months: 8 }),
      teachingHourDurationMinutes: 55,
    })

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

  test("navigates the annual roadmap horizontally and adapts the visible week columns", async ({ assert, visit }) => {
    const today = DateTime.local().startOf("day")
    const schoolYear = await SchoolYear.query().firstOrFail()
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Première générale", shortCode: "1G" })
    await TeachingClass.create({
      schoolYearId: schoolYear.id,
      levelId: level.id,
      name: "Première A",
      shortCode: "1A",
    })

    const page = await visit("/planning/progressions")
    await page.getByRole("link", { name: /Première A/ }).click()
    const roadmap = page.getByRole("region", { name: "Feuille de route annuelle" })
    const weekColumns = roadmap.locator("[data-week-start]")
    await weekColumns.first().waitFor({ state: "visible" })

    await page.setViewportSize({ width: 768, height: 768 })
    const narrowWeekWidth = (await weekColumns.first().boundingBox())!.width
    assert.isTrue(narrowWeekWidth > 300)
    assert.isTrue(narrowWeekWidth < 400)

    const currentWeek = roadmap.locator(`[data-week-start="${today.startOf("week").toISODate()}"]`)
    const initialWeekPosition = (await currentWeek.boundingBox())!.x
    await page.getByRole("button", { name: "Semaine suivante" }).click()
    await page.waitForTimeout(350)
    const nextWeekPosition = (await currentWeek.boundingBox())!.x
    assert.isTrue(nextWeekPosition < initialWeekPosition)

    await page.getByRole("button", { name: "Revenir à cette semaine" }).click()
    await page.waitForTimeout(350)
    const restoredWeekPosition = (await currentWeek.boundingBox())!.x
    assert.isTrue(restoredWeekPosition > nextWeekPosition)

    await page.setViewportSize({ width: 1280, height: 768 })
    const wideWeekWidth = (await weekColumns.first().boundingBox())!.width
    assert.isTrue(wideWeekWidth > 280)
    assert.isTrue(wideWeekWidth < 330)
  })
})
