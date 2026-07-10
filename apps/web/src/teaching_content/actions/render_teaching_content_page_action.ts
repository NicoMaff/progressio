import Activity from "#models/activity"
import ActivityType from "#models/activity_type"
import Chapter from "#models/chapter"
import Level from "#models/level"
import SchoolYear from "#models/school_year"
import Theme from "#models/theme"

export const teachingContentArchiveFilters = ["active", "archived", "all"] as const
export type TeachingContentArchiveFilter = (typeof teachingContentArchiveFilters)[number]

export default class RenderTeachingContentPageAction {
  async execute(levelId: string, archiveFilter: TeachingContentArchiveFilter = "active") {
    const level = await Level.findOrFail(levelId)
    const schoolYear = await SchoolYear.findOrFail(level.schoolYearId)
    const themesQuery = Theme.query().where("level_id", level.id).orderBy("short_code", "asc").orderBy("name", "asc")
    const chaptersQuery = Chapter.query()
      .where("level_id", level.id)
      .orderBy("short_code", "asc")
      .orderBy("name", "asc")
    const activitiesQuery = Activity.query().where("level_id", level.id).orderBy("title", "asc")

    this.applyArchiveFilter(themesQuery, archiveFilter)
    this.applyArchiveFilter(chaptersQuery, archiveFilter)
    this.applyArchiveFilter(activitiesQuery, archiveFilter)

    const [themes, chapters, activities, allThemes, allChapters] = await Promise.all([
      themesQuery,
      chaptersQuery,
      activitiesQuery,
      Theme.query().where("level_id", level.id),
      Chapter.query().where("level_id", level.id),
    ])
    const activityCounts = await this.countActivitiesByChapter(
      chapters.map((chapter) => chapter.id),
      archiveFilter
    )
    const chapterCountsByThemeId = this.countChaptersByThemeId(chapters)
    const activityTypes = await ActivityType.query()
      .where("school_year_id", schoolYear.id)
      .orderBy("display_order", "asc")
      .orderBy("name", "asc")

    return {
      level,
      schoolYear,
      archiveFilter,
      themes,
      chapters,
      activityTypes,
      activities,
      activityCounts,
      chapterCountsByThemeId,
      themesById: new Map(allThemes.map((theme) => [theme.id, theme])),
      chaptersById: new Map(allChapters.map((chapter) => [chapter.id, chapter])),
    }
  }

  private applyArchiveFilter(
    query: { whereNull(column: string): unknown; whereNotNull(column: string): unknown },
    archiveFilter: TeachingContentArchiveFilter
  ) {
    if (archiveFilter === "active") {
      query.whereNull("archived_at")
    } else if (archiveFilter === "archived") {
      query.whereNotNull("archived_at")
    }
  }

  private async countActivitiesByChapter(chapterIds: string[], archiveFilter: TeachingContentArchiveFilter) {
    if (chapterIds.length === 0) {
      return new Map<string, number>()
    }

    const countQuery = Activity.query()
      .select("chapter_id")
      .whereIn("chapter_id", chapterIds)
      .groupBy("chapter_id")
      .count("* as total")
    this.applyArchiveFilter(countQuery, archiveFilter)
    const countRows = await countQuery

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
