import SaveOrganisationAction from "#organisation/actions/save_organisation_action"
import { levelValidator } from "#organisation/validators/organisation_validator"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class UpdateLevelController {
  constructor(private readonly saveOrganisation: SaveOrganisationAction) {}

  async execute({ params, request, response, session }: HttpContext) {
    await this.saveOrganisation.updateLevel(params.levelId, await request.validateUsing(levelValidator))
    session.flash("success", "Niveau mis à jour.")
    return response.redirect("/organisation/levels")
  }
}
