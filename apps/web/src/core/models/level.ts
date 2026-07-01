import { LevelSchema } from "#database/schema"
import { beforeCreate } from "@adonisjs/lucid/orm"
import { randomUUID } from "node:crypto"

export default class Level extends LevelSchema {
  static table = "levels"
  static selfAssignPrimaryKey = true

  @beforeCreate()
  static assignUuidPrimary(level: Level) {
    level.id ??= randomUUID()
  }
}
