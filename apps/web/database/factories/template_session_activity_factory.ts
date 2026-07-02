import type Activity from "#models/activity"
import TemplateProgression from "#models/template_progression"
import TemplateSession from "#models/template_session"
import TemplateSessionActivity from "#models/template_session_activity"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId, nextSequence } from "#database/factories/helpers"
import { ActivityFactory } from "#database/factories/activity_factory"
import { TemplateSessionFactory } from "#database/factories/template_session_factory"

export const TemplateSessionActivityFactory = factory
  .define(TemplateSessionActivity, () => ({
    activityId: null,
    activityTypeId: null,
    localTitle: null,
    localDescriptionMarkdown: null,
    activityOrder: nextSequence(),
    plannedDurationMinutes: 20,
  }))
  .before("create", async (_, templateSessionActivity, ctx) => {
    templateSessionActivity.templateSessionId ??= await createRelatedId<TemplateSession>(TemplateSessionFactory, ctx)

    if (templateSessionActivity.activityId === null && templateSessionActivity.activityTypeId === null) {
      const templateSession = await TemplateSession.findOrFail(templateSessionActivity.templateSessionId)
      const templateProgression = await TemplateProgression.findOrFail(templateSession.templateProgressionId)
      templateSessionActivity.activityId = await createRelatedId<Activity>(ActivityFactory, ctx, {
        levelId: templateProgression.levelId,
      })
    }
  })
  .build()
