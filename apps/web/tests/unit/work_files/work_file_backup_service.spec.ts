import WorkFileBackupService from "#work_files/services/work_file_backup_service"
import { test } from "@japa/runner"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { tmpdir } from "node:os"

test.group("Work File backup service", (group) => {
  let temporaryDirectory: string

  group.each.setup(async () => {
    temporaryDirectory = await mkdtemp(join(tmpdir(), "progressio-work-file-backup-"))
  })

  group.each.teardown(async () => {
    await rm(temporaryDirectory, { recursive: true, force: true })
  })

  test("creates a dated copy beside the Work File", async ({ assert }) => {
    const workFilePath = join(temporaryDirectory, "school-year.sqlite")
    await writeFile(workFilePath, "teaching data")

    const backupPath = await new WorkFileBackupService().run(workFilePath, new Date("2026-07-16T12:34:56.789Z"))

    assert.equal(backupPath, join(temporaryDirectory, "school-year.backup-2026-07-16T12-34-56-789Z.sqlite"))
    assert.equal(await readFile(backupPath, "utf8"), "teaching data")
  })
})
