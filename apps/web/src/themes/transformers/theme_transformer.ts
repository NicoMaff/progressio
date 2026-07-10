import type Theme from "#models/theme"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class ThemeTransformer extends BaseTransformer<Theme> {
  toObject() {
    return this.pick(this.resource, [
      "id",
      "levelId",
      "name",
      "shortCode",
      "color",
      "noteMarkdown",
      "createdAt",
      "updatedAt",
    ])
  }
}
