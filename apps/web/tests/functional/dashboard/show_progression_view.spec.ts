import ActualSession from "#models/actual_session"
import TeachingClass from "#models/class"
import Interruption from "#models/interruption"
import InterruptionClass from "#models/interruption_class"
import InterruptionType from "#models/interruption_type"
import Level from "#models/level"
import PlannedSession from "#models/planned_session"
import PlanningConflict from "#models/planning_conflict"
import SchoolYear from "#models/school_year"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

function extractInertiaPage(html: string) {
  const [, encodedPage] = html.match(/data-page="([^"]+)"/) ?? []
  if (!encodedPage) throw new Error("Missing Inertia page payload")
  return JSON.parse(encodedPage.replaceAll("&quot;", '"').replaceAll("&amp;", "&"))
}

async function createProgressionContext(startDate: DateTime, endDate: DateTime) {
  const schoolYear = await SchoolYear.create({
    label: "2025-2026",
    subject: "Mathématiques",
    startDate,
    endDate,
    firstTeachingDay: startDate,
    teachingHourDurationMinutes: 55,
  })
  const level = await Level.create({ schoolYearId: schoolYear.id, name: "Première générale", shortCode: "1G" })
  const teachingClass = await TeachingClass.create({
    schoolYearId: schoolYear.id,
    levelId: level.id,
    name: "Première A",
    shortCode: "1A",
  })
  return { schoolYear, teachingClass }
}

test.group("Progression roadmap", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(async () => testUtils.db().wrapInGlobalTransaction())

  test("returns every intersecting calendar week including empty weeks and focuses the current week", async ({
    assert,
    client,
  }) => {
    const today = DateTime.local().startOf("day")
    const { teachingClass } = await createProgressionContext(today.minus({ days: 9 }), today.plus({ days: 9 }))
    const plannedSession = await PlannedSession.create({
      classId: teachingClass.id,
      title: "Séance prévue",
      sessionDate: today,
      startTime: "08:00",
      durationMinutes: 55,
      sessionOrder: 1,
      outcome: null,
      outcomeReviewRequired: false,
    })
    await ActualSession.create({
      classId: teachingClass.id,
      title: "Séance non prévue",
      sessionDate: today.plus({ days: 7 }),
      startTime: "10:00",
      durationMinutes: 30,
      sessionOrder: 1,
      state: "draft",
      completedAt: null,
    })

    const response = await client.get(`/planning/classes/${teachingClass.id}/progression`)
    response.assertStatus(200)
    const page = extractInertiaPage(response.text())
    const roadmap = page.props.progressionView.roadmap

    assert.equal(page.component, "planning/progression_view")
    assert.equal(roadmap.focusWeekStartDate, today.startOf("week").toISODate())
    assert.equal(roadmap.weeks[0].startDate, today.minus({ days: 9 }).startOf("week").toISODate())
    assert.equal(roadmap.weeks.at(-1).endDate, today.plus({ days: 9 }).endOf("week").toISODate())
    assert.isTrue(roadmap.weeks.some((week: { plannedSessions: unknown[] }) => week.plannedSessions.length === 0))
    assert.deepEqual(
      roadmap.weeks.find((week: { startDate: string }) => week.startDate === today.startOf("week").toISODate())
        .plannedSessions[0],
      {
        id: plannedSession.id,
        date: today.toISODate(),
        dateLabel: today.setLocale("fr").toFormat("d LLLL"),
        title: "Séance prévue",
        detail: "55 min",
        statusLabel: "Prévue",
        statusTone: "planned",
        conflictCount: 0,
      }
    )
  })

  test("keeps global interruptions on every class roadmap and scopes class interruptions and conflicts", async ({
    assert,
    client,
  }) => {
    const today = DateTime.local().startOf("day")
    const { schoolYear, teachingClass } = await createProgressionContext(
      today.minus({ days: 3 }),
      today.plus({ days: 3 })
    )
    const interruptionType = await InterruptionType.create({
      schoolYearId: schoolYear.id,
      name: "Vacances",
      displayOrder: 1,
      color: null,
    })
    const globalInterruption = await Interruption.create({
      schoolYearId: schoolYear.id,
      interruptionTypeId: interruptionType.id,
      scope: "global",
      title: "Férié",
      startsAt: today.startOf("day"),
      endsAt: today.plus({ days: 1 }).startOf("day"),
      noteMarkdown: null,
    })
    const classInterruption = await Interruption.create({
      schoolYearId: schoolYear.id,
      interruptionTypeId: interruptionType.id,
      scope: "class",
      title: "Sortie scolaire",
      startsAt: today.startOf("day"),
      endsAt: today.plus({ days: 1 }).startOf("day"),
      noteMarkdown: null,
    })
    await InterruptionClass.create({ interruptionId: classInterruption.id, classId: teachingClass.id })
    const plannedSession = await PlannedSession.create({
      classId: teachingClass.id,
      title: "Séance en conflit",
      sessionDate: today,
      startTime: "08:00",
      durationMinutes: 55,
      sessionOrder: 1,
      outcome: "to_catch_up",
      outcomeReviewRequired: false,
    })
    await PlanningConflict.create({
      plannedSessionId: plannedSession.id,
      interruptionId: classInterruption.id,
      resolvedAt: null,
      resolutionNoteMarkdown: null,
    })

    const response = await client.get(`/planning/classes/${teachingClass.id}/progression`)
    const roadmap = extractInertiaPage(response.text()).props.progressionView.roadmap
    const currentWeek = roadmap.weeks.find(
      (week: { startDate: string }) => week.startDate === today.startOf("week").toISODate()
    )

    assert.deepEqual(
      currentWeek.interruptions.map((interruption: { title: string; scope: string }) => interruption),
      [
        { id: globalInterruption.id, title: "Férié", scope: "global", scopeLabel: "Toutes les classes" },
        { id: classInterruption.id, title: "Sortie scolaire", scope: "class", scopeLabel: "Cette classe" },
      ]
    )
    assert.equal(currentWeek.plannedSessions[0].statusTone, "danger")
    assert.equal(currentWeek.plannedSessions[0].conflictCount, 1)
  })

  test("focuses the nearest school-year boundary when today is outside the work file", async ({ assert, client }) => {
    const today = DateTime.local().startOf("day")
    const { teachingClass } = await createProgressionContext(today.plus({ months: 2 }), today.plus({ months: 3 }))

    const response = await client.get(`/planning/classes/${teachingClass.id}/progression`)
    const roadmap = extractInertiaPage(response.text()).props.progressionView.roadmap

    assert.equal(roadmap.focusWeekStartDate, today.plus({ months: 2 }).startOf("week").toISODate())
  })
})
