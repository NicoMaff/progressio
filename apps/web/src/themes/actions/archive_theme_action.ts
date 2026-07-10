import Theme from "#models/theme"
import { DateTime } from "luxon"

export default class ArchiveThemeAction {
  async execute(levelId: string, themeId: string) {
    const theme = await Theme.query().where("id", themeId).where("level_id", levelId).firstOrFail()

    if (!theme.archivedAt) {
      theme.archivedAt = DateTime.utc()
      await theme.save()
    }

    return theme
  }
}
