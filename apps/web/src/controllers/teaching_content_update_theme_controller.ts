import UpdateThemeAction from "../teaching_content/actions/update_theme_action.js"
import { ThemeShortCodeAlreadyExistsError } from "../teaching_content/actions/theme_input.js"
import { updateThemeValidator } from "../teaching_content/validators/theme_validator.js"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

@inject()
export default class TeachingContentUpdateThemeController {
  constructor(private readonly updateTheme: UpdateThemeAction) {}

  async execute({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(updateThemeValidator)

    try {
      await this.updateTheme.execute(params.levelId, params.themeId, payload)
      session.flash("success", "Thème mis à jour.")
    } catch (error) {
      if (!(error instanceof ThemeShortCodeAlreadyExistsError)) {
        throw error
      }

      session.flash("error", error.message)
    }

    return response.redirect().back()
  }
}
