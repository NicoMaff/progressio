import type { PlannedSessionOutcome } from "#dashboard/actions/show_annual_dashboard_action"
import ActualSession from "#models/actual_session"
import Chapter from "#models/chapter"
import TeachingClass from "#models/class"
import Level from "#models/level"
import Period from "#models/period"
import PlannedSession from "#models/planned_session"
import SchoolYear from "#models/school_year"
import type { DateTime } from "luxon"

type ProgressionWindow = {
  kind: "period" | "month" | "schoolYear"
  label: string
  startDate: string
  endDate: string
}

type ChronologyActualSession = {
  id: string
  date: string
  dateLabel: string
  detail: string
  title: string
}

type PlannedChronologyEntry = {
  id: string
  kind: "planned"
  date: string
  dateLabel: string
  detail: string
  title: string
  outcomeLabel: string | null
  outcomeTone: "neutral" | "blue" | "green" | "amber" | "red"
  actualSessions: ChronologyActualSession[]
}

type UnplannedActualChronologyEntry = {
  id: string
  kind: "unplannedActual"
  date: string
  dateLabel: string
  detail: string
  title: string
}

export type ProgressionView = {
  schoolYear: { id: string; label: string; subject: string }
  level: { id: string; name: string; shortCode: string }
  teachingClass: { id: string; name: string; shortCode: string }
  window: ProgressionWindow
  chronology: Array<PlannedChronologyEntry | UnplannedActualChronologyEntry>
}

export default class ShowProgressionViewAction {
  async execute(classId: string, annual: boolean, currentDate: DateTime): Promise<ProgressionView> {
    const schoolYear = await SchoolYear.query().firstOrFail()
    const teachingClass = await TeachingClass.query()
      .where("id", classId)
      .where("school_year_id", schoolYear.id)
      .firstOrFail()
    const level = await Level.query().where("id", teachingClass.levelId).firstOrFail()
    const window = annual
      ? this.buildSchoolYearWindow(schoolYear)
      : await this.buildCurrentWindow(schoolYear, currentDate)
    const plannedSessions = await PlannedSession.query()
      .where("class_id", teachingClass.id)
      .whereBetween("session_date", [window.startDate, window.endDate])
      .orderBy("session_date")
      .orderBy("start_time")
      .orderBy("session_order")
    const actualSessions = await this.findActualSessions(teachingClass.id, plannedSessions, window)
    const chaptersById = await this.findChaptersById(plannedSessions, actualSessions)
    const actualSessionsByPlannedSessionId = this.groupActualSessionsByPlannedSessionId(actualSessions)

    return {
      schoolYear: { id: schoolYear.id, label: schoolYear.label, subject: schoolYear.subject },
      level: { id: level.id, name: level.name, shortCode: level.shortCode },
      teachingClass: { id: teachingClass.id, name: teachingClass.name, shortCode: teachingClass.shortCode },
      window,
      chronology: this.buildChronology(plannedSessions, actualSessions, chaptersById, actualSessionsByPlannedSessionId),
    }
  }

  private async buildCurrentWindow(schoolYear: SchoolYear, currentDate: DateTime): Promise<ProgressionWindow> {
    const date = currentDate.toISODate()!
    const period = await Period.query()
      .where("school_year_id", schoolYear.id)
      .where("start_date", "<=", date)
      .where("end_date", ">=", date)
      .orderBy("start_date")
      .first()

    if (period) {
      return {
        kind: "period",
        label: period.name,
        startDate: period.startDate.toISODate()!,
        endDate: period.endDate.toISODate()!,
      }
    }

    return {
      kind: "month",
      label: currentDate.setLocale("fr").toFormat("LLLL yyyy"),
      startDate: currentDate.startOf("month").toISODate()!,
      endDate: currentDate.endOf("month").toISODate()!,
    }
  }

  private buildSchoolYearWindow(schoolYear: SchoolYear): ProgressionWindow {
    return {
      kind: "schoolYear",
      label: schoolYear.label,
      startDate: schoolYear.startDate.toISODate()!,
      endDate: schoolYear.endDate.toISODate()!,
    }
  }

  private async findActualSessions(
    classId: string,
    plannedSessions: PlannedSession[],
    window: ProgressionWindow
  ): Promise<ActualSession[]> {
    const plannedSessionIds = plannedSessions.map((plannedSession) => plannedSession.id)

    return ActualSession.query()
      .where("class_id", classId)
      .where((query) => {
        if (plannedSessionIds.length > 0) query.whereIn("planned_session_id", plannedSessionIds)
        query.orWhere((unplannedQuery) => {
          unplannedQuery
            .whereNull("planned_session_id")
            .whereBetween("session_date", [window.startDate, window.endDate])
        })
      })
      .orderBy("session_date")
      .orderBy("start_time")
      .orderBy("session_order")
  }

  private async findChaptersById(plannedSessions: PlannedSession[], actualSessions: ActualSession[]) {
    const chapterIds = new Set(
      [...plannedSessions, ...actualSessions]
        .map((session) => session.mainChapterId)
        .filter((chapterId): chapterId is string => chapterId !== null)
    )
    const chapters = chapterIds.size ? await Chapter.query().whereIn("id", [...chapterIds]) : []

    return new Map(chapters.map((chapter) => [chapter.id, chapter]))
  }

