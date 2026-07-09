import type Level from "#models/level"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class TeachingContentPageLevelTransformer extends BaseTransformer<Level> {
  toObject() {
    return {
      id: this.resource.id,
      name: this.resource.name,
      shortCode: this.resource.shortCode,
    }
  }
}
