import type Activity from "#models/activity"
import type ActivityType from "#models/activity_type"
import type Chapter from "#models/chapter"
import type Level from "#models/level"
import type SchoolYear from "#models/school_year"
import type Theme from "#models/theme"
import TeachingContentPageActivityTransformer from "#teaching_content/transformers/teaching_content_page_activity_transformer"
import TeachingContentPageActivityTypeTransformer from "#teaching_content/transformers/teaching_content_page_activity_type_transformer"
import TeachingContentPageChapterTransformer from "#teaching_content/transformers/teaching_content_page_chapter_transformer"
import TeachingContentPageLevelTransformer from "#teaching_content/transformers/teaching_content_page_level_transformer"
import TeachingContentPageSchoolYearTransformer from "#teaching_content/transformers/teaching_content_page_school_year_transformer"
import TeachingContentPageThemeTransformer from "#teaching_content/transformers/teaching_content_page_theme_transformer"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class TeachingContentPageTransformer extends BaseTransformer<Level> {
  constructor(
    resource: Level,
    private readonly schoolYear: SchoolYear,
    private readonly themes: Theme[],
    private readonly chapters: Chapter[],
    private readonly activityTypes: ActivityType[],
    private readonly activities: Activity[],
    private readonly chapterCountsByThemeId: Map<string, number>,
    private readonly themesById: Map<string, Theme>,
    private readonly activityCounts: Map<string, number>,
    private readonly chaptersById: Map<string, Chapter>,
    private readonly activityTypesById: Map<string, ActivityType>
  ) {
    super(resource)
  }

  toObject() {
    return {
      level: TeachingContentPageLevelTransformer.transform(this.resource),
      schoolYear: TeachingContentPageSchoolYearTransformer.transform(this.schoolYear),
      themes: TeachingContentPageThemeTransformer.transform(this.themes, this.chapterCountsByThemeId),
      chapters: TeachingContentPageChapterTransformer.transform(this.chapters, this.themesById, this.activityCounts),
      activityTypes: TeachingContentPageActivityTypeTransformer.transform(this.activityTypes),
      activities: TeachingContentPageActivityTransformer.transform(
        this.activities,
        this.chaptersById,
        this.activityTypesById
      ),
    }
  }
}
