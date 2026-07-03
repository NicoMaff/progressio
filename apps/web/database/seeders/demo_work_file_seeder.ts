import type { QueryClientContract } from "@adonisjs/lucid/types/database"
import { DateTime } from "luxon"
import type Activity from "#models/activity"
import type ActivityType from "#models/activity_type"
import type Chapter from "#models/chapter"
import type TeachingClass from "#models/class"
import type Level from "#models/level"
import type RecurringSlot from "#models/recurring_slot"
import type TemplateSession from "#models/template_session"
import type TemplateSessionActivity from "#models/template_session_activity"
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

const SLOT_TYPES = [
  { name: "Cours standard", color: "#0F766E" },
  { name: "Atelier", color: "#2563EB" },
  { name: "Devoir surveillé", color: "#DC2626" },
]

const TEMPLATE_SESSION_BLUEPRINTS = [
  { chapterShortCode: "CALC", title: "Installer les automatismes de calcul", durationMinutes: 55 },
  { chapterShortCode: "PROB", title: "Résoudre des problèmes en étapes", durationMinutes: 55 },
  { chapterShortCode: "FIG", title: "Construire et décrire des figures", durationMinutes: 55 },
  { chapterShortCode: null, title: "Réactivation et méthodes transversales", durationMinutes: 55 },
  { chapterShortCode: "CONV", title: null, durationMinutes: 55 },
]

const RECURRING_SLOT_BLUEPRINTS = [
  { classShortCode: "6A", slotTypeIndex: 0, weekday: 2, startTime: "09:00", durationMinutes: 55 },
  { classShortCode: "6B", slotTypeIndex: 1, weekday: 4, startTime: "13:30", durationMinutes: 55 },
  { classShortCode: "5A", slotTypeIndex: 0, weekday: 1, startTime: "10:10", durationMinutes: 55 },
  { classShortCode: "5B", slotTypeIndex: 2, weekday: 5, startTime: "08:00", durationMinutes: 55 },
  { classShortCode: "4A", slotTypeIndex: 0, weekday: 3, startTime: "14:35", durationMinutes: 55 },
]

type TemplateSessionSet = {
  sessions: TemplateSession[]
  activitiesByTemplateSessionId: Map<string, TemplateSessionActivity[]>
}

type PlannedSessionInput = {
  teachingClass: TeachingClass
  recurringSlot: RecurringSlot
  templateSession: TemplateSession | null
  templateActivities: TemplateSessionActivity[]
  sessionDate: DateTime
  sessionOrder: number
  title: string | null
}

