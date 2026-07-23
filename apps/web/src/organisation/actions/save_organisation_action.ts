import TeachingClass from "#models/class"
import Level from "#models/level"
import SchoolYear from "#models/school_year"
import { randomUUID } from "node:crypto"

type OrganisationInput = { name: string; shortCode: string }

export default class SaveOrganisationAction {
  async createLevel(input: OrganisationInput) {
    const schoolYear = await SchoolYear.query().firstOrFail()
    return Level.create({ id: randomUUID(), schoolYearId: schoolYear.id, ...input })
  }

  async updateLevel(levelId: string, input: OrganisationInput) {
    const level = await Level.findOrFail(levelId)
    level.merge(input)
    await level.save()
    return level
  }

  async createClass(input: OrganisationInput & { levelId: string }) {
    const schoolYear = await SchoolYear.query().firstOrFail()
    await Level.query().where("id", input.levelId).where("school_year_id", schoolYear.id).firstOrFail()
    return TeachingClass.create({ id: randomUUID(), schoolYearId: schoolYear.id, ...input })
  }

  async updateClass(classId: string, input: OrganisationInput & { levelId: string }) {
    const teachingClass = await TeachingClass.findOrFail(classId)
    await Level.query().where("id", input.levelId).where("school_year_id", teachingClass.schoolYearId).firstOrFail()
    teachingClass.merge(input)
    await teachingClass.save()
    return teachingClass
  }
}
