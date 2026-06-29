import { randomUUID } from "node:crypto"
import type { NormalizeConstructor } from "@adonisjs/core/types/helpers"
import { BaseModel, beforeCreate } from "@adonisjs/lucid/orm"

type UuidPrimaryModel = {
  id?: string
}

type ModelWithUuidPrimaryClass<Model extends NormalizeConstructor<typeof BaseModel>> = Model & {
  assignUuidPrimary(model: UuidPrimaryModel): void
}

export function withUuidPrimary<Model extends NormalizeConstructor<typeof BaseModel>>(superclass: Model) {
  class ModelWithUuidPrimary extends superclass {
    @beforeCreate()
    static assignUuidPrimary(model: UuidPrimaryModel) {
      model.id ??= randomUUID()
    }
  }

  return ModelWithUuidPrimary as ModelWithUuidPrimaryClass<Model>
}
