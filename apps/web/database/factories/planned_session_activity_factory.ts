import type Activity from "#models/activity"
import PlannedSession from "#models/planned_session"
import PlannedSessionActivity from "#models/planned_session_activity"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId, findLevelIdForClass, nextSequence } from "#database/factories/helpers"
import { ActivityFactory } from "#database/factories/activity_factory"
import { PlannedSessionFactory } from "#database/factories/planned_session_factory"

export const PlannedSessionActivityFactory = factory
  .define(PlannedSessionActivity, () => ({
    activityId: null,
    templateSessionActivityId: null,
    activityTypeId: null,
    localTitle: null,
    localDescriptionMarkdown: null,
    activityOrder: nextSequence(),
    plannedDurationMinutes: 20,
  }))
  .before("create", async (_, plannedSessionActivity, ctx) => {
    plannedSessionActivity.plannedSessionId ??= await createRelatedId<PlannedSession>(PlannedSessionFactory, ctx)

    if (plannedSessionActivity.activityId === null && plannedSessionActivity.activityTypeId === null) {
      const plannedSession = await PlannedSession.findOrFail(plannedSessionActivity.plannedSessionId)
      plannedSessionActivity.activityId = await createRelatedId<Activity>(ActivityFactory, ctx, {
        levelId: await findLevelIdForClass(plannedSession.classId),
      })
    }
  })
  .build()
