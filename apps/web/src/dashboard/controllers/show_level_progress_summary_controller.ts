import RenderLevelProgressSummaryAction from "#dashboard/actions/render_level_progress_summary_action"
import LevelProgressSummaryTransformer from "#dashboard/transformers/level_progress_summary_transformer"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class ShowLevelProgressSummaryController {
  constructor(private renderLevelProgressSummary: RenderLevelProgressSummaryAction) {}

  async render({ inertia, params }: HttpContext) {
    const levelProgressSummary = await this.renderLevelProgressSummary.execute(params.levelId)

    return inertia.render("dashboard/level_progress_summary", {
      levelProgressSummary: LevelProgressSummaryTransformer.transform(
        levelProgressSummary.level,
        levelProgressSummary.schoolYear
      ),
    })
  }
}
