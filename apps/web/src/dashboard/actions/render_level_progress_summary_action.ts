import ShowAnnualDashboardAction, { type LevelProgressSummary } from "#dashboard/actions/show_annual_dashboard_action"
import TeachingClass from "#models/class"
import Level from "#models/level"
import PlannedSession from "#models/planned_session"
import SchoolYear from "#models/school_year"
import { DateTime } from "luxon"

export type LevelProgressSummaryPage = {
  schoolYear: { id: string; label: string; subject: string }
  level: LevelProgressSummary
}

export default class RenderLevelProgressSummaryAction {
  async execute(levelId: string): Promise<LevelProgressSummaryPage> {
    const schoolYear = await SchoolYear.query().firstOrFail()
    const level = await Level.query().where("id", levelId).where("school_year_id", schoolYear.id).firstOrFail()
    const classes = await TeachingClass.query().where("level_id", level.id).orderBy("short_code").orderBy("name")
    const plannedSessions = classes.length
      ? await PlannedSession.query().whereIn(
          "class_id",
          classes.map((teachingClass) => teachingClass.id)
        )
      : []
    const dashboard = new ShowAnnualDashboardAction().execute({
      schoolYear,
      levels: [level],
      classes,
      plannedSessions,
      asOf: DateTime.local().startOf("day"),
    })

    return { schoolYear: dashboard.schoolYear, level: dashboard.levels[0]! }
  }
}
