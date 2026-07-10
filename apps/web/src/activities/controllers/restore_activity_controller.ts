import RestoreActivityAction from "#activities/actions/restore_activity_action"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class RestoreActivityController {
  constructor(private readonly restoreActivity: RestoreActivityAction) {}

  async execute({ params, response, session }: HttpContext) {
    await this.restoreActivity.execute(params.levelId, params.activityId)
    session.flash("success", "Activité restaurée.")

    return response.redirect().back()
  }
}
