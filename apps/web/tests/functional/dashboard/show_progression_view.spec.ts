import ActualSession from "#models/actual_session"
import TeachingClass from "#models/class"
import Level from "#models/level"
import Period from "#models/period"
import PlannedSession from "#models/planned_session"
import SchoolYear from "#models/school_year"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

function extractInertiaPage(html: string) {
  const [, encodedPage] = html.match(/data-page="([^"]+)"/) ?? []
  if (!encodedPage) throw new Error("Missing Inertia page payload")
  return JSON.parse(encodedPage.replaceAll("&quot;", '"').replaceAll("&amp;", "&"))
}

async function createProgressionContext() {
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
  const teachingClass = await TeachingClass.create({
    schoolYearId: schoolYear.id,
    levelId: level.id,
    name: "Première A",
    shortCode: "1A",
  })

  return { today, schoolYear, level, teachingClass }
}

test.group("Progression view", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(async () => testUtils.db().wrapInGlobalTransaction())

  test("selects the current period and groups linked actual sessions with their planned session", async ({
    assert,
    client,
  }) => {
    const { today, schoolYear, level, teachingClass } = await createProgressionContext()
    await Period.create({
      schoolYearId: schoolYear.id,
      name: "Période en cours",
      startDate: today.minus({ days: 2 }),
      endDate: today.plus({ days: 2 }),
    })
    const plannedSession = await PlannedSession.create({
      classId: teachingClass.id,
      title: "Équations du premier degré",
      sessionDate: today,
      startTime: "08:00",
      durationMinutes: 55,
      sessionOrder: 1,
      outcome: "partial",
      outcomeReviewRequired: false,
    })
    const linkedActualSession = await ActualSession.create({
      classId: teachingClass.id,
      plannedSessionId: plannedSession.id,
      title: "Exercices guidés",
      sessionDate: today.plus({ days: 1 }),
      startTime: "08:00",
      durationMinutes: 55,
      sessionOrder: 1,
      state: "completed",
      completedAt: DateTime.utc(),
    })
    const unplannedActualSession = await ActualSession.create({
      classId: teachingClass.id,
      title: "Remédiation collective",
      sessionDate: today.plus({ days: 2 }),
      startTime: "10:00",
      durationMinutes: 30,
      sessionOrder: 2,
      state: "completed",
      completedAt: DateTime.utc(),
    })

    const response = await client.get(`/planning/classes/${teachingClass.id}/progression`)
    response.assertStatus(200)
    const page = extractInertiaPage(response.text())

    assert.equal(page.component, "planning/progression_view")
    assert.deepEqual(page.props.progressionView.schoolYear, {
      id: schoolYear.id,
      label: "2025-2026",
      subject: "Mathématiques",
    })
    assert.deepEqual(page.props.progressionView.level, {
      id: level.id,
      name: "Première générale",
      shortCode: "1G",
    })
    assert.deepEqual(page.props.progressionView.teachingClass, {
      id: teachingClass.id,
      name: "Première A",
      shortCode: "1A",
    })
    assert.deepEqual(page.props.progressionView.window, {
      kind: "period",
      label: "Période en cours",
      startDate: today.minus({ days: 2 }).toISODate(),
      endDate: today.plus({ days: 2 }).toISODate(),
    })
    assert.deepEqual(page.props.progressionView.chronology, [
      {
        id: plannedSession.id,
        kind: "planned",
        date: today.toISODate(),
        dateLabel: today.setLocale("fr").toFormat("d LLLL yyyy"),
        detail: "55 min",
        title: "Équations du premier degré",
        outcomeLabel: "Partiellement réalisée",
        outcomeTone: "amber",
        actualSessions: [
          {
            id: linkedActualSession.id,
            dateLabel: today.plus({ days: 1 }).setLocale("fr").toFormat("d LLLL yyyy"),
            detail: "55 min",
            title: "Exercices guidés",
          },
        ],
      },
      {
        id: unplannedActualSession.id,
        kind: "unplannedActual",
        date: today.plus({ days: 2 }).toISODate(),
        dateLabel: today.plus({ days: 2 }).setLocale("fr").toFormat("d LLLL yyyy"),
        detail: "30 min",
        title: "Remédiation collective",
      },
    ])
  })

  test("falls back to the current calendar month when no period contains today", async ({ assert, client }) => {
    const { today, teachingClass } = await createProgressionContext()
    const currentMonthSession = await PlannedSession.create({
      classId: teachingClass.id,
      title: "Séance du mois",
      sessionDate: today.startOf("month").plus({ days: 1 }),
      startTime: "08:00",
      durationMinutes: 55,
      sessionOrder: 1,
      outcome: null,
      outcomeReviewRequired: false,
    })
    await PlannedSession.create({
      classId: teachingClass.id,
      title: "Séance hors mois",
      sessionDate: today.plus({ months: 1 }).startOf("month"),
      startTime: "08:00",
      durationMinutes: 55,
      sessionOrder: 2,
      outcome: null,
      outcomeReviewRequired: false,
    })

    const response = await client.get(`/planning/classes/${teachingClass.id}/progression`)
    response.assertStatus(200)
    const page = extractInertiaPage(response.text())

    assert.deepEqual(page.props.progressionView.window, {
      kind: "month",
      label: today.setLocale("fr").toFormat("LLLL yyyy"),
      startDate: today.startOf("month").toISODate(),
      endDate: today.endOf("month").toISODate(),
    })
    assert.deepEqual(
      page.props.progressionView.chronology.map((entry: { id: string }) => entry.id),
      [currentMonthSession.id]
    )
  })

  test("shows the whole school year when the annual window is requested", async ({ assert, client }) => {
    const { today, schoolYear, teachingClass } = await createProgressionContext()
    const plannedSession = await PlannedSession.create({
      classId: teachingClass.id,
      title: "Séance annuelle",
      sessionDate: today.minus({ months: 3 }),
      startTime: "08:00",
      durationMinutes: 55,
      sessionOrder: 1,
      outcome: null,
      outcomeReviewRequired: false,
    })
    const linkedActualSession = await ActualSession.create({
      classId: teachingClass.id,
      plannedSessionId: plannedSession.id,
      title: "Approfondissement annuel",
      sessionDate: today.minus({ months: 2 }),
      startTime: "08:00",
      durationMinutes: 55,
      sessionOrder: 1,
      state: "completed",
      completedAt: DateTime.utc(),
    })
    const unplannedActualSession = await ActualSession.create({
      classId: teachingClass.id,
      title: "Séance de consolidation",
      sessionDate: today.minus({ months: 1 }),
      startTime: "10:00",
      durationMinutes: 30,
      sessionOrder: 2,
      state: "completed",
      completedAt: DateTime.utc(),
    })

    const response = await client.get(`/planning/classes/${teachingClass.id}/progression?window=annual`)
    response.assertStatus(200)
    const page = extractInertiaPage(response.text())

    assert.deepEqual(page.props.progressionView.window, {
      kind: "schoolYear",
      label: "2025-2026",
      startDate: schoolYear.startDate.toISODate(),
      endDate: schoolYear.endDate.toISODate(),
    })
    assert.deepEqual(page.props.progressionView.chronology, [
      {
        id: plannedSession.id,
        kind: "planned",
        date: today.minus({ months: 3 }).toISODate(),
        dateLabel: today.minus({ months: 3 }).setLocale("fr").toFormat("d LLLL yyyy"),
        detail: "55 min",
        title: "Séance annuelle",
        outcomeLabel: null,
        outcomeTone: "neutral",
        actualSessions: [
          {
            id: linkedActualSession.id,
            dateLabel: today.minus({ months: 2 }).setLocale("fr").toFormat("d LLLL yyyy"),
            detail: "55 min",
            title: "Approfondissement annuel",
          },
        ],
      },
      {
        id: unplannedActualSession.id,
        kind: "unplannedActual",
        date: today.minus({ months: 1 }).toISODate(),
        dateLabel: today.minus({ months: 1 }).setLocale("fr").toFormat("d LLLL yyyy"),
        detail: "30 min",
        title: "Séance de consolidation",
      },
    ])
  })
})
