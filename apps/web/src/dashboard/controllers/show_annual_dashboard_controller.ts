import ShowAnnualDashboardAction from "#dashboard/actions/show_annual_dashboard_action"
import TeachingClass from "#models/class"
import PlannedSession from "#models/planned_session"
import SchoolYear from "#models/school_year"
import Level from "#models/level"
import AnnualDashboardTransformer from "#dashboard/transformers/annual_dashboard_transformer"
import WorkFileContext from "#work_files/services/work_file_context"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"
import { DateTime } from "luxon"

@inject()
export default class ShowAnnualDashboardController {
  constructor(
    private showAnnualDashboard: ShowAnnualDashboardAction,
    private workFileContext: WorkFileContext
  ) {}

  async render({ inertia }: HttpContext) {
    if (!this.workFileContext.isOpen()) {
      return inertia.render("work_files/no_work_file", {})
    }

    const schoolYear = await SchoolYear.query().firstOrFail()
    const [levels, classes] = await Promise.all([
      Level.query().where("school_year_id", schoolYear.id).orderBy("short_code").orderBy("name"),
      TeachingClass.query().where("school_year_id", schoolYear.id).orderBy("short_code").orderBy("name"),
    ])
    const plannedSessions = classes.length
      ? await PlannedSession.query().whereIn(
          "class_id",
          classes.map((teachingClass) => teachingClass.id)
        )
      : []
    const dashboard = this.showAnnualDashboard.execute({
      schoolYear,
      levels,
      classes,
      plannedSessions,
      asOf: DateTime.local().startOf("day"),
    })

    return inertia.render("home", { dashboard: AnnualDashboardTransformer.transform(dashboard) })
  }
}
