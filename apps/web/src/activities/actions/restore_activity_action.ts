import TeachingContentOperationError from "#teaching_content/exceptions/operation_error"
import Activity from "#models/activity"
import Chapter from "#models/chapter"

export class ArchivedChapterBlocksActivityRestoreError extends TeachingContentOperationError {
  constructor() {
    super("Cette activité ne peut pas être restaurée tant que son chapitre est archivé.")
  }
}

export default class RestoreActivityAction {
  async execute(levelId: string, activityId: string) {
    const activity = await Activity.query().where("id", activityId).where("level_id", levelId).firstOrFail()

    if (!activity.archivedAt) {
      return activity
    }

    if (activity.chapterId) {
      const archivedChapter = await Chapter.query().where("id", activity.chapterId).whereNotNull("archived_at").first()
      if (archivedChapter) {
        throw new ArchivedChapterBlocksActivityRestoreError()
      }
    }

    activity.archivedAt = null
    await activity.save()

    return activity
  }
}
