/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  dashboard: {
    levelProgressSummary: typeof routes['dashboard.level_progress_summary']
  }
  planning: {
    progressionView: typeof routes['planning.progression_view']
  }
  teachingContent: {
    render: typeof routes['teaching_content.render']
    themes: {
      destroy: typeof routes['teaching_content.themes.destroy']
    }
    chapters: {
      destroy: typeof routes['teaching_content.chapters.destroy']
    }
    activities: {
      destroy: typeof routes['teaching_content.activities.destroy']
    }
  }
  themes: {
    list: typeof routes['themes.list']
    store: typeof routes['themes.store']
    update: typeof routes['themes.update']
    archive: typeof routes['themes.archive']
    restore: typeof routes['themes.restore']
    destroy: typeof routes['themes.destroy']
  }
  chapters: {
    store: typeof routes['chapters.store']
    update: typeof routes['chapters.update']
    archive: typeof routes['chapters.archive']
    restore: typeof routes['chapters.restore']
    destroy: typeof routes['chapters.destroy']
  }
  activities: {
    store: typeof routes['activities.store']
    update: typeof routes['activities.update']
    archive: typeof routes['activities.archive']
    restore: typeof routes['activities.restore']
    destroy: typeof routes['activities.destroy']
  }
}
