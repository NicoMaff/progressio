import WorkFileContext from "#work_files/services/work_file_context"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import type { NextFn } from "@adonisjs/core/types/http"

@inject()
export default class WorkFileRequiredMiddleware {
  constructor(private workFileContext: WorkFileContext) {}

  async handle({ response, session }: HttpContext, next: NextFn) {
    if (!this.workFileContext.isOpen()) {
      session.flash("error", "Ouvrez ou créez un Work File pour accéder aux données de planification.")
      return response.redirect().toRoute("home")
    }

    return next()
  }
}
