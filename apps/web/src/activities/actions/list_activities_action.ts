import Activity from "#models/activity"
import ActivityType from "#models/activity_type"
import Chapter from "#models/chapter"
import Level from "#models/level"
import SchoolYear from "#models/school_year"

export default class ListActivitiesAction {
  async execute(levelId: string) {
    const level = await Level.findOrFail(levelId)
    const schoolYear = await SchoolYear.findOrFail(level.schoolYearId)
    const [activities, chapters, activityTypes] = await Promise.all([
      Activity.query()
        .where("level_id", levelId)
        .whereNull("archived_at")
        .orderBy("chapter_id", "asc")
        .orderBy("display_order", "asc")
        .orderBy("title", "asc"),
      Chapter.query().where("level_id", levelId).whereNull("archived_at").orderBy("display_order", "asc"),
      ActivityType.query().where("school_year_id", level.schoolYearId).orderBy("display_order", "asc"),
    ])
    return { level, schoolYear, activities, chapters, activityTypes }
  }
}
