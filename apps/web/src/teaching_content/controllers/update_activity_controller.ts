import UpdateActivityAction from "#teaching_content/actions/update_activity_action"
import { updateActivityValidator } from "#teaching_content/validators/activity_validator"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

@inject()
export default class UpdateActivityController {
  constructor(private readonly updateActivity: UpdateActivityAction) {}

  async execute({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(updateActivityValidator)

    await this.updateActivity.execute(params.levelId, params.activityId, payload)
    session.flash("success", "Activité mise à jour.")

    return response.redirect().back()
  }
}
