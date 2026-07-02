import ActivityType from "#models/activity_type"
import type SchoolYear from "#models/school_year"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId, nextSequence } from "#database/factories/helpers"
import { SchoolYearFactory } from "#database/factories/school_year_factory"

export const ActivityTypeFactory = factory
  .define(ActivityType, () => ({
    name: `Activité ${nextSequence()}`,
    color: "#0EA5E9",
    displayOrder: nextSequence(),
  }))
  .before("create", async (_, activityType, ctx) => {
    activityType.schoolYearId ??= await createRelatedId<SchoolYear>(SchoolYearFactory, ctx)
  })
  .build()
