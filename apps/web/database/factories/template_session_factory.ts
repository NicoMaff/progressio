import Chapter from "#models/chapter"
import type TemplateProgression from "#models/template_progression"
import TemplateSession from "#models/template_session"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId, nextSequence } from "#database/factories/helpers"
import { TemplateProgressionFactory } from "#database/factories/template_progression_factory"

export const TemplateSessionFactory = factory
  .define(TemplateSession, () => ({
    title: `Séance modèle ${nextSequence()}`,
    sessionOrder: nextSequence(),
    plannedDurationMinutes: 55,
    noteMarkdown: null,
    mainChapterId: null,
  }))
  .before("create", async (_, templateSession, ctx) => {
    if (templateSession.templateProgressionId === undefined && templateSession.mainChapterId !== null) {
      const chapter = await Chapter.findOrFail(templateSession.mainChapterId)
      templateSession.templateProgressionId = await createRelatedId<TemplateProgression>(
        TemplateProgressionFactory,
        ctx,
        {
          levelId: chapter.levelId,
        }
      )
      return
    }

    templateSession.templateProgressionId ??= await createRelatedId<TemplateProgression>(
      TemplateProgressionFactory,
      ctx
    )
  })
  .build()
