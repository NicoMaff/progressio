import Chapter from "#models/chapter"
import Theme from "#models/theme"
import db from "@adonisjs/lucid/services/db"
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

    return db.transaction(async (transaction) => {
      const result = await transaction
        .from("chapters")
        .where("level_id", levelId)
        .where((query) => (payload.themeId ? query.where("theme_id", payload.themeId) : query.whereNull("theme_id")))
        .max("display_order as maximum")
        .first()
      return Chapter.create(
        { levelId, displayOrder: Number(result?.maximum ?? 0) + 1, ...payload },
        { client: transaction }
      )
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
