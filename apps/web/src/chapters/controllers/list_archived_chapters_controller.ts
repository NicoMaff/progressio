import ListArchivedChaptersAction from "#chapters/actions/list_archived_chapters_action"
import ChapterWorkspaceTransformer from "#chapters/transformers/chapter_workspace_transformer"
import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"

@inject()
export default class ListArchivedChaptersController {
  constructor(private readonly listArchivedChapters: ListArchivedChaptersAction) {}

  async render({ inertia, params }: HttpContext) {
    const { level, chapters, themes } = await this.listArchivedChapters.execute(params.levelId)
    const themesById = new Map(themes.map((theme) => [theme.id, theme]))
    return inertia.render("chapters/archive", {
      level: { id: level.id, name: level.name, shortCode: level.shortCode },
      chapters: ChapterWorkspaceTransformer.transform(chapters, themesById),
    })
  }
}
