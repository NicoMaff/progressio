import Level from "#models/level"
import SchoolYear from "#models/school_year"
import { ThemeFactory } from "#database/factories"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

function extractInertiaPage(html: string) {
  const [, encodedPage] = html.match(/data-page="([^"]+)"/) ?? []
  if (!encodedPage) {
    throw new Error("Missing Inertia page payload")
  }

  return JSON.parse(encodedPage.replaceAll("&quot;", '"').replaceAll("&amp;", "&"))
}

test.group("Themes page", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(async () => testUtils.db().wrapInGlobalTransaction())

  test("renders the active themes page", async ({ assert, client }) => {
    const schoolYear = await SchoolYear.create({
      label: "2026-2027",
      subject: "Mathématiques",
      startDate: DateTime.fromISO("2026-09-01"),
      endDate: DateTime.fromISO("2027-07-05"),
      firstTeachingDay: DateTime.fromISO("2026-09-02"),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Terminale générale", shortCode: "TG" })
    const activeTheme = await ThemeFactory.merge({
      levelId: level.id,
      name: "Probabilités",
      shortCode: "PROBA",
    }).create()
    await ThemeFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()

    const response = await client.get(`/levels/${level.id}/themes`)
    const inertiaPage = extractInertiaPage(response.text())

    response.assertStatus(200)
    assert.containsSubset(inertiaPage, {
      component: "themes/index",
      props: {
        level: { id: level.id, name: "Terminale générale", shortCode: "TG" },
        schoolYear: { id: schoolYear.id, label: "2026-2027", subject: "Mathématiques" },
        themes: [{ id: activeTheme.id, name: "Probabilités", shortCode: "PROBA" }],
      },
    })
    assert.lengthOf(inertiaPage.props.themes, 1)
  })
})