  private groupActualSessionsByPlannedSessionId(actualSessions: ActualSession[]) {
    const actualSessionsByPlannedSessionId = new Map<string, ActualSession[]>()
    for (const actualSession of actualSessions) {
      if (!actualSession.plannedSessionId) continue
      const linkedSessions = actualSessionsByPlannedSessionId.get(actualSession.plannedSessionId) ?? []
      linkedSessions.push(actualSession)
      actualSessionsByPlannedSessionId.set(actualSession.plannedSessionId, linkedSessions)
    }
    return actualSessionsByPlannedSessionId
  }

  private buildChronology(
    plannedSessions: PlannedSession[],
    actualSessions: ActualSession[],
    chaptersById: Map<string, Chapter>,
    actualSessionsByPlannedSessionId: Map<string, ActualSession[]>
  ) {
    const plannedEntries = plannedSessions.map((plannedSession) =>
      this.buildPlannedEntry(
        plannedSession,
        chaptersById,
        actualSessionsByPlannedSessionId.get(plannedSession.id) ?? []
      )
    )
    const unplannedActualEntries = actualSessions
      .filter((actualSession) => actualSession.plannedSessionId === null)
      .map((actualSession) => this.buildUnplannedActualEntry(actualSession, chaptersById))

    return [...plannedEntries, ...unplannedActualEntries].sort((firstEntry, secondEntry) => {
      const firstKey = `${firstEntry.date}:${firstEntry.kind === "planned" ? "0" : "1"}`
      const secondKey = `${secondEntry.date}:${secondEntry.kind === "planned" ? "0" : "1"}`
      return firstKey.localeCompare(secondKey)
    })
  }

  private buildPlannedEntry(
    plannedSession: PlannedSession,
    chaptersById: Map<string, Chapter>,
    actualSessions: ActualSession[]
  ): PlannedChronologyEntry {
    const chapter = plannedSession.mainChapterId ? chaptersById.get(plannedSession.mainChapterId) : undefined

    return {
      id: plannedSession.id,
      kind: "planned",
      date: plannedSession.sessionDate.toISODate()!,
      dateLabel: this.formatDate(plannedSession.sessionDate),
      detail: this.formatSessionDetail(chapter?.shortCode, plannedSession.durationMinutes),
      title: plannedSession.title ?? chapter?.name ?? "Séance prévue",
      ...this.formatOutcome(plannedSession.outcome),
      actualSessions: actualSessions.map((actualSession) => this.buildLinkedActualSession(actualSession, chaptersById)),
    }
  }

  private buildLinkedActualSession(
    actualSession: ActualSession,
    chaptersById: Map<string, Chapter>
  ): ChronologyActualSession {
    const chapter = actualSession.mainChapterId ? chaptersById.get(actualSession.mainChapterId) : undefined
    return {
      id: actualSession.id,
      date: actualSession.sessionDate.toISODate()!,
      dateLabel: this.formatDate(actualSession.sessionDate),
      detail: this.formatSessionDetail(chapter?.shortCode, actualSession.durationMinutes),
      title: actualSession.title ?? chapter?.name ?? "Séance effectuée",
    }
  }

  private buildUnplannedActualEntry(
    actualSession: ActualSession,
    chaptersById: Map<string, Chapter>
  ): UnplannedActualChronologyEntry {
    const chapter = actualSession.mainChapterId ? chaptersById.get(actualSession.mainChapterId) : undefined
    return {
      id: actualSession.id,
      kind: "unplannedActual",
      date: actualSession.sessionDate.toISODate()!,
      dateLabel: this.formatDate(actualSession.sessionDate),
      detail: this.formatSessionDetail(chapter?.shortCode, actualSession.durationMinutes),
      title: actualSession.title ?? chapter?.name ?? "Séance effectuée",
    }
  }

  private formatOutcome(outcome: string | null) {
    const labels: Record<PlannedSessionOutcome, string> = {
      realized: "Réalisée",
      partial: "Partiellement réalisée",
      shifted: "Reportée",
      cancelled: "Annulée",
      to_catch_up: "À rattraper",
    }
    const tones: Record<PlannedSessionOutcome, PlannedChronologyEntry["outcomeTone"]> = {
      realized: "green",
      partial: "amber",
      shifted: "blue",
      cancelled: "neutral",
      to_catch_up: "red",
    }

    if (!outcome) return { outcomeLabel: null, outcomeTone: "neutral" as const }
    return {
      outcomeLabel: labels[outcome as PlannedSessionOutcome],
      outcomeTone: tones[outcome as PlannedSessionOutcome],
    }
  }

  private formatDate(date: DateTime) {
    return date.setLocale("fr").toFormat("d LLLL yyyy")
  }

  private formatSessionDetail(chapterShortCode: string | undefined, durationMinutes: number) {
    const duration = `${durationMinutes} min`
    return chapterShortCode ? `${chapterShortCode} · ${duration}` : duration
  }
}
