import TeachingClass from "#models/class"
import Level from "#models/level"
import SchoolYear from "#models/school_year"

export default class ListOrganisationAction {
  async levels() {
    const schoolYear = await SchoolYear.query().firstOrFail()
    const [levels, classes] = await Promise.all([
      Level.query().where("school_year_id", schoolYear.id).orderBy("short_code").orderBy("name"),
      TeachingClass.query().where("school_year_id", schoolYear.id),
    ])
    const classCounts = new Map<string, number>()
    for (const teachingClass of classes) {
      classCounts.set(teachingClass.levelId, (classCounts.get(teachingClass.levelId) ?? 0) + 1)
    }
    return { schoolYear, levels: levels.map((level) => ({ level, classCount: classCounts.get(level.id) ?? 0 })) }
  }

  async classes(levelId: string) {
    const schoolYear = await SchoolYear.query().firstOrFail()
    const level = await Level.query().where("id", levelId).where("school_year_id", schoolYear.id).firstOrFail()
    const [levels, classes] = await Promise.all([
      Level.query().where("school_year_id", schoolYear.id).orderBy("short_code").orderBy("name"),
      TeachingClass.query().where("level_id", level.id).orderBy("short_code").orderBy("name"),
    ])
    return { schoolYear, level, levels, classes }
  }
}
