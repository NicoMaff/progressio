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

test.group("Annual dashboard", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(async () => testUtils.db().wrapInGlobalTransaction())

  test("shows mixed class pacing and follow-up summaries without counting future sessions", async ({
    assert,
    client,
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
    const emptyLevel = await Level.create({ schoolYearId: schoolYear.id, name: "Terminale générale", shortCode: "TG" })
    const trackedClass = await TeachingClass.create({
      schoolYearId: schoolYear.id,
      levelId: level.id,
      name: "Première A",
      shortCode: "1A",
    })
    await TeachingClass.create({
      schoolYearId: schoolYear.id,
      levelId: level.id,
      name: "Première B",
      shortCode: "1B",
    })
    const notDueClass = await TeachingClass.create({
      schoolYearId: schoolYear.id,
      levelId: level.id,
      name: "Première C",
      shortCode: "1C",
    })

    await PlannedSession.create({
      classId: trackedClass.id,
      sessionDate: today.minus({ days: 2 }),
      startTime: "08:00",
      durationMinutes: 55,
      sessionOrder: 1,
      outcome: "realized",
      outcomeReviewRequired: false,
    })
    await PlannedSession.create({
      classId: trackedClass.id,
      sessionDate: today.minus({ days: 1 }),
      startTime: "09:00",
      durationMinutes: 55,
      sessionOrder: 2,
      outcome: "partial",
      outcomeReviewRequired: true,
    })
    await PlannedSession.create({
      classId: trackedClass.id,
      sessionDate: today,
      startTime: "10:00",
      durationMinutes: 55,
      sessionOrder: 3,
      outcome: "to_catch_up",
      outcomeReviewRequired: false,
    })
    await PlannedSession.create({
      classId: trackedClass.id,
      sessionDate: today.plus({ days: 2 }),
      startTime: "11:00",
      durationMinutes: 55,
      sessionOrder: 5,
      outcome: "cancelled",
      outcomeReviewRequired: false,
    })
    await PlannedSession.create({
      classId: trackedClass.id,
      sessionDate: today.minus({ days: 3 }),
      startTime: "12:00",
      durationMinutes: 55,
      sessionOrder: 4,
      outcome: null,
      outcomeReviewRequired: true,
    })
    await PlannedSession.create({
      classId: notDueClass.id,
      sessionDate: today.plus({ days: 2 }),
      startTime: "08:00",
      durationMinutes: 55,
      sessionOrder: 1,
      outcome: null,
      outcomeReviewRequired: false,
    })

    const response = await client.get("/")
    response.assertStatus(200)
    const page = extractInertiaPage(response.text())
    const dashboard = page.props.dashboard
    const [dashboardLevel] = dashboard.levels
    const summaries = Object.fromEntries(
      dashboardLevel.classes.map((summary: { shortCode: string }) => [summary.shortCode, summary])
    )

    assert.equal(page.component, "home")
    assert.deepEqual(dashboard.schoolYear, { id: schoolYear.id, label: "2025-2026", subject: "Mathématiques" })
    assert.deepEqual(dashboard.summary, { levelCount: 2, classCount: 3, dueSessionCount: 4, followUpCount: 2 })
    assert.deepEqual(summaries["1A"], {
      id: trackedClass.id,
      name: "Première A",
      shortCode: "1A",
      pacingState: "tracked",
      dueSessionCount: 4,
      outcomeCounts: { realized: 1, partial: 1, shifted: 0, cancelled: 0, toCatchUp: 1 },
      missingOutcomeCount: 1,
      reviewRequiredCount: 1,
    })
    assert.equal(summaries["1B"].pacingState, "notPlanned")
    assert.equal(summaries["1C"].pacingState, "nothingDue")
    assert.deepEqual(dashboard.levels[1], {
      id: emptyLevel.id,
      name: "Terminale générale",
      shortCode: "TG",
      classes: [],
    })
  })
})
