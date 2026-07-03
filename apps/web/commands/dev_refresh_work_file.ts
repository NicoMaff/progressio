import { BaseCommand } from "@adonisjs/core/ace"
import app from "@adonisjs/core/services/app"
import { mkdir } from "node:fs/promises"
import { dirname, resolve } from "node:path"

const DEV_WORK_FILE_RELATIVE_PATH = "storage/work_files/dev.sqlite"

type SqliteConnectionValue = {
  filename?: unknown
}

export default class DevRefreshWorkFile extends BaseCommand {
  static commandName = "dev:refresh-work-file"
  static description = "Refresh the local development demo work file"
  static options = {
    startApp: true,
  }

  async run() {
    if (!this.app.inDev) {
      this.logger.error("The demo work-file refresh workflow is only available in development.")
      this.exitCode = 1
      return
    }

    const workFilePath = app.makePath(DEV_WORK_FILE_RELATIVE_PATH)

    await mkdir(dirname(workFilePath), { recursive: true })
    await this.assertDevWorkFileConnection(workFilePath)

    this.logger.info(`Refreshing demo work file at ${workFilePath}`)

    await this.execOrFail("db:wipe", ["--force"])
    await this.execOrFail("migration:run", ["--force"])
    await this.execOrFail("db:seed", ["--files=./database/seeders/demo_work_file/index_seeder.ts"])

    this.logger.success("Demo work file refreshed.")
  }

  private async execOrFail(commandName: string, args: string[]) {
    const command = await this.kernel.exec(commandName, args)

    if (command.exitCode) {
      this.exitCode = command.exitCode
      throw command.error ?? new Error(`Command "${commandName}" failed with exit code ${command.exitCode}`)
    }
  }

  private async assertDevWorkFileConnection(workFilePath: string) {
    const db = await this.app.container.make("lucid.db")
    const connectionConfig = db.config.connections[db.primaryConnectionName]
    const connectionValue = "connection" in connectionConfig ? connectionConfig.connection : undefined
    const filename =
      typeof connectionValue === "object" && connectionValue !== null
        ? (connectionValue as SqliteConnectionValue).filename
        : undefined

    if (typeof filename !== "string" || resolve(filename) !== resolve(workFilePath)) {
      this.logger.error(`Refusing to refresh a non-demo work file. Active database file: ${filename}`)
      this.exitCode = 1
      throw new Error("The demo work-file refresh workflow must target apps/web/storage/work_files/dev.sqlite.")
    }
  }
}
