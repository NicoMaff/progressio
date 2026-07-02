import Interruption from "#models/interruption"
import type InterruptionType from "#models/interruption_type"
import type SchoolYear from "#models/school_year"
import factory from "@adonisjs/lucid/factories"
import { DateTime } from "luxon"
import { createRelatedId, nextSequence } from "#database/factories/helpers"
import { InterruptionTypeFactory } from "#database/factories/interruption_type_factory"
import { SchoolYearFactory } from "#database/factories/school_year_factory"

export const InterruptionFactory = factory
  .define(Interruption, () => ({
    scope: "global",
    title: `Interruption ${nextSequence()}`,
    startsAt: DateTime.fromISO("2025-10-20T08:00:00.000Z"),
    endsAt: DateTime.fromISO("2025-10-20T18:00:00.000Z"),
    noteMarkdown: null,
  }))
  .before("create", async (_, interruption, ctx) => {
    interruption.schoolYearId ??= await createRelatedId<SchoolYear>(SchoolYearFactory, ctx)
    interruption.interruptionTypeId ??= await createRelatedId<InterruptionType>(InterruptionTypeFactory, ctx, {
      schoolYearId: interruption.schoolYearId,
    })
  })
  .build()
