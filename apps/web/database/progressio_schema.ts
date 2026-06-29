import { BaseSchema } from "@adonisjs/lucid/schema"
import type { Knex } from "knex"

type CreateTableCallback = (table: Knex.CreateTableBuilder) => void

export default abstract class ProgressioSchema extends BaseSchema {
  protected createTable(tableName: string, callback: CreateTableCallback) {
    this.schema.createTable(tableName, (table) => {
      table.text("id").primary()
      callback(table)
      table.timestamps(true, true)
    })
  }
}
