import Chapter from "#models/chapter"
import Theme from "#models/theme"
import {
  CHAPTER_SHORT_CODE_PATTERN,
  ChapterShortCodeAlreadyExistsError,
  ChapterShortCodeFormatError,
  ChapterThemeLevelMismatchError,
  normalizeChapterInput,
  type ChapterInput,
} from "./chapter_input.js"

export default class UpdateChapterAction {
  async execute(levelId: string, chapterId: string, input: ChapterInput) {
    const chapter = await Chapter.query()
      .where("id", chapterId)
      .where("level_id", levelId)
      .whereNull("archived_at")
      .firstOrFail()
    const payload = normalizeChapterInput(input)

    if (!CHAPTER_SHORT_CODE_PATTERN.test(payload.shortCode)) {
      throw new ChapterShortCodeFormatError()
    }

    await this.ensureThemeBelongsToLevel(levelId, payload.themeId)

    const existingChapter = await Chapter.query()
      .where("level_id", levelId)
      .where("short_code", payload.shortCode)
      .whereNull("archived_at")
      .whereNot("id", chapter.id)
      .first()

    if (existingChapter) {
      throw new ChapterShortCodeAlreadyExistsError()
    }

    const previousThemeId = chapter.themeId
    chapter.merge(payload)
    if (previousThemeId !== payload.themeId) {
      const result = await Chapter.query()
        .where("level_id", levelId)
        .where((query) => (payload.themeId ? query.where("theme_id", payload.themeId) : query.whereNull("theme_id")))
        .max("display_order as maximum")
        .first()
      chapter.displayOrder = Number(result?.$extras.maximum ?? 0) + 1
    }
    await chapter.save()

    return chapter
  }

  private async ensureThemeBelongsToLevel(levelId: string, themeId: string | null) {
    if (!themeId) {
      return
    }

    const theme = await Theme.query().where("id", themeId).where("level_id", levelId).whereNull("archived_at").first()

    if (!theme) {
      throw new ChapterThemeLevelMismatchError()
    }
  }
}
