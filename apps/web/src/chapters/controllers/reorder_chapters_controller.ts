import ReorderChaptersAction from "#chapters/actions/reorder_chapters_action"
import vine from "@vinejs/vine"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

const reorderChaptersValidator = vine.create({
  themeId: vine.string().uuid().nullable(),
  chapterIds: vine.array(vine.string().uuid()),
})

@inject()
export default class ReorderChaptersController {
  constructor(private readonly reorderChapters: ReorderChaptersAction) {}

  async execute({ request, response, params, session }: HttpContext) {
    const { themeId, chapterIds } = await request.validateUsing(reorderChaptersValidator)
    await this.reorderChapters.execute(params.levelId, themeId, chapterIds)
    session.flash("success", "Ordre des chapitres enregistré.")
    return response.redirect().back()
  }
}
