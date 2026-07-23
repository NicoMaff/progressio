import ListOrganisationAction from "#organisation/actions/list_organisation_action"
import LevelTransformer from "#organisation/transformers/level_transformer"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class ListLevelsController {
  constructor(private readonly listOrganisation: ListOrganisationAction) {}

  async render({ inertia }: HttpContext) {
    const { schoolYear, levels } = await this.listOrganisation.levels()
    return inertia.render("organisation/levels/show", {
      schoolYear: { label: schoolYear.label, subject: schoolYear.subject },
      levels: LevelTransformer.transform(levels),
    })
  }
}
