import Level from "#models/level"
import type SchoolYear from "#models/school_year"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId, nextSequence } from "#database/factories/helpers"
import { SchoolYearFactory } from "#database/factories/school_year_factory"

export const LevelFactory = factory
  .define(Level, ({ faker }) => {
    const levelIndex = nextSequence()

    return {
      name: faker.helpers.arrayElement(["Sixième", "Cinquième", "Quatrième", "Troisième"]),
      shortCode: `LVL-${levelIndex}`,
    }
  })
  .before("create", async (_, level, ctx) => {
    level.schoolYearId ??= await createRelatedId<SchoolYear>(SchoolYearFactory, ctx)
  })
  .build()
