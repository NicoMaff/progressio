import ArchiveChapterAction from "#teaching_content/actions/archive_chapter_action"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class ArchiveChapterController {
  constructor(private readonly archiveChapter: ArchiveChapterAction) {}

  async execute({ params, response, session }: HttpContext) {
    await this.archiveChapter.execute(params.levelId, params.chapterId)
    session.flash("success", "Chapitre archivé.")

    return response.redirect().back()
  }
}
