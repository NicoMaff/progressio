import type { ClassProgressSummary } from "#dashboard/actions/show_annual_dashboard_action"

export function transformClassProgressSummary(teachingClass: ClassProgressSummary) {
  return {
    ...teachingClass,
    outcomeCounts: {
      realized: teachingClass.outcomeCounts.realized,
      partial: teachingClass.outcomeCounts.partial,
      shifted: teachingClass.outcomeCounts.shifted,
      cancelled: teachingClass.outcomeCounts.cancelled,
      toCatchUp: teachingClass.outcomeCounts.to_catch_up,
    },
  }
}
