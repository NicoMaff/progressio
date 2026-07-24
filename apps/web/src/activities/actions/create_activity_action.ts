import Activity from "#models/activity"
import ActivityType from "#models/activity_type"
import Chapter from "#models/chapter"
import Level from "#models/level"
import db from "@adonisjs/lucid/services/db"
import {
  ACTIVITY_ESTIMATED_DURATION_MAX_MINUTES,
  ActivityChapterLevelMismatchError,
  ActivityEstimatedDurationOutOfRangeError,
  ActivityTypeSchoolYearMismatchError,
  normalizeActivityInput,
  type ActivityInput,
  type NormalizedActivityInput,
} from "./activity_input.js"

export default class CreateActivityAction {
  async execute(levelId: string, input: ActivityInput) {
    const level = await Level.findOrFail(levelId)
    const payload = normalizeActivityInput(input)

    await this.ensureChapterBelongsToLevel(level.id, payload.chapterId)
    await this.ensureActivityTypeBelongsToSchoolYear(level.schoolYearId, payload.activityTypeId)
    this.ensureEstimatedDurationIsInRange(payload)

    return db.transaction(async (transaction) => {
      const result = payload.chapterId
        ? await transaction
            .from("activities")
            .where("chapter_id", payload.chapterId)
            .max("display_order as maximum")
            .first()
        : null

      return Activity.create(
        {
          levelId: level.id,
          displayOrder: payload.chapterId ? Number(result?.maximum ?? 0) + 1 : null,
          ...payload,
        },
        { client: transaction }
      )
    })
  }

  private async ensureChapterBelongsToLevel(levelId: string, chapterId: string | null) {
    if (!chapterId) {
      return
    }

    const chapter = await Chapter.query()
      .where("id", chapterId)
      .where("level_id", levelId)
      .whereNull("archived_at")
      .first()

    if (!chapter) {
      throw new ActivityChapterLevelMismatchError()
    }
  }

  private async ensureActivityTypeBelongsToSchoolYear(schoolYearId: string, activityTypeId: string) {
    const activityType = await ActivityType.query()
      .where("id", activityTypeId)
      .where("school_year_id", schoolYearId)
      .first()

    if (!activityType) {
      throw new ActivityTypeSchoolYearMismatchError()
    }
  }

  private ensureEstimatedDurationIsInRange(payload: NormalizedActivityInput) {
    if (
      payload.estimatedDurationMinutes !== null &&
      (payload.estimatedDurationMinutes <= 0 ||
        payload.estimatedDurationMinutes > ACTIVITY_ESTIMATED_DURATION_MAX_MINUTES)
    ) {
      throw new ActivityEstimatedDurationOutOfRangeError()
    }
  }
}
