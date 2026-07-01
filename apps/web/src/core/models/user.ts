import { UserSchema } from "#database/schema"
import { withUuidPrimary } from "#models/mixins/with_uuid_primary"
import hash from "@adonisjs/core/services/hash"
import { compose } from "@adonisjs/core/helpers"
import { withAuthFinder } from "@adonisjs/auth/mixins/lucid"

export default class User extends compose(UserSchema, withUuidPrimary, withAuthFinder(hash)) {
  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(" ") : this.email.split("@")
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }
}
