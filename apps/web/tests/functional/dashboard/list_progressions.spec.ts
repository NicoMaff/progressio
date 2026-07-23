import TeachingClass from "#models/class"
import Level from "#models/level"
import SchoolYear from "#models/school_year"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

function extractInertiaPage(html: string) {
  const [, encodedPage] = html.match(/data-page="([^"]+)"/) ?? []
  if (!encodedPage) throw new Error("Missing Inertia page payload")
  return JSON.parse(encodedPage.replaceAll("&quot;", '"').replaceAll("&amp;", "&"))
}

test.group("Progressions index", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(async () => testUtils.db().wrapInGlobalTransaction())

  test("groups selectable classes by level", async ({ assert, client }) => {
    const today = DateTime.local().startOf("day")
    const schoolYear = await SchoolYear.create({
      label: "2025-2026",
      subject: "Mathématiques",
      startDate: today.minus({ months: 5 }),
      endDate: today.plus({ months: 5 }),
      firstTeachingDay: today.minus({ months: 5 }),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Première générale", shortCode: "1G" })
    const teachingClass = await TeachingClass.create({
      schoolYearId: schoolYear.id,
      levelId: level.id,
      name: "Première A",
      shortCode: "1A",
    })

    const response = await client.get("/planning/progressions")
    response.assertStatus(200)
    const page = extractInertiaPage(response.text())

    assert.equal(page.component, "planning/list_progressions")
    assert.deepEqual(page.props.progressionsList, {
      schoolYear: { id: schoolYear.id, label: "2025-2026", subject: "Mathématiques" },
      levels: [
        {
          id: level.id,
          name: "Première générale",
          shortCode: "1G",
          classes: [{ id: teachingClass.id, name: "Première A", shortCode: "1A" }],
        },
      ],
    })
  })
})
