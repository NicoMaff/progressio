import type Activity from "#models/activity"
import type ActivityType from "#models/activity_type"
import type Chapter from "#models/chapter"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class TeachingContentPageActivityTransformer extends BaseTransformer<Activity> {
  constructor(
    resource: Activity,
    private readonly chaptersById: Map<string, Chapter>,
    private readonly activityTypesById: Map<string, ActivityType>
  ) {
    super(resource)
  }

  toObject() {
    const chapter = this.resource.chapterId ? this.chaptersById.get(this.resource.chapterId) : null
    const activityType = this.activityTypesById.get(this.resource.activityTypeId)

    return {
      id: this.resource.id,
      title: this.resource.title,
      chapterId: this.resource.chapterId,
      chapter: chapter
        ? {
            id: chapter.id,
            name: chapter.name,
            shortCode: chapter.shortCode,
          }
        : null,
      activityTypeId: this.resource.activityTypeId,
      activityType: activityType
        ? {
            id: activityType.id,
            name: activityType.name,
            color: activityType.color,
          }
        : null,
      estimatedDurationMinutes: this.resource.estimatedDurationMinutes,
      archivedAt: this.resource.archivedAt?.toISO() ?? null,
      noteMarkdown: this.resource.noteMarkdown,
    }
  }
}
