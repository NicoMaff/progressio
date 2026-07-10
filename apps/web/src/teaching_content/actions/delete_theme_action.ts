import Theme from "#models/theme"
import Chapter from "#models/chapter"
import TeachingContentOperationError from "#teaching_content/exceptions/operation_error"

export class ActiveThemeDeletionError extends TeachingContentOperationError {
  constructor() {
    super("Archivez le thème avant de le supprimer.")
    this.name = "ActiveThemeDeletionError"
  }
}

export class ThemeOwnsChaptersDeletionError extends TeachingContentOperationError {
  constructor() {
    super("Ce thème ne peut pas être supprimé car il contient encore des chapitres.")
    this.name = "ThemeOwnsChaptersDeletionError"
  }
}

export default class DeleteThemeAction {
  async execute(levelId: string, themeId: string) {
    const theme = await Theme.query().where("id", themeId).where("level_id", levelId).firstOrFail()

    if (!theme.archivedAt) {
      throw new ActiveThemeDeletionError()
    }

    const ownedChapter = await Chapter.query().where("theme_id", theme.id).first()
    if (ownedChapter) {
      throw new ThemeOwnsChaptersDeletionError()
    }

    await theme.delete()
  }
}
