import TeachingContentOperationError from "#teaching_content/exceptions/operation_error"

export const DEFAULT_THEME_COLOR = "#6B7280"
export const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/
export const THEME_NAME_MAX_LENGTH = 120
export const THEME_SHORT_CODE_MAX_LENGTH = 24
export const THEME_NOTE_MAX_LENGTH = 5000

export type ThemeInput = {
  name: string
  shortCode: string
  color?: string
  noteMarkdown?: string | null
}

export type NormalizedThemeInput = {
  name: string
  shortCode: string
  color: string
  noteMarkdown: string | null
}

export class ThemeShortCodeAlreadyExistsError extends TeachingContentOperationError {
  constructor() {
    super("Un thème actif utilise déjà ce code court pour ce niveau.")
    this.name = "ThemeShortCodeAlreadyExistsError"
  }
}

export function normalizeThemeShortCode(shortCode: string) {
  return shortCode.trim().replace(/\s+/g, "-").toUpperCase()
}

export function normalizeThemeColor(color: string | undefined) {
  return (color?.trim() || DEFAULT_THEME_COLOR).toUpperCase()
}

export function normalizeThemeInput(input: ThemeInput): NormalizedThemeInput {
  const noteMarkdown = input.noteMarkdown?.trim()

  return {
    name: input.name.trim(),
    shortCode: normalizeThemeShortCode(input.shortCode),
    color: normalizeThemeColor(input.color),
    noteMarkdown: noteMarkdown ? noteMarkdown : null,
  }
}
