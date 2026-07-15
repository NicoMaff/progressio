import vine from "@vinejs/vine"

export const levelProgressSummaryValidator = vine.create({
  params: vine.object({
    levelId: vine.string().uuid(),
  }),
})
