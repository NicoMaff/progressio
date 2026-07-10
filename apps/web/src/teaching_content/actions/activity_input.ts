import TeachingContentOperationError from "#teaching_content/exceptions/operation_error"

export const ACTIVITY_TITLE_MAX_LENGTH = 160
export const ACTIVITY_NOTE_MAX_LENGTH = 5000
export const ACTIVITY_ESTIMATED_DURATION_MAX_MINUTES = 1440

export type ActivityInput = {
  title: string
  chapterId?: string | null
  activityTypeId: string
  estimatedDurationMinutes?: number | null
  noteMarkdown?: string | null
}

export type NormalizedActivityInput = {
  title: string
  chapterId: string | null
  activityTypeId: string
  estimatedDurationMinutes: number | null
  noteMarkdown: string | null
}

export class ActivityChapterLevelMismatchError extends TeachingContentOperationError {
  constructor() {
    super("Le chapitre choisi doit appartenir au même niveau que l’activité.")
    this.name = "ActivityChapterLevelMismatchError"
  }
}

export class ActivityTypeSchoolYearMismatchError extends TeachingContentOperationError {
  constructor() {
    super("Le type d’activité choisi doit appartenir à la même année scolaire que le niveau.")
    this.name = "ActivityTypeSchoolYearMismatchError"
  }
}

export class ActivityEstimatedDurationOutOfRangeError extends TeachingContentOperationError {
  constructor() {
    super(`La durée estimée doit être comprise entre 1 et ${ACTIVITY_ESTIMATED_DURATION_MAX_MINUTES} minutes.`)
    this.name = "ActivityEstimatedDurationOutOfRangeError"
  }
}

export function normalizeActivityInput(input: ActivityInput): NormalizedActivityInput {
  const chapterId = input.chapterId?.trim()
  const noteMarkdown = input.noteMarkdown?.trim()

  return {
    title: input.title.trim(),
    chapterId: chapterId ? chapterId : null,
    activityTypeId: input.activityTypeId.trim(),
    estimatedDurationMinutes: input.estimatedDurationMinutes ?? null,
    noteMarkdown: noteMarkdown ? noteMarkdown : null,
  }
}
