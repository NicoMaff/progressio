/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  dashboard: {
    levelProgressSummary: typeof routes['dashboard.level_progress_summary']
  }
  organisation: {
    levels: {
      show: typeof routes['organisation.levels.show']
      edit: typeof routes['organisation.levels.edit']
      create: typeof routes['organisation.levels.create']
      update: typeof routes['organisation.levels.update']
    }
    classes: {
      show: typeof routes['organisation.classes.show']
      edit: typeof routes['organisation.classes.edit']
      create: typeof routes['organisation.classes.create']
      update: typeof routes['organisation.classes.update']
    }
  }
  planning: {
    progressions: {
      list: typeof routes['planning.progressions.list']
    }
    progressionView: typeof routes['planning.progression_view']
    session: {
      show: typeof routes['planning.session.show']
      update: typeof routes['planning.session.update']
    }
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
    select: typeof routes['themes.select']
    list: typeof routes['themes.list']
    archived: typeof routes['themes.archived']
    edit: typeof routes['themes.edit']
    store: typeof routes['themes.store']
    reorder: typeof routes['themes.reorder']
    update: typeof routes['themes.update']
    archive: typeof routes['themes.archive']
    restore: typeof routes['themes.restore']
    destroy: typeof routes['themes.destroy']
  }
  chapters: {
    select: typeof routes['chapters.select']
    list: typeof routes['chapters.list']
    archived: typeof routes['chapters.archived']
    edit: typeof routes['chapters.edit']
    reorder: typeof routes['chapters.reorder']
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
