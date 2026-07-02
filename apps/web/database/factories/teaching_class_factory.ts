import TeachingClass from "#models/class"
import type Level from "#models/level"
import factory from "@adonisjs/lucid/factories"
import { createRelated, createRelatedId, findSchoolYearIdForLevel, nextSequence } from "#database/factories/helpers"
import { LevelFactory } from "#database/factories/level_factory"

export const TeachingClassFactory = factory
  .define(TeachingClass, () => {
    const classIndex = nextSequence()

    return {
      name: `Classe ${classIndex}`,
      shortCode: `CLS-${classIndex}`,
    }
  })
  .before("create", async (_, teachingClass, ctx) => {
    if (teachingClass.levelId === undefined && teachingClass.schoolYearId === undefined) {
      const level = await createRelated<Level>(LevelFactory, ctx)
      teachingClass.levelId = level.id
      teachingClass.schoolYearId = level.schoolYearId
      return
    }

    if (teachingClass.levelId === undefined) {
      teachingClass.levelId = await createRelatedId<Level>(LevelFactory, ctx, {
        schoolYearId: teachingClass.schoolYearId,
      })
    }

    teachingClass.schoolYearId ??= await findSchoolYearIdForLevel(teachingClass.levelId)
  })
  .build()
