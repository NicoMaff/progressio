import ActualSession from "#models/actual_session"
import Chapter from "#models/chapter"
import TeachingClass from "#models/class"
import Interruption from "#models/interruption"
import InterruptionClass from "#models/interruption_class"
import Level from "#models/level"
import PlannedSession from "#models/planned_session"
import PlanningConflict from "#models/planning_conflict"
import SchoolYear from "#models/school_year"
import type { DateTime } from "luxon"

type RoadmapSession = {
  id: string
  date: string
  dateLabel: string
  title: string
  detail: string
  statusLabel: string
  statusTone: "planned" | "realized" | "warning" | "danger"
  conflictCount?: number
}

type RoadmapInterruption = {
  id: string
  title: string
  scope: "global" | "class"
  scopeLabel: string
}

type RoadmapWeek = {
  startDate: string
  endDate: string
  label: string
  schoolWeek: number | null
  plannedSessions: RoadmapSession[]
  actualSessions: RoadmapSession[]
  interruptions: RoadmapInterruption[]
}

export type ProgressionView = {
  schoolYear: { id: string; label: string; subject: string }
  level: { id: string; name: string; shortCode: string }
  teachingClass: { id: string; name: string; shortCode: string }
  roadmap: { focusWeekStartDate: string; weeks: RoadmapWeek[] }
}

export default class ShowProgressionViewAction {
  async execute(classId: string, currentDate: DateTime): Promise<ProgressionView> {
    const schoolYear = await SchoolYear.query().firstOrFail()
    const teachingClass = await TeachingClass.query()
      .where("id", classId)
      .where("school_year_id", schoolYear.id)
      .firstOrFail()
    const level = await Level.query().where("id", teachingClass.levelId).firstOrFail()
    const [plannedSessions, actualSessions, interruptions] = await Promise.all([
      PlannedSession.query()
        .where("class_id", teachingClass.id)
        .whereBetween("session_date", [schoolYear.startDate.toISODate()!, schoolYear.endDate.toISODate()!])
        .orderBy("session_date")
        .orderBy("start_time")
        .orderBy("session_order"),
      ActualSession.query()
        .where("class_id", teachingClass.id)
        .whereBetween("session_date", [schoolYear.startDate.toISODate()!, schoolYear.endDate.toISODate()!])
        .orderBy("session_date")
        .orderBy("start_time")
        .orderBy("session_order"),
      this.findRoadmapInterruptions(schoolYear, teachingClass.id),
    ])
    const chaptersById = await this.findChaptersById(plannedSessions, actualSessions)
    const conflictCounts = await this.findConflictCounts(plannedSessions)

    return {
      schoolYear: { id: schoolYear.id, label: schoolYear.label, subject: schoolYear.subject },
      level: { id: level.id, name: level.name, shortCode: level.shortCode },
      teachingClass: { id: teachingClass.id, name: teachingClass.name, shortCode: teachingClass.shortCode },
      roadmap: this.buildRoadmap(
        schoolYear,
        currentDate,
        plannedSessions,
        actualSessions,
        interruptions,
        chaptersById,
        conflictCounts
      ),
    }
  }

