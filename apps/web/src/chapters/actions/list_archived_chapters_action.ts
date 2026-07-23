import Chapter from "#models/chapter"
import Level from "#models/level"
import Theme from "#models/theme"

export default class ListArchivedChaptersAction {
  async execute(levelId: string) {
    const level = await Level.findOrFail(levelId)
    const [chapters, themes] = await Promise.all([
      Chapter.query().where("level_id", level.id).whereNotNull("archived_at").orderBy("name", "asc"),
      Theme.query().where("level_id", level.id),
    ])

    return { level, chapters, themes }
  }
}
