import Level from "#models/level"
import TeachingContentPageLevelTransformer from "#teaching_content/transformers/teaching_content_page_level_transformer"
import type { HttpContext } from "@adonisjs/core/http"
export default class SelectActivitiesLevelController {
  async render({ inertia }: HttpContext) {
    return inertia.render("activities/select", {
      levels: TeachingContentPageLevelTransformer.transform(await Level.query().orderBy("name", "asc")),
    })
  }
}
