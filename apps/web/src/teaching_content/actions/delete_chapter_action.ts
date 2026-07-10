import Activity from "#models/activity"
import ActualSession from "#models/actual_session"
import Chapter from "#models/chapter"
import PlannedSession from "#models/planned_session"
import TemplateSession from "#models/template_session"
import TeachingContentOperationError from "#teaching_content/exceptions/operation_error"

export class ActiveChapterDeletionError extends TeachingContentOperationError {
  constructor() {
    super("Archivez le chapitre avant de le supprimer.")
    this.name = "ActiveChapterDeletionError"
  }
}

export class ChapterOwnsActivitiesDeletionError extends TeachingContentOperationError {
  constructor() {
    super("Ce chapitre ne peut pas être supprimé car il contient encore des activités.")
    this.name = "ChapterOwnsActivitiesDeletionError"
  }
}

export class MainChapterReferenceDeletionError extends TeachingContentOperationError {
  constructor() {
    super("Ce chapitre ne peut pas être supprimé car il est utilisé comme chapitre principal.")
    this.name = "MainChapterReferenceDeletionError"
  }
}

export default class DeleteChapterAction {
  async execute(levelId: string, chapterId: string) {
    const chapter = await Chapter.query().where("id", chapterId).where("level_id", levelId).firstOrFail()

    if (!chapter.archivedAt) {
      throw new ActiveChapterDeletionError()
    }

    const ownedActivity = await Activity.query().where("chapter_id", chapter.id).first()
    if (ownedActivity) {
      throw new ChapterOwnsActivitiesDeletionError()
    }

    const [templateSession, plannedSession, actualSession] = await Promise.all([
      TemplateSession.query().where("main_chapter_id", chapter.id).first(),
      PlannedSession.query().where("main_chapter_id", chapter.id).first(),
      ActualSession.query().where("main_chapter_id", chapter.id).first(),
    ])
    if (templateSession || plannedSession || actualSession) {
      throw new MainChapterReferenceDeletionError()
    }

    await chapter.delete()
  }
}
