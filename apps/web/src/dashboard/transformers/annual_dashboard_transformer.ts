import type { AnnualDashboard } from "#dashboard/actions/show_annual_dashboard_action"
import { transformClassProgressSummary } from "#dashboard/transformers/class_progress_summary_payload"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class AnnualDashboardTransformer extends BaseTransformer<AnnualDashboard> {
  toObject() {
    return {
      ...this.resource,
      levels: this.resource.levels.map((level) => ({
        ...level,
        classes: level.classes.map(transformClassProgressSummary),
      })),
    }
  }
}
