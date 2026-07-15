import RenderAnnualDashboardAction from "#dashboard/actions/render_annual_dashboard_action"
import AnnualDashboardTransformer from "#dashboard/transformers/annual_dashboard_transformer"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import { DateTime } from "luxon"

@inject()
export default class RenderAnnualDashboardController {
  constructor(private renderAnnualDashboard: RenderAnnualDashboardAction) {}

  async render({ inertia }: HttpContext) {
    const dashboard = await this.renderAnnualDashboard.execute(DateTime.local().startOf("day"))
    return inertia.render("home", { dashboard: AnnualDashboardTransformer.transform(dashboard) })
  }
}
