import CreateChapterAction from "#chapters/actions/create_chapter_action"
import UpdateChapterAction from "#chapters/actions/update_chapter_action"
import ReorderChaptersAction from "#chapters/actions/reorder_chapters_action"
import {
  ChapterShortCodeAlreadyExistsError,
  ChapterShortCodeFormatError,
  ChapterThemeLevelMismatchError,
} from "#chapters/actions/chapter_input"
import { ChapterFactory, LevelFactory, ThemeFactory } from "#database/factories"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"

test.group("chapters actions", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test("creates an active chapter with normalized fields and optional theme", async ({ assert }) => {
    const level = await createLevel()
    const chapter = await new CreateChapterAction().execute(level.id, {
      name: "  Fractions  ",
      shortCode: " frac 1 ",
      noteMarkdown: "  Notes de préparation  ",
    })

    assert.equal(chapter.levelId, level.id)
    assert.equal(chapter.name, "Fractions")
    assert.equal(chapter.shortCode, "FRAC-1")
    assert.isNull(chapter.themeId)
    assert.equal(chapter.noteMarkdown, "Notes de préparation")
  })

  test("assigns a chapter to a theme from the same level", async ({ assert }) => {
    const level = await createLevel()
    const theme = await ThemeFactory.merge({ levelId: level.id, shortCode: "NUM" }).create()

    const chapter = await new CreateChapterAction().execute(level.id, {
      name: "Calcul littéral",
      shortCode: "CALC",
      themeId: theme.id,
    })

    assert.equal(chapter.themeId, theme.id)
  })

  test("rejects a theme from another level", async ({ assert }) => {
    const level = await createLevel({ name: "Quatrième", shortCode: "4E" })
    const otherLevel = await createLevel({ name: "Troisième", shortCode: "3E" })
    const otherTheme = await ThemeFactory.merge({ levelId: otherLevel.id, shortCode: "GEO" }).create()

    await assert.rejects(
      () =>
        new CreateChapterAction().execute(level.id, {
          name: "Triangles",
          shortCode: "TRI",
          themeId: otherTheme.id,
        }),
      ChapterThemeLevelMismatchError
    )
  })

  test("rejects duplicate active short codes within the same level", async ({ assert }) => {
    const level = await createLevel()
    await new CreateChapterAction().execute(level.id, {
      name: "Puissances",
      shortCode: "PUI",
    })

    await assert.rejects(
      () =>
        new CreateChapterAction().execute(level.id, {
          name: "Puissances de dix",
          shortCode: " pui ",
        }),
      ChapterShortCodeAlreadyExistsError
    )
  })

  test("rejects invalid normalized short codes", async ({ assert }) => {
    const level = await createLevel()

    await assert.rejects(
      () =>
        new CreateChapterAction().execute(level.id, {
          name: "Repérage",
          shortCode: "REP/1",
        }),
      ChapterShortCodeFormatError
    )
  })

  test("allows the same short code on another level", async ({ assert }) => {
    const firstLevel = await createLevel({ name: "Sixième", shortCode: "6E" })
    const secondLevel = await createLevel({ name: "Cinquième", shortCode: "5E" })

    await new CreateChapterAction().execute(firstLevel.id, {
      name: "Nombres",
      shortCode: "NBR",
    })
    const chapter = await new CreateChapterAction().execute(secondLevel.id, {
      name: "Nombres",
      shortCode: "NBR",
    })

    assert.equal(chapter.levelId, secondLevel.id)
  })

  test("updates descriptive fields and theme assignment without colliding with itself", async ({ assert }) => {
    const level = await createLevel()
    const theme = await ThemeFactory.merge({ levelId: level.id, shortCode: "ALG" }).create()
    const chapter = await ChapterFactory.merge({
      levelId: level.id,
      name: "Équations",
      shortCode: "EQU",
    }).create()

    const updatedChapter = await new UpdateChapterAction().execute(level.id, chapter.id, {
      name: " Équations et inéquations ",
      shortCode: " equ ",
      themeId: theme.id,
      noteMarkdown: "",
    })

    assert.equal(updatedChapter.name, "Équations et inéquations")
    assert.equal(updatedChapter.shortCode, "EQU")
    assert.equal(updatedChapter.themeId, theme.id)
    assert.isNull(updatedChapter.noteMarkdown)
  })

  test("appends new chapters and appends when changing theme", async ({ assert }) => {
    const level = await createLevel()
    const firstTheme = await ThemeFactory.merge({ levelId: level.id, shortCode: "ALG" }).create()
    const secondTheme = await ThemeFactory.merge({ levelId: level.id, shortCode: "GEO" }).create()
    const first = await new CreateChapterAction().execute(level.id, {
      name: "Un",
      shortCode: "UN",
      themeId: firstTheme.id,
    })
    const second = await new CreateChapterAction().execute(level.id, {
      name: "Deux",
      shortCode: "DEUX",
      themeId: firstTheme.id,
    })
    const moved = await new UpdateChapterAction().execute(level.id, second.id, {
      name: second.name,
      shortCode: second.shortCode,
      themeId: secondTheme.id,
    })

    assert.equal(first.displayOrder, 1)
    assert.equal(moved.displayOrder, 1)
    assert.equal(moved.themeId, secondTheme.id)
  })

  test("persists ordering within one theme", async ({ assert }) => {
    const level = await createLevel()
    const theme = await ThemeFactory.merge({ levelId: level.id }).create()
    const first = await ChapterFactory.merge({ levelId: level.id, themeId: theme.id }).create()
    const second = await ChapterFactory.merge({ levelId: level.id, themeId: theme.id }).create()

    await new ReorderChaptersAction().execute(level.id, theme.id, [second.id, first.id])

    const refreshedFirst = await first.refresh()
    const refreshedSecond = await second.refresh()
    assert.equal(refreshedFirst.displayOrder, 2)
    assert.equal(refreshedSecond.displayOrder, 1)
  })
})

async function createLevel(input: { name?: string; shortCode?: string } = {}) {
  return LevelFactory.merge({
    name: input.name ?? "Quatrième",
    shortCode: input.shortCode ?? "4E",
  }).create()
}
