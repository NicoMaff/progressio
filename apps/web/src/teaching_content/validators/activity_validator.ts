import vine from "@vinejs/vine"
import {
  ACTIVITY_ESTIMATED_DURATION_MAX_MINUTES,
  ACTIVITY_NOTE_MAX_LENGTH,
  ACTIVITY_TITLE_MAX_LENGTH,
} from "../actions/activity_input.js"

const activityFields = {
  title: vine.string().trim().minLength(1).maxLength(ACTIVITY_TITLE_MAX_LENGTH),
  chapterId: vine.string().trim().maxLength(36).nullable().optional(),
  activityTypeId: vine.string().trim().maxLength(36),
  estimatedDurationMinutes: vine.number().min(1).max(ACTIVITY_ESTIMATED_DURATION_MAX_MINUTES).nullable().optional(),
  noteMarkdown: vine.string().trim().maxLength(ACTIVITY_NOTE_MAX_LENGTH).nullable().optional(),
}

export const createActivityValidator = vine.create(activityFields)
export const updateActivityValidator = vine.create(activityFields)
