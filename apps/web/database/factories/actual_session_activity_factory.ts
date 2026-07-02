import type Activity from "#models/activity"
import ActualSession from "#models/actual_session"
import ActualSessionActivity from "#models/actual_session_activity"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId, findLevelIdForClass, nextSequence } from "#database/factories/helpers"
import { ActivityFactory } from "#database/factories/activity_factory"
import { ActualSessionFactory } from "#database/factories/actual_session_factory"

export const ActualSessionActivityFactory = factory
  .define(ActualSessionActivity, () => ({
    activityId: null,
    plannedSessionActivityId: null,
    replacesPlannedSessionActivityId: null,
    activityTypeId: null,
    localTitle: null,
    localDescriptionMarkdown: null,
    activityOrder: nextSequence(),
    actualDurationMinutes: 20,
  }))
  .before("create", async (_, actualSessionActivity, ctx) => {
    actualSessionActivity.actualSessionId ??= await createRelatedId<ActualSession>(ActualSessionFactory, ctx)

    if (actualSessionActivity.activityId === null && actualSessionActivity.activityTypeId === null) {
      const actualSession = await ActualSession.findOrFail(actualSessionActivity.actualSessionId)
      actualSessionActivity.activityId = await createRelatedId<Activity>(ActivityFactory, ctx, {
        levelId: await findLevelIdForClass(actualSession.classId),
      })
    }
  })
  .build()
