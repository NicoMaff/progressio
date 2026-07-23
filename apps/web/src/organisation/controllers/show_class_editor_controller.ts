import TeachingClass from "#models/class"
import Level from "#models/level"
import SchoolYear from "#models/school_year"
import ClassTransformer from "#organisation/transformers/class_transformer"
import type { HttpContext } from "@adonisjs/core/http"

export default class ShowClassEditorController {
  async render({ inertia, params }: HttpContext) {
    const schoolYear = await SchoolYear.query().firstOrFail()
    const teachingClass = await TeachingClass.query()
      .where("id", params.classId)
      .where("school_year_id", schoolYear.id)
      .firstOrFail()
    const levels = await Level.query().where("school_year_id", schoolYear.id).orderBy("short_code")
    return inertia.render("organisation/classes/edit", {
      teachingClass: ClassTransformer.transform(teachingClass),
      levels: levels.map(({ id, name, shortCode }) => ({ id, name, shortCode })),
    })
  }
}
