import Activity from "#models/activity"
import type ActivityType from "#models/activity_type"
import Chapter from "#models/chapter"
import type Level from "#models/level"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId, findSchoolYearIdForLevel, isMissing, nextSequence } from "#database/factories/helpers"
import { ActivityTypeFactory } from "#database/factories/activity_type_factory"
import { LevelFactory } from "#database/factories/level_factory"

export const ActivityFactory = factory
  .define(Activity, () => ({
    title: `Activité ${nextSequence()}`,
    estimatedDurationMinutes: 30,
    noteMarkdown: null,
    archivedAt: null,
  }))
  .before("create", async (_, activity, ctx) => {
    if (activity.levelId === undefined) {
      if (isMissing(activity.chapterId)) {
        activity.levelId = await createRelatedId<Level>(LevelFactory, ctx)
      } else {
        const chapter = await Chapter.findOrFail(activity.chapterId)
        activity.levelId = chapter.levelId
      }
    }

    activity.activityTypeId ??= await createRelatedId<ActivityType>(ActivityTypeFactory, ctx, {
      schoolYearId: await findSchoolYearIdForLevel(activity.levelId),
    })
  })
  .build()
