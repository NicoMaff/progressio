import Activity from "#models/activity"
import { DateTime } from "luxon"

export default class ArchiveActivityAction {
  async execute(levelId: string, activityId: string) {
    const activity = await Activity.query().where("id", activityId).where("level_id", levelId).firstOrFail()

    if (!activity.archivedAt) {
      activity.archivedAt = DateTime.utc()
      await activity.save()
    }

    return activity
  }
}
