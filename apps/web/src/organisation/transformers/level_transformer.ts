import type Level from "#models/level"
import { BaseTransformer } from "@adonisjs/core/transformers"

export type LevelWithClassCount = { level: Level; classCount: number }

export default class LevelTransformer extends BaseTransformer<LevelWithClassCount> {
  toObject() {
    return {
      id: this.resource.level.id,
      name: this.resource.level.name,
      shortCode: this.resource.level.shortCode,
      classCount: this.resource.classCount,
    }
  }
}
