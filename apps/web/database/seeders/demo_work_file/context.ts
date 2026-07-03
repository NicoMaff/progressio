import type Activity from "#models/activity"
import type ActivityType from "#models/activity_type"
import type Chapter from "#models/chapter"
import type TeachingClass from "#models/class"
import type InterruptionType from "#models/interruption_type"
import type Level from "#models/level"
import type PlannedSession from "#models/planned_session"
import type PlannedSessionActivity from "#models/planned_session_activity"
import type SchoolYear from "#models/school_year"
import type SlotType from "#models/slot_type"
import type TemplateSession from "#models/template_session"
import type TemplateSessionActivity from "#models/template_session_activity"

export type TemplateSessionSet = {
  sessions: TemplateSession[]
  activitiesByTemplateSessionId: Map<string, TemplateSessionActivity[]>
}

export type PlannedSessionSet = {
  session: PlannedSession
  activities: PlannedSessionActivity[]
}

export type DemoWorkFileSeedContext = {
  schoolYear?: SchoolYear
  activityTypes: ActivityType[]
  interruptionTypes: InterruptionType[]
  levels: Level[]
  classesByShortCode: Map<string, TeachingClass>
  chaptersByShortCode: Map<string, Chapter>
  activitiesByChapterKey: Map<string, Activity[]>
  slotTypes: SlotType[]
  templateSessionSetsByLevelId: Map<string, TemplateSessionSet>
  plannedSessionSets: PlannedSessionSet[]
}

export function createDemoWorkFileSeedContext(): DemoWorkFileSeedContext {
  return {
    activityTypes: [],
    interruptionTypes: [],
    levels: [],
    classesByShortCode: new Map(),
    chaptersByShortCode: new Map(),
    activitiesByChapterKey: new Map(),
    slotTypes: [],
    templateSessionSetsByLevelId: new Map(),
    plannedSessionSets: [],
  }
}
