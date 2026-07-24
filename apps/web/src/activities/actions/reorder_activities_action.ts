import Activity from "#models/activity"
import db from "@adonisjs/lucid/services/db"

export class InvalidActivityOrderError extends Error {
  constructor() {
    super("L’ordre des activités doit contenir exactement les activités actives du chapitre.")
  }
}

export default class ReorderActivitiesAction {
  async execute(levelId: string, chapterId: string, activityIds: string[]) {
    const activities = await Activity.query()
      .where("level_id", levelId)
      .where("chapter_id", chapterId)
      .whereNull("archived_at")
      .select("id")
    if (
      activityIds.length !== activities.length ||
      new Set(activityIds).size !== activityIds.length ||
      !activities.every(({ id }) => activityIds.includes(id))
    ) {
      throw new InvalidActivityOrderError()
    }
    await db.transaction(async (transaction) => {
      for (const [index, id] of activityIds.entries())
        await transaction
          .from("activities")
          .where("id", id)
          .update({ display_order: index + 1 })
    })
  }
}
