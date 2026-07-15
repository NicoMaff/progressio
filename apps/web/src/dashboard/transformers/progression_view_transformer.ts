import type { ProgressionView } from "#dashboard/actions/show_progression_view_action"
import { BaseTransformer } from "@adonisjs/core/transformers"

export default class ProgressionViewTransformer extends BaseTransformer<ProgressionView> {
  toObject() {
    const { schoolYear, level, teachingClass, window, chronology } = this.resource

    return {
      schoolYear: { id: schoolYear.id, label: schoolYear.label, subject: schoolYear.subject },
      level: { id: level.id, name: level.name, shortCode: level.shortCode },
      teachingClass: { id: teachingClass.id, name: teachingClass.name, shortCode: teachingClass.shortCode },
      window: {
        kind: window.kind,
        label: window.label,
        startDate: window.startDate,
        endDate: window.endDate,
      },
      chronology: chronology.map((entry) => {
        if (entry.kind === "unplannedActual") {
          return {
            id: entry.id,
            kind: entry.kind,
            date: entry.date,
            dateLabel: entry.dateLabel,
            detail: entry.detail,
            title: entry.title,
          }
        }

        return {
          id: entry.id,
          kind: entry.kind,
          date: entry.date,
          dateLabel: entry.dateLabel,
          detail: entry.detail,
          title: entry.title,
          outcomeLabel: entry.outcomeLabel,
          outcomeTone: entry.outcomeTone,
          actualSessions: entry.actualSessions.map((actualSession) => ({
            id: actualSession.id,
            dateLabel: actualSession.dateLabel,
            detail: actualSession.detail,
            title: actualSession.title,
          })),
        }
      }),
    }
  }
}
