import CreateThemeAction from "#teaching_content/actions/create_theme_action"
import { createThemeValidator } from "#teaching_content/validators/theme_validator"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

@inject()
export default class CreateThemeController {
  constructor(private readonly createTheme: CreateThemeAction) {}

  async execute({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(createThemeValidator)

    await this.createTheme.execute(params.levelId, payload)
    session.flash("success", "Thème créé.")

    return response.redirect().back()
  }
}
