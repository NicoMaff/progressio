import ListProgressionsAction from "#dashboard/actions/list_progressions_action"
import ProgressionsListTransformer from "#dashboard/transformers/progressions_list_transformer"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class ListProgressionsController {
  constructor(private listProgressions: ListProgressionsAction) {}

  async render({ inertia }: HttpContext) {
    const progressionsList = await this.listProgressions.execute()

    return inertia.render("planning/list_progressions", {
      progressionsList: ProgressionsListTransformer.transform(progressionsList),
    })
  }
}
