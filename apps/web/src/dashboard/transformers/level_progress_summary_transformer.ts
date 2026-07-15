import type { AnnualDashboard, LevelProgressSummary } from "#dashboard/actions/show_annual_dashboard_action"
import { transformClassProgressSummary } from "#dashboard/transformers/class_progress_summary_payload"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class LevelProgressSummaryTransformer extends BaseTransformer<LevelProgressSummary> {
  constructor(
    resource: LevelProgressSummary,
    private readonly schoolYear: AnnualDashboard["schoolYear"]
  ) {
    super(resource)
  }

  toObject() {
    return {
      schoolYear: this.schoolYear,
      level: {
        ...this.resource,
        classes: this.resource.classes.map(transformClassProgressSummary),
      },
    }
  }
}
