import Chapter from "#models/chapter"
import type Level from "#models/level"
import Theme from "#models/theme"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId, isMissing, nextSequence } from "#database/factories/helpers"
import { LevelFactory } from "#database/factories/level_factory"

export const ChapterFactory = factory
  .define(Chapter, () => {
    const chapterIndex = nextSequence()

    return {
      name: `Chapitre ${chapterIndex}`,
      shortCode: `CH-${chapterIndex}`,
      noteMarkdown: null,
      archivedAt: null,
      displayOrder: chapterIndex,
    }
  })
  .before("create", async (_, chapter, ctx) => {
    if (chapter.levelId !== undefined) {
      return
    }

    if (isMissing(chapter.themeId)) {
      chapter.levelId = await createRelatedId<Level>(LevelFactory, ctx)
      return
    }

    const theme = await Theme.findOrFail(chapter.themeId)
    chapter.levelId = theme.levelId
  })
  .build()
