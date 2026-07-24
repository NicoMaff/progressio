import BulkUpdateActivitiesAction from "#activities/actions/bulk_update_activities_action"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import vine from "@vinejs/vine"
const validator = vine.create({
  action: vine.enum(["archive", "restore", "move"] as const),
  activityIds: vine.array(vine.string().uuid()).minLength(1),
  chapterId: vine.string().uuid().optional(),
})
@inject()
export default class BulkUpdateActivitiesController {
  constructor(private readonly bulkUpdate: BulkUpdateActivitiesAction) {}
  async execute({ request, params, response, session }: HttpContext) {
    const payload = await request.validateUsing(validator)
    if (payload.action === "move") {
      if (!payload.chapterId) throw new Error("Un chapitre est requis pour le déplacement.")
      await this.bulkUpdate.move(params.levelId, payload.activityIds, payload.chapterId)
    } else await this.bulkUpdate[payload.action](params.levelId, payload.activityIds)
    session.flash("success", "Activités mises à jour.")
    return response.redirect().back()
  }
}
