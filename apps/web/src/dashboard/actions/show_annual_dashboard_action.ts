import TeachingClass from "#models/class"
import Level from "#models/level"
import PlannedSession from "#models/planned_session"
import SchoolYear from "#models/school_year"
import { DateTime } from "luxon"

export const plannedSessionOutcomes = ["realized", "partial", "shifted", "cancelled", "to_catch_up"] as const
export type PlannedSessionOutcome = (typeof plannedSessionOutcomes)[number]

export type ClassProgressSummary = {
  id: string
  name: string
  shortCode: string
  pacingState: "tracked" | "notPlanned" | "nothingDue"
  dueSessionCount: number
  outcomeCounts: Record<PlannedSessionOutcome, number>
  missingOutcomeCount: number
  reviewRequiredCount: number
}

export type LevelProgressSummary = {
  id: string
  name: string
  shortCode: string
  classes: ClassProgressSummary[]
}

export type AnnualDashboard = {
  schoolYear: { id: string; label: string; subject: string }
  summary: { levelCount: number; classCount: number; dueSessionCount: number; followUpCount: number }
  levels: LevelProgressSummary[]
}

export default class ShowAnnualDashboardAction {
  async execute(asOf = DateTime.local().startOf("day")): Promise<AnnualDashboard> {
    const schoolYear = await SchoolYear.query().firstOrFail()
    const [levels, classes] = await Promise.all([
      Level.query().where("school_year_id", schoolYear.id).orderBy("short_code").orderBy("name"),
      TeachingClass.query().where("school_year_id", schoolYear.id).orderBy("short_code").orderBy("name"),
    ])
    const plannedSessions = classes.length
      ? await PlannedSession.query().whereIn(
          "class_id",
          classes.map((teachingClass) => teachingClass.id)
        )
      : []
    const sessionsByClassId = this.groupSessionsByClassId(plannedSessions)
    const classesByLevelId = new Map<string, TeachingClass[]>()

    for (const teachingClass of classes) {
      const levelClasses = classesByLevelId.get(teachingClass.levelId) ?? []
      levelClasses.push(teachingClass)
      classesByLevelId.set(teachingClass.levelId, levelClasses)
    }

    const levelSummaries = levels.map((level) => ({
      id: level.id,
      name: level.name,
      shortCode: level.shortCode,
      classes: (classesByLevelId.get(level.id) ?? []).map((teachingClass) =>
        this.summarizeClass(teachingClass, sessionsByClassId.get(teachingClass.id) ?? [], asOf)
      ),
    }))
    const classSummaries = levelSummaries.flatMap((level) => level.classes)

    return {
      schoolYear: { id: schoolYear.id, label: schoolYear.label, subject: schoolYear.subject },
      summary: {
        levelCount: levels.length,
        classCount: classes.length,
        dueSessionCount: classSummaries.reduce((total, summary) => total + summary.dueSessionCount, 0),
        followUpCount: classSummaries.reduce(
          (total, summary) => total + summary.missingOutcomeCount + summary.reviewRequiredCount,
          0
        ),
      },
      levels: levelSummaries,
    }
  }

  private groupSessionsByClassId(plannedSessions: PlannedSession[]) {
    const sessionsByClassId = new Map<string, PlannedSession[]>()
    for (const session of plannedSessions) {
      const sessions = sessionsByClassId.get(session.classId) ?? []
      sessions.push(session)
      sessionsByClassId.set(session.classId, sessions)
    }
    return sessionsByClassId
  }

  private summarizeClass(teachingClass: TeachingClass, sessions: PlannedSession[], asOf: DateTime) {
    const asOfDate = asOf.toISODate()!
    const dueSessions = sessions.filter((session) => session.sessionDate.toISODate()! <= asOfDate)
    const outcomeCounts = Object.fromEntries(plannedSessionOutcomes.map((outcome) => [outcome, 0])) as Record<
      PlannedSessionOutcome,
      number
    >
    let missingOutcomeCount = 0
    let reviewRequiredCount = 0

    for (const session of dueSessions) {
      if (session.outcome === null) {
        missingOutcomeCount++
      } else {
        outcomeCounts[session.outcome as PlannedSessionOutcome]++
        if (session.outcomeReviewRequired) reviewRequiredCount++
      }
    }

    return {
      id: teachingClass.id,
      name: teachingClass.name,
      shortCode: teachingClass.shortCode,
      pacingState: sessions.length === 0 ? "notPlanned" : dueSessions.length === 0 ? "nothingDue" : "tracked",
      dueSessionCount: dueSessions.length,
      outcomeCounts,
      missingOutcomeCount,
      reviewRequiredCount,
    } satisfies ClassProgressSummary
  }
}
