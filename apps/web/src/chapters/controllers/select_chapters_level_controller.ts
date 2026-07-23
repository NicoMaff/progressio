import Level from "#models/level"
import TeachingContentPageLevelTransformer from "#teaching_content/transformers/teaching_content_page_level_transformer"
import type { HttpContext } from "@adonisjs/core/http"

export default class SelectChaptersLevelController {
  async render({ inertia }: HttpContext) {
    const levels = await Level.query().orderBy("name", "asc")
    return inertia.render("chapters/select_level", { levels: TeachingContentPageLevelTransformer.transform(levels) })
  }
}
