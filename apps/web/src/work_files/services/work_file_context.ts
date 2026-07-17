import dbConfig from "#config/database"
import { existsSync } from "node:fs"

type SqliteConnection = {
  filename?: unknown
}

export default class WorkFileContext {
  isOpen() {
    const connection = dbConfig.connections.sqlite.connection as SqliteConnection

    return typeof connection.filename === "string" && existsSync(connection.filename)
  }
}
