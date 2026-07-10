import UpdateThemeAction from "#teaching_content/actions/update_theme_action"
import { updateThemeValidator } from "#teaching_content/validators/theme_validator"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

@inject()
export default class UpdateThemeController {
  constructor(private readonly updateTheme: UpdateThemeAction) {}

  async execute({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(updateThemeValidator)

    await this.updateTheme.execute(params.levelId, params.themeId, payload)
    session.flash("success", "Thème mis à jour.")

    return response.redirect().back()
  }
}
