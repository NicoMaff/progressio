import RecurringSlot from "#models/recurring_slot"
import type SlotType from "#models/slot_type"
import type TeachingClass from "#models/class"
import factory from "@adonisjs/lucid/factories"
import { DateTime } from "luxon"
import { createRelatedId, findSchoolYearIdForClass } from "#database/factories/helpers"
import { SlotTypeFactory } from "#database/factories/slot_type_factory"
import { TeachingClassFactory } from "#database/factories/teaching_class_factory"

export const RecurringSlotFactory = factory
  .define(RecurringSlot, () => ({
    weekday: 1,
    startTime: "08:00",
    durationMinutes: 55,
    validFrom: DateTime.fromISO("2025-09-02"),
    validUntil: null,
  }))
  .before("create", async (_, recurringSlot, ctx) => {
    recurringSlot.classId ??= await createRelatedId<TeachingClass>(TeachingClassFactory, ctx)
    recurringSlot.slotTypeId ??= await createRelatedId<SlotType>(SlotTypeFactory, ctx, {
      schoolYearId: await findSchoolYearIdForClass(recurringSlot.classId),
    })
  })
  .build()
