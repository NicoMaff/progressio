import SaveOrganisationAction from "#organisation/actions/save_organisation_action"
import { classValidator } from "#organisation/validators/organisation_validator"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class CreateClassController {
  constructor(private readonly saveOrganisation: SaveOrganisationAction) {}

  async execute({ request, response, session }: HttpContext) {
    const teachingClass = await this.saveOrganisation.createClass(await request.validateUsing(classValidator))
    session.flash("success", "Classe créée.")
    return response.redirect(`/organisation/classes?level=${teachingClass.levelId}`)
  }
}
