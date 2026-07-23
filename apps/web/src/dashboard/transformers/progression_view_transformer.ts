import type { ProgressionView } from "#dashboard/actions/show_progression_view_action"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class ProgressionViewTransformer extends BaseTransformer<ProgressionView> {
  toObject() {
    return this.resource
  }
}
