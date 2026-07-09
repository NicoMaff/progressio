import UpdateChapterAction from "../teaching_content/actions/update_chapter_action.js"
import {
  ChapterShortCodeAlreadyExistsError,
  ChapterShortCodeFormatError,
  ChapterThemeLevelMismatchError,
} from "../teaching_content/actions/chapter_input.js"
import { updateChapterValidator } from "../teaching_content/validators/chapter_validator.js"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

const chapterBusinessErrors = [
  ChapterShortCodeAlreadyExistsError,
  ChapterShortCodeFormatError,
  ChapterThemeLevelMismatchError,
]

@inject()
export default class TeachingContentUpdateChapterController {
  constructor(private readonly updateChapter: UpdateChapterAction) {}

  async execute({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(updateChapterValidator)

    try {
      await this.updateChapter.execute(params.levelId, params.chapterId, payload)
      session.flash("success", "Chapitre mis à jour.")
    } catch (error) {
      if (!chapterBusinessErrors.some((businessError) => error instanceof businessError)) {
        throw error
      }

      session.flash("error", (error as Error).message)
    }

    return response.redirect().back()
  }
}
