import DeleteActivityAction from "#teaching_content/actions/delete_activity_action"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class DeleteActivityController {
  constructor(private readonly deleteActivity: DeleteActivityAction) {}

  async execute({ params, response, session }: HttpContext) {
    await this.deleteActivity.execute(params.levelId, params.activityId)
    session.flash("success", "Activité supprimée.")

    return response.redirect().back()
  }
}
