import type Theme from "#models/theme"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class TeachingContentPageThemeTransformer extends BaseTransformer<Theme> {
  constructor(
    resource: Theme,
    private readonly chapterCountsByThemeId: Map<string, number>
  ) {
    super(resource)
  }

  toObject() {
    return {
      id: this.resource.id,
      name: this.resource.name,
      shortCode: this.resource.shortCode,
      color: this.resource.color,
      archivedAt: this.resource.archivedAt?.toISO() ?? null,
      chapterCount: this.chapterCountsByThemeId.get(this.resource.id) ?? 0,
    }
  }
}
