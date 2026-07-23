import ActualSession from "#models/actual_session"
import PlannedSession from "#models/planned_session"
import { DateTime } from "luxon"
import type { SessionKind } from "#dashboard/actions/show_session_editor_action"

export type SessionInput = {
  title?: string
  sessionDate: string
  startTime: string
  durationMinutes: number
  noteMarkdown?: string
  outcome?: string
  state?: string
}

export default class UpdateSessionAction {
  async execute(classId: string, kind: SessionKind, sessionId: string, input: SessionInput) {
    const values = {
      title: input.title?.trim() || null,
      sessionDate: DateTime.fromISO(input.sessionDate),
      startTime: input.startTime,
      durationMinutes: input.durationMinutes,
      noteMarkdown: input.noteMarkdown?.trim() || null,
    }

    if (kind === "planned") {
      const session = await PlannedSession.query().where("id", sessionId).where("class_id", classId).firstOrFail()
      session.merge({ ...values, outcome: input.outcome || null })
      await session.save()
      return
    }

    const session = await ActualSession.query().where("id", sessionId).where("class_id", classId).firstOrFail()
    const state = input.state === "completed" ? "completed" : "draft"
    session.merge({
      ...values,
      state,
      completedAt: state === "completed" ? (session.completedAt ?? DateTime.local()) : null,
    })
    await session.save()
  }
}
