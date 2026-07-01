import Level from "#models/level"
import SchoolYear from "#models/school_year"
import Theme from "#models/theme"

export default class ListActiveThemesAction {
  async execute(levelId: string) {
    const level = await Level.findOrFail(levelId)
    const schoolYear = await SchoolYear.findOrFail(level.schoolYearId)
    const themes = await Theme.query()
      .where("level_id", level.id)
      .whereNull("archived_at")
      .orderBy("name", "asc")
      .orderBy("short_code", "asc")

    return { level, schoolYear, themes }
  }
}
