import { InterruptionTypeSchema } from "#database/schema"
import { withUuidPrimary } from "#models/mixins/with_uuid_primary"
import { compose } from "@adonisjs/core/helpers"

export default class InterruptionType extends compose(InterruptionTypeSchema, withUuidPrimary) {}
