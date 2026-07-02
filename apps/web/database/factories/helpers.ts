import TeachingClass from "#models/class"
import Level from "#models/level"
import type { QueryClientContract } from "@adonisjs/lucid/types/database"

let sequence = 1

export type FactoryRuntimeContext = {
  $trx: QueryClientContract | undefined
}

export type DomainFactory = {
  client(client: QueryClientContract): DomainFactory
  create(): Promise<unknown>
  merge(attributes: object): DomainFactory
}

export function nextSequence() {
  return sequence++
}

export function isMissing(value: unknown) {
  return value === null || value === undefined
}

export async function createRelated<Model>(
  domainFactory: DomainFactory,
  ctx: FactoryRuntimeContext,
  attributes?: object
) {
  let builder = attributes === undefined ? domainFactory : domainFactory.merge(attributes)

  if (ctx.$trx !== undefined) {
    builder = builder.client(ctx.$trx)
  }

  return (await builder.create()) as Model
}

export async function createRelatedId<Model extends { id: string }>(
  domainFactory: DomainFactory,
  ctx: FactoryRuntimeContext,
  attributes?: object
) {
  const record = await createRelated<Model>(domainFactory, ctx, attributes)

  return record.id
}

export async function findSchoolYearIdForLevel(levelId: string) {
  const level = await Level.findOrFail(levelId)

  return level.schoolYearId
}

export async function findSchoolYearIdForClass(classId: string) {
  const teachingClass = await TeachingClass.findOrFail(classId)

  return teachingClass.schoolYearId
}

export async function findLevelIdForClass(classId: string) {
  const teachingClass = await TeachingClass.findOrFail(classId)

  return teachingClass.levelId
}
