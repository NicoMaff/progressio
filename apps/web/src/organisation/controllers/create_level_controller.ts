import SaveOrganisationAction from "#organisation/actions/save_organisation_action"
import { levelValidator } from "#organisation/validators/organisation_validator"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class CreateLevelController {
  constructor(private readonly saveOrganisation: SaveOrganisationAction) {}

  async execute({ request, response, session }: HttpContext) {
    await this.saveOrganisation.createLevel(await request.validateUsing(levelValidator))
    session.flash("success", "Niveau créé.")
    return response.redirect("/organisation/levels")
  }
}
