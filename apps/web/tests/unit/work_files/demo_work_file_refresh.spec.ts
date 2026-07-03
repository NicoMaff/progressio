import app from "@adonisjs/core/services/app"
import { test } from "@japa/runner"
import { randomUUID } from "node:crypto"
import { execFile } from "node:child_process"
import { DatabaseSync, type SQLInputValue } from "node:sqlite"
import { dirname } from "node:path"
import { promisify } from "node:util"

const execFileAsync = promisify(execFile)
const devWorkFilePath = app.makePath("storage/work_files/dev.sqlite")
const acePath = app.makePath("ace.js")

test.group("demo work-file refresh", () => {
  test("creates a migrated demo work file with representative domain data and replaces previous content", async ({
    assert,
  }) => {
    await runDemoWorkFileRefresh()

    assert.isTrue(hasTable("school_years"))
    assert.isTrue(hasTable("adonis_schema"))
    assert.isAbove(countRows("adonis_schema"), 0)

    assert.equal(countRows("school_years", "label = ?", ["2025-2026"]), 1)
    assert.isAtLeast(countRows("periods"), 2)
    assert.isAtMost(countRows("periods"), 3)

    for (const tableName of [
      "levels",
      "classes",
      "themes",
      "chapters",
      "activity_types",
      "activities",
      "template_progressions",
      "template_sessions",
      "template_session_activities",
      "slot_types",
      "recurring_slots",
      "planned_sessions",
      "planned_session_activities",
      "actual_sessions",
      "actual_session_activities",
      "interruption_types",
      "interruptions",
      "interruption_classes",
      "planning_conflicts",
    ]) {
      assert.isAbove(countRows(tableName), 0, `${tableName} should have demo records`)
    }

    assert.isAbove(
      countRows(
        "activities",
        `
          archived_at IS NOT NULL
          AND EXISTS (
            SELECT 1
            FROM template_session_activities
            WHERE template_session_activities.activity_id = activities.id
          )
        `
      ),
      0
    )
    assert.isAbove(countRows("actual_sessions", "planned_session_id IS NULL AND state = ?", ["completed"]), 0)
    assert.isAbove(countRows("actual_sessions", "state = ? AND session_date < date('now')", ["draft"]), 0)
    assert.isAbove(countRows("planned_sessions", "outcome IN (?, ?)", ["cancelled", "to_catch_up"]), 0)
    assert.isAbove(countRows("actual_session_activities", "replaces_planned_session_activity_id IS NOT NULL"), 0)
    assert.isAbove(countRows("planning_conflicts", "resolved_at IS NULL"), 0)

    insertExtraSchoolYear()
    assert.equal(countRows("school_years", "label = ?", ["REMOVED-BY-REFRESH"]), 1)

    await runDemoWorkFileRefresh()

    assert.equal(countRows("school_years", "label = ?", ["REMOVED-BY-REFRESH"]), 0)
    assert.equal(countRows("school_years", "label = ?", ["2025-2026"]), 1)
  }).timeout(120000)
})

async function runDemoWorkFileRefresh() {
  await execFileAsync(process.execPath, [acePath, "dev:refresh-work-file"], {
    cwd: dirname(acePath),
    env: {
      ...process.env,
      TZ: "UTC",
      NODE_ENV: "development",
      PORT: "3333",
      HOST: "localhost",
      LOG_LEVEL: "silent",
      APP_KEY: "zKXHe-Ahdb7aPK1ylAJlRgTefktEaACi",
      APP_URL: "http://localhost:3333",
      SESSION_DRIVER: "cookie",
      WORK_FILE_PATH: "storage/work_files/dev.sqlite",
    },
    timeout: 60000,
  })
}

function hasTable(tableName: string) {
  return (
    withDatabase((database) =>
      database.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get(tableName)
    ) !== undefined
  )
}

function countRows(tableName: string, whereClause?: string, bindings: SQLInputValue[] = []) {
  const result = withDatabase((database) =>
    database
      .prepare(`SELECT COUNT(*) AS total FROM ${tableName}${whereClause ? ` WHERE ${whereClause}` : ""}`)
      .get(...bindings)
  ) as { total: number | bigint }

  return Number(result.total)
}

function insertExtraSchoolYear() {
  withDatabase((database) => {
    const now = new Date().toISOString()

    database
      .prepare(
        `
          INSERT INTO school_years (
            id,
            label,
            subject,
            start_date,
            end_date,
            first_teaching_day,
            teaching_hour_duration_minutes,
            created_at,
            updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
      )
      .run(randomUUID(), "REMOVED-BY-REFRESH", "Mathématiques", "2025-09-01", "2026-07-04", "2025-09-02", 55, now, now)
  })
}

function withDatabase<T>(callback: (database: DatabaseSync) => T) {
  const database = new DatabaseSync(devWorkFilePath)

  try {
    return callback(database)
  } finally {
    database.close()
  }
}
