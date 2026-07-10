import RestoreThemeAction from "#teaching_content/actions/restore_theme_action"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class RestoreThemeController {
  constructor(private readonly restoreTheme: RestoreThemeAction) {}

  async execute({ params, response, session }: HttpContext) {
    await this.restoreTheme.execute(params.levelId, params.themeId)
    session.flash("success", "Thème restauré.")

    return response.redirect().back()
  }
}
