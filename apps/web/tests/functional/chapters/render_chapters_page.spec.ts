import Level from "#models/level"
import SchoolYear from "#models/school_year"
import { ChapterFactory, ThemeFactory } from "#database/factories"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

function extractInertiaPage(html: string) {
  const [, encodedPage] = html.match(/data-page="([^"]+)"/) ?? []
  if (!encodedPage) throw new Error("Missing Inertia page payload")
  return JSON.parse(encodedPage.replaceAll("&quot;", '"').replaceAll("&amp;", "&"))
}

test.group("Chapters page", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(async () => testUtils.db().wrapInGlobalTransaction())

  test("requires an explicit level and groups active chapters by theme", async ({ assert, client }) => {
    const schoolYear = await SchoolYear.create({
      label: "2026-2027",
      subject: "Mathématiques",
      startDate: DateTime.fromISO("2026-09-01"),
      endDate: DateTime.fromISO("2027-07-05"),
      firstTeachingDay: DateTime.fromISO("2026-09-02"),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Terminale générale", shortCode: "TG" })
    const theme = await ThemeFactory.merge({
      levelId: level.id,
      name: "Algèbre",
      shortCode: "ALG",
      displayOrder: 1,
    }).create()
    const chapter = await ChapterFactory.merge({
      levelId: level.id,
      themeId: theme.id,
      name: "Équations",
      shortCode: "EQU",
      displayOrder: 1,
    }).create()
    await ChapterFactory.merge({ levelId: level.id, name: "Sans groupe", shortCode: "SG", displayOrder: 1 }).create()

    const page = await client.get(`/levels/${level.id}/chapters`)
    const inertiaPage = extractInertiaPage(page.text())
    page.assertStatus(200)
    assert.equal(inertiaPage.component, "chapters/index")
    assert.containsSubset(inertiaPage.props.chapters, [{ id: chapter.id, themeId: theme.id, displayOrder: 1 }])

    const selector = await client.get("/chapters")
    selector.assertStatus(200)
    assert.equal(extractInertiaPage(selector.text()).component, "chapters/select_level")
  })

  test("sorts the archive by name and restores a chapter", async ({ assert, client }) => {
    const schoolYear = await SchoolYear.create({
      label: "2026-2027",
      subject: "Mathématiques",
      startDate: DateTime.fromISO("2026-09-01"),
      endDate: DateTime.fromISO("2027-07-05"),
      firstTeachingDay: DateTime.fromISO("2026-09-02"),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Première", shortCode: "1G" })
    const zeta = await ChapterFactory.merge({ levelId: level.id, name: "Zeta", shortCode: "Z" }).create()
    const alpha = await ChapterFactory.merge({ levelId: level.id, name: "Alpha", shortCode: "A" }).create()
    await zeta.merge({ archivedAt: DateTime.utc() }).save()
    await alpha.merge({ archivedAt: DateTime.utc() }).save()

    const archive = await client.get(`/levels/${level.id}/chapters/archive`)
    const archivePage = extractInertiaPage(archive.text())
    assert.deepEqual(
      archivePage.props.chapters.map((item: { name: string }) => item.name),
      ["Alpha", "Zeta"]
    )

    const restore = await client
      .post(`/levels/${level.id}/chapters/${alpha.id}/restore`)
      .header("referer", `/levels/${level.id}/chapters/archive`)
    restore.assertRedirectsTo(`/levels/${level.id}/chapters/archive`)
  })
})
