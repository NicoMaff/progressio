import { ThemeSchema } from "#database/schema"
import { beforeCreate } from "@adonisjs/lucid/orm"
import { randomUUID } from "node:crypto"

export default class Theme extends ThemeSchema {
  static table = "themes"
  static selfAssignPrimaryKey = true

  @beforeCreate()
  static assignUuidPrimary(theme: Theme) {
    theme.id ??= randomUUID()
  }
}
