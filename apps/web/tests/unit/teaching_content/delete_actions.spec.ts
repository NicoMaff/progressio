import DeleteActivityAction, {
  ActiveActivityDeletionError,
  ActivityReferenceDeletionError,
} from "#teaching_content/actions/delete_activity_action"
import DeleteChapterAction, {
  ActiveChapterDeletionError,
  ChapterOwnsActivitiesDeletionError,
  MainChapterReferenceDeletionError,
} from "#teaching_content/actions/delete_chapter_action"
import DeleteThemeAction, {
  ActiveThemeDeletionError,
  ThemeOwnsChaptersDeletionError,
} from "#teaching_content/actions/delete_theme_action"
import {
  ActivityFactory,
  ActivityTypeFactory,
  ActualSessionActivityFactory,
  ActualSessionFactory,
  ChapterFactory,
  LevelFactory,
  PlannedSessionActivityFactory,
  PlannedSessionFactory,
  TemplateSessionActivityFactory,
  TemplateSessionFactory,
  ThemeFactory,
} from "#database/factories"
import Activity from "#models/activity"
import Chapter from "#models/chapter"
import Theme from "#models/theme"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

test.group("teaching content deletion actions", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test("deletes archived teaching content without ownership or references", async ({ assert }) => {
    const level = await LevelFactory.create()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()
    const theme = await ThemeFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()
    const chapter = await ChapterFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()
    const activity = await ActivityFactory.merge({
      levelId: level.id,
      activityTypeId: activityType.id,
      archivedAt: DateTime.utc(),
    }).create()

    await new DeleteThemeAction().execute(level.id, theme.id)
    await new DeleteChapterAction().execute(level.id, chapter.id)
    await new DeleteActivityAction().execute(level.id, activity.id)

    assert.isNull(await Theme.find(theme.id))
    assert.isNull(await Chapter.find(chapter.id))
    assert.isNull(await Activity.find(activity.id))
  })

  test("blocks deletion of non-archived teaching content", async ({ assert }) => {
    const level = await LevelFactory.create()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()
    const theme = await ThemeFactory.merge({ levelId: level.id }).create()
    const chapter = await ChapterFactory.merge({ levelId: level.id }).create()
    const activity = await ActivityFactory.merge({ levelId: level.id, activityTypeId: activityType.id }).create()

    await assert.rejects(() => new DeleteThemeAction().execute(level.id, theme.id), ActiveThemeDeletionError)
    await assert.rejects(() => new DeleteChapterAction().execute(level.id, chapter.id), ActiveChapterDeletionError)
    await assert.rejects(() => new DeleteActivityAction().execute(level.id, activity.id), ActiveActivityDeletionError)
  })

  test("blocks deletion of archived themes and chapters that still own content", async ({ assert }) => {
    const level = await LevelFactory.create()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()
    const theme = await ThemeFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()
    await ChapterFactory.merge({ levelId: level.id, themeId: theme.id }).create()
    const chapter = await ChapterFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()
    await ActivityFactory.merge({ levelId: level.id, chapterId: chapter.id, activityTypeId: activityType.id }).create()

    await assert.rejects(() => new DeleteThemeAction().execute(level.id, theme.id), ThemeOwnsChaptersDeletionError)
    await assert.rejects(
      () => new DeleteChapterAction().execute(level.id, chapter.id),
      ChapterOwnsActivitiesDeletionError
    )
  })

  test("blocks deletion of chapters used as a main chapter", async ({ assert }) => {
    const level = await LevelFactory.create()
    const templateChapter = await ChapterFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()
    const plannedChapter = await ChapterFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()
    const actualChapter = await ChapterFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()

    await TemplateSessionFactory.merge({ mainChapterId: templateChapter.id }).create()
    await PlannedSessionFactory.merge({ mainChapterId: plannedChapter.id }).create()
    await ActualSessionFactory.merge({ mainChapterId: actualChapter.id }).create()

    await assert.rejects(
      () => new DeleteChapterAction().execute(level.id, templateChapter.id),
      MainChapterReferenceDeletionError
    )
    await assert.rejects(
      () => new DeleteChapterAction().execute(level.id, plannedChapter.id),
      MainChapterReferenceDeletionError
    )
    await assert.rejects(
      () => new DeleteChapterAction().execute(level.id, actualChapter.id),
      MainChapterReferenceDeletionError
    )
  })

  test("blocks deletion of activities referenced by template, planned, or actual sessions", async ({ assert }) => {
    const level = await LevelFactory.create()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()
    const templateActivity = await ActivityFactory.merge({
      levelId: level.id,
      activityTypeId: activityType.id,
      archivedAt: DateTime.utc(),
    }).create()
    const plannedActivity = await ActivityFactory.merge({
      levelId: level.id,
      activityTypeId: activityType.id,
      archivedAt: DateTime.utc(),
    }).create()
    const actualActivity = await ActivityFactory.merge({
      levelId: level.id,
      activityTypeId: activityType.id,
      archivedAt: DateTime.utc(),
    }).create()

    await TemplateSessionActivityFactory.merge({ activityId: templateActivity.id }).create()
    await PlannedSessionActivityFactory.merge({ activityId: plannedActivity.id }).create()
    await ActualSessionActivityFactory.merge({ activityId: actualActivity.id }).create()

    await assert.rejects(
      () => new DeleteActivityAction().execute(level.id, templateActivity.id),
      ActivityReferenceDeletionError
    )
    await assert.rejects(
      () => new DeleteActivityAction().execute(level.id, plannedActivity.id),
      ActivityReferenceDeletionError
    )
    await assert.rejects(
      () => new DeleteActivityAction().execute(level.id, actualActivity.id),
      ActivityReferenceDeletionError
    )
  })
})
