import { Exception } from "@adonisjs/core/exceptions"
import type { HttpContext } from "@adonisjs/core/http"

export default class TeachingContentOperationError extends Exception {
  static status = 422
  static code = "E_TEACHING_CONTENT_OPERATION"

  async handle(error: TeachingContentOperationError, { response, session }: HttpContext) {
    session.flash("error", error.message)

    return response.redirect().back()
  }

  report() {}
}
