import UpdateChapterAction from "#teaching_content/actions/update_chapter_action"
import { updateChapterValidator } from "#teaching_content/validators/chapter_validator"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

@inject()
export default class UpdateChapterController {
  constructor(private readonly updateChapter: UpdateChapterAction) {}

  async execute({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(updateChapterValidator)

    await this.updateChapter.execute(params.levelId, params.chapterId, payload)
    session.flash("success", "Chapitre mis à jour.")

    return response.redirect().back()
  }
}
