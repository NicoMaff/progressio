import ReorderActivitiesAction from "#activities/actions/reorder_activities_action"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import vine from "@vinejs/vine"
const validator = vine.create({ chapterId: vine.string().uuid(), activityIds: vine.array(vine.string().uuid()) })
@inject()
export default class ReorderActivitiesController {
  constructor(private readonly reorderActivities: ReorderActivitiesAction) {}
  async execute({ request, params, response, session }: HttpContext) {
    const { chapterId, activityIds } = await request.validateUsing(validator)
    await this.reorderActivities.execute(params.levelId, chapterId, activityIds)
    session.flash("success", "Ordre des activités enregistré.")
    return response.redirect().back()
  }
}
