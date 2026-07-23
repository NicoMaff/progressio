import ReorderThemesAction from "#themes/actions/reorder_themes_action"
import vine from "@vinejs/vine"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

const reorderThemesValidator = vine.create({ themeIds: vine.array(vine.string().uuid()) })

@inject()
export default class ReorderThemesController {
  constructor(private readonly reorderThemes: ReorderThemesAction) {}

  async execute({ params, request, response, session }: HttpContext) {
    const { themeIds } = await request.validateUsing(reorderThemesValidator)
    await this.reorderThemes.execute(params.levelId, themeIds)
    session.flash("success", "Ordre pédagogique des thèmes mis à jour.")

    return response.redirect().back()
  }
}
