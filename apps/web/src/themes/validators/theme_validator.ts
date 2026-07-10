import vine from "@vinejs/vine"
import {
  HEX_COLOR_PATTERN,
  THEME_NAME_MAX_LENGTH,
  THEME_NOTE_MAX_LENGTH,
  THEME_SHORT_CODE_MAX_LENGTH,
} from "../actions/theme_input.js"

const themeFields = {
  name: vine.string().trim().minLength(1).maxLength(THEME_NAME_MAX_LENGTH),
  shortCode: vine.string().trim().minLength(1).maxLength(THEME_SHORT_CODE_MAX_LENGTH),
  color: vine.string().trim().regex(HEX_COLOR_PATTERN).optional(),
  noteMarkdown: vine.string().trim().maxLength(THEME_NOTE_MAX_LENGTH).nullable().optional(),
}

export const createThemeValidator = vine.create(themeFields)
export const updateThemeValidator = vine.create(themeFields)
