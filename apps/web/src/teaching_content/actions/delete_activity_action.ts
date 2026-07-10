import Activity from "#models/activity"
import ActualSessionActivity from "#models/actual_session_activity"
import PlannedSessionActivity from "#models/planned_session_activity"
import TemplateSessionActivity from "#models/template_session_activity"
import TeachingContentOperationError from "#teaching_content/exceptions/operation_error"

export class ActiveActivityDeletionError extends TeachingContentOperationError {
  constructor() {
    super("Archivez l’activité avant de la supprimer.")
    this.name = "ActiveActivityDeletionError"
  }
}

export class ActivityReferenceDeletionError extends TeachingContentOperationError {
  constructor() {
    super("Cette activité ne peut pas être supprimée car elle est utilisée dans une ou plusieurs séances.")
    this.name = "ActivityReferenceDeletionError"
  }
}

export default class DeleteActivityAction {
  async execute(levelId: string, activityId: string) {
    const activity = await Activity.query().where("id", activityId).where("level_id", levelId).firstOrFail()

    if (!activity.archivedAt) {
      throw new ActiveActivityDeletionError()
    }

    const [templateReference, plannedReference, actualReference] = await Promise.all([
      TemplateSessionActivity.query().where("activity_id", activity.id).first(),
      PlannedSessionActivity.query().where("activity_id", activity.id).first(),
      ActualSessionActivity.query().where("activity_id", activity.id).first(),
    ])
    if (templateReference || plannedReference || actualReference) {
      throw new ActivityReferenceDeletionError()
    }

    await activity.delete()
  }
}
