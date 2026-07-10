import vine from "@vinejs/vine"
import {
  CHAPTER_NAME_MAX_LENGTH,
  CHAPTER_NOTE_MAX_LENGTH,
  CHAPTER_SHORT_CODE_MAX_LENGTH,
} from "../actions/chapter_input.js"

const chapterFields = {
  name: vine.string().trim().minLength(1).maxLength(CHAPTER_NAME_MAX_LENGTH),
  shortCode: vine.string().trim().minLength(1).maxLength(CHAPTER_SHORT_CODE_MAX_LENGTH),
  themeId: vine.string().trim().maxLength(36).nullable().optional(),
  noteMarkdown: vine.string().trim().maxLength(CHAPTER_NOTE_MAX_LENGTH).nullable().optional(),
}

export const createChapterValidator = vine.create(chapterFields)
export const updateChapterValidator = vine.create(chapterFields)
