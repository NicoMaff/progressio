import { PlannedSessionActivitySchema } from "#database/schema"
import { withUuidPrimary } from "#models/mixins/with_uuid_primary"
import { compose } from "@adonisjs/core/helpers"

export default class PlannedSessionActivity extends compose(PlannedSessionActivitySchema, withUuidPrimary) {}
