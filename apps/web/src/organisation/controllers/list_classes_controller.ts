import ListOrganisationAction from "#organisation/actions/list_organisation_action"
import ClassTransformer from "#organisation/transformers/class_transformer"
import LevelTransformer from "#organisation/transformers/level_transformer"
import { classScopeValidator } from "#organisation/validators/organisation_validator"
import { inject } from "@adonisjs/core"
import type { HttpContext } from "@adonisjs/core/http"

@inject()
export default class ListClassesController {
  constructor(private readonly listOrganisation: ListOrganisationAction) {}

  async render({ inertia, request }: HttpContext) {
    const { level: levelId } = await request.validateUsing(classScopeValidator)
    if (!levelId) {
      const { schoolYear, levels } = await this.listOrganisation.levels()
      return inertia.render("organisation/classes/show", {
        schoolYear: { label: schoolYear.label, subject: schoolYear.subject },
        levels: LevelTransformer.transform(levels),
        selectedLevel: null,
        classes: [],
      })
    }
    const { schoolYear, level, levels, classes } = await this.listOrganisation.classes(levelId)
    return inertia.render("organisation/classes/show", {
      schoolYear: { label: schoolYear.label, subject: schoolYear.subject },
      levels: LevelTransformer.transform(
        levels.map((candidate) => ({ level: candidate, classCount: candidate.id === level.id ? classes.length : 0 }))
      ),
      selectedLevel: LevelTransformer.transform({ level, classCount: classes.length }),
      classes: ClassTransformer.transform(classes),
    })
  }
}
