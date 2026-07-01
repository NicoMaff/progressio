import CreateThemeAction from "../teaching_content/actions/create_theme_action.js"
import { ThemeShortCodeAlreadyExistsError } from "../teaching_content/actions/theme_input.js"
import { createThemeValidator } from "../teaching_content/validators/theme_validator.js"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

@inject()
export default class TeachingContentCreateThemeController {
  constructor(private readonly createTheme: CreateThemeAction) {}

  async execute({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(createThemeValidator)

    try {
      await this.createTheme.execute(params.levelId, payload)
      session.flash("success", "Thème créé.")
    } catch (error) {
      if (!(error instanceof ThemeShortCodeAlreadyExistsError)) {
        throw error
      }

      session.flash("error", error.message)
    }

    return response.redirect().back()
  }
}
