import ListArchivedThemesAction from "#themes/actions/list_archived_themes_action"
import ThemeWorkspaceTransformer from "#themes/transformers/theme_workspace_transformer"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class ListArchivedThemesController {
  constructor(private readonly listArchivedThemes: ListArchivedThemesAction) {}

  async render({ inertia, params }: HttpContext) {
    const { level, themes, chapterCountsByThemeId } = await this.listArchivedThemes.execute(params.levelId)

    return inertia.render("themes/archive", {
      level: { id: level.id, name: level.name, shortCode: level.shortCode },
      themes: ThemeWorkspaceTransformer.transform(themes, chapterCountsByThemeId),
    })
  }
}
