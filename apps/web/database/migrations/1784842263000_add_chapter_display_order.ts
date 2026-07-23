import WorkFileBackupService from "#work_files/services/work_file_backup_service"
import ProgressioSchema from "#database/progressio_schema"
import dbConfig from "#config/database"

type SqliteConnection = { filename?: unknown }

export default class extends ProgressioSchema {
  static disableTransactions = true

  protected tableName = "chapters"

  async up() {
    await this.backupExistingWorkFile()
    const columns = await this.db.rawQuery(`PRAGMA table_info(${this.tableName})`)
    if (!columns.some((column: { name: string }) => column.name === "display_order")) {
      await this.db.rawQuery("ALTER TABLE chapters ADD COLUMN display_order INTEGER NOT NULL DEFAULT 0")
    }
    await this.db.rawQuery(
      "CREATE INDEX IF NOT EXISTS chapters_level_id_theme_id_display_order_index ON chapters (level_id, theme_id, display_order)"
    )

    const chapters = await this.db
      .from(this.tableName)
      .select("id", "level_id", "theme_id")
      .orderBy("created_at", "asc")
    const positions = new Map<string, number>()
    for (const chapter of chapters) {
      const key = `${chapter.level_id}:${chapter.theme_id ?? "unassigned"}`
      const position = (positions.get(key) ?? 0) + 1
      positions.set(key, position)
      await this.db.from(this.tableName).where("id", chapter.id).update({ display_order: position })
    }
  }

  async down() {
    await this.db.rawQuery("DROP INDEX IF EXISTS chapters_level_id_theme_id_display_order_index")
    const columns = await this.db.rawQuery(`PRAGMA table_info(${this.tableName})`)
    if (columns.some((column: { name: string }) => column.name === "display_order")) {
      await this.schema.alterTable(this.tableName, (table) => table.dropColumn("display_order"))
    }
  }

  private async backupExistingWorkFile() {
    const connection = dbConfig.connections.sqlite.connection as SqliteConnection
    if (typeof connection.filename !== "string" || connection.filename === ":memory:") return
    const count = await this.db.from(this.tableName).count("* as total").first()
    if (Number(count?.total ?? 0) === 0) return
    await this.db.rawQuery("PRAGMA wal_checkpoint(FULL)")
    await new WorkFileBackupService().run(connection.filename)
  }
}
