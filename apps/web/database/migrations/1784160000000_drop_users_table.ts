import WorkFileBackupService from "#work_files/services/work_file_backup_service"
import ProgressioSchema from "#database/progressio_schema"
import dbConfig from "#config/database"

type SqliteConnection = {
  filename?: unknown
}

export default class extends ProgressioSchema {
  static disableTransactions = true

  protected tableName = "users"

  async up() {
    if (!(await this.schema.hasTable(this.tableName))) {
      return
    }

    await this.backupExistingWorkFile()
    this.schema.dropTable(this.tableName)
  }

  async down() {
    this.createTable(this.tableName, (table) => {
      table.string("full_name").nullable()
      table.string("email", 254).notNullable().unique()
      table.string("password").notNullable()
    })
  }

  private async backupExistingWorkFile() {
    if (!(await this.schema.hasTable("school_years"))) {
      return
    }

    const result = await this.db.from("school_years").count("* as total").first()
    if (Number(result?.total) === 0) {
      return
    }

    const connection = dbConfig.connections.sqlite.connection as SqliteConnection
    if (typeof connection.filename !== "string" || connection.filename === ":memory:") {
      throw new Error("Cannot create the required Work File backup before removing user persistence.")
    }

    await this.db.rawQuery("PRAGMA wal_checkpoint(FULL)")
    await new WorkFileBackupService().run(connection.filename)
  }
}
