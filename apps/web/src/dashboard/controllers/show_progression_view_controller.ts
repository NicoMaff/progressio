import ShowProgressionViewAction from "#dashboard/actions/show_progression_view_action"
import ShowSessionEditorAction from "#dashboard/actions/show_session_editor_action"
import ProgressionViewTransformer from "#dashboard/transformers/progression_view_transformer"
import SessionEditorTransformer from "#dashboard/transformers/session_editor_transformer"
import { progressionViewValidator } from "#dashboard/validators/progression_view_validator"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import { DateTime } from "luxon"

@inject()
export default class ShowProgressionViewController {
  constructor(
    private showProgressionView: ShowProgressionViewAction,
    private showSessionEditor: ShowSessionEditorAction
  ) {}

  async render({ inertia, request }: HttpContext) {
    const { params } = await request.validateUsing(progressionViewValidator)
    const progressionView = await this.showProgressionView.execute(params.classId, DateTime.local().startOf("day"))
    const query = request.qs()
    const sessionKind =
      query.sessionKind === "planned" || query.sessionKind === "actual" ? query.sessionKind : undefined
    const sessionEditor =
      sessionKind && typeof query.sessionId === "string"
        ? await this.showSessionEditor.execute(params.classId, sessionKind, query.sessionId)
        : undefined

    return inertia.render("planning/progression_view", {
      progressionView: ProgressionViewTransformer.transform(progressionView),
      sessionEditor: sessionEditor ? SessionEditorTransformer.transform(sessionEditor) : undefined,
    })
  }
}
