import { teachingContentArchiveFilters } from "#teaching_content/actions/render_teaching_content_page_action"
import vine from "@vinejs/vine"

export const teachingContentArchiveFilterValidator = vine.create({
  archiveFilter: vine.enum(teachingContentArchiveFilters).optional(),
})
