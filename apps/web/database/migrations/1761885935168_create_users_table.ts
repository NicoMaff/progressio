import ProgressioSchema from "#database/progressio_schema"

export default class extends ProgressioSchema {
  protected tableName = "users"

  async up() {
    this.createTable(this.tableName, (table) => {
      table.string("full_name").nullable()
      table.string("email", 254).notNullable().unique()
      table.string("password").notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
