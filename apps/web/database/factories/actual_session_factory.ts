import ActualSession from "#models/actual_session"
import type TeachingClass from "#models/class"
import factory from "@adonisjs/lucid/factories"
import { DateTime } from "luxon"
import { createRelatedId, nextSequence } from "#database/factories/helpers"
import { TeachingClassFactory } from "#database/factories/teaching_class_factory"

export const ActualSessionFactory = factory
  .define(ActualSession, () => ({
    title: `Séance réalisée ${nextSequence()}`,
    sessionDate: DateTime.fromISO("2025-09-08"),
    startTime: "08:00",
    durationMinutes: 55,
    sessionOrder: nextSequence(),
    state: "completed",
    completedAt: DateTime.utc(),
    noteMarkdown: null,
    plannedSessionId: null,
    mainChapterId: null,
  }))
  .state("draft", (actualSession) => {
    actualSession.state = "draft"
    actualSession.completedAt = null
  })
  .before("create", async (_, actualSession, ctx) => {
    actualSession.classId ??= await createRelatedId<TeachingClass>(TeachingClassFactory, ctx)
  })
  .build()
