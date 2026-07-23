import TeachingClass from "#models/class"
import Level from "#models/level"
import SchoolYear from "#models/school_year"

export type ProgressionsList = {
  schoolYear: { id: string; label: string; subject: string }
  levels: Array<{
    id: string
    name: string
    shortCode: string
    classes: Array<{ id: string; name: string; shortCode: string }>
  }>
}

export default class ListProgressionsAction {
  async execute(): Promise<ProgressionsList> {
    const schoolYear = await SchoolYear.query().firstOrFail()
    const [levels, classes] = await Promise.all([
      Level.query().where("school_year_id", schoolYear.id).orderBy("name"),
      TeachingClass.query().where("school_year_id", schoolYear.id).orderBy("name"),
    ])
    const classesByLevelId = new Map<string, TeachingClass[]>()

    for (const teachingClass of classes) {
      const levelClasses = classesByLevelId.get(teachingClass.levelId) ?? []
      levelClasses.push(teachingClass)
      classesByLevelId.set(teachingClass.levelId, levelClasses)
    }

    return {
      schoolYear: { id: schoolYear.id, label: schoolYear.label, subject: schoolYear.subject },
      levels: levels.map((level) => ({
        id: level.id,
        name: level.name,
        shortCode: level.shortCode,
        classes: (classesByLevelId.get(level.id) ?? []).map((teachingClass) => ({
          id: teachingClass.id,
          name: teachingClass.name,
          shortCode: teachingClass.shortCode,
        })),
      })),
    }
  }
}
