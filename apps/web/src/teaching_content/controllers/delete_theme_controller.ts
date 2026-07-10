import DeleteThemeAction from "#teaching_content/actions/delete_theme_action"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class DeleteThemeController {
  constructor(private readonly deleteTheme: DeleteThemeAction) {}

  async execute({ params, response, session }: HttpContext) {
    await this.deleteTheme.execute(params.levelId, params.themeId)
    session.flash("success", "Thème supprimé.")

    return response.redirect().back()
  }
}
