import Chapter from "#models/chapter"
import Level from "#models/level"
import SchoolYear from "#models/school_year"
import Theme from "#models/theme"

export default class ListArchivedThemesAction {
  async execute(levelId: string) {
    const level = await Level.findOrFail(levelId)
    const schoolYear = await SchoolYear.findOrFail(level.schoolYearId)
    const themes = await Theme.query().where("level_id", level.id).whereNotNull("archived_at").orderBy("name", "asc")

    const chapterCounts = await Chapter.query()
      .where("level_id", level.id)
      .whereIn(
        "theme_id",
        themes.map((theme) => theme.id)
      )
      .count("id as total")
      .groupBy("theme_id")
    const chapterCountsByThemeId = new Map(
      chapterCounts.map((count) => [count.$extras.theme_id, Number(count.$extras.total)])
    )

    return { level, schoolYear, themes, chapterCountsByThemeId }
  }
}
