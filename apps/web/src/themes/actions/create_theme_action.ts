import Theme from "#models/theme"
import { ThemeShortCodeAlreadyExistsError, normalizeThemeInput, type ThemeInput } from "./theme_input.js"
import db from "@adonisjs/lucid/services/db"

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

    return db.transaction(async (transaction) => {
      const result = await transaction.from("themes").where("level_id", levelId).max("display_order as maximum").first()
      const displayOrder = Number(result?.maximum ?? 0) + 1

      return Theme.create(
        {
          levelId,
          displayOrder,
          ...payload,
        },
        { client: transaction }
      )
    })
  }
}
