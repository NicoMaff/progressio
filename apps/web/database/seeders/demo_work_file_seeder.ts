import type { QueryClientContract } from "@adonisjs/lucid/types/database"
import { DateTime } from "luxon"
import type ActivityType from "#models/activity_type"
import type Chapter from "#models/chapter"
import type TeachingClass from "#models/class"
import type Level from "#models/level"
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

const PERIOD_SETS = [
  [
    { name: "Semestre 1", startDate: "2025-09-01", endDate: "2026-01-23" },
    { name: "Semestre 2", startDate: "2026-01-26", endDate: "2026-07-04" },
  ],
  [
    { name: "Trimestre 1", startDate: "2025-09-01", endDate: "2025-11-28" },
    { name: "Trimestre 2", startDate: "2025-12-01", endDate: "2026-03-13" },
    { name: "Trimestre 3", startDate: "2026-03-16", endDate: "2026-07-04" },
  ],
]

const LEVELS = [
  {
    name: "Sixième",
    shortCode: "6E",
    classes: ["6e A", "6e B"],
  },
  {
    name: "Cinquième",
    shortCode: "5E",
    classes: ["5e A", "5e B"],
  },
  {
    name: "Quatrième",
    shortCode: "4E",
    classes: ["4e A", "4e B"],
  },
]

const THEMES = [
  { name: "Nombres et calculs", shortCode: "NUM", color: "#2563EB" },
  { name: "Géométrie", shortCode: "GEO", color: "#16A34A" },
  { name: "Grandeurs et mesures", shortCode: "MES", color: "#D97706" },
  { name: "Organisation de données", shortCode: "DON", color: "#7C3AED" },
]

const ACTIVITY_TYPES = [
  { name: "Cours", color: "#2563EB" },
  { name: "Exercices", color: "#16A34A" },
  { name: "Évaluation", color: "#DC2626" },
  { name: "Remédiation", color: "#7C3AED" },
]

const CHAPTERS = [
  { name: "Calcul numérique", shortCode: "CALC", themeIndex: 0 },
  { name: "Résolution de problèmes", shortCode: "PROB", themeIndex: 0 },
  { name: "Figures usuelles", shortCode: "FIG", themeIndex: 1 },
  { name: "Mesures et conversions", shortCode: "CONV", themeIndex: 2 },
  { name: "Méthodes transversales", shortCode: "METH", themeIndex: null },
]

const ACTIVITY_TITLES = ["Découverte guidée", "Entraînement progressif", "Synthèse de méthode", "Défi d'application"]

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

    const selectedPeriods = PERIOD_SETS[Math.floor(Math.random() * PERIOD_SETS.length)]!

    for (const period of selectedPeriods) {
      await PeriodFactory.client(this.client)
        .merge({
          schoolYearId: schoolYear.id,
          name: period.name,
          startDate: DateTime.fromISO(period.startDate),
          endDate: DateTime.fromISO(period.endDate),
        })
        .create()
    }

    const activityTypes: ActivityType[] = []

    for (const [activityTypeIndex, activityType] of ACTIVITY_TYPES.entries()) {
      activityTypes.push(
        await ActivityTypeFactory.client(this.client)
          .merge({
            schoolYearId: schoolYear.id,
            name: activityType.name,
            color: activityType.color,
            displayOrder: activityTypeIndex + 1,
          })
          .create()
      )
    }

    const levels: Level[] = []
    const classesByShortCode = new Map<string, TeachingClass>()
    const chaptersByShortCode = new Map<string, Chapter>()

    for (const levelDefinition of LEVELS) {
      const level = await LevelFactory.client(this.client)
        .merge({
          schoolYearId: schoolYear.id,
          name: levelDefinition.name,
          shortCode: levelDefinition.shortCode,
        })
        .create()

      levels.push(level)

      for (const [classIndex, className] of levelDefinition.classes.entries()) {
        const teachingClass = await TeachingClassFactory.client(this.client)
          .merge({
            schoolYearId: schoolYear.id,
            levelId: level.id,
            name: className,
            shortCode: `${levelDefinition.shortCode.replace("E", "")}${String.fromCharCode(65 + classIndex)}`,
          })
          .create()

        classesByShortCode.set(teachingClass.shortCode, teachingClass)
      }

      const themes = []

      for (const theme of THEMES) {
        themes.push(
          await ThemeFactory.client(this.client)
            .merge({
              levelId: level.id,
              name: theme.name,
              shortCode: theme.shortCode,
              color: theme.color,
              noteMarkdown: "Regroupement fonctionnel pour les données de démonstration.",
            })
            .create()
        )
      }

      for (const chapterDefinition of CHAPTERS) {
        const chapter = await ChapterFactory.client(this.client)
          .merge({
            levelId: level.id,
            themeId: chapterDefinition.themeIndex === null ? null : themes[chapterDefinition.themeIndex]!.id,
            name: chapterDefinition.name,
            shortCode: chapterDefinition.shortCode,
            noteMarkdown: "Chapitre générique utilisé pour alimenter les écrans de contenu.",
          })
          .create()

        chaptersByShortCode.set(`${level.shortCode}:${chapter.shortCode}`, chapter)

        for (const [activityIndex, activityTitle] of ACTIVITY_TITLES.entries()) {
          await ActivityFactory.client(this.client)
            .merge({
              levelId: level.id,
              chapterId: chapter.id,
              activityTypeId: activityTypes[activityIndex % activityTypes.length].id,
              title: `${activityTitle} - ${chapter.name}`,
              estimatedDurationMinutes: activityIndex % 2 === 0 ? 30 + activityIndex * 10 : null,
              noteMarkdown: "Activité réutilisable du dataset de démonstration.",
            })
            .create()
        }
      }
    }

    const slotType = await SlotTypeFactory.client(this.client)
      .merge({
        schoolYearId: schoolYear.id,
        name: "Cours standard",
        color: "#0F766E",
        displayOrder: 1,
      })
      .create()

    const sixieme = levels[0]!
    const sixiemeA = classesByShortCode.get("6A")!
    const cinquiemeB = classesByShortCode.get("5B")!
    const fractionsChapter = chaptersByShortCode.get("6E:CALC")!
    const fractionActivity = await ActivityFactory.client(this.client)
      .merge({
        levelId: sixieme.id,
        chapterId: fractionsChapter.id,
        activityTypeId: activityTypes[0]!.id,
        title: "Séance de découverte - calcul numérique",
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
        title: "Découverte en calcul numérique",
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
        title: "Découverte en calcul numérique",
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
