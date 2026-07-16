import SchoolYear from "#models/school_year"
import Level from "#models/level"
import WorkFileContext from "#work_files/services/work_file_context"
import app from "@adonisjs/core/services/app"
import testUtils from "@adonisjs/core/services/test_utils"
import { test } from "@japa/runner"
import { DateTime } from "luxon"

function extractInertiaPage(html: string) {
  const [, encodedPage] = html.match(/data-page="([^"]+)"/) ?? []
  if (!encodedPage) throw new Error("Missing Inertia page payload")
  return JSON.parse(encodedPage.replaceAll("&quot;", '"').replaceAll("&amp;", "&"))
}

class NoOpenWorkFileContext extends WorkFileContext {
  isOpen() {
    return false
  }
}

test.group("Application entry", (group) => {
  group.setup(() => testUtils.db().migrate())
  group.each.setup(async () => testUtils.db().wrapInGlobalTransaction())
  group.each.teardown(() => app.container.restore(WorkFileContext))

  test("opens the active work file without an authenticated user", async ({ assert, client }) => {
    const today = DateTime.local().startOf("day")
    await SchoolYear.create({
      label: "2025-2026",
      subject: "Mathématiques",
      startDate: today.minus({ months: 8 }),
      endDate: today.plus({ months: 4 }),
      firstTeachingDay: today.minus({ months: 8 }),
      teachingHourDurationMinutes: 55,
    })

    const response = await client.get("/")

    response.assertStatus(200)
    const page = extractInertiaPage(response.text())
    assert.equal(page.component, "home")
    assert.equal(page.props.dashboard.schoolYear.label, "2025-2026")
    assert.notProperty(page.props, "user")
  })

  test("does not expose the former authentication routes", async ({ client }) => {
    for (const route of ["/login", "/signup"]) {
      const response = await client.get(route)
      response.assertStatus(404)
    }

    for (const route of ["/login", "/signup", "/logout"]) {
      const response = await client.post(route)
      response.assertStatus(404)
    }
  })

  test("opens planning data without an authenticated user", async ({ client }) => {
    const today = DateTime.local().startOf("day")
    const schoolYear = await SchoolYear.create({
      label: "2025-2026",
      subject: "Mathématiques",
      startDate: today.minus({ months: 8 }),
      endDate: today.plus({ months: 4 }),
      firstTeachingDay: today.minus({ months: 8 }),
      teachingHourDurationMinutes: 55,
    })
    const level = await Level.create({ schoolYearId: schoolYear.id, name: "Première générale", shortCode: "1G" })

    const response = await client.get(`/dashboard/levels/${level.id}`)

    response.assertStatus(200)
  })

  test("renders No Work File Open without exposing planning data", async ({ assert, client }) => {
    app.container.swap(WorkFileContext, () => new NoOpenWorkFileContext())

    const response = await client.get("/")

    response.assertStatus(200)
    const page = extractInertiaPage(response.text())
    assert.equal(page.component, "work_files/no_work_file")
    assert.notProperty(page.props, "dashboard")
  })

  test("guards planning routes when no Work File is open", async ({ assert, client }) => {
    app.container.swap(WorkFileContext, () => new NoOpenWorkFileContext())

    const response = await client.get("/dashboard/levels/missing")

    response.assertStatus(200)
    const page = extractInertiaPage(response.text())
    assert.equal(page.component, "work_files/no_work_file")
  })
})