function firstDateWithWeekday(startDate: DateTime, weekday: number) {
  return startDate.plus({ days: (weekday - startDate.weekday + 7) % 7 })
}

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
    const activitiesByChapterKey = new Map<string, Activity[]>()

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
        const chapterActivities: Activity[] = []

        for (const [activityIndex, activityTitle] of ACTIVITY_TITLES.entries()) {
          chapterActivities.push(
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
          )
        }

        activitiesByChapterKey.set(`${level.shortCode}:${chapter.shortCode}`, chapterActivities)
      }
    }

    const slotTypes = []

    for (const [slotTypeIndex, slotType] of SLOT_TYPES.entries()) {
      slotTypes.push(
        await SlotTypeFactory.client(this.client)
          .merge({
            schoolYearId: schoolYear.id,
            name: slotType.name,
            color: slotType.color,
            displayOrder: slotTypeIndex + 1,
          })
          .create()
      )
    }

    const templateSessionSetsByLevelId = new Map<string, TemplateSessionSet>()

    for (const level of levels) {
      const progression = await TemplateProgressionFactory.client(this.client)
        .merge({
          levelId: level.id,
          name: `Progression annuelle ${level.name}`,
        })
        .create()
      const sessions: TemplateSession[] = []
      const activitiesByTemplateSessionId = new Map<string, TemplateSessionActivity[]>()

      for (const [templateSessionIndex, blueprint] of TEMPLATE_SESSION_BLUEPRINTS.entries()) {
        const chapter =
          blueprint.chapterShortCode === null
            ? null
            : chaptersByShortCode.get(`${level.shortCode}:${blueprint.chapterShortCode}`)!
        const templateSession = await TemplateSessionFactory.client(this.client)
          .merge({
            templateProgressionId: progression.id,
            mainChapterId: chapter?.id ?? null,
            title: blueprint.title,
            sessionOrder: templateSessionIndex + 1,
            plannedDurationMinutes: blueprint.durationMinutes,
            noteMarkdown: "Séance modèle du dataset de démonstration.",
          })
          .create()
        const reusableActivities =
          blueprint.chapterShortCode === null
            ? []
            : activitiesByChapterKey.get(`${level.shortCode}:${blueprint.chapterShortCode}`)!
        const templateActivities: TemplateSessionActivity[] = []

        if (reusableActivities[0] !== undefined) {
          templateActivities.push(
            await TemplateSessionActivityFactory.client(this.client)
              .merge({
                templateSessionId: templateSession.id,
                activityId: reusableActivities[0].id,
                activityOrder: 1,
                plannedDurationMinutes: reusableActivities[0].estimatedDurationMinutes ?? 25,
              })
              .create()
          )
        }

        templateActivities.push(
          await TemplateSessionActivityFactory.client(this.client)
            .merge({
              templateSessionId: templateSession.id,
              activityId: null,
              activityTypeId: activityTypes[templateSessionIndex % activityTypes.length].id,
              localTitle:
                blueprint.chapterShortCode === null
                  ? "Point méthode et organisation du classeur"
                  : `Trace écrite - ${chapter!.name}`,
              localDescriptionMarkdown: "Activité locale définie uniquement dans la séance modèle.",
              activityOrder: templateActivities.length + 1,
              plannedDurationMinutes: 20,
            })
            .create()
        )

        if (reusableActivities[1] !== undefined && templateSessionIndex % 2 === 0) {
          templateActivities.push(
            await TemplateSessionActivityFactory.client(this.client)
              .merge({
                templateSessionId: templateSession.id,
                activityId: reusableActivities[1].id,
                activityOrder: templateActivities.length + 1,
                plannedDurationMinutes: reusableActivities[1].estimatedDurationMinutes ?? 20,
              })
              .create()
          )
        }

        sessions.push(templateSession)
        activitiesByTemplateSessionId.set(templateSession.id, templateActivities)
      }

      templateSessionSetsByLevelId.set(level.id, {
        sessions,
        activitiesByTemplateSessionId,
      })
    }

    const sessionOrdersByClassId = new Map<string, number>()

    const createPlannedSession = async (input: PlannedSessionInput) => {
      const plannedSession = await PlannedSessionFactory.client(this.client)
        .merge({
          classId: input.teachingClass.id,
          recurringSlotId: input.recurringSlot.id,
          templateSessionId: input.templateSession?.id ?? null,
          mainChapterId: input.templateSession?.mainChapterId ?? null,
          title: input.title,
          sessionDate: input.sessionDate,
          startTime: input.recurringSlot.startTime,
          durationMinutes: input.recurringSlot.durationMinutes,
          sessionOrder: input.sessionOrder,
          noteMarkdown: "Séance prévisionnelle générée pour le dataset de démonstration.",
        })
        .create()

      for (const templateActivity of input.templateActivities) {
        await PlannedSessionActivityFactory.client(this.client)
          .merge({
            plannedSessionId: plannedSession.id,
            activityId: templateActivity.activityId,
            templateSessionActivityId: templateActivity.id,
            activityTypeId: templateActivity.activityTypeId,
            localTitle: templateActivity.localTitle,
            localDescriptionMarkdown: templateActivity.localDescriptionMarkdown,
            activityOrder: templateActivity.activityOrder,
            plannedDurationMinutes: templateActivity.plannedDurationMinutes,
          })
          .create()
      }

      return plannedSession
    }

    const createStandalonePlannedSession = async (
      teachingClass: TeachingClass,
      sessionDate: DateTime,
      sessionOrder: number
    ) => {
      const plannedSession = await PlannedSessionFactory.client(this.client)
        .merge({
          classId: teachingClass.id,
          recurringSlotId: null,
          templateSessionId: null,
          mainChapterId: null,
          title: "Séance de régulation",
          sessionDate,
          startTime: "16:00",
          durationMinutes: 40,
          sessionOrder,
          noteMarkdown: "Séance ajoutée hors créneau récurrent pour montrer une origine manuelle.",
        })
        .create()

      await PlannedSessionActivityFactory.client(this.client)
        .merge({
          plannedSessionId: plannedSession.id,
          activityId: null,
          activityTypeId: activityTypes[3]!.id,
          localTitle: "Reprise ciblée des difficultés",
          localDescriptionMarkdown: "Activité locale copiée directement dans la séance planifiée.",
          activityOrder: 1,
          plannedDurationMinutes: 30,
        })
        .create()

      return plannedSession
    }

    for (const blueprint of RECURRING_SLOT_BLUEPRINTS) {
      const teachingClass = classesByShortCode.get(blueprint.classShortCode)!
      const recurringSlot = await RecurringSlotFactory.client(this.client)
        .merge({
          classId: teachingClass.id,
          slotTypeId: slotTypes[blueprint.slotTypeIndex]!.id,
          weekday: blueprint.weekday,
          startTime: blueprint.startTime,
          durationMinutes: blueprint.durationMinutes,
          validFrom: firstDateWithWeekday(schoolYear.firstTeachingDay, blueprint.weekday),
          validUntil: schoolYear.endDate,
        })
        .create()
      const templateSessionSet = templateSessionSetsByLevelId.get(teachingClass.levelId)!
      let sessionDate = firstDateWithWeekday(schoolYear.firstTeachingDay, blueprint.weekday)

      for (let generatedSessionIndex = 0; sessionDate <= schoolYear.endDate; generatedSessionIndex += 1) {
        const nextOrder = (sessionOrdersByClassId.get(teachingClass.id) ?? 0) + 1
        sessionOrdersByClassId.set(teachingClass.id, nextOrder)

        const templateSession = templateSessionSet.sessions[generatedSessionIndex % templateSessionSet.sessions.length]!
        const title = generatedSessionIndex % 5 === 4 ? null : templateSession.title
        const templateActivities = templateSessionSet.activitiesByTemplateSessionId.get(templateSession.id)!

        await createPlannedSession({
          teachingClass,
          recurringSlot,
          templateSession,
          templateActivities,
          sessionDate,
          sessionOrder: nextOrder,
          title,
        })

        sessionDate = sessionDate.plus({ weeks: 3 })
      }
    }

    for (const classShortCode of ["6A", "5B"]) {
      const teachingClass = classesByShortCode.get(classShortCode)!
      const nextOrder = (sessionOrdersByClassId.get(teachingClass.id) ?? 0) + 1
      sessionOrdersByClassId.set(teachingClass.id, nextOrder)
      await createStandalonePlannedSession(teachingClass, DateTime.fromISO("2026-01-15"), nextOrder)
    }
  }
}
