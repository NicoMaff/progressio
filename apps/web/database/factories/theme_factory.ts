import type Level from "#models/level"
import Theme from "#models/theme"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId, nextSequence } from "#database/factories/helpers"
import { LevelFactory } from "#database/factories/level_factory"

export const ThemeFactory = factory
  .define(Theme, () => {
    const themeIndex = nextSequence()

    return {
      name: `Thème ${themeIndex}`,
      shortCode: `THE-${themeIndex}`,
      color: "#6366F1",
      noteMarkdown: null,
      archivedAt: null,
      displayOrder: themeIndex,
    }
  })
  .before("create", async (_, theme, ctx) => {
    theme.levelId ??= await createRelatedId<Level>(LevelFactory, ctx)
  })
  .build()
