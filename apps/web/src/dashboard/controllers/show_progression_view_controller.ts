import ShowProgressionViewAction from "#dashboard/actions/show_progression_view_action"
import ProgressionViewTransformer from "#dashboard/transformers/progression_view_transformer"
import { progressionViewValidator } from "#dashboard/validators/progression_view_validator"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import { DateTime } from "luxon"

@inject()
export default class ShowProgressionViewController {
  constructor(private showProgressionView: ShowProgressionViewAction) {}

  async render({ inertia, request }: HttpContext) {
    const { params } = await request.validateUsing(progressionViewValidator)
    const progressionView = await this.showProgressionView.execute(params.classId, DateTime.local().startOf("day"))

    return inertia.render("planning/progression_view", {
      progressionView: ProgressionViewTransformer.transform(progressionView),
    })
  }
}
