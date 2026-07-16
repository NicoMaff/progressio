import SchoolYear from "#models/school_year"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

test.group("Progressio App Shell", (group) => {
  group.setup(() => testUtils.db().migrate())

  test("supports tablet navigation, keyboard collapse, tooltips, and persistence", async ({ assert, visit }) => {
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
    await page.setViewportSize({ width: 1024, height: 768 })
    await page.locator(".progressio-shell").waitFor({ state: "visible" })

    const collapseButton = page.getByRole("button", { name: "Réduire le menu" })
    await collapseButton.press("Enter")
    const expandButton = page.getByRole("button", { name: "Étendre le menu" })
    await expandButton.hover()
    await page.getByRole("link", { name: "Synthèse annuelle", exact: true }).hover()
    await page.waitForTimeout(400)
    assert.isTrue(await page.getByRole("tooltip").isVisible())

    await page.waitForTimeout(100)
    await page.reload()
    await page.getByRole("button", { name: "Étendre le menu" }).waitFor({ state: "visible" })
    assert.isTrue(await page.locator(".progressio-sidebar").isVisible())
    assert.equal(await page.getByRole("main").getAttribute("class"), "progressio-content")
  })
})
