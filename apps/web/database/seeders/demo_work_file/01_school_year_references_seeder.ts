import type { QueryClientContract } from "@adonisjs/lucid/types/database"
import { DateTime } from "luxon"
import { ActivityTypeFactory, InterruptionTypeFactory, PeriodFactory, SchoolYearFactory } from "#database/factories"
import { ACTIVITY_TYPES, INTERRUPTION_TYPES, PERIOD_SETS } from "#database/seeders/demo_work_file/blueprints"
import type { DemoWorkFileSeedContext } from "#database/seeders/demo_work_file/context"

export default class SchoolYearReferencesSeeder {
  constructor(private client: QueryClientContract) {}

  async run(context: DemoWorkFileSeedContext) {
    const schoolYear = await SchoolYearFactory.client(this.client)
      .merge({
        label: "2025-2026",
        subject: "Mathématiques",
        startDate: DateTime.fromISO("2025-09-01"),
        endDate: DateTime.fromISO("2026-07-04"),
        firstTeachingDay: DateTime.fromISO("2025-09-02"),
        teachingHourDurationMinutes: 55,
      })
      .create()

    context.schoolYear = schoolYear

    const selectedPeriods = PERIOD_SETS[Math.floor(Math.random() * PERIOD_SETS.length)]!

    for (const period of selectedPeriods) {
      await PeriodFactory.client(this.client)
        .merge({
          schoolYearId: schoolYear.id,
          name: period.name,
          startDate: DateTime.fromISO(period.startDate),
          endDate: DateTime.fromISO(period.endDate),
        })
        .create()
    }

    for (const [activityTypeIndex, activityType] of ACTIVITY_TYPES.entries()) {
      context.activityTypes.push(
        await ActivityTypeFactory.client(this.client)
          .merge({
            schoolYearId: schoolYear.id,
            name: activityType.name,
            color: activityType.color,
            displayOrder: activityTypeIndex + 1,
          })
          .create()
      )
    }

    for (const [interruptionTypeIndex, interruptionType] of INTERRUPTION_TYPES.entries()) {
      context.interruptionTypes.push(
        await InterruptionTypeFactory.client(this.client)
          .merge({
            schoolYearId: schoolYear.id,
            name: interruptionType.name,
            color: interruptionType.color,
            displayOrder: interruptionTypeIndex + 1,
          })
          .create()
      )
    }
  }
}
