import Theme from "#models/theme"
import { ThemeShortCodeAlreadyExistsError, normalizeThemeInput, type ThemeInput } from "./theme_input.js"

export default class UpdateThemeAction {
  async execute(levelId: string, themeId: string, input: ThemeInput) {
    const theme = await Theme.query()
      .where("id", themeId)
      .where("level_id", levelId)
      .whereNull("archived_at")
      .firstOrFail()
    const payload = normalizeThemeInput(input)

    const existingTheme = await Theme.query()
      .where("level_id", levelId)
      .where("short_code", payload.shortCode)
      .whereNull("archived_at")
      .whereNot("id", theme.id)
      .first()

    if (existingTheme) {
      throw new ThemeShortCodeAlreadyExistsError()
    }

    theme.merge(payload)
    await theme.save()

    return theme
  }
}
