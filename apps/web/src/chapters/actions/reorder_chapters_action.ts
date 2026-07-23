import Chapter from "#models/chapter"
import db from "@adonisjs/lucid/services/db"

export class InvalidChapterOrderError extends Error {
  constructor() {
    super("L’ordre des chapitres doit contenir exactement les chapitres actifs du groupe.")
    this.name = "InvalidChapterOrderError"
  }
}

export default class ReorderChaptersAction {
  async execute(levelId: string, themeId: string | null, chapterIds: string[]) {
    const query = Chapter.query().where("level_id", levelId).whereNull("archived_at")
    themeId === null ? query.whereNull("theme_id") : query.where("theme_id", themeId)
    const chapters = await query.select("id")

    if (
      chapterIds.length !== chapters.length ||
      new Set(chapterIds).size !== chapterIds.length ||
      !chapters.every((chapter) => chapterIds.includes(chapter.id))
    ) {
      throw new InvalidChapterOrderError()
    }

    await db.transaction(async (transaction) => {
      for (const [index, chapterId] of chapterIds.entries()) {
        await transaction
          .from("chapters")
          .where("id", chapterId)
          .update({ display_order: -(index + 1) })
      }
      for (const [index, chapterId] of chapterIds.entries()) {
        await transaction
          .from("chapters")
          .where("id", chapterId)
          .update({ display_order: index + 1 })
      }
    })
  }
}
