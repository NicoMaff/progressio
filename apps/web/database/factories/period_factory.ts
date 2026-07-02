import Period from "#models/period"
import type SchoolYear from "#models/school_year"
import factory from "@adonisjs/lucid/factories"
import { DateTime } from "luxon"
import { createRelatedId, nextSequence } from "#database/factories/helpers"
import { SchoolYearFactory } from "#database/factories/school_year_factory"

export const PeriodFactory = factory
  .define(Period, () => {
    const periodIndex = nextSequence()

    return {
      name: `Période ${periodIndex}`,
      startDate: DateTime.fromISO("2025-09-01").plus({ weeks: periodIndex - 1 }),
      endDate: DateTime.fromISO("2025-09-05").plus({ weeks: periodIndex - 1 }),
    }
  })
  .before("create", async (_, period, ctx) => {
    period.schoolYearId ??= await createRelatedId<SchoolYear>(SchoolYearFactory, ctx)
  })
  .build()
