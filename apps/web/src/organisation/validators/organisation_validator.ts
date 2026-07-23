import vine from "@vinejs/vine"

const name = vine.string().trim().minLength(1).maxLength(120)
const shortCode = vine.string().trim().minLength(1).maxLength(24)

export const levelValidator = vine.create({ name, shortCode })
export const classValidator = vine.create({ name, shortCode, levelId: vine.string().uuid() })
export const classScopeValidator = vine.create({ level: vine.string().uuid().optional() })
