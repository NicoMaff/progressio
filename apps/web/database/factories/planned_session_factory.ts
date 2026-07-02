import PlannedSession from "#models/planned_session"
import type TeachingClass from "#models/class"
import factory from "@adonisjs/lucid/factories"
import { DateTime } from "luxon"
import { createRelatedId, nextSequence } from "#database/factories/helpers"
import { TeachingClassFactory } from "#database/factories/teaching_class_factory"

export const PlannedSessionFactory = factory
  .define(PlannedSession, () => ({
    title: `Séance planifiée ${nextSequence()}`,
    sessionDate: DateTime.fromISO("2025-09-08"),
    startTime: "08:00",
    durationMinutes: 55,
    sessionOrder: nextSequence(),
    outcome: null,
    outcomeReviewRequired: false,
    outcomeReviewedAt: null,
    noteMarkdown: null,
    recurringSlotId: null,
    templateSessionId: null,
    mainChapterId: null,
  }))
  .before("create", async (_, plannedSession, ctx) => {
    plannedSession.classId ??= await createRelatedId<TeachingClass>(TeachingClassFactory, ctx)
  })
  .build()
