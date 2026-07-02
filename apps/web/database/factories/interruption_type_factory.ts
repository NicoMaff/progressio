import InterruptionType from "#models/interruption_type"
import type SchoolYear from "#models/school_year"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId, nextSequence } from "#database/factories/helpers"
import { SchoolYearFactory } from "#database/factories/school_year_factory"

export const InterruptionTypeFactory = factory
  .define(InterruptionType, () => ({
    name: `Interruption ${nextSequence()}`,
    color: "#F97316",
    displayOrder: nextSequence(),
  }))
  .before("create", async (_, interruptionType, ctx) => {
    interruptionType.schoolYearId ??= await createRelatedId<SchoolYear>(SchoolYearFactory, ctx)
  })
  .build()
