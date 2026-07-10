import CreateChapterAction from "#teaching_content/actions/create_chapter_action"
import { createChapterValidator } from "#teaching_content/validators/chapter_validator"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

@inject()
export default class CreateChapterController {
  constructor(private readonly createChapter: CreateChapterAction) {}

  async execute({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(createChapterValidator)

    await this.createChapter.execute(params.levelId, payload)
    session.flash("success", "Chapitre créé.")

    return response.redirect().back()
  }
}
