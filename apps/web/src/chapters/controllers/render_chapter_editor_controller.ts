import Chapter from "#models/chapter"
import Level from "#models/level"
import Theme from "#models/theme"
import ChapterWorkspaceTransformer from "#chapters/transformers/chapter_workspace_transformer"
import type { HttpContext } from "@adonisjs/core/http"

export default class RenderChapterEditorController {
  async render({ inertia, params }: HttpContext) {
    const level = await Level.findOrFail(params.levelId)
    const [chapter, themes] = await Promise.all([
      Chapter.query().where("id", params.chapterId).where("level_id", level.id).firstOrFail(),
      Theme.query().where("level_id", level.id).whereNull("archived_at").orderBy("display_order", "asc"),
    ])
    return inertia.render("chapters/edit", {
      level: { id: level.id, name: level.name },
      themes: themes.map((theme) => ({ id: theme.id, name: theme.name, shortCode: theme.shortCode })),
      chapter: ChapterWorkspaceTransformer.transform(chapter, new Map(themes.map((theme) => [theme.id, theme]))),
    })
  }
}
