import Theme from "#models/theme"

export default class RestoreThemeAction {
  async execute(levelId: string, themeId: string) {
    const theme = await Theme.query().where("id", themeId).where("level_id", levelId).firstOrFail()

    if (theme.archivedAt) {
      theme.archivedAt = null
      await theme.save()
    }

    return theme
  }
}
