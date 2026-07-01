import Level from "#models/level"
import SchoolYear from "#models/school_year"
import TeachingContentPageTransformer from "#teaching_content/transformers/teaching_content_page_transformer"
import { inject } from "@adonisjs/core"

@inject()
export default class RenderTeachingContentPageAction {
  constructor(private pageTransformer: TeachingContentPageTransformer) {}

  async execute(levelId: string) {
    const level = await Level.findOrFail(levelId)
    const schoolYear = await SchoolYear.findOrFail(level.schoolYearId)

    return this.pageTransformer.transform(level, schoolYear)
  }
}
