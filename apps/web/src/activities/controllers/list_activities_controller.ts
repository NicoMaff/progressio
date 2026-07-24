import ListActivitiesAction from "#activities/actions/list_activities_action"
import TeachingContentPageActivityTransformer from "#activities/transformers/teaching_content_page_activity_transformer"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class ListActivitiesController {
  constructor(private readonly listActivities: ListActivitiesAction) {}
  async render({ inertia, params }: HttpContext) {
    const { level, schoolYear, activities, chapters, activityTypes } = await this.listActivities.execute(params.levelId)
    return inertia.render("activities/list", {
      schoolYear: { label: schoolYear.label, subject: schoolYear.subject },
      level: { id: level.id, name: level.name, shortCode: level.shortCode },
      chapters: chapters.map(({ id, name, shortCode }) => ({ id, name, shortCode })),
      activities: TeachingContentPageActivityTransformer.transform(
        activities,
        new Map(chapters.map((chapter) => [chapter.id, chapter])),
        new Map(activityTypes.map((type) => [type.id, type]))
      ),
    })
  }
}
