import Chapter from "#models/chapter"
import Level from "#models/level"
import Theme from "#models/theme"
import ThemeWorkspaceTransformer from "#themes/transformers/theme_workspace_transformer"
import type { HttpContext } from "@adonisjs/core/http"

export default class RenderThemeEditorController {
  async render({ inertia, params }: HttpContext) {
    const level = await Level.findOrFail(params.levelId)
    const theme = await Theme.query().where("id", params.themeId).where("level_id", level.id).firstOrFail()
    const count = await Chapter.query().where("theme_id", theme.id).count("id as total").first()

    return inertia.render("themes/edit", {
      level: { id: level.id, name: level.name },
      theme: ThemeWorkspaceTransformer.transform(theme, new Map([[theme.id, Number(count?.$extras.total ?? 0)]])),
    })
  }
}
