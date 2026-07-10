import TeachingContentOperationError from "#teaching_content/exceptions/operation_error"
import Chapter from "#models/chapter"
import Theme from "#models/theme"

export class ArchivedThemeBlocksChapterRestoreError extends TeachingContentOperationError {
  constructor() {
    super("Ce chapitre ne peut pas être restauré tant que son thème est archivé.")
  }
}

export default class RestoreChapterAction {
  async execute(levelId: string, chapterId: string) {
    const chapter = await Chapter.query().where("id", chapterId).where("level_id", levelId).firstOrFail()

    if (!chapter.archivedAt) {
      return chapter
    }

    if (chapter.themeId) {
      const archivedTheme = await Theme.query().where("id", chapter.themeId).whereNotNull("archived_at").first()
      if (archivedTheme) {
        throw new ArchivedThemeBlocksChapterRestoreError()
      }
    }

    chapter.archivedAt = null
    await chapter.save()

    return chapter
  }
}
