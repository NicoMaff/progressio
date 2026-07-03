import type { QueryClientContract } from "@adonisjs/lucid/types/database"
import { DateTime } from "luxon"
import { ActualSessionActivityFactory, ActualSessionFactory } from "#database/factories"
import type { DemoWorkFileSeedContext, PlannedSessionSet } from "#database/seeders/demo_work_file/context"
import { dateTimeOnSessionDate } from "#database/seeders/demo_work_file/dates"
import type ActualSession from "#models/actual_session"
import type PlannedSessionActivity from "#models/planned_session_activity"

export default class ActualsSeeder {
  constructor(private client: QueryClientContract) {}

  async run(context: DemoWorkFileSeedContext) {
    const realizedSessionSet = context.plannedSessionSets.find(({ session }) => session.outcome === "realized")!
    const shiftedSessionSet = context.plannedSessionSets.find(({ session }) => session.outcome === "shifted")!
    const partialSessionSet = context.plannedSessionSets.find(({ session }) => session.outcome === "partial")!
    const catchUpSessionSet = context.plannedSessionSets.find(({ session }) => session.outcome === "to_catch_up")!

    const realizedActualSession = await this.createActualSessionForPlanned(realizedSessionSet, {
      title: "Séance réalisée - automatismes de calcul",
      noteMarkdown: "Réalisation conforme au prévu, avec trace des activités suivies.",
    })

    for (const [activityIndex, plannedSessionActivity] of realizedSessionSet.activities.entries()) {
      await this.copyPlannedActivityToActual(realizedActualSession, plannedSessionActivity, activityIndex + 1)
    }

    const shiftedActualSession = await this.createActualSessionForPlanned(shiftedSessionSet, {
      title: "Séance déplacée après sortie pédagogique",
      sessionDate: shiftedSessionSet.session.sessionDate.plus({ days: 2 }),
      noteMarkdown: "Séance réalisée à une autre date que le prévisionnel initial.",
    })

    for (const [activityIndex, plannedSessionActivity] of shiftedSessionSet.activities.entries()) {
      await this.copyPlannedActivityToActual(shiftedActualSession, plannedSessionActivity, activityIndex + 1)
    }

    const partialActualSession = await this.createActualSessionForPlanned(partialSessionSet, {
      title: "Séance partielle avec remplacement d'activité",
      durationMinutes: 35,
      noteMarkdown: "Séance écourtée, une activité prévue a été remplacée par une remédiation.",
    })

    await this.copyPlannedActivityToActual(partialActualSession, partialSessionSet.activities[0]!, 1, 15)
    await this.addLocalActualActivity(
      context,
      partialActualSession,
      2,
      "Remédiation sur les prérequis observés",
      partialSessionSet.activities[1]!
    )

    const draftCatchUpActualSession = await this.createActualSessionForPlanned(catchUpSessionSet, {
      title: "Brouillon de séance à rattraper",
      state: "draft",
      noteMarkdown: "Brouillon passé volontairement laissé à reprendre dans les futurs rappels.",
    })

    await this.addLocalActualActivity(context, draftCatchUpActualSession, 1, "Préparation du rattrapage individualisé")

    const unplannedClass = context.classesByShortCode.get("4A")!
    const unplannedActualSession = await ActualSessionFactory.client(this.client)
      .merge({
        classId: unplannedClass.id,
        plannedSessionId: null,
        mainChapterId: null,
        title: "Atelier non planifié de consolidation",
        sessionDate: DateTime.fromISO("2026-03-20"),
        startTime: "15:30",
        durationMinutes: 45,
        sessionOrder: 99,
        state: "completed",
        completedAt: DateTime.fromISO("2026-03-20T16:20:00", { zone: "utc" }),
        noteMarkdown: "Séance réelle ajoutée sans origine prévisionnelle.",
      })
      .create()

    await this.addLocalActualActivity(context, unplannedActualSession, 1, "Activité ajoutée sans origine planifiée")
  }

  private async copyPlannedActivityToActual(
    actualSession: ActualSession,
    plannedSessionActivity: PlannedSessionActivity,
    activityOrder: number,
    actualDurationMinutes = plannedSessionActivity.plannedDurationMinutes
  ) {
    await ActualSessionActivityFactory.client(this.client)
      .merge({
        actualSessionId: actualSession.id,
        activityId: plannedSessionActivity.activityId,
        plannedSessionActivityId: plannedSessionActivity.id,
        replacesPlannedSessionActivityId: null,
        activityTypeId: plannedSessionActivity.activityTypeId,
        localTitle: plannedSessionActivity.localTitle,
        localDescriptionMarkdown: plannedSessionActivity.localDescriptionMarkdown,
        activityOrder,
        actualDurationMinutes,
      })
      .create()
  }

  private async addLocalActualActivity(
    context: DemoWorkFileSeedContext,
    actualSession: ActualSession,
    activityOrder: number,
    localTitle: string,
    plannedSessionActivityToReplace: PlannedSessionActivity | null = null
  ) {
    await ActualSessionActivityFactory.client(this.client)
      .merge({
        actualSessionId: actualSession.id,
        activityId: null,
        plannedSessionActivityId: null,
        replacesPlannedSessionActivityId: plannedSessionActivityToReplace?.id ?? null,
        activityTypeId: context.activityTypes[3]!.id,
        localTitle,
        localDescriptionMarkdown: "Activité réelle locale saisie pendant le suivi de séance.",
        activityOrder,
        actualDurationMinutes: 25,
      })
      .create()
  }

  private async createActualSessionForPlanned(
    plannedSessionSet: PlannedSessionSet,
    attributes: {
      title: string
      sessionDate?: DateTime
      durationMinutes?: number
      state?: "draft" | "completed"
      noteMarkdown: string
    }
  ) {
    const state = attributes.state ?? "completed"
    const sessionDate = attributes.sessionDate ?? plannedSessionSet.session.sessionDate

    return ActualSessionFactory.client(this.client)
      .merge({
        classId: plannedSessionSet.session.classId,
        plannedSessionId: plannedSessionSet.session.id,
        mainChapterId: plannedSessionSet.session.mainChapterId,
        title: attributes.title,
        sessionDate,
        startTime: plannedSessionSet.session.startTime,
        durationMinutes: attributes.durationMinutes ?? plannedSessionSet.session.durationMinutes,
        sessionOrder: plannedSessionSet.session.sessionOrder,
        state,
        completedAt: state === "completed" ? dateTimeOnSessionDate(sessionDate, 18) : null,
        noteMarkdown: attributes.noteMarkdown,
      })
      .create()
  }
}
