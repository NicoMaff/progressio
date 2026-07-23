import Chapter from "#models/chapter"
import Level from "#models/level"
import SchoolYear from "#models/school_year"
import Theme from "#models/theme"

export default class ListChaptersAction {
  async execute(levelId: string) {
    const level = await Level.findOrFail(levelId)
    const schoolYear = await SchoolYear.findOrFail(level.schoolYearId)
    const [themes, chapters] = await Promise.all([
      Theme.query().where("level_id", level.id).whereNull("archived_at").orderBy("display_order", "asc"),
      Chapter.query()
        .where("level_id", level.id)
        .whereNull("archived_at")
        .orderBy("theme_id", "asc")
        .orderBy("display_order", "asc"),
    ])

    return { level, schoolYear, themes, chapters }
  }
}
