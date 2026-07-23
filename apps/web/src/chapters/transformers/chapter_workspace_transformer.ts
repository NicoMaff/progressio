import type Chapter from "#models/chapter"
import type Theme from "#models/theme"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class ChapterWorkspaceTransformer extends BaseTransformer<Chapter> {
  constructor(
    resource: Chapter,
    private readonly themesById: Map<string, Theme>
  ) {
    super(resource)
  }

  toObject() {
    const theme = this.resource.themeId ? this.themesById.get(this.resource.themeId) : null
    return {
      id: this.resource.id,
      name: this.resource.name,
      shortCode: this.resource.shortCode,
      themeId: this.resource.themeId,
      theme: theme ? { id: theme.id, name: theme.name, shortCode: theme.shortCode, color: theme.color } : null,
      noteMarkdown: this.resource.noteMarkdown,
      displayOrder: this.resource.displayOrder,
      archivedAt: this.resource.archivedAt?.toISO() ?? null,
    }
  }
}
