import ShowAnnualDashboardAction from "#dashboard/actions/show_annual_dashboard_action"
import AnnualDashboardTransformer from "#dashboard/transformers/annual_dashboard_transformer"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import { DateTime } from "luxon"

@inject()
export default class ShowAnnualDashboardController {
  constructor(private showAnnualDashboard: ShowAnnualDashboardAction) {}

  async render({ inertia }: HttpContext) {
    const dashboard = await this.showAnnualDashboard.execute(DateTime.local().startOf("day"))
    return inertia.render("home", { dashboard: AnnualDashboardTransformer.transform(dashboard) })
  }
}
