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

export default class CreateChapterAction {
  async execute(levelId: string, input: ChapterInput) {
    const payload = normalizeChapterInput(input)

    if (!CHAPTER_SHORT_CODE_PATTERN.test(payload.shortCode)) {
      throw new ChapterShortCodeFormatError()
    }

    await this.ensureThemeBelongsToLevel(levelId, payload.themeId)

    const existingChapter = await Chapter.query()
      .where("level_id", levelId)
      .where("short_code", payload.shortCode)
      .whereNull("archived_at")
      .first()

    if (existingChapter) {
      throw new ChapterShortCodeAlreadyExistsError()
    }

    return Chapter.create({
      levelId,
      ...payload,
    })
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
