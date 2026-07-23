import ActualSession from "#models/actual_session"
import TeachingClass from "#models/class"
import PlannedSession from "#models/planned_session"
import SchoolYear from "#models/school_year"

export type SessionKind = "planned" | "actual"

export type SessionEditor = {
  schoolYear: { label: string; subject: string }
  teachingClass: { id: string; name: string; shortCode: string }
  session: {
    id: string
    kind: SessionKind
    title: string
    sessionDate: string
    startTime: string
    durationMinutes: number
    noteMarkdown: string
    outcome: string | null
    state: string | null
    statusLabel: string
  }
}

export default class ShowSessionEditorAction {
  async execute(classId: string, kind: SessionKind, sessionId: string): Promise<SessionEditor> {
    const schoolYear = await SchoolYear.query().firstOrFail()
    const teachingClass = await TeachingClass.query()
      .where("id", classId)
      .where("school_year_id", schoolYear.id)
      .firstOrFail()
    if (kind === "planned") {
      const session = await PlannedSession.query().where("id", sessionId).where("class_id", classId).firstOrFail()
      return this.buildEditor(schoolYear, teachingClass, kind, session)
    }

    const session = await ActualSession.query().where("id", sessionId).where("class_id", classId).firstOrFail()
    return this.buildEditor(schoolYear, teachingClass, kind, session)
  }

  private buildEditor(
    schoolYear: SchoolYear,
    teachingClass: TeachingClass,
    kind: SessionKind,
    session: PlannedSession | ActualSession
  ): SessionEditor {
    return {
      schoolYear: { label: schoolYear.label, subject: schoolYear.subject },
      teachingClass: { id: teachingClass.id, name: teachingClass.name, shortCode: teachingClass.shortCode },
      session: {
        id: session.id,
        kind,
        title: session.title ?? "",
        sessionDate: session.sessionDate.toISODate()!,
        startTime: session.startTime,
        durationMinutes: session.durationMinutes,
        noteMarkdown: session.noteMarkdown ?? "",
        outcome: kind === "planned" && session instanceof PlannedSession ? session.outcome : null,
        state: kind === "actual" && session instanceof ActualSession ? session.state : null,
        statusLabel: this.statusLabel(
          kind,
          kind === "planned" && session instanceof PlannedSession ? session.outcome : null,
          kind === "actual" && session instanceof ActualSession ? session.state : null
        ),
      },
    }
  }

  private statusLabel(kind: SessionKind, outcome: string | null, state: string | null) {
    if (kind === "actual") return state === "completed" ? "Réalisée" : "Brouillon à compléter"
    return (
      {
        realized: "Réalisée",
        shifted: "Reportée",
        partial: "Partiellement réalisée",
        cancelled: "Annulée",
        to_catch_up: "À rattraper",
      }[outcome ?? ""] ?? "Prévue"
    )
  }
}
