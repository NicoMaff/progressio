import UpdateActivityAction from "../teaching_content/actions/update_activity_action.js"
import {
  ActivityChapterLevelMismatchError,
  ActivityEstimatedDurationOutOfRangeError,
  ActivityTypeSchoolYearMismatchError,
} from "../teaching_content/actions/activity_input.js"
import { updateActivityValidator } from "../teaching_content/validators/activity_validator.js"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

const activityBusinessErrors = [
  ActivityChapterLevelMismatchError,
  ActivityEstimatedDurationOutOfRangeError,
  ActivityTypeSchoolYearMismatchError,
]

@inject()
export default class TeachingContentUpdateActivityController {
  constructor(private readonly updateActivity: UpdateActivityAction) {}

  async execute({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(updateActivityValidator)

    try {
      await this.updateActivity.execute(params.levelId, params.activityId, payload)
      session.flash("success", "Activité mise à jour.")
    } catch (error) {
      if (!activityBusinessErrors.some((businessError) => error instanceof businessError)) {
        throw error
      }

      session.flash("error", (error as Error).message)
    }

    return response.redirect().back()
  }
}
