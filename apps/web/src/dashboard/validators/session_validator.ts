import vine from "@vinejs/vine"

export const sessionParamsValidator = vine.create({
  params: vine.object({
    classId: vine.string().uuid(),
    sessionId: vine.string().uuid(),
    kind: vine.enum(["planned", "actual"] as const),
  }),
})

export const sessionUpdateValidator = vine.create({
  title: vine.string().trim().optional(),
  sessionDate: vine.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: vine.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  durationMinutes: vine.number().positive(),
  noteMarkdown: vine.string().trim().optional(),
  outcome: vine.enum(["realized", "shifted", "partial", "cancelled", "to_catch_up"] as const).optional(),
  state: vine.enum(["draft", "completed"] as const).optional(),
})
