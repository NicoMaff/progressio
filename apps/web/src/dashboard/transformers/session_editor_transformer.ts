import type { SessionEditor } from "#dashboard/actions/show_session_editor_action"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class SessionEditorTransformer extends BaseTransformer<SessionEditor> {
  toObject() {
    return this.resource
  }
}
