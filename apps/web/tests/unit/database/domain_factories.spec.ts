import {
  ActivityFactory,
  ActivityTypeFactory,
  ActualSessionActivityFactory,
  ActualSessionFactory,
  ChapterFactory,
  InterruptionClassFactory,
  InterruptionFactory,
  InterruptionTypeFactory,
  LevelFactory,
  PeriodFactory,
  PlannedSessionActivityFactory,
  PlannedSessionFactory,
  PlanningConflictFactory,
  RecurringSlotFactory,
  SchoolYearFactory,
  SlotTypeFactory,
  TeachingClassFactory,
  TemplateProgressionFactory,
  TemplateSessionActivityFactory,
  TemplateSessionFactory,
  ThemeFactory,
} from "#database/factories"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

test.group("domain factories", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test("creates valid records for every main work-file domain factory", async ({ assert }) => {
    const records = [
      await SchoolYearFactory.create(),
      await LevelFactory.create(),
      await TeachingClassFactory.create(),
      await PeriodFactory.create(),
      await ActivityTypeFactory.create(),
      await SlotTypeFactory.create(),
      await InterruptionTypeFactory.create(),
      await ThemeFactory.create(),
      await ChapterFactory.create(),
      await ActivityFactory.create(),
      await TemplateProgressionFactory.create(),
      await TemplateSessionFactory.create(),
      await TemplateSessionActivityFactory.create(),
      await RecurringSlotFactory.create(),
      await PlannedSessionFactory.create(),
      await PlannedSessionActivityFactory.create(),
      await ActualSessionFactory.create(),
      await ActualSessionActivityFactory.create(),
      await InterruptionFactory.create(),
      await InterruptionClassFactory.create(),
      await PlanningConflictFactory.create(),
    ]

    assert.isTrue(records.every((record) => typeof record.id === "string" && record.id.length > 0))
  })

  test("lets explicit overrides win over fake defaults", async ({ assert }) => {
    const schoolYear = await SchoolYearFactory.merge({
      label: "2026-2027",
      subject: "Physique-chimie",
      startDate: DateTime.fromISO("2026-09-01"),
      endDate: DateTime.fromISO("2027-07-03"),
      firstTeachingDay: DateTime.fromISO("2026-09-03"),
      teachingHourDurationMinutes: 50,
    }).create()
    const level = await LevelFactory.merge({
      schoolYearId: schoolYear.id,
      name: "Sixième",
      shortCode: "6E",
    }).create()

    assert.equal(schoolYear.label, "2026-2027")
    assert.equal(schoolYear.subject, "Physique-chimie")
    assert.equal(schoolYear.teachingHourDurationMinutes, 50)
    assert.equal(level.schoolYearId, schoolYear.id)
    assert.equal(level.name, "Sixième")
    assert.equal(level.shortCode, "6E")

    const plannedSession = await PlannedSessionFactory.merge({
      title: "Séance explicitement imposée",
      outcome: "to_catch_up",
      outcomeReviewRequired: true,
    }).create()
    const actualSession = await ActualSessionFactory.merge({
      classId: plannedSession.classId,
      plannedSessionId: plannedSession.id,
      title: "Brouillon imposé",
      state: "draft",
      completedAt: null,
    }).create()

    assert.equal(plannedSession.title, "Séance explicitement imposée")
    assert.equal(plannedSession.outcome, "to_catch_up")
    assert.isTrue(plannedSession.outcomeReviewRequired)
    assert.equal(actualSession.classId, plannedSession.classId)
    assert.equal(actualSession.plannedSessionId, plannedSession.id)
    assert.equal(actualSession.title, "Brouillon imposé")
    assert.equal(actualSession.state, "draft")
    assert.isNull(actualSession.completedAt)
  })

  test("keeps imposed relations instead of creating unrelated parents", async ({ assert }) => {
    const schoolYear = await SchoolYearFactory.create()
    const level = await LevelFactory.merge({ schoolYearId: schoolYear.id, shortCode: "4E" }).create()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: schoolYear.id, name: "Cours" }).create()
    const activity = await ActivityFactory.merge({
      levelId: level.id,
      activityTypeId: activityType.id,
      title: "Activité imposée",
    }).create()

    assert.equal(activity.levelId, level.id)
    assert.equal(activity.activityTypeId, activityType.id)
    assert.equal(activity.title, "Activité imposée")
  })

  test("supports constraint-specific states for factories", async ({ assert }) => {
    const draftSession = await ActualSessionFactory.apply("draft").create()

    assert.equal(draftSession.state, "draft")
    assert.isNull(draftSession.completedAt)
  })
})
