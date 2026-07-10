import TeachingContentOperationError from "#teaching_content/exceptions/operation_error"

export const CHAPTER_NAME_MAX_LENGTH = 120
export const CHAPTER_SHORT_CODE_MAX_LENGTH = 24
export const CHAPTER_NOTE_MAX_LENGTH = 5000
export const CHAPTER_SHORT_CODE_PATTERN = /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/

export type ChapterInput = {
  name: string
  shortCode: string
  themeId?: string | null
  noteMarkdown?: string | null
}

export type NormalizedChapterInput = {
  name: string
  shortCode: string
  themeId: string | null
  noteMarkdown: string | null
}

export class ChapterShortCodeAlreadyExistsError extends TeachingContentOperationError {
  constructor() {
    super("Un chapitre actif utilise déjà ce code court pour ce niveau.")
    this.name = "ChapterShortCodeAlreadyExistsError"
  }
}

export class ChapterShortCodeFormatError extends TeachingContentOperationError {
  constructor() {
    super("Le code court du chapitre doit contenir uniquement des lettres, chiffres et tirets.")
    this.name = "ChapterShortCodeFormatError"
  }
}

export class ChapterThemeLevelMismatchError extends TeachingContentOperationError {
  constructor() {
    super("Le thème choisi doit appartenir au même niveau que le chapitre.")
    this.name = "ChapterThemeLevelMismatchError"
  }
}

export function normalizeChapterShortCode(shortCode: string) {
  return shortCode.trim().replace(/\s+/g, "-").toUpperCase()
}

export function normalizeChapterInput(input: ChapterInput): NormalizedChapterInput {
  const noteMarkdown = input.noteMarkdown?.trim()
  const themeId = input.themeId?.trim()

  return {
    name: input.name.trim(),
    shortCode: normalizeChapterShortCode(input.shortCode),
    themeId: themeId ? themeId : null,
    noteMarkdown: noteMarkdown ? noteMarkdown : null,
  }
}
