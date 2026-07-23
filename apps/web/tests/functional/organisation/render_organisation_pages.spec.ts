import TeachingClass from "#models/class"
import Level from "#models/level"
import SchoolYear from "#models/school_year"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

function extractInertiaPage(html: string) {
  const [, encodedPage] = html.match(/data-page="([^"]+)"/) ?? []
  if (!encodedPage) throw new Error("Missing Inertia page payload")
  return JSON.parse(encodedPage.replaceAll("&quot;", '"').replaceAll("&amp;", "&"))
}

test.group("Organisation pages", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(async () => testUtils.db().wrapInGlobalTransaction())

  test("lists levels and scopes classes to the selected level in the URL", async ({ assert, client }) => {
    const today = DateTime.local().startOf("day")
    const schoolYear = await SchoolYear.create({
      label: "2025-2026",
      subject: "Mathématiques",
      startDate: today.minus({ months: 4 }),
      endDate: today.plus({ months: 6 }),
      firstTeachingDay: today.minus({ months: 4 }),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Première générale", shortCode: "1G" })
    const otherLevel = await Level.create({ schoolYearId: schoolYear.id, name: "Terminale générale", shortCode: "TG" })
    const teachingClass = await TeachingClass.create({
      schoolYearId: schoolYear.id,
      levelId: level.id,
      name: "Première A",
      shortCode: "1A",
    })
    await TeachingClass.create({
      schoolYearId: schoolYear.id,
      levelId: otherLevel.id,
      name: "Terminale A",
      shortCode: "TA",
    })

    const levelsResponse = await client.get("/organisation/levels")
    levelsResponse.assertStatus(200)
    const levelsPage = extractInertiaPage(levelsResponse.text())
    assert.equal(levelsPage.component, "organisation/levels/show")
    assert.deepEqual(levelsPage.props.levels, [
      { id: level.id, name: "Première générale", shortCode: "1G", classCount: 1 },
      { id: otherLevel.id, name: "Terminale générale", shortCode: "TG", classCount: 1 },
    ])

    const classesResponse = await client.get(`/organisation/classes?level=${level.id}`)
    classesResponse.assertStatus(200)
    const classesPage = extractInertiaPage(classesResponse.text())
    assert.equal(classesPage.component, "organisation/classes/show")
    assert.deepEqual(classesPage.props.selectedLevel, {
      id: level.id,
      name: "Première générale",
      shortCode: "1G",
      classCount: 1,
    })
    assert.deepEqual(classesPage.props.classes, [
      { id: teachingClass.id, levelId: level.id, name: "Première A", shortCode: "1A" },
    ])
  })

  test("shows level selection before opening an unscoped classes workspace", async ({ assert, client }) => {
    const today = DateTime.local().startOf("day")
    await SchoolYear.create({
      label: "2025-2026",
      subject: "Mathématiques",
      startDate: today.minus({ months: 4 }),
      endDate: today.plus({ months: 6 }),
      firstTeachingDay: today.minus({ months: 4 }),
      teachingHourDurationMinutes: 55,
    })
    const response = await client.get("/organisation/classes")
    response.assertStatus(200)
    const page = extractInertiaPage(response.text())
    assert.equal(page.component, "organisation/classes/show")
    assert.isNull(page.props.selectedLevel)
  })
})
