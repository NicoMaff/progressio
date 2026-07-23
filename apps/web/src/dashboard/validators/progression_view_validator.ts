import vine from "@vinejs/vine"

export const progressionViewValidator = vine.create({
  params: vine.object({
    classId: vine.string().uuid(),
  }),
})
