import Theme from "#models/theme"
import db from "@adonisjs/lucid/services/db"

export class InvalidThemeOrderError extends Error {
  constructor() {
    super("L’ordre des thèmes doit contenir exactement les thèmes actifs du niveau.")
    this.name = "InvalidThemeOrderError"
  }
}

export default class ReorderThemesAction {
  async execute(levelId: string, themeIds: string[]) {
    const activeThemes = await Theme.query().where("level_id", levelId).whereNull("archived_at").select("id")

    if (
      themeIds.length !== activeThemes.length ||
      new Set(themeIds).size !== themeIds.length ||
      !activeThemes.every((theme) => themeIds.includes(theme.id))
    ) {
      throw new InvalidThemeOrderError()
    }

    await db.transaction(async (transaction) => {
      for (const [index, themeId] of themeIds.entries()) {
        await transaction
          .from("themes")
          .where("id", themeId)
          .update({ display_order: -(index + 1) })
      }

      for (const [index, themeId] of themeIds.entries()) {
        await transaction
          .from("themes")
          .where("id", themeId)
          .update({ display_order: index + 1 })
      }
    })
  }
}
