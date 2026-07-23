import UpdateSessionAction, { type SessionInput } from "#dashboard/actions/update_session_action"
import { sessionParamsValidator, sessionUpdateValidator } from "#dashboard/validators/session_validator"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class UpdateSessionController {
  constructor(private updateSession: UpdateSessionAction) {}

  async execute({ request, response, session }: HttpContext) {
    const { params } = await request.validateUsing(sessionParamsValidator)
    const input = await request.validateUsing(sessionUpdateValidator)
    await this.updateSession.execute(params.classId, params.kind, params.sessionId, input as SessionInput)
    session.flash("success", "Séance mise à jour.")
    return response.redirect().back()
  }
}
