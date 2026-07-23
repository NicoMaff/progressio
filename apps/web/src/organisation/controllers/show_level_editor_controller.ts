import Level from "#models/level"
import SchoolYear from "#models/school_year"
import LevelTransformer from "#organisation/transformers/level_transformer"
import type { HttpContext } from "@adonisjs/core/http"

export default class ShowLevelEditorController {
  async render({ inertia, params }: HttpContext) {
    const schoolYear = await SchoolYear.query().firstOrFail()
    const level = await Level.query().where("id", params.levelId).where("school_year_id", schoolYear.id).firstOrFail()
    return inertia.render("organisation/levels/edit", {
      schoolYear: { label: schoolYear.label, subject: schoolYear.subject },
      level: LevelTransformer.transform({ level, classCount: 0 }),
    })
  }
}
