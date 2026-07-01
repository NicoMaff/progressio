import RenderTeachingContentPageAction from "#teaching_content/actions/render_teaching_content_page_action"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class TeachingContentController {
  constructor(private renderTeachingContentPage: RenderTeachingContentPageAction) {}

  async render({ inertia, params }: HttpContext) {
    const pageProps = await this.renderTeachingContentPage.execute(params.levelId)

    return inertia.render("teaching_content/show", pageProps)
  }
}
