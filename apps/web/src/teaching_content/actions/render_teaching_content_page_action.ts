import Activity from "#models/activity"
import ActivityType from "#models/activity_type"
import Chapter from "#models/chapter"
import Level from "#models/level"
import SchoolYear from "#models/school_year"
import Theme from "#models/theme"

export default class RenderTeachingContentPageAction {
  async execute(levelId: string) {
    const level = await Level.findOrFail(levelId)
    const schoolYear = await SchoolYear.findOrFail(level.schoolYearId)
    const themes = await Theme.query()
      .where("level_id", level.id)
      .whereNull("archived_at")
      .orderBy("name", "asc")
      .orderBy("short_code", "asc")
    const chapters = await Chapter.query()
      .where("level_id", level.id)
      .whereNull("archived_at")
      .orderBy("name", "asc")
      .orderBy("short_code", "asc")
    const activityCounts = await this.countActiveActivitiesByChapter(chapters.map((chapter) => chapter.id))
    const chapterCountsByThemeId = this.countChaptersByThemeId(chapters)
    const activityTypes = await ActivityType.query()
      .where("school_year_id", schoolYear.id)
      .orderBy("display_order", "asc")
      .orderBy("name", "asc")
    const activities = await Activity.query()
      .where("level_id", level.id)
      .whereNull("archived_at")
      .orderBy("title", "asc")

    return { level, schoolYear, themes, chapters, activityTypes, activities, activityCounts, chapterCountsByThemeId }
  }

  private async countActiveActivitiesByChapter(chapterIds: string[]) {
    if (chapterIds.length === 0) {
      return new Map<string, number>()
    }

    const countRows = await Activity.query()
      .select("chapter_id")
      .whereIn("chapter_id", chapterIds)
      .whereNull("archived_at")
      .groupBy("chapter_id")
      .count("* as total")

    return new Map(countRows.map((row) => [row.chapterId!, Number(row.$extras.total)]))
  }

  private countChaptersByThemeId(chapters: Chapter[]) {
    const chapterCountsByThemeId = new Map<string, number>()

    for (const chapter of chapters) {
      if (!chapter.themeId) {
        continue
      }

      chapterCountsByThemeId.set(chapter.themeId, (chapterCountsByThemeId.get(chapter.themeId) ?? 0) + 1)
    }

    return chapterCountsByThemeId
  }
}
