import ListActiveThemesAction from "#themes/actions/list_active_themes_action"
import ThemeTransformer from "#themes/transformers/theme_transformer"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

@inject()
export default class ListThemesController {
  constructor(private readonly listActiveThemes: ListActiveThemesAction) {}

  async render({ inertia, params }: HttpContext) {
    const { level, schoolYear, themes } = await this.listActiveThemes.execute(params.levelId)

    return inertia.render("themes/index", {
      schoolYear: {
        id: schoolYear.id,
        label: schoolYear.label,
        subject: schoolYear.subject,
      },
      level: {
        id: level.id,
        name: level.name,
        shortCode: level.shortCode,
      },
      themes: ThemeTransformer.transform(themes),
    })
  }
}
