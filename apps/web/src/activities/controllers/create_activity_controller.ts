import CreateActivityAction from "#activities/actions/create_activity_action"
import { createActivityValidator } from "#activities/validators/activity_validator"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

@inject()
export default class CreateActivityController {
  constructor(private readonly createActivity: CreateActivityAction) {}

  async execute({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(createActivityValidator)

    await this.createActivity.execute(params.levelId, payload)
    session.flash("success", "Activité créée.")

    return response.redirect().back()
  }
}
