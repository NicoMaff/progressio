import type SchoolYear from "#models/school_year"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class TeachingContentPageSchoolYearTransformer extends BaseTransformer<SchoolYear> {
  toObject() {
    return {
      id: this.resource.id,
      label: this.resource.label,
      subject: this.resource.subject,
    }
  }
}
