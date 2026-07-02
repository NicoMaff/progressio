import type { QueryClientContract } from "@adonisjs/lucid/types/database"
import { DateTime } from "luxon"
import {
  ActivityFactory,
  ActivityTypeFactory,
  ChapterFactory,
  LevelFactory,
  PeriodFactory,
  PlannedSessionActivityFactory,
  PlannedSessionFactory,
  RecurringSlotFactory,
  SchoolYearFactory,
  SlotTypeFactory,
  TeachingClassFactory,
  TemplateProgressionFactory,
  TemplateSessionActivityFactory,
  TemplateSessionFactory,
  ThemeFactory,
} from "#database/factories"

export default class DemoWorkFileSeeder {
  static environment = ["development"]

  constructor(private client: QueryClientContract) {}

  async run() {
    const schoolYear = await SchoolYearFactory.client(this.client)
      .merge({
        label: "2025-2026",
        subject: "Mathématiques",
        startDate: DateTime.fromISO("2025-09-01"),
        endDate: DateTime.fromISO("2026-07-04"),
        firstTeachingDay: DateTime.fromISO("2025-09-02"),
        teachingHourDurationMinutes: 55,
      })
      .create()

    await PeriodFactory.client(this.client)
      .merge({
        schoolYearId: schoolYear.id,
        name: "Période 1",
        startDate: DateTime.fromISO("2025-09-01"),
        endDate: DateTime.fromISO("2025-10-17"),
      })
      .create()

    await PeriodFactory.client(this.client)
      .merge({
        schoolYearId: schoolYear.id,
        name: "Période 2",
        startDate: DateTime.fromISO("2025-11-03"),
        endDate: DateTime.fromISO("2025-12-19"),
      })
      .create()

    const sixieme = await LevelFactory.client(this.client)
      .merge({
        schoolYearId: schoolYear.id,
        name: "Sixième",
        shortCode: "6E",
      })
      .create()

    const cinquieme = await LevelFactory.client(this.client)
      .merge({
        schoolYearId: schoolYear.id,
        name: "Cinquième",
        shortCode: "5E",
      })
      .create()

    const sixiemeA = await TeachingClassFactory.client(this.client)
      .merge({
        schoolYearId: schoolYear.id,
        levelId: sixieme.id,
        name: "6e A",
        shortCode: "6A",
      })
      .create()

    const cinquiemeB = await TeachingClassFactory.client(this.client)
      .merge({
        schoolYearId: schoolYear.id,
        levelId: cinquieme.id,
        name: "5e B",
        shortCode: "5B",
      })
      .create()

    const cours = await ActivityTypeFactory.client(this.client)
      .merge({
        schoolYearId: schoolYear.id,
        name: "Cours",
        color: "#2563EB",
        displayOrder: 1,
      })
      .create()

    await ActivityTypeFactory.client(this.client)
      .merge({
        schoolYearId: schoolYear.id,
        name: "Exercices",
        color: "#16A34A",
        displayOrder: 2,
      })
      .create()

    const slotType = await SlotTypeFactory.client(this.client)
      .merge({
        schoolYearId: schoolYear.id,
        name: "Cours standard",
        color: "#0F766E",
        displayOrder: 1,
      })
      .create()

    const numerationTheme = await ThemeFactory.client(this.client)
      .merge({
        levelId: sixieme.id,
        name: "Nombres et calculs",
        shortCode: "NC",
        color: "#4F46E5",
        noteMarkdown: "Repères de calcul mental, numération et premiers problèmes.",
      })
      .create()

    const fractionsChapter = await ChapterFactory.client(this.client)
      .merge({
        levelId: sixieme.id,
        themeId: numerationTheme.id,
        name: "Fractions",
        shortCode: "FRAC",
      })
      .create()

    const fractionActivity = await ActivityFactory.client(this.client)
      .merge({
        levelId: sixieme.id,
        chapterId: fractionsChapter.id,
        activityTypeId: cours.id,
        title: "Découvrir les fractions comme partage",
        estimatedDurationMinutes: 35,
      })
      .create()

    const progression = await TemplateProgressionFactory.client(this.client)
      .merge({
        levelId: sixieme.id,
        name: "Progression annuelle 6e",
      })
      .create()

    const templateSession = await TemplateSessionFactory.client(this.client)
      .merge({
        templateProgressionId: progression.id,
        mainChapterId: fractionsChapter.id,
        title: "Fractions comme partage",
        sessionOrder: 1,
        plannedDurationMinutes: 55,
      })
      .create()

    const templateActivity = await TemplateSessionActivityFactory.client(this.client)
      .merge({
        templateSessionId: templateSession.id,
        activityId: fractionActivity.id,
        activityOrder: 1,
        plannedDurationMinutes: 35,
      })
      .create()

    const recurringSlot = await RecurringSlotFactory.client(this.client)
      .merge({
        classId: sixiemeA.id,
        slotTypeId: slotType.id,
        weekday: 2,
        startTime: "09:00",
        durationMinutes: 55,
        validFrom: DateTime.fromISO("2025-09-02"),
        validUntil: null,
      })
      .create()

    const plannedSession = await PlannedSessionFactory.client(this.client)
      .merge({
        classId: sixiemeA.id,
        recurringSlotId: recurringSlot.id,
        templateSessionId: templateSession.id,
        mainChapterId: fractionsChapter.id,
        title: "Fractions comme partage",
        sessionDate: DateTime.fromISO("2025-09-09"),
        startTime: "09:00",
        durationMinutes: 55,
        sessionOrder: 1,
      })
      .create()

    await PlannedSessionActivityFactory.client(this.client)
      .merge({
        plannedSessionId: plannedSession.id,
        activityId: fractionActivity.id,
        templateSessionActivityId: templateActivity.id,
        activityOrder: 1,
        plannedDurationMinutes: 35,
      })
      .create()

    await RecurringSlotFactory.client(this.client)
      .merge({
        classId: cinquiemeB.id,
        slotTypeId: slotType.id,
        weekday: 4,
        startTime: "10:10",
        durationMinutes: 55,
        validFrom: DateTime.fromISO("2025-09-04"),
        validUntil: null,
      })
      .create()
  }
}
