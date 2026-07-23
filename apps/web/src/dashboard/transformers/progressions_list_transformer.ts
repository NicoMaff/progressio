import type { ProgressionsList } from "#dashboard/actions/list_progressions_action"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class ProgressionsListTransformer extends BaseTransformer<ProgressionsList> {
  toObject() {
    return this.resource
  }
}
