import Interruption from "#models/interruption"
import InterruptionClass from "#models/interruption_class"
import type TeachingClass from "#models/class"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId } from "#database/factories/helpers"
import { InterruptionFactory } from "#database/factories/interruption_factory"
import { TeachingClassFactory } from "#database/factories/teaching_class_factory"

export const InterruptionClassFactory = factory
  .define(InterruptionClass, () => ({}))
  .before("create", async (_, interruptionClass, ctx) => {
    interruptionClass.interruptionId ??= await createRelatedId<Interruption>(InterruptionFactory, ctx, {
      scope: "class",
    })

    if (interruptionClass.classId === undefined) {
      const interruption = await Interruption.findOrFail(interruptionClass.interruptionId)
      interruptionClass.classId = await createRelatedId<TeachingClass>(TeachingClassFactory, ctx, {
        schoolYearId: interruption.schoolYearId,
      })
    }
  })
  .build()
