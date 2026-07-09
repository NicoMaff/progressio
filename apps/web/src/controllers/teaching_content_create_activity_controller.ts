import CreateActivityAction from "../teaching_content/actions/create_activity_action.js"
import {
  ActivityChapterLevelMismatchError,
  ActivityEstimatedDurationOutOfRangeError,
  ActivityTypeSchoolYearMismatchError,
} from "../teaching_content/actions/activity_input.js"
import { createActivityValidator } from "../teaching_content/validators/activity_validator.js"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

const activityBusinessErrors = [
  ActivityChapterLevelMismatchError,
  ActivityEstimatedDurationOutOfRangeError,
  ActivityTypeSchoolYearMismatchError,
]

@inject()
export default class TeachingContentCreateActivityController {
  constructor(private readonly createActivity: CreateActivityAction) {}

  async execute({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(createActivityValidator)

    try {
      await this.createActivity.execute(params.levelId, payload)
      session.flash("success", "Activité créée.")
    } catch (error) {
      if (!activityBusinessErrors.some((businessError) => error instanceof businessError)) {
        throw error
      }

      session.flash("error", (error as Error).message)
    }

    return response.redirect().back()
  }
}
