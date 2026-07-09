import type ActivityType from "#models/activity_type"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class TeachingContentPageActivityTypeTransformer extends BaseTransformer<ActivityType> {
  toObject() {
    return {
      id: this.resource.id,
      name: this.resource.name,
      color: this.resource.color,
      displayOrder: this.resource.displayOrder,
    }
  }
}
