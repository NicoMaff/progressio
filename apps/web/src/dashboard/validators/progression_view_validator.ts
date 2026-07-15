import vine from "@vinejs/vine"

export const progressionViewValidator = vine.create({
  params: vine.object({
    classId: vine.string().uuid(),
  }),
  window: vine.enum(["annual"] as const).optional(),
})
