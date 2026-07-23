import type TeachingClass from "#models/class"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class ClassTransformer extends BaseTransformer<TeachingClass> {
  toObject() {
    return this.pick(this.resource, ["id", "levelId", "name", "shortCode"])
  }
}
