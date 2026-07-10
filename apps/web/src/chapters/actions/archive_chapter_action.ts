import Chapter from "#models/chapter"
import { DateTime } from "luxon"

export default class ArchiveChapterAction {
  async execute(levelId: string, chapterId: string) {
    const chapter = await Chapter.query().where("id", chapterId).where("level_id", levelId).firstOrFail()

    if (!chapter.archivedAt) {
      chapter.archivedAt = DateTime.utc()
      await chapter.save()
    }

    return chapter
  }
}