  private async findRoadmapInterruptions(schoolYear: SchoolYear, classId: string) {
    const interruptionClasses = await InterruptionClass.query().where("class_id", classId)
    const classInterruptionIds = interruptionClasses.map((interruptionClass) => interruptionClass.interruptionId)
    const schoolYearStart = schoolYear.startDate.startOf("day").toSQL()!
    const schoolYearEnd = schoolYear.endDate.plus({ days: 1 }).startOf("day").toSQL()!

    return Interruption.query()
      .where("school_year_id", schoolYear.id)
      .where("starts_at", "<", schoolYearEnd)
      .where("ends_at", ">", schoolYearStart)
      .where((query) => {
        query.where("scope", "global")
        if (classInterruptionIds.length > 0) query.orWhereIn("id", classInterruptionIds)
      })
      .orderBy("starts_at")
      .orderBy("title")
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

  private async findConflictCounts(plannedSessions: PlannedSession[]) {
    if (plannedSessions.length === 0) return new Map<string, number>()
    const conflicts = await PlanningConflict.query().whereIn(
      "planned_session_id",
      plannedSessions.map((plannedSession) => plannedSession.id)
    )
    const counts = new Map<string, number>()
    for (const conflict of conflicts) {
      counts.set(conflict.plannedSessionId, (counts.get(conflict.plannedSessionId) ?? 0) + 1)
    }
    return counts
  }

  private buildRoadmap(
    schoolYear: SchoolYear,
    currentDate: DateTime,
    plannedSessions: PlannedSession[],
    actualSessions: ActualSession[],
    interruptions: Interruption[],
    chaptersById: Map<string, Chapter>,
    conflictCounts: Map<string, number>
  ) {
    const startWeek = schoolYear.startDate.startOf("week")
    const endWeek = schoolYear.endDate.endOf("week").startOf("day")
    const weeks: RoadmapWeek[] = []
    const plannedSessionsByWeek = this.groupByWeek(plannedSessions)
    const actualSessionsByWeek = this.groupByWeek(actualSessions)

    for (let weekStart = startWeek; weekStart <= endWeek; weekStart = weekStart.plus({ weeks: 1 })) {
      const weekEnd = weekStart.plus({ days: 6 })
      const weekKey = weekStart.toISODate()!
      weeks.push({
        startDate: weekKey,
        endDate: weekEnd.toISODate()!,
        label: `Semaine ${weekStart.weekNumber} · ${weekStart.setLocale("fr").toFormat("d LLL")}`,
        schoolWeek: Math.floor(weekStart.diff(schoolYear.firstTeachingDay.startOf("week"), "weeks").weeks) + 1,
        plannedSessions: (plannedSessionsByWeek.get(weekKey) ?? []).map((session) =>
          this.buildPlannedSession(session, chaptersById, conflictCounts.get(session.id) ?? 0)
        ),
        actualSessions: (actualSessionsByWeek.get(weekKey) ?? []).map((session) =>
          this.buildActualSession(session, chaptersById)
        ),
        interruptions: interruptions
          .filter(
            (interruption) =>
              interruption.startsAt.startOf("day") <= weekEnd.endOf("day") &&
              interruption.endsAt.startOf("day") > weekStart.startOf("day")
          )
          .map((interruption) => ({
            id: interruption.id,
            title: interruption.title,
            scope: interruption.scope as "global" | "class",
            scopeLabel: interruption.scope === "global" ? "Toutes les classes" : "Cette classe",
          })),
      })
    }

    return {
      focusWeekStartDate: this.focusWeekStartDate(schoolYear, currentDate),
      weeks,
    }
  }

  private groupByWeek<T extends { sessionDate: DateTime }>(sessions: T[]) {
    const sessionsByWeek = new Map<string, T[]>()
    for (const session of sessions) {
      const weekKey = session.sessionDate.startOf("week").toISODate()!
      const weekSessions = sessionsByWeek.get(weekKey) ?? []
      weekSessions.push(session)
      sessionsByWeek.set(weekKey, weekSessions)
    }
    return sessionsByWeek
  }

  private buildPlannedSession(
    session: PlannedSession,
    chaptersById: Map<string, Chapter>,
    conflictCount: number
  ): RoadmapSession {
    const chapter = session.mainChapterId ? chaptersById.get(session.mainChapterId) : undefined
    const status = this.plannedStatus(session.outcome)
    return {
      id: session.id,
      date: session.sessionDate.toISODate()!,
      dateLabel: session.sessionDate.setLocale("fr").toFormat("d LLLL"),
      title: session.title ?? chapter?.name ?? "Séance prévue",
      detail: this.formatSessionDetail(chapter?.shortCode, session.durationMinutes),
      ...status,
      conflictCount,
    }
  }

  private buildActualSession(session: ActualSession, chaptersById: Map<string, Chapter>): RoadmapSession {
    const chapter = session.mainChapterId ? chaptersById.get(session.mainChapterId) : undefined
    const isCompleted = session.state === "completed"
    return {
      id: session.id,
      date: session.sessionDate.toISODate()!,
      dateLabel: session.sessionDate.setLocale("fr").toFormat("d LLLL"),
      title: session.title ?? chapter?.name ?? "Séance effectuée",
      detail: this.formatSessionDetail(chapter?.shortCode, session.durationMinutes),
      statusLabel: isCompleted ? "Réalisée" : "À compléter",
      statusTone: isCompleted ? "realized" : "warning",
    }
  }

  private plannedStatus(outcome: string | null): Pick<RoadmapSession, "statusLabel" | "statusTone"> {
    const statuses = {
      realized: { statusLabel: "Réalisée", statusTone: "realized" },
      partial: { statusLabel: "Partiellement réalisée", statusTone: "warning" },
      shifted: { statusLabel: "Reportée", statusTone: "warning" },
      cancelled: { statusLabel: "Annulée", statusTone: "danger" },
      to_catch_up: { statusLabel: "À rattraper", statusTone: "danger" },
    } as const

    return outcome ? statuses[outcome as keyof typeof statuses] : { statusLabel: "Prévue", statusTone: "planned" }
  }

  private focusWeekStartDate(schoolYear: SchoolYear, currentDate: DateTime) {
    const focusDate =
      currentDate < schoolYear.startDate
        ? schoolYear.startDate
        : currentDate > schoolYear.endDate
          ? schoolYear.endDate
          : currentDate
    return focusDate.startOf("week").toISODate()!
  }

  private formatSessionDetail(chapterShortCode: string | undefined, durationMinutes: number) {
    const duration = `${durationMinutes} min`
    return chapterShortCode ? `${chapterShortCode} · ${duration}` : duration
  }
}
