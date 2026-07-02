import type Level from "#models/level"
import TemplateProgression from "#models/template_progression"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId, nextSequence } from "#database/factories/helpers"
import { LevelFactory } from "#database/factories/level_factory"

export const TemplateProgressionFactory = factory
  .define(TemplateProgression, () => ({
    name: `Progression ${nextSequence()}`,
  }))
  .before("create", async (_, templateProgression, ctx) => {
    templateProgression.levelId ??= await createRelatedId<Level>(LevelFactory, ctx)
  })
  .build()
