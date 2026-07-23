/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'dashboard.level_progress_summary': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/levels/:levelId',
    tokens: [{"old":"/dashboard/levels/:levelId","type":0,"val":"dashboard","end":""},{"old":"/dashboard/levels/:levelId","type":0,"val":"levels","end":""},{"old":"/dashboard/levels/:levelId","type":1,"val":"levelId","end":""}],
    types: placeholder as Registry['dashboard.level_progress_summary']['types'],
  },
  'organisation.levels.show': {
    methods: ["GET","HEAD"],
    pattern: '/organisation/levels',
    tokens: [{"old":"/organisation/levels","type":0,"val":"organisation","end":""},{"old":"/organisation/levels","type":0,"val":"levels","end":""}],
    types: placeholder as Registry['organisation.levels.show']['types'],
  },
  'organisation.levels.edit': {
    methods: ["GET","HEAD"],
    pattern: '/organisation/levels/:levelId/edit',
    tokens: [{"old":"/organisation/levels/:levelId/edit","type":0,"val":"organisation","end":""},{"old":"/organisation/levels/:levelId/edit","type":0,"val":"levels","end":""},{"old":"/organisation/levels/:levelId/edit","type":1,"val":"levelId","end":""},{"old":"/organisation/levels/:levelId/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['organisation.levels.edit']['types'],
  },
  'organisation.levels.create': {
    methods: ["POST"],
    pattern: '/organisation/levels',
    tokens: [{"old":"/organisation/levels","type":0,"val":"organisation","end":""},{"old":"/organisation/levels","type":0,"val":"levels","end":""}],
    types: placeholder as Registry['organisation.levels.create']['types'],
  },
  'organisation.levels.update': {
    methods: ["PUT"],
    pattern: '/organisation/levels/:levelId',
    tokens: [{"old":"/organisation/levels/:levelId","type":0,"val":"organisation","end":""},{"old":"/organisation/levels/:levelId","type":0,"val":"levels","end":""},{"old":"/organisation/levels/:levelId","type":1,"val":"levelId","end":""}],
    types: placeholder as Registry['organisation.levels.update']['types'],
  },
  'organisation.classes.show': {
    methods: ["GET","HEAD"],
    pattern: '/organisation/classes',
    tokens: [{"old":"/organisation/classes","type":0,"val":"organisation","end":""},{"old":"/organisation/classes","type":0,"val":"classes","end":""}],
    types: placeholder as Registry['organisation.classes.show']['types'],
  },
  'organisation.classes.edit': {
    methods: ["GET","HEAD"],
    pattern: '/organisation/classes/:classId/edit',
    tokens: [{"old":"/organisation/classes/:classId/edit","type":0,"val":"organisation","end":""},{"old":"/organisation/classes/:classId/edit","type":0,"val":"classes","end":""},{"old":"/organisation/classes/:classId/edit","type":1,"val":"classId","end":""},{"old":"/organisation/classes/:classId/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['organisation.classes.edit']['types'],
  },
  'organisation.classes.create': {
    methods: ["POST"],
    pattern: '/organisation/classes',
    tokens: [{"old":"/organisation/classes","type":0,"val":"organisation","end":""},{"old":"/organisation/classes","type":0,"val":"classes","end":""}],
    types: placeholder as Registry['organisation.classes.create']['types'],
  },
  'organisation.classes.update': {
    methods: ["PUT"],
    pattern: '/organisation/classes/:classId',
    tokens: [{"old":"/organisation/classes/:classId","type":0,"val":"organisation","end":""},{"old":"/organisation/classes/:classId","type":0,"val":"classes","end":""},{"old":"/organisation/classes/:classId","type":1,"val":"classId","end":""}],
    types: placeholder as Registry['organisation.classes.update']['types'],
  },
  'planning.progressions.list': {
    methods: ["GET","HEAD"],
    pattern: '/planning/progressions',
    tokens: [{"old":"/planning/progressions","type":0,"val":"planning","end":""},{"old":"/planning/progressions","type":0,"val":"progressions","end":""}],
    types: placeholder as Registry['planning.progressions.list']['types'],
  },
  'planning.progression_view': {
    methods: ["GET","HEAD"],
    pattern: '/planning/classes/:classId/progression',
    tokens: [{"old":"/planning/classes/:classId/progression","type":0,"val":"planning","end":""},{"old":"/planning/classes/:classId/progression","type":0,"val":"classes","end":""},{"old":"/planning/classes/:classId/progression","type":1,"val":"classId","end":""},{"old":"/planning/classes/:classId/progression","type":0,"val":"progression","end":""}],
    types: placeholder as Registry['planning.progression_view']['types'],
  },
  'planning.session.show': {
    methods: ["GET","HEAD"],
    pattern: '/planning/classes/:classId/sessions/:kind/:sessionId',
    tokens: [{"old":"/planning/classes/:classId/sessions/:kind/:sessionId","type":0,"val":"planning","end":""},{"old":"/planning/classes/:classId/sessions/:kind/:sessionId","type":0,"val":"classes","end":""},{"old":"/planning/classes/:classId/sessions/:kind/:sessionId","type":1,"val":"classId","end":""},{"old":"/planning/classes/:classId/sessions/:kind/:sessionId","type":0,"val":"sessions","end":""},{"old":"/planning/classes/:classId/sessions/:kind/:sessionId","type":1,"val":"kind","end":""},{"old":"/planning/classes/:classId/sessions/:kind/:sessionId","type":1,"val":"sessionId","end":""}],
    types: placeholder as Registry['planning.session.show']['types'],
  },
  'planning.session.update': {
    methods: ["PUT"],
    pattern: '/planning/classes/:classId/sessions/:kind/:sessionId',
    tokens: [{"old":"/planning/classes/:classId/sessions/:kind/:sessionId","type":0,"val":"planning","end":""},{"old":"/planning/classes/:classId/sessions/:kind/:sessionId","type":0,"val":"classes","end":""},{"old":"/planning/classes/:classId/sessions/:kind/:sessionId","type":1,"val":"classId","end":""},{"old":"/planning/classes/:classId/sessions/:kind/:sessionId","type":0,"val":"sessions","end":""},{"old":"/planning/classes/:classId/sessions/:kind/:sessionId","type":1,"val":"kind","end":""},{"old":"/planning/classes/:classId/sessions/:kind/:sessionId","type":1,"val":"sessionId","end":""}],
    types: placeholder as Registry['planning.session.update']['types'],
  },
  'teaching_content.render': {
    methods: ["GET","HEAD"],
    pattern: '/teaching-content/levels/:levelId',
    tokens: [{"old":"/teaching-content/levels/:levelId","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId","type":1,"val":"levelId","end":""}],
    types: placeholder as Registry['teaching_content.render']['types'],
  },
  'themes.select': {
    methods: ["GET","HEAD"],
    pattern: '/themes',
    tokens: [{"old":"/themes","type":0,"val":"themes","end":""}],
    types: placeholder as Registry['themes.select']['types'],
  },
  'chapters.select': {
    methods: ["GET","HEAD"],
    pattern: '/chapters',
    tokens: [{"old":"/chapters","type":0,"val":"chapters","end":""}],
    types: placeholder as Registry['chapters.select']['types'],
  },
  'teaching_content.themes.destroy': {
    methods: ["DELETE"],
    pattern: '/teaching-content/levels/:levelId/themes/:themeId',
    tokens: [{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":0,"val":"themes","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":1,"val":"themeId","end":""}],
    types: placeholder as Registry['teaching_content.themes.destroy']['types'],
  },
  'teaching_content.chapters.destroy': {
    methods: ["DELETE"],
    pattern: '/teaching-content/levels/:levelId/chapters/:chapterId',
    tokens: [{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":0,"val":"chapters","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":1,"val":"chapterId","end":""}],
    types: placeholder as Registry['teaching_content.chapters.destroy']['types'],
  },
  'teaching_content.activities.destroy': {
    methods: ["DELETE"],
    pattern: '/teaching-content/levels/:levelId/activities/:activityId',
    tokens: [{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":0,"val":"activities","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":1,"val":"activityId","end":""}],
    types: placeholder as Registry['teaching_content.activities.destroy']['types'],
  },
  'themes.list': {
    methods: ["GET","HEAD"],
    pattern: '/levels/:levelId/themes',
    tokens: [{"old":"/levels/:levelId/themes","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/themes","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/themes","type":0,"val":"themes","end":""}],
    types: placeholder as Registry['themes.list']['types'],
  },
  'themes.archived': {
    methods: ["GET","HEAD"],
    pattern: '/levels/:levelId/themes/archive',
    tokens: [{"old":"/levels/:levelId/themes/archive","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/themes/archive","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/themes/archive","type":0,"val":"themes","end":""},{"old":"/levels/:levelId/themes/archive","type":0,"val":"archive","end":""}],
    types: placeholder as Registry['themes.archived']['types'],
  },
  'themes.edit': {
    methods: ["GET","HEAD"],
    pattern: '/levels/:levelId/themes/:themeId/edit',
    tokens: [{"old":"/levels/:levelId/themes/:themeId/edit","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/themes/:themeId/edit","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/themes/:themeId/edit","type":0,"val":"themes","end":""},{"old":"/levels/:levelId/themes/:themeId/edit","type":1,"val":"themeId","end":""},{"old":"/levels/:levelId/themes/:themeId/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['themes.edit']['types'],
  },
  'themes.store': {
    methods: ["POST"],
    pattern: '/levels/:levelId/themes',
    tokens: [{"old":"/levels/:levelId/themes","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/themes","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/themes","type":0,"val":"themes","end":""}],
    types: placeholder as Registry['themes.store']['types'],
  },
  'themes.reorder': {
    methods: ["PUT"],
    pattern: '/levels/:levelId/themes/reorder',
    tokens: [{"old":"/levels/:levelId/themes/reorder","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/themes/reorder","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/themes/reorder","type":0,"val":"themes","end":""},{"old":"/levels/:levelId/themes/reorder","type":0,"val":"reorder","end":""}],
    types: placeholder as Registry['themes.reorder']['types'],
  },
  'themes.update': {
    methods: ["PUT"],
    pattern: '/levels/:levelId/themes/:themeId',
    tokens: [{"old":"/levels/:levelId/themes/:themeId","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/themes/:themeId","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/themes/:themeId","type":0,"val":"themes","end":""},{"old":"/levels/:levelId/themes/:themeId","type":1,"val":"themeId","end":""}],
    types: placeholder as Registry['themes.update']['types'],
  },
  'themes.archive': {
    methods: ["POST"],
    pattern: '/levels/:levelId/themes/:themeId/archive',
    tokens: [{"old":"/levels/:levelId/themes/:themeId/archive","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/themes/:themeId/archive","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/themes/:themeId/archive","type":0,"val":"themes","end":""},{"old":"/levels/:levelId/themes/:themeId/archive","type":1,"val":"themeId","end":""},{"old":"/levels/:levelId/themes/:themeId/archive","type":0,"val":"archive","end":""}],
    types: placeholder as Registry['themes.archive']['types'],
  },
  'themes.restore': {
    methods: ["POST"],
    pattern: '/levels/:levelId/themes/:themeId/restore',
    tokens: [{"old":"/levels/:levelId/themes/:themeId/restore","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/themes/:themeId/restore","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/themes/:themeId/restore","type":0,"val":"themes","end":""},{"old":"/levels/:levelId/themes/:themeId/restore","type":1,"val":"themeId","end":""},{"old":"/levels/:levelId/themes/:themeId/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['themes.restore']['types'],
  },
  'themes.destroy': {
    methods: ["DELETE"],
    pattern: '/levels/:levelId/themes/:themeId',
    tokens: [{"old":"/levels/:levelId/themes/:themeId","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/themes/:themeId","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/themes/:themeId","type":0,"val":"themes","end":""},{"old":"/levels/:levelId/themes/:themeId","type":1,"val":"themeId","end":""}],
    types: placeholder as Registry['themes.destroy']['types'],
  },
  'chapters.list': {
    methods: ["GET","HEAD"],
    pattern: '/levels/:levelId/chapters',
    tokens: [{"old":"/levels/:levelId/chapters","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/chapters","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/chapters","type":0,"val":"chapters","end":""}],
    types: placeholder as Registry['chapters.list']['types'],
  },
  'chapters.archived': {
    methods: ["GET","HEAD"],
    pattern: '/levels/:levelId/chapters/archive',
    tokens: [{"old":"/levels/:levelId/chapters/archive","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/chapters/archive","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/chapters/archive","type":0,"val":"chapters","end":""},{"old":"/levels/:levelId/chapters/archive","type":0,"val":"archive","end":""}],
    types: placeholder as Registry['chapters.archived']['types'],
  },
  'chapters.edit': {
    methods: ["GET","HEAD"],
    pattern: '/levels/:levelId/chapters/:chapterId/edit',
    tokens: [{"old":"/levels/:levelId/chapters/:chapterId/edit","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/chapters/:chapterId/edit","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/chapters/:chapterId/edit","type":0,"val":"chapters","end":""},{"old":"/levels/:levelId/chapters/:chapterId/edit","type":1,"val":"chapterId","end":""},{"old":"/levels/:levelId/chapters/:chapterId/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['chapters.edit']['types'],
  },
  'chapters.reorder': {
    methods: ["PUT"],
    pattern: '/levels/:levelId/chapters/reorder',
    tokens: [{"old":"/levels/:levelId/chapters/reorder","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/chapters/reorder","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/chapters/reorder","type":0,"val":"chapters","end":""},{"old":"/levels/:levelId/chapters/reorder","type":0,"val":"reorder","end":""}],
    types: placeholder as Registry['chapters.reorder']['types'],
  },
  'chapters.store': {
    methods: ["POST"],
    pattern: '/levels/:levelId/chapters',
    tokens: [{"old":"/levels/:levelId/chapters","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/chapters","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/chapters","type":0,"val":"chapters","end":""}],
    types: placeholder as Registry['chapters.store']['types'],
  },
  'chapters.update': {
    methods: ["PUT"],
    pattern: '/levels/:levelId/chapters/:chapterId',
    tokens: [{"old":"/levels/:levelId/chapters/:chapterId","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/chapters/:chapterId","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/chapters/:chapterId","type":0,"val":"chapters","end":""},{"old":"/levels/:levelId/chapters/:chapterId","type":1,"val":"chapterId","end":""}],
    types: placeholder as Registry['chapters.update']['types'],
  },
  'chapters.archive': {
    methods: ["POST"],
    pattern: '/levels/:levelId/chapters/:chapterId/archive',
    tokens: [{"old":"/levels/:levelId/chapters/:chapterId/archive","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/chapters/:chapterId/archive","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/chapters/:chapterId/archive","type":0,"val":"chapters","end":""},{"old":"/levels/:levelId/chapters/:chapterId/archive","type":1,"val":"chapterId","end":""},{"old":"/levels/:levelId/chapters/:chapterId/archive","type":0,"val":"archive","end":""}],
    types: placeholder as Registry['chapters.archive']['types'],
  },
  'chapters.restore': {
    methods: ["POST"],
    pattern: '/levels/:levelId/chapters/:chapterId/restore',
    tokens: [{"old":"/levels/:levelId/chapters/:chapterId/restore","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/chapters/:chapterId/restore","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/chapters/:chapterId/restore","type":0,"val":"chapters","end":""},{"old":"/levels/:levelId/chapters/:chapterId/restore","type":1,"val":"chapterId","end":""},{"old":"/levels/:levelId/chapters/:chapterId/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['chapters.restore']['types'],
  },
  'chapters.destroy': {
    methods: ["DELETE"],
    pattern: '/levels/:levelId/chapters/:chapterId',
    tokens: [{"old":"/levels/:levelId/chapters/:chapterId","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/chapters/:chapterId","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/chapters/:chapterId","type":0,"val":"chapters","end":""},{"old":"/levels/:levelId/chapters/:chapterId","type":1,"val":"chapterId","end":""}],
    types: placeholder as Registry['chapters.destroy']['types'],
  },
  'activities.store': {
    methods: ["POST"],
    pattern: '/levels/:levelId/activities',
    tokens: [{"old":"/levels/:levelId/activities","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/activities","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/activities","type":0,"val":"activities","end":""}],
    types: placeholder as Registry['activities.store']['types'],
  },
  'activities.update': {
    methods: ["PUT"],
    pattern: '/levels/:levelId/activities/:activityId',
    tokens: [{"old":"/levels/:levelId/activities/:activityId","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/activities/:activityId","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/activities/:activityId","type":0,"val":"activities","end":""},{"old":"/levels/:levelId/activities/:activityId","type":1,"val":"activityId","end":""}],
    types: placeholder as Registry['activities.update']['types'],
  },
  'activities.archive': {
    methods: ["POST"],
    pattern: '/levels/:levelId/activities/:activityId/archive',
    tokens: [{"old":"/levels/:levelId/activities/:activityId/archive","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/activities/:activityId/archive","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/activities/:activityId/archive","type":0,"val":"activities","end":""},{"old":"/levels/:levelId/activities/:activityId/archive","type":1,"val":"activityId","end":""},{"old":"/levels/:levelId/activities/:activityId/archive","type":0,"val":"archive","end":""}],
    types: placeholder as Registry['activities.archive']['types'],
  },
  'activities.restore': {
    methods: ["POST"],
    pattern: '/levels/:levelId/activities/:activityId/restore',
    tokens: [{"old":"/levels/:levelId/activities/:activityId/restore","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/activities/:activityId/restore","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/activities/:activityId/restore","type":0,"val":"activities","end":""},{"old":"/levels/:levelId/activities/:activityId/restore","type":1,"val":"activityId","end":""},{"old":"/levels/:levelId/activities/:activityId/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['activities.restore']['types'],
  },
  'activities.destroy': {
    methods: ["DELETE"],
    pattern: '/levels/:levelId/activities/:activityId',
    tokens: [{"old":"/levels/:levelId/activities/:activityId","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/activities/:activityId","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/activities/:activityId","type":0,"val":"activities","end":""},{"old":"/levels/:levelId/activities/:activityId","type":1,"val":"activityId","end":""}],
    types: placeholder as Registry['activities.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
