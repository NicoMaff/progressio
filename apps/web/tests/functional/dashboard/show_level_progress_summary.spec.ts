import Level from "#models/level"
import PlannedSession from "#models/planned_session"
import SchoolYear from "#models/school_year"
import TeachingClass from "#models/class"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

function extractInertiaPage(html: string) {
  const [, encodedPage] = html.match(/data-page="([^"]+)"/) ?? []
  if (!encodedPage) throw new Error("Missing Inertia page payload")
  return JSON.parse(encodedPage.replaceAll("&quot;", '"').replaceAll("&amp;", "&"))
}

test.group("Level progress summary", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(async () => testUtils.db().wrapInGlobalTransaction())

  test("renders one level with its class pacing and follow-up summaries", async ({ assert, client }) => {
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
    const otherLevel = await Level.create({ schoolYearId: schoolYear.id, name: "Terminale générale", shortCode: "TG" })
    const trackedClass = await TeachingClass.create({
      schoolYearId: schoolYear.id,
      levelId: level.id,
      name: "Première A",
      shortCode: "1A",
    })
    await TeachingClass.create({
      schoolYearId: schoolYear.id,
      levelId: otherLevel.id,
      name: "Terminale A",
      shortCode: "TA",
    })

    await PlannedSession.create({
      classId: trackedClass.id,
      sessionDate: today.minus({ days: 1 }),
      startTime: "08:00",
      durationMinutes: 55,
      sessionOrder: 1,
      outcome: "partial",
      outcomeReviewRequired: true,
    })
    await PlannedSession.create({
      classId: trackedClass.id,
      sessionDate: today.minus({ days: 2 }),
      startTime: "09:00",
      durationMinutes: 55,
      sessionOrder: 2,
      outcome: null,
      outcomeReviewRequired: false,
    })
    await PlannedSession.create({
      classId: trackedClass.id,
      sessionDate: today.plus({ days: 1 }),
      startTime: "10:00",
      durationMinutes: 55,
      sessionOrder: 3,
      outcome: "realized",
      outcomeReviewRequired: false,
    })

    const response = await client.get(`/dashboard/levels/${level.id}`)
    response.assertStatus(200)
    const page = extractInertiaPage(response.text())

    assert.equal(page.component, "dashboard/level_progress_summary")
    assert.deepEqual(page.props.levelProgressSummary.schoolYear, {
      id: schoolYear.id,
      label: "2025-2026",
      subject: "Mathématiques",
    })
    assert.deepEqual(page.props.levelProgressSummary.level, {
      id: level.id,
      name: "Première générale",
      shortCode: "1G",
      classes: [
        {
          id: trackedClass.id,
          name: "Première A",
          shortCode: "1A",
          pacingState: "tracked",
          dueSessionCount: 2,
          outcomeCounts: { realized: 0, partial: 1, shifted: 0, cancelled: 0, toCatchUp: 0 },
          missingOutcomeCount: 1,
          reviewRequiredCount: 1,
        },
      ],
    })
  })
})
