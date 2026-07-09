import Level from "#models/level"
import SchoolYear from "#models/school_year"
import { ActivityFactory, ChapterFactory, ThemeFactory } from "#database/factories"
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
    }).create()
    await ActivityFactory.merge({
      levelId: level.id,
      chapterId: chapter.id,
      title: "Découvrir les suites",
    }).create()

    const response = await client.get(`/teaching-content/levels/${level.id}`)
    const inertiaPage = extractInertiaPage(response.text())

    response.assertStatus(200)
    assert.containsSubset(inertiaPage, {
      component: "teaching_content/show",
      props: {
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
            noteMarkdown: null,
          },
        ],
      },
    })
  })
})
