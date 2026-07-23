import ListChaptersAction from "#chapters/actions/list_chapters_action"
import ChapterWorkspaceTransformer from "#chapters/transformers/chapter_workspace_transformer"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

@inject()
export default class ListChaptersController {
  constructor(private readonly listChapters: ListChaptersAction) {}

  async render({ inertia, params }: HttpContext) {
    const { level, schoolYear, themes, chapters } = await this.listChapters.execute(params.levelId)
    const themesById = new Map(themes.map((theme) => [theme.id, theme]))
    return inertia.render("chapters/index", {
      schoolYear: { id: schoolYear.id, label: schoolYear.label, subject: schoolYear.subject },
      level: { id: level.id, name: level.name, shortCode: level.shortCode },
      themes: themes.map((theme) => ({
        id: theme.id,
        name: theme.name,
        shortCode: theme.shortCode,
        color: theme.color,
      })),
      chapters: ChapterWorkspaceTransformer.transform(chapters, themesById),
    })
  }
}
