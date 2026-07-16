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
  'planning.progression_view': {
    methods: ["GET","HEAD"],
    pattern: '/planning/classes/:classId/progression',
    tokens: [{"old":"/planning/classes/:classId/progression","type":0,"val":"planning","end":""},{"old":"/planning/classes/:classId/progression","type":0,"val":"classes","end":""},{"old":"/planning/classes/:classId/progression","type":1,"val":"classId","end":""},{"old":"/planning/classes/:classId/progression","type":0,"val":"progression","end":""}],
    types: placeholder as Registry['planning.progression_view']['types'],
  },
  'teaching_content.render': {
    methods: ["GET","HEAD"],
    pattern: '/teaching-content/levels/:levelId',
    tokens: [{"old":"/teaching-content/levels/:levelId","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId","type":1,"val":"levelId","end":""}],
    types: placeholder as Registry['teaching_content.render']['types'],
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
  'themes.store': {
    methods: ["POST"],
    pattern: '/levels/:levelId/themes',
    tokens: [{"old":"/levels/:levelId/themes","type":0,"val":"levels","end":""},{"old":"/levels/:levelId/themes","type":1,"val":"levelId","end":""},{"old":"/levels/:levelId/themes","type":0,"val":"themes","end":""}],
    types: placeholder as Registry['themes.store']['types'],
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
