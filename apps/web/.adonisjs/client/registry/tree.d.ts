/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  teachingContent: {
    render: typeof routes['teaching_content.render']
    themes: {
      index: typeof routes['teaching_content.themes.index']
      store: typeof routes['teaching_content.themes.store']
      update: typeof routes['teaching_content.themes.update']
      archive: typeof routes['teaching_content.themes.archive']
      restore: typeof routes['teaching_content.themes.restore']
    }
    chapters: {
      store: typeof routes['teaching_content.chapters.store']
      update: typeof routes['teaching_content.chapters.update']
      archive: typeof routes['teaching_content.chapters.archive']
      restore: typeof routes['teaching_content.chapters.restore']
    }
    activities: {
      store: typeof routes['teaching_content.activities.store']
      update: typeof routes['teaching_content.activities.update']
      archive: typeof routes['teaching_content.activities.archive']
      restore: typeof routes['teaching_content.activities.restore']
    }
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
