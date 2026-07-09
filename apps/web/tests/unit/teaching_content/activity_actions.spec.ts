import CreateActivityAction from "#teaching_content/actions/create_activity_action"
import UpdateActivityAction from "#teaching_content/actions/update_activity_action"
import {
  ActivityChapterLevelMismatchError,
  ActivityEstimatedDurationOutOfRangeError,
  ActivityTypeSchoolYearMismatchError,
} from "#teaching_content/actions/activity_input"
import { ActivityFactory, ActivityTypeFactory, ChapterFactory, LevelFactory } from "#database/factories"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"

test.group("teaching content activity actions", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test("creates an active activity with normalized fields and optional chapter", async ({ assert }) => {
    const level = await createLevel()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()

    const activity = await new CreateActivityAction().execute(level.id, {
      title: "  Découvrir les fractions  ",
      activityTypeId: activityType.id,
      noteMarkdown: "  Notes de préparation  ",
    })

    assert.equal(activity.levelId, level.id)
    assert.equal(activity.title, "Découvrir les fractions")
    assert.isNull(activity.chapterId)
    assert.equal(activity.activityTypeId, activityType.id)
    assert.isNull(activity.estimatedDurationMinutes)
    assert.equal(activity.noteMarkdown, "Notes de préparation")
  })

  test("assigns an activity to a chapter from the same level", async ({ assert }) => {
    const level = await createLevel()
    const chapter = await ChapterFactory.merge({ levelId: level.id }).create()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()

    const activity = await new CreateActivityAction().execute(level.id, {
      title: "Exercices guidés",
      chapterId: chapter.id,
      activityTypeId: activityType.id,
      estimatedDurationMinutes: 45,
    })

    assert.equal(activity.chapterId, chapter.id)
    assert.equal(activity.estimatedDurationMinutes, 45)
  })

  test("rejects a chapter from another level", async ({ assert }) => {
    const level = await createLevel({ name: "Quatrième", shortCode: "4E" })
    const otherLevel = await createLevel({ name: "Troisième", shortCode: "3E" })
    const otherChapter = await ChapterFactory.merge({ levelId: otherLevel.id }).create()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()

    await assert.rejects(
      () =>
        new CreateActivityAction().execute(level.id, {
          title: "Triangles",
          chapterId: otherChapter.id,
          activityTypeId: activityType.id,
        }),
      ActivityChapterLevelMismatchError
    )
  })

  test("rejects an activity type from another school year", async ({ assert }) => {
    const level = await createLevel()
    const otherLevel = await createLevel({ name: "Sixième", shortCode: "6E" })
    const otherActivityType = await ActivityTypeFactory.merge({ schoolYearId: otherLevel.schoolYearId }).create()

    await assert.rejects(
      () =>
        new CreateActivityAction().execute(level.id, {
          title: "Recherche",
          activityTypeId: otherActivityType.id,
        }),
      ActivityTypeSchoolYearMismatchError
    )
  })

  test("rejects estimated durations outside the accepted range", async ({ assert }) => {
    const level = await createLevel()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()

    await assert.rejects(
      () =>
        new CreateActivityAction().execute(level.id, {
          title: "Évaluation",
          activityTypeId: activityType.id,
          estimatedDurationMinutes: 0,
        }),
      ActivityEstimatedDurationOutOfRangeError
    )
    await assert.rejects(
      () =>
        new CreateActivityAction().execute(level.id, {
          title: "Projet long",
          activityTypeId: activityType.id,
          estimatedDurationMinutes: 1441,
        }),
      ActivityEstimatedDurationOutOfRangeError
    )
  })

  test("updates descriptive fields, chapter assignment, activity type, and estimated duration", async ({ assert }) => {
    const level = await createLevel()
    const chapter = await ChapterFactory.merge({ levelId: level.id }).create()
    const firstActivityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()
    const secondActivityType = await ActivityTypeFactory.merge({ schoolYearId: level.schoolYearId }).create()
    const activity = await ActivityFactory.merge({
      levelId: level.id,
      activityTypeId: firstActivityType.id,
      title: "Ancien titre",
    }).create()

    const updatedActivity = await new UpdateActivityAction().execute(level.id, activity.id, {
      title: "  Nouveau titre  ",
      chapterId: chapter.id,
      activityTypeId: secondActivityType.id,
      estimatedDurationMinutes: 90,
      noteMarkdown: "",
    })

    assert.equal(updatedActivity.title, "Nouveau titre")
    assert.equal(updatedActivity.chapterId, chapter.id)
    assert.equal(updatedActivity.activityTypeId, secondActivityType.id)
    assert.equal(updatedActivity.estimatedDurationMinutes, 90)
    assert.isNull(updatedActivity.noteMarkdown)
  })
})

async function createLevel(input: { name?: string; shortCode?: string } = {}) {
  return LevelFactory.merge({
    name: input.name ?? "Quatrième",
    shortCode: input.shortCode ?? "4E",
  }).create()
}
