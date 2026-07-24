import Activity from "#models/activity"
import Chapter from "#models/chapter"
import db from "@adonisjs/lucid/services/db"
import { DateTime } from "luxon"

export default class BulkUpdateActivitiesAction {
  async archive(levelId: string, activityIds: string[]) {
    await this.updateScope(levelId, activityIds, { archived_at: DateTime.utc().toSQL() })
  }
  async restore(levelId: string, activityIds: string[]) {
    await this.updateScope(levelId, activityIds, { archived_at: null })
  }
  async move(levelId: string, activityIds: string[], chapterId: string) {
    const chapter = await Chapter.query()
      .where("id", chapterId)
      .where("level_id", levelId)
      .whereNull("archived_at")
      .firstOrFail()
    const activities = await this.activitiesInScope(levelId, activityIds)
    await db.transaction(async (transaction) => {
      const result = await transaction
        .from("activities")
        .where("chapter_id", chapter.id)
        .max("display_order as maximum")
        .first()
      for (const [index, activity] of activities.entries())
        await transaction
          .from("activities")
          .where("id", activity.id)
          .update({ chapter_id: chapter.id, display_order: Number(result?.maximum ?? 0) + index + 1 })
    })
  }
  private async updateScope(levelId: string, activityIds: string[], values: Record<string, unknown>) {
    const activities = await this.activitiesInScope(levelId, activityIds)
    await db
      .from("activities")
      .whereIn(
        "id",
        activities.map(({ id }) => id)
      )
      .update(values)
  }
  private async activitiesInScope(levelId: string, activityIds: string[]) {
    if (!activityIds.length || new Set(activityIds).size !== activityIds.length)
      throw new Error("La sélection d’activités est invalide.")
    const activities = await Activity.query()
      .where("level_id", levelId)
      .whereIn("id", activityIds)
      .orderBy("chapter_id", "asc")
      .orderBy("display_order", "asc")
      .orderBy("title", "asc")
    if (activities.length !== activityIds.length) throw new Error("La sélection contient une activité hors du niveau.")
    return activities
  }
}
