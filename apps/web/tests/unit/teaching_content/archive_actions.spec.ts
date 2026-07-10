import ArchiveActivityAction from "#activities/actions/archive_activity_action"
import ArchiveChapterAction from "#chapters/actions/archive_chapter_action"
import ArchiveThemeAction from "#themes/actions/archive_theme_action"
import RenderTeachingContentPageAction from "#teaching_content/actions/render_teaching_content_page_action"
import RestoreActivityAction, {
  ArchivedChapterBlocksActivityRestoreError,
} from "#activities/actions/restore_activity_action"
import RestoreChapterAction, { ArchivedThemeBlocksChapterRestoreError } from "#chapters/actions/restore_chapter_action"
import RestoreThemeAction from "#themes/actions/restore_theme_action"
import { ActivityFactory, ActivityTypeFactory, ChapterFactory, LevelFactory, ThemeFactory } from "#database/factories"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

test.group("teaching content archive actions", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test("archives and restores a theme idempotently without archiving its chapters", async ({ assert }) => {
    const level = await LevelFactory.create()
    const theme = await ThemeFactory.merge({ levelId: level.id }).create()
    const chapter = await ChapterFactory.merge({ levelId: level.id, themeId: theme.id }).create()

    const firstArchive = await new ArchiveThemeAction().execute(level.id, theme.id)
    await firstArchive.refresh()
    const archivedAt = firstArchive.archivedAt?.toISO()
    const secondArchive = await new ArchiveThemeAction().execute(level.id, theme.id)

    assert.isNotNull(archivedAt)
    assert.equal(secondArchive.archivedAt?.toISO(), archivedAt)
    await chapter.refresh()
    assert.isNull(chapter.archivedAt)

    await new RestoreThemeAction().execute(level.id, theme.id)
    const restoredTheme = await new RestoreThemeAction().execute(level.id, theme.id)
    assert.isNull(restoredTheme.archivedAt)
  })

  test("archives and restores a chapter idempotently without archiving its activities", async ({ assert }) => {
    const level = await LevelFactory.create()
    const chapter = await ChapterFactory.merge({ levelId: level.id }).create()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()
    const activity = await ActivityFactory.merge({
      levelId: level.id,
      chapterId: chapter.id,
      activityTypeId: activityType.id,
    }).create()

    const firstArchive = await new ArchiveChapterAction().execute(level.id, chapter.id)
    await firstArchive.refresh()
    const archivedAt = firstArchive.archivedAt?.toISO()
    const secondArchive = await new ArchiveChapterAction().execute(level.id, chapter.id)

    assert.equal(secondArchive.archivedAt?.toISO(), archivedAt)
    await activity.refresh()
    assert.isNull(activity.archivedAt)

    await new RestoreChapterAction().execute(level.id, chapter.id)
    const restoredChapter = await new RestoreChapterAction().execute(level.id, chapter.id)
    assert.isNull(restoredChapter.archivedAt)
  })

  test("blocks restoring a chapter whose theme is archived", async ({ assert }) => {
    const level = await LevelFactory.create()
    const theme = await ThemeFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()
    const chapter = await ChapterFactory.merge({
      levelId: level.id,
      themeId: theme.id,
      archivedAt: DateTime.utc(),
    }).create()

    await assert.rejects(
      () => new RestoreChapterAction().execute(level.id, chapter.id),
      ArchivedThemeBlocksChapterRestoreError
    )
    await chapter.refresh()
    assert.isNotNull(chapter.archivedAt)
  })

  test("archives and restores an activity idempotently", async ({ assert }) => {
    const level = await LevelFactory.create()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()
    const activity = await ActivityFactory.merge({ levelId: level.id, activityTypeId: activityType.id }).create()

    const firstArchive = await new ArchiveActivityAction().execute(level.id, activity.id)
    await firstArchive.refresh()
    const archivedAt = firstArchive.archivedAt?.toISO()
    const secondArchive = await new ArchiveActivityAction().execute(level.id, activity.id)
    assert.equal(secondArchive.archivedAt?.toISO(), archivedAt)

    await new RestoreActivityAction().execute(level.id, activity.id)
    const restoredActivity = await new RestoreActivityAction().execute(level.id, activity.id)
    assert.isNull(restoredActivity.archivedAt)
  })

  test("blocks restoring an activity whose chapter is archived", async ({ assert }) => {
    const level = await LevelFactory.create()
    const chapter = await ChapterFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()
    const activity = await ActivityFactory.merge({
      levelId: level.id,
      chapterId: chapter.id,
      activityTypeId: activityType.id,
      archivedAt: DateTime.utc(),
    }).create()

    await assert.rejects(
      () => new RestoreActivityAction().execute(level.id, activity.id),
      ArchivedChapterBlocksActivityRestoreError
    )
    await activity.refresh()
    assert.isNotNull(activity.archivedAt)
  })

  test("filters active, archived, and all teaching content", async ({ assert }) => {
    const level = await LevelFactory.create()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()
    const activeTheme = await ThemeFactory.merge({ levelId: level.id }).create()
    const archivedTheme = await ThemeFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()
    const activeChapter = await ChapterFactory.merge({ levelId: level.id }).create()
    const archivedChapter = await ChapterFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()
    const activeActivity = await ActivityFactory.merge({ levelId: level.id, activityTypeId: activityType.id }).create()
    const archivedActivity = await ActivityFactory.merge({
      levelId: level.id,
      activityTypeId: activityType.id,
      archivedAt: DateTime.utc(),
    }).create()
    const action = new RenderTeachingContentPageAction()

    const active = await action.execute(level.id)
    const archived = await action.execute(level.id, "archived")
    const all = await action.execute(level.id, "all")

    assert.deepEqual(
      active.themes.map(({ id }) => id),
      [activeTheme.id]
    )
    assert.deepEqual(
      active.chapters.map(({ id }) => id),
      [activeChapter.id]
    )
    assert.deepEqual(
      active.activities.map(({ id }) => id),
      [activeActivity.id]
    )
    assert.deepEqual(
      archived.themes.map(({ id }) => id),
      [archivedTheme.id]
    )
    assert.deepEqual(
      archived.chapters.map(({ id }) => id),
      [archivedChapter.id]
    )
    assert.deepEqual(
      archived.activities.map(({ id }) => id),
      [archivedActivity.id]
    )
    assert.sameMembers(
      all.themes.map(({ id }) => id),
      [activeTheme.id, archivedTheme.id]
    )
    assert.sameMembers(
      all.chapters.map(({ id }) => id),
      [activeChapter.id, archivedChapter.id]
    )
    assert.sameMembers(
      all.activities.map(({ id }) => id),
      [activeActivity.id, archivedActivity.id]
    )
  })
})
