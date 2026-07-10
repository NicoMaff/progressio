import ArchiveActivityAction from "#teaching_content/actions/archive_activity_action"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class ArchiveActivityController {
  constructor(private readonly archiveActivity: ArchiveActivityAction) {}

  async execute({ params, response, session }: HttpContext) {
    await this.archiveActivity.execute(params.levelId, params.activityId)
    session.flash("success", "Activité archivée.")

    return response.redirect().back()
  }
}
