import type SchoolYear from "#models/school_year"
import SlotType from "#models/slot_type"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId, nextSequence } from "#database/factories/helpers"
import { SchoolYearFactory } from "#database/factories/school_year_factory"

export const SlotTypeFactory = factory
  .define(SlotType, () => ({
    name: `Créneau ${nextSequence()}`,
    color: "#22C55E",
    displayOrder: nextSequence(),
  }))
  .before("create", async (_, slotType, ctx) => {
    slotType.schoolYearId ??= await createRelatedId<SchoolYear>(SchoolYearFactory, ctx)
  })
  .build()
