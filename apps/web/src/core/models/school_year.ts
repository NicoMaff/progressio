import { SchoolYearSchema } from "#database/schema"
import { beforeCreate } from "@adonisjs/lucid/orm"
import { randomUUID } from "node:crypto"

export default class SchoolYear extends SchoolYearSchema {
  static table = "school_years"
  static selfAssignPrimaryKey = true

  @beforeCreate()
  static assignUuidPrimary(schoolYear: SchoolYear) {
    schoolYear.id ??= randomUUID()
  }
}
