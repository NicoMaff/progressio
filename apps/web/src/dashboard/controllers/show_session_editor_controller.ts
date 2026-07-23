import ShowSessionEditorAction from "#dashboard/actions/show_session_editor_action"
import SessionEditorTransformer from "#dashboard/transformers/session_editor_transformer"
import { sessionParamsValidator } from "#dashboard/validators/session_validator"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class ShowSessionEditorController {
  constructor(private showSessionEditor: ShowSessionEditorAction) {}

  async render({ inertia, request }: HttpContext) {
    const { params } = await request.validateUsing(sessionParamsValidator)
    const sessionEditor = await this.showSessionEditor.execute(params.classId, params.kind, params.sessionId)
    return inertia.render("planning/session_editor", {
      sessionEditor: SessionEditorTransformer.transform(sessionEditor),
    })
  }
}
