import CreateChapterAction from "#chapters/actions/create_chapter_action"
import UpdateChapterAction from "#chapters/actions/update_chapter_action"
import {
  ChapterShortCodeAlreadyExistsError,
  ChapterShortCodeFormatError,
  ChapterThemeLevelMismatchError,
} from "#chapters/actions/chapter_input"
import { ChapterFactory, LevelFactory, ThemeFactory } from "#database/factories"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"

test.group("teaching content chapter actions", (group) => {
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
})

async function createLevel(input: { name?: string; shortCode?: string } = {}) {
  return LevelFactory.merge({
    name: input.name ?? "Quatrième",
    shortCode: input.shortCode ?? "4E",
  }).create()
}
