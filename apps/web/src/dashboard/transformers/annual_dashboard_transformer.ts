import type { AnnualDashboard } from "#dashboard/actions/render_annual_dashboard_action"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class AnnualDashboardTransformer extends BaseTransformer<AnnualDashboard> {
  toObject() {
    return {
      ...this.resource,
      levels: this.resource.levels.map((level) => ({
        ...level,
        classes: level.classes.map((teachingClass) => ({
          ...teachingClass,
          outcomeCounts: {
            realized: teachingClass.outcomeCounts.realized,
            partial: teachingClass.outcomeCounts.partial,
            shifted: teachingClass.outcomeCounts.shifted,
            cancelled: teachingClass.outcomeCounts.cancelled,
            toCatchUp: teachingClass.outcomeCounts.to_catch_up,
          },
        })),
      })),
    }
  }
}
