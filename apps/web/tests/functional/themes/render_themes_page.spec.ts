import Level from "#models/level"
import SchoolYear from "#models/school_year"
import { ThemeFactory } from "#database/factories"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

function extractInertiaPage(html: string) {
  const [, encodedPage] = html.match(/data-page="([^"]+)"/) ?? []
  if (!encodedPage) {
    throw new Error("Missing Inertia page payload")
  }

  return JSON.parse(encodedPage.replaceAll("&quot;", '"').replaceAll("&amp;", "&"))
}

test.group("Themes page", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(async () => testUtils.db().wrapInGlobalTransaction())

  test("renders the active themes page", async ({ assert, client }) => {
    const schoolYear = await SchoolYear.create({
      label: "2026-2027",
      subject: "Mathématiques",
      startDate: DateTime.fromISO("2026-09-01"),
      endDate: DateTime.fromISO("2027-07-05"),
      firstTeachingDay: DateTime.fromISO("2026-09-02"),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Terminale générale", shortCode: "TG" })
    const activeTheme = await ThemeFactory.merge({
      levelId: level.id,
      name: "Probabilités",
      shortCode: "PROBA",
    }).create()
    await ThemeFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()

    const response = await client.get(`/levels/${level.id}/themes`)
    const inertiaPage = extractInertiaPage(response.text())

    response.assertStatus(200)
    assert.containsSubset(inertiaPage, {
      component: "themes/index",
      props: {
        level: { id: level.id, name: "Terminale générale", shortCode: "TG" },
        schoolYear: { id: schoolYear.id, label: "2026-2027", subject: "Mathématiques" },
        themes: [{ id: activeTheme.id, name: "Probabilités", shortCode: "PROBA" }],
      },
    })
    assert.lengthOf(inertiaPage.props.themes, 1)
    assert.containsSubset(inertiaPage.props.themes[0], {
      color: "#6366F1",
      chapterCount: 0,
      displayOrder: activeTheme.displayOrder,
      archivedAt: null,
    })

    const editorResponse = await client.get(`/levels/${level.id}/themes/${activeTheme.id}/edit`)
    const editorPage = extractInertiaPage(editorResponse.text())
    editorResponse.assertStatus(200)
    assert.containsSubset(editorPage, { component: "themes/edit", props: { theme: { id: activeTheme.id } } })
  })

  test("asks the teacher to select a level before opening the themes workspace", async ({ assert, client }) => {
    const schoolYear = await SchoolYear.create({
      label: "2026-2027",
      subject: "Mathématiques",
      startDate: DateTime.fromISO("2026-09-01"),
      endDate: DateTime.fromISO("2027-07-05"),
      firstTeachingDay: DateTime.fromISO("2026-09-02"),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Première générale", shortCode: "1G" })

    const response = await client.get("/themes")
    const inertiaPage = extractInertiaPage(response.text())

    response.assertStatus(200)
    assert.containsSubset(inertiaPage, {
      component: "themes/select_level",
      props: { levels: [{ id: level.id, name: "Première générale", shortCode: "1G" }] },
    })
  })

  test("renders archived themes by name and restores them back to their workspace", async ({ assert, client }) => {
    const schoolYear = await SchoolYear.create({
      label: "2026-2027",
      subject: "Mathématiques",
      startDate: DateTime.fromISO("2026-09-01"),
      endDate: DateTime.fromISO("2027-07-05"),
      firstTeachingDay: DateTime.fromISO("2026-09-02"),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Première générale", shortCode: "1G" })
    const zeta = await ThemeFactory.merge({ levelId: level.id, name: "Zeta", shortCode: "Z" }).create()
    const alpha = await ThemeFactory.merge({ levelId: level.id, name: "Alpha", shortCode: "A" }).create()
    await zeta.merge({ archivedAt: DateTime.utc() }).save()
    await alpha.merge({ archivedAt: DateTime.utc() }).save()

    const archiveResponse = await client.get(`/levels/${level.id}/themes/archive`)
    const inertiaPage = extractInertiaPage(archiveResponse.text())

    archiveResponse.assertStatus(200)
    assert.deepEqual(
      inertiaPage.props.themes.map((theme: { name: string }) => theme.name),
      ["Alpha", "Zeta"]
    )

    const restoreResponse = await client
      .post(`/levels/${level.id}/themes/${alpha.id}/restore`)
      .header("referer", `/levels/${level.id}/themes/archive`)
    restoreResponse.assertRedirectsTo(`/levels/${level.id}/themes/archive`)
  })

  test("archives an active theme and returns to the workspace", async ({ client }) => {
    const schoolYear = await SchoolYear.create({
      label: "2026-2027",
      subject: "Mathématiques",
      startDate: DateTime.fromISO("2026-09-01"),
      endDate: DateTime.fromISO("2027-07-05"),
      firstTeachingDay: DateTime.fromISO("2026-09-02"),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Première générale", shortCode: "1G" })
    const theme = await ThemeFactory.merge({ levelId: level.id }).create()
    const workspaceUrl = `/levels/${level.id}/themes`

    const archiveResponse = await client
      .post(`/levels/${level.id}/themes/${theme.id}/archive`)
      .header("referer", workspaceUrl)
    archiveResponse.assertRedirectsTo(workspaceUrl)
  })
})
