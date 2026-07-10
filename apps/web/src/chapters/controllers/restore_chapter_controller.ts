import RestoreChapterAction from "#chapters/actions/restore_chapter_action"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class RestoreChapterController {
  constructor(private readonly restoreChapter: RestoreChapterAction) {}

  async execute({ params, response, session }: HttpContext) {
    await this.restoreChapter.execute(params.levelId, params.chapterId)
    session.flash("success", "Chapitre restauré.")

    return response.redirect().back()
  }
}
