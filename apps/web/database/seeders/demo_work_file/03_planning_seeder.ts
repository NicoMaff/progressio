import type { QueryClientContract } from "@adonisjs/lucid/types/database"
import { DateTime } from "luxon"
import {
  PlannedSessionActivityFactory,
  PlannedSessionFactory,
  RecurringSlotFactory,
  SlotTypeFactory,
  TemplateProgressionFactory,
  TemplateSessionActivityFactory,
  TemplateSessionFactory,
} from "#database/factories"
import {
  PLANNED_SESSION_OUTCOMES,
  RECURRING_SLOT_BLUEPRINTS,
  SLOT_TYPES,
  TEMPLATE_SESSION_BLUEPRINTS,
} from "#database/seeders/demo_work_file/blueprints"
import type { DemoWorkFileSeedContext, TemplateSessionSet } from "#database/seeders/demo_work_file/context"
import { dateTimeOnSessionDate, firstDateWithWeekday } from "#database/seeders/demo_work_file/dates"
import type TeachingClass from "#models/class"
import type RecurringSlot from "#models/recurring_slot"
import type TemplateSession from "#models/template_session"
import type TemplateSessionActivity from "#models/template_session_activity"

type PlannedSessionInput = {
  teachingClass: TeachingClass
  recurringSlot: RecurringSlot
  templateSession: TemplateSession | null
  templateActivities: TemplateSessionActivity[]
  sessionDate: DateTime
  sessionOrder: number
  title: string | null
}

export default class PlanningSeeder {
  constructor(private client: QueryClientContract) {}

  async run(context: DemoWorkFileSeedContext) {
    const schoolYear = context.schoolYear!

    for (const [slotTypeIndex, slotType] of SLOT_TYPES.entries()) {
      context.slotTypes.push(
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

    for (const level of context.levels) {
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
            : context.chaptersByShortCode.get(`${level.shortCode}:${blueprint.chapterShortCode}`)!
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
            : context.activitiesByChapterKey.get(`${level.shortCode}:${blueprint.chapterShortCode}`)!
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
              activityTypeId: context.activityTypes[templateSessionIndex % context.activityTypes.length].id,
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

      context.templateSessionSetsByLevelId.set(level.id, {
        sessions,
        activitiesByTemplateSessionId,
      } satisfies TemplateSessionSet)
    }

    const sessionOrdersByClassId = new Map<string, number>()

    for (const blueprint of RECURRING_SLOT_BLUEPRINTS) {
      const teachingClass = context.classesByShortCode.get(blueprint.classShortCode)!
      const recurringSlot = await RecurringSlotFactory.client(this.client)
        .merge({
          classId: teachingClass.id,
          slotTypeId: context.slotTypes[blueprint.slotTypeIndex]!.id,
          weekday: blueprint.weekday,
          startTime: blueprint.startTime,
          durationMinutes: blueprint.durationMinutes,
          validFrom: firstDateWithWeekday(schoolYear.firstTeachingDay, blueprint.weekday),
          validUntil: schoolYear.endDate,
        })
        .create()
      const templateSessionSet = context.templateSessionSetsByLevelId.get(teachingClass.levelId)!
      let sessionDate = firstDateWithWeekday(schoolYear.firstTeachingDay, blueprint.weekday)

      for (let generatedSessionIndex = 0; sessionDate <= schoolYear.endDate; generatedSessionIndex += 1) {
        const nextOrder = (sessionOrdersByClassId.get(teachingClass.id) ?? 0) + 1
        sessionOrdersByClassId.set(teachingClass.id, nextOrder)

        const templateSession = templateSessionSet.sessions[generatedSessionIndex % templateSessionSet.sessions.length]!
        const title = generatedSessionIndex % 5 === 4 ? null : templateSession.title
        const templateActivities = templateSessionSet.activitiesByTemplateSessionId.get(templateSession.id)!

        await this.createPlannedSession(context, {
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
      const teachingClass = context.classesByShortCode.get(classShortCode)!
      const nextOrder = (sessionOrdersByClassId.get(teachingClass.id) ?? 0) + 1
      sessionOrdersByClassId.set(teachingClass.id, nextOrder)
      await this.createStandalonePlannedSession(context, teachingClass, DateTime.fromISO("2026-01-15"), nextOrder)
    }
  }

  private async createPlannedSession(context: DemoWorkFileSeedContext, input: PlannedSessionInput) {
    const plannedSessionOutcome = PLANNED_SESSION_OUTCOMES[context.plannedSessionSets.length]
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
        outcome: plannedSessionOutcome?.outcome ?? null,
        outcomeReviewRequired: plannedSessionOutcome?.reviewRequired ?? false,
        outcomeReviewedAt: plannedSessionOutcome?.reviewed ? dateTimeOnSessionDate(input.sessionDate, 17) : null,
        noteMarkdown: "Séance prévisionnelle générée pour le dataset de démonstration.",
      })
      .create()
    const plannedSessionActivities = []

    for (const templateActivity of input.templateActivities) {
      plannedSessionActivities.push(
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
      )
    }

    context.plannedSessionSets.push({
      session: plannedSession,
      activities: plannedSessionActivities,
    })
  }

  private async createStandalonePlannedSession(
    context: DemoWorkFileSeedContext,
    teachingClass: TeachingClass,
    sessionDate: DateTime,
    sessionOrder: number
  ) {
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
    const plannedSessionActivities = [
      await PlannedSessionActivityFactory.client(this.client)
        .merge({
          plannedSessionId: plannedSession.id,
          activityId: null,
          activityTypeId: context.activityTypes[3]!.id,
          localTitle: "Reprise ciblée des difficultés",
          localDescriptionMarkdown: "Activité locale copiée directement dans la séance planifiée.",
          activityOrder: 1,
          plannedDurationMinutes: 30,
        })
        .create(),
    ]

    context.plannedSessionSets.push({
      session: plannedSession,
      activities: plannedSessionActivities,
    })
  }
}
