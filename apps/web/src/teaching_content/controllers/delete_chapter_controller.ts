import DeleteChapterAction from "#teaching_content/actions/delete_chapter_action"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class DeleteChapterController {
  constructor(private readonly deleteChapter: DeleteChapterAction) {}

  async execute({ params, response, session }: HttpContext) {
    await this.deleteChapter.execute(params.levelId, params.chapterId)
    session.flash("success", "Chapitre supprimé.")

    return response.redirect().back()
  }
}
