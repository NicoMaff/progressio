import Level from "#models/level"
import SchoolYear from "#models/school_year"
import { ActivityFactory, ActivityTypeFactory, ChapterFactory, ThemeFactory } from "#database/factories"
import { test } from "@japa/runner"
import testUtils from "@adonisjs/core/services/test_utils"
import { DateTime } from "luxon"

function extractInertiaPage(html: string) {
  const [, encodedPage] = html.match(/data-page="([^"]+)"/) ?? []
  if (!encodedPage) {
    throw new Error("Missing Inertia page payload")
  }

  return JSON.parse(encodedPage.replaceAll("&quot;", '"').replaceAll("&amp;", "&"))
}

test.group("Teaching content page", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(async () => {
    return testUtils.db().wrapInGlobalTransaction()
  })

  test("renders the level-scoped teaching content page contract", async ({ assert, client }) => {
    const schoolYear = await SchoolYear.create({
      label: "2026-2027",
      subject: "Mathématiques",
      startDate: DateTime.fromISO("2026-09-01"),
      endDate: DateTime.fromISO("2027-07-05"),
      firstTeachingDay: DateTime.fromISO("2026-09-02"),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({
      schoolYearId: schoolYear.id,
      name: "Première générale",
      shortCode: "1G",
    })
    const theme = await ThemeFactory.merge({
      levelId: level.id,
      name: "Analyse",
      shortCode: "ANA",
      color: "#0EA5E9",
    }).create()
    const chapter = await ChapterFactory.merge({
      levelId: level.id,
      themeId: theme.id,
      name: "Suites numériques",
      shortCode: "SUIT",
      noteMarkdown: "Note de chapitre privée",
    }).create()
    const activityType = await ActivityTypeFactory.merge({
      schoolYearId: schoolYear.id,
      name: "Exercice",
      color: "#22C55E",
      displayOrder: 10,
    }).create()
    const activity = await ActivityFactory.merge({
      levelId: level.id,
      chapterId: chapter.id,
      activityTypeId: activityType.id,
      title: "Découvrir les suites",
      estimatedDurationMinutes: 55,
      noteMarkdown: "Note d’activité privée",
    }).create()

    const response = await client.get(`/teaching-content/levels/${level.id}`)
    const inertiaPage = extractInertiaPage(response.text())

    response.assertStatus(200)
    assert.containsSubset(inertiaPage, {
      component: "teaching_content/show",
      props: {
        archiveFilter: "active",
        level: {
          id: level.id,
          name: "Première générale",
          shortCode: "1G",
        },
        schoolYear: {
          id: schoolYear.id,
          label: "2026-2027",
          subject: "Mathématiques",
        },
        themes: [
          {
            id: theme.id,
            name: "Analyse",
            shortCode: "ANA",
            color: "#0EA5E9",
            archivedAt: null,
            chapterCount: 1,
          },
        ],
        chapters: [
          {
            id: chapter.id,
            name: "Suites numériques",
            shortCode: "SUIT",
            themeId: theme.id,
            theme: {
              id: theme.id,
              name: "Analyse",
              shortCode: "ANA",
              color: "#0EA5E9",
            },
            archivedAt: null,
            activityCount: 1,
            noteMarkdown: "Note de chapitre privée",
          },
        ],
        activityTypes: [
          {
            id: activityType.id,
            name: "Exercice",
            color: "#22C55E",
            displayOrder: 10,
          },
        ],
        activities: [
          {
            id: activity.id,
            title: "Découvrir les suites",
            chapterId: chapter.id,
            chapter: {
              id: chapter.id,
              name: "Suites numériques",
              shortCode: "SUIT",
            },
            activityTypeId: activityType.id,
            activityType: {
              id: activityType.id,
              name: "Exercice",
              color: "#22C55E",
            },
            estimatedDurationMinutes: 55,
            archivedAt: null,
            noteMarkdown: "Note d’activité privée",
          },
        ],
      },
    })

    assert.deepEqual(Object.keys(inertiaPage.props.level).sort(), ["id", "name", "shortCode"])
    assert.deepEqual(Object.keys(inertiaPage.props.schoolYear).sort(), ["id", "label", "subject"])
    assert.deepEqual(Object.keys(inertiaPage.props.themes[0]).sort(), [
      "archivedAt",
      "chapterCount",
      "color",
      "id",
      "name",
      "shortCode",
    ])
    assert.deepEqual(Object.keys(inertiaPage.props.chapters[0]).sort(), [
      "activityCount",
      "archivedAt",
      "id",
      "name",
      "noteMarkdown",
      "shortCode",
      "theme",
      "themeId",
    ])
    assert.deepEqual(Object.keys(inertiaPage.props.activityTypes[0]).sort(), ["color", "displayOrder", "id", "name"])
    assert.deepEqual(Object.keys(inertiaPage.props.activities[0]).sort(), [
      "activityType",
      "activityTypeId",
      "archivedAt",
      "chapter",
      "chapterId",
      "estimatedDurationMinutes",
      "id",
      "noteMarkdown",
      "title",
    ])
  })

  test("renders archived content with its parent projections", async ({ assert, client }) => {
    const schoolYear = await SchoolYear.create({
      label: "2026-2027",
      subject: "Mathématiques",
      startDate: DateTime.fromISO("2026-09-01"),
      endDate: DateTime.fromISO("2027-07-05"),
      firstTeachingDay: DateTime.fromISO("2026-09-02"),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Seconde", shortCode: "2DE" })
    const theme = await ThemeFactory.merge({ levelId: level.id }).create()
    const chapter = await ChapterFactory.merge({
      levelId: level.id,
      themeId: theme.id,
      archivedAt: DateTime.utc(),
    }).create()
    const activityType = await ActivityTypeFactory.merge({ schoolYearId: schoolYear.id }).create()
    const activity = await ActivityFactory.merge({
      levelId: level.id,
      chapterId: chapter.id,
      activityTypeId: activityType.id,
      archivedAt: DateTime.utc(),
    }).create()

    const response = await client.get(`/teaching-content/levels/${level.id}?archiveFilter=archived`)
    const inertiaPage = extractInertiaPage(response.text())

    response.assertStatus(200)
    assert.equal(inertiaPage.props.archiveFilter, "archived")
    assert.deepEqual(inertiaPage.props.themes, [])
    assert.containsSubset(inertiaPage.props.chapters, [{ id: chapter.id, theme: { id: theme.id } }])
    assert.containsSubset(inertiaPage.props.activities, [{ id: activity.id, chapter: { id: chapter.id } }])
    assert.isNotNull(inertiaPage.props.chapters[0].archivedAt)
    assert.isNotNull(inertiaPage.props.activities[0].archivedAt)
  })

  test("redirects back when restoring a chapter with an archived theme", async ({ assert, client }) => {
    const schoolYear = await SchoolYear.create({
      label: "2026-2027",
      subject: "Mathématiques",
      startDate: DateTime.fromISO("2026-09-01"),
      endDate: DateTime.fromISO("2027-07-05"),
      firstTeachingDay: DateTime.fromISO("2026-09-02"),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Seconde", shortCode: "2DE" })
    const theme = await ThemeFactory.merge({ levelId: level.id, archivedAt: DateTime.utc() }).create()
    const chapter = await ChapterFactory.merge({
      levelId: level.id,
      themeId: theme.id,
      archivedAt: DateTime.utc(),
    }).create()
    const basePageUrl = `/teaching-content/levels/${level.id}`

    const restoreResponse = await client
      .post(`/levels/${level.id}/chapters/${chapter.id}/restore`)
      .header("referer", basePageUrl)
    restoreResponse.assertRedirectsTo(basePageUrl)

    await chapter.refresh()
    assert.isNotNull(chapter.archivedAt)
  })

  test("redirects back with a success flash after creating a theme", async ({ client }) => {
    const schoolYear = await SchoolYear.create({
      label: "2026-2027",
      subject: "Mathématiques",
      startDate: DateTime.fromISO("2026-09-01"),
      endDate: DateTime.fromISO("2027-07-05"),
      firstTeachingDay: DateTime.fromISO("2026-09-02"),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Seconde", shortCode: "2DE" })
    const basePageUrl = `/teaching-content/levels/${level.id}`

    const createResponse = await client
      .post(`/levels/${level.id}/themes`)
      .header("referer", basePageUrl)
      .form({ name: "Analyse", shortCode: "ANA" })
    createResponse.assertRedirectsTo(basePageUrl)
  })
})
