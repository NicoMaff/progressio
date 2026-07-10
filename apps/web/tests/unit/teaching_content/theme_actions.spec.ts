import CreateThemeAction from "#themes/actions/create_theme_action"
import ListActiveThemesAction from "#themes/actions/list_active_themes_action"
import UpdateThemeAction from "#themes/actions/update_theme_action"
import { ThemeShortCodeAlreadyExistsError } from "#themes/actions/theme_input"
import { LevelFactory } from "#database/factories"
import Theme from "#models/theme"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"
import { randomUUID } from "node:crypto"

test.group("teaching content theme actions", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test("creates an active theme with normalized fields and default color", async ({ assert }) => {
    const level = await createLevel()
    const theme = await new CreateThemeAction().execute(level.id, {
      name: "  Fonctions affines  ",
      shortCode: " fa 1 ",
      noteMarkdown: "  Notes de préparation  ",
    })

    assert.equal(theme.levelId, level.id)
    assert.equal(theme.name, "Fonctions affines")
    assert.equal(theme.shortCode, "FA-1")
    assert.equal(theme.color, "#6B7280")
    assert.equal(theme.noteMarkdown, "Notes de préparation")
  })

  test("rejects duplicate active short codes within the same level", async ({ assert }) => {
    const level = await createLevel()
    await new CreateThemeAction().execute(level.id, {
      name: "Géométrie",
      shortCode: "geo",
      color: "#22C55E",
    })

    await assert.rejects(
      () =>
        new CreateThemeAction().execute(level.id, {
          name: "Géométrie plane",
          shortCode: " GEO ",
          color: "#0EA5E9",
        }),
      ThemeShortCodeAlreadyExistsError
    )
  })

  test("allows the same short code on another level", async ({ assert }) => {
    const firstLevel = await createLevel({ name: "Sixième", shortCode: "6E" })
    const secondLevel = await createLevel({ name: "Cinquième", shortCode: "5E" })

    await new CreateThemeAction().execute(firstLevel.id, {
      name: "Nombres",
      shortCode: "NBR",
      color: "#F97316",
    })
    const theme = await new CreateThemeAction().execute(secondLevel.id, {
      name: "Nombres",
      shortCode: "NBR",
      color: "#F97316",
    })

    assert.equal(theme.levelId, secondLevel.id)
  })

  test("updates an active theme without colliding with itself", async ({ assert }) => {
    const level = await createLevel()
    const theme = await new CreateThemeAction().execute(level.id, {
      name: "Proportionnalité",
      shortCode: "PROP",
      color: "#f97316",
    })

    const updatedTheme = await new UpdateThemeAction().execute(level.id, theme.id, {
      name: " Proportionnalité et pourcentages ",
      shortCode: " prop ",
      color: "#0ea5e9",
      noteMarkdown: "",
    })

    assert.equal(updatedTheme.name, "Proportionnalité et pourcentages")
    assert.equal(updatedTheme.shortCode, "PROP")
    assert.equal(updatedTheme.color, "#0EA5E9")
    assert.isNull(updatedTheme.noteMarkdown)
  })

  test("lists only active themes for a level", async ({ assert }) => {
    const level = await createLevel()
    const activeTheme = await new CreateThemeAction().execute(level.id, {
      name: "Algèbre",
      shortCode: "ALG",
      color: "#6366F1",
    })
    await Theme.create({
      id: randomUUID(),
      levelId: level.id,
      name: "Archive",
      shortCode: "ARCH",
      color: "#6B7280",
      archivedAt: DateTime.utc(),
    })

    const result = await new ListActiveThemesAction().execute(level.id)

    assert.equal(result.level.id, level.id)
    assert.deepEqual(
      result.themes.map((theme) => theme.id),
      [activeTheme.id]
    )
  })
})

async function createLevel(input: { name?: string; shortCode?: string } = {}) {
  return LevelFactory.merge({
    name: input.name ?? "Quatrième",
    shortCode: input.shortCode ?? "4E",
  }).create()
}
