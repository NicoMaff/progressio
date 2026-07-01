import Level from "#models/level"
import SchoolYear from "#models/school_year"
import { test } from "@japa/runner"
import testUtils from "@adonisjs/core/services/test_utils"
import { DateTime } from "luxon"

function extractInertiaPage(html: string) {
  const [, encodedPage] = html.match(/data-page="([^"]+)"/) ?? []
  if (!encodedPage) {
    throw new Error("Missing Inertia page payload")
  }

  return JSON.parse(encodedPage.replaceAll("&quot;", '"').replaceAll("&amp;", "&"))
}

test.group("Teaching content page", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(async () => {
    return testUtils.db().wrapInGlobalTransaction()
  })

  test("renders the level-scoped teaching content page contract", async ({ assert, client }) => {
    const schoolYear = await SchoolYear.create({
      label: "2026-2027",
      subject: "Mathématiques",
      startDate: DateTime.fromISO("2026-09-01"),
      endDate: DateTime.fromISO("2027-07-05"),
      firstTeachingDay: DateTime.fromISO("2026-09-02"),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({
      schoolYearId: schoolYear.id,
      name: "Première générale",
      shortCode: "1G",
    })

    const response = await client.get(`/teaching-content/levels/${level.id}`)
    const inertiaPage = extractInertiaPage(response.text())

    response.assertStatus(200)
    assert.containsSubset(inertiaPage, {
      component: "teaching_content/show",
      props: {
        level: {
          id: level.id,
          name: "Première générale",
          shortCode: "1G",
        },
        schoolYear: {
          id: schoolYear.id,
          label: "2026-2027",
          subject: "Mathématiques",
        },
      },
    })
  })
})
