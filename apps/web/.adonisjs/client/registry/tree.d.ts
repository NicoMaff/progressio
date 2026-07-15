/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  dashboard: {
    levelProgressSummary: typeof routes['dashboard.level_progress_summary']
  }
  teachingContent: {
    render: typeof routes['teaching_content.render']
  }
  themes: {
    list: typeof routes['themes.list']
    store: typeof routes['themes.store']
    update: typeof routes['themes.update']
    archive: typeof routes['themes.archive']
    restore: typeof routes['themes.restore']
  }
  chapters: {
    store: typeof routes['chapters.store']
    update: typeof routes['chapters.update']
    archive: typeof routes['chapters.archive']
    restore: typeof routes['chapters.restore']
  }
  activities: {
    store: typeof routes['activities.store']
    update: typeof routes['activities.update']
    archive: typeof routes['activities.archive']
    restore: typeof routes['activities.restore']
  }
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
}
