import RenderTeachingContentPageAction from "#teaching_content/actions/render_teaching_content_page_action"
import TeachingContentPageActivityTransformer from "#teaching_content/transformers/teaching_content_page_activity_transformer"
import TeachingContentPageActivityTypeTransformer from "#teaching_content/transformers/teaching_content_page_activity_type_transformer"
import TeachingContentPageChapterTransformer from "#teaching_content/transformers/teaching_content_page_chapter_transformer"
import TeachingContentPageLevelTransformer from "#teaching_content/transformers/teaching_content_page_level_transformer"
import TeachingContentPageSchoolYearTransformer from "#teaching_content/transformers/teaching_content_page_school_year_transformer"
import TeachingContentPageThemeTransformer from "#teaching_content/transformers/teaching_content_page_theme_transformer"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class TeachingContentController {
  constructor(private renderTeachingContentPage: RenderTeachingContentPageAction) {}

  async render({ inertia, params }: HttpContext) {
    const { level, schoolYear, themes, chapters, activityTypes, activities, activityCounts, chapterCountsByThemeId } =
      await this.renderTeachingContentPage.execute(params.levelId)
    const chaptersById = new Map(chapters.map((chapter) => [chapter.id, chapter]))
    const activityTypesById = new Map(activityTypes.map((activityType) => [activityType.id, activityType]))

    return inertia.render("teaching_content/show", {
      level: TeachingContentPageLevelTransformer.transform(level),
      schoolYear: TeachingContentPageSchoolYearTransformer.transform(schoolYear),
      themes: TeachingContentPageThemeTransformer.transform(themes, chapterCountsByThemeId),
      chapters: TeachingContentPageChapterTransformer.transform(
        chapters,
        new Map(themes.map((theme) => [theme.id, theme])),
        activityCounts
      ),
      activityTypes: TeachingContentPageActivityTypeTransformer.transform(activityTypes),
      activities: TeachingContentPageActivityTransformer.transform(activities, chaptersById, activityTypesById),
    })
  }
}
