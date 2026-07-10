import Theme from "#models/theme"
import { ThemeShortCodeAlreadyExistsError, normalizeThemeInput, type ThemeInput } from "./theme_input.js"
import { randomUUID } from "node:crypto"

export default class CreateThemeAction {
  async execute(levelId: string, input: ThemeInput) {
    const payload = normalizeThemeInput(input)

    const existingTheme = await Theme.query()
      .where("level_id", levelId)
      .where("short_code", payload.shortCode)
      .whereNull("archived_at")
      .first()

    if (existingTheme) {
      throw new ThemeShortCodeAlreadyExistsError()
    }

    return Theme.create({
      id: randomUUID(),
      levelId,
      ...payload,
    })
  }
}
