import ArchiveThemeAction from "#teaching_content/actions/archive_theme_action"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class ArchiveThemeController {
  constructor(private readonly archiveTheme: ArchiveThemeAction) {}

  async execute({ params, response, session }: HttpContext) {
    await this.archiveTheme.execute(params.levelId, params.themeId)
    session.flash("success", "Thème archivé.")

    return response.redirect().back()
  }
}
