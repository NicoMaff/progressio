import CreateChapterAction from "../teaching_content/actions/create_chapter_action.js"
import {
  ChapterShortCodeAlreadyExistsError,
  ChapterShortCodeFormatError,
  ChapterThemeLevelMismatchError,
} from "../teaching_content/actions/chapter_input.js"
import { createChapterValidator } from "../teaching_content/validators/chapter_validator.js"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

const chapterBusinessErrors = [
  ChapterShortCodeAlreadyExistsError,
  ChapterShortCodeFormatError,
  ChapterThemeLevelMismatchError,
]

@inject()
export default class TeachingContentCreateChapterController {
  constructor(private readonly createChapter: CreateChapterAction) {}

  async execute({ request, response, params, session }: HttpContext) {
    const payload = await request.validateUsing(createChapterValidator)

    try {
      await this.createChapter.execute(params.levelId, payload)
      session.flash("success", "Chapitre créé.")
    } catch (error) {
      if (!chapterBusinessErrors.some((businessError) => error instanceof businessError)) {
        throw error
      }

      session.flash("error", (error as Error).message)
    }

    return response.redirect().back()
  }
}
