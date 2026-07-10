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
  'teaching_content.render': {
    methods: ["GET","HEAD"],
    pattern: '/teaching-content/levels/:levelId',
    tokens: [{"old":"/teaching-content/levels/:levelId","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId","type":1,"val":"levelId","end":""}],
    types: placeholder as Registry['teaching_content.render']['types'],
  },
  'teaching_content.themes.index': {
    methods: ["GET","HEAD"],
    pattern: '/teaching-content/levels/:levelId/themes',
    tokens: [{"old":"/teaching-content/levels/:levelId/themes","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/themes","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/themes","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/themes","type":0,"val":"themes","end":""}],
    types: placeholder as Registry['teaching_content.themes.index']['types'],
  },
  'teaching_content.themes.store': {
    methods: ["POST"],
    pattern: '/teaching-content/levels/:levelId/themes',
    tokens: [{"old":"/teaching-content/levels/:levelId/themes","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/themes","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/themes","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/themes","type":0,"val":"themes","end":""}],
    types: placeholder as Registry['teaching_content.themes.store']['types'],
  },
  'teaching_content.themes.update': {
    methods: ["PUT"],
    pattern: '/teaching-content/levels/:levelId/themes/:themeId',
    tokens: [{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":0,"val":"themes","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":1,"val":"themeId","end":""}],
    types: placeholder as Registry['teaching_content.themes.update']['types'],
  },
  'teaching_content.themes.archive': {
    methods: ["POST"],
    pattern: '/teaching-content/levels/:levelId/themes/:themeId/archive',
    tokens: [{"old":"/teaching-content/levels/:levelId/themes/:themeId/archive","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId/archive","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId/archive","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId/archive","type":0,"val":"themes","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId/archive","type":1,"val":"themeId","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId/archive","type":0,"val":"archive","end":""}],
    types: placeholder as Registry['teaching_content.themes.archive']['types'],
  },
  'teaching_content.themes.restore': {
    methods: ["POST"],
    pattern: '/teaching-content/levels/:levelId/themes/:themeId/restore',
    tokens: [{"old":"/teaching-content/levels/:levelId/themes/:themeId/restore","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId/restore","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId/restore","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId/restore","type":0,"val":"themes","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId/restore","type":1,"val":"themeId","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['teaching_content.themes.restore']['types'],
  },
  'teaching_content.themes.destroy': {
    methods: ["DELETE"],
    pattern: '/teaching-content/levels/:levelId/themes/:themeId',
    tokens: [{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":0,"val":"themes","end":""},{"old":"/teaching-content/levels/:levelId/themes/:themeId","type":1,"val":"themeId","end":""}],
    types: placeholder as Registry['teaching_content.themes.destroy']['types'],
  },
  'teaching_content.chapters.store': {
    methods: ["POST"],
    pattern: '/teaching-content/levels/:levelId/chapters',
    tokens: [{"old":"/teaching-content/levels/:levelId/chapters","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/chapters","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/chapters","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/chapters","type":0,"val":"chapters","end":""}],
    types: placeholder as Registry['teaching_content.chapters.store']['types'],
  },
  'teaching_content.chapters.update': {
    methods: ["PUT"],
    pattern: '/teaching-content/levels/:levelId/chapters/:chapterId',
    tokens: [{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":0,"val":"chapters","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":1,"val":"chapterId","end":""}],
    types: placeholder as Registry['teaching_content.chapters.update']['types'],
  },
  'teaching_content.chapters.archive': {
    methods: ["POST"],
    pattern: '/teaching-content/levels/:levelId/chapters/:chapterId/archive',
    tokens: [{"old":"/teaching-content/levels/:levelId/chapters/:chapterId/archive","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId/archive","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId/archive","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId/archive","type":0,"val":"chapters","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId/archive","type":1,"val":"chapterId","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId/archive","type":0,"val":"archive","end":""}],
    types: placeholder as Registry['teaching_content.chapters.archive']['types'],
  },
  'teaching_content.chapters.restore': {
    methods: ["POST"],
    pattern: '/teaching-content/levels/:levelId/chapters/:chapterId/restore',
    tokens: [{"old":"/teaching-content/levels/:levelId/chapters/:chapterId/restore","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId/restore","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId/restore","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId/restore","type":0,"val":"chapters","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId/restore","type":1,"val":"chapterId","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['teaching_content.chapters.restore']['types'],
  },
  'teaching_content.chapters.destroy': {
    methods: ["DELETE"],
    pattern: '/teaching-content/levels/:levelId/chapters/:chapterId',
    tokens: [{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":0,"val":"chapters","end":""},{"old":"/teaching-content/levels/:levelId/chapters/:chapterId","type":1,"val":"chapterId","end":""}],
    types: placeholder as Registry['teaching_content.chapters.destroy']['types'],
  },
  'teaching_content.activities.store': {
    methods: ["POST"],
    pattern: '/teaching-content/levels/:levelId/activities',
    tokens: [{"old":"/teaching-content/levels/:levelId/activities","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/activities","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/activities","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/activities","type":0,"val":"activities","end":""}],
    types: placeholder as Registry['teaching_content.activities.store']['types'],
  },
  'teaching_content.activities.update': {
    methods: ["PUT"],
    pattern: '/teaching-content/levels/:levelId/activities/:activityId',
    tokens: [{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":0,"val":"activities","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":1,"val":"activityId","end":""}],
    types: placeholder as Registry['teaching_content.activities.update']['types'],
  },
  'teaching_content.activities.archive': {
    methods: ["POST"],
    pattern: '/teaching-content/levels/:levelId/activities/:activityId/archive',
    tokens: [{"old":"/teaching-content/levels/:levelId/activities/:activityId/archive","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId/archive","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId/archive","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId/archive","type":0,"val":"activities","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId/archive","type":1,"val":"activityId","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId/archive","type":0,"val":"archive","end":""}],
    types: placeholder as Registry['teaching_content.activities.archive']['types'],
  },
  'teaching_content.activities.restore': {
    methods: ["POST"],
    pattern: '/teaching-content/levels/:levelId/activities/:activityId/restore',
    tokens: [{"old":"/teaching-content/levels/:levelId/activities/:activityId/restore","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId/restore","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId/restore","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId/restore","type":0,"val":"activities","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId/restore","type":1,"val":"activityId","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId/restore","type":0,"val":"restore","end":""}],
    types: placeholder as Registry['teaching_content.activities.restore']['types'],
  },
  'teaching_content.activities.destroy': {
    methods: ["DELETE"],
    pattern: '/teaching-content/levels/:levelId/activities/:activityId',
    tokens: [{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":1,"val":"levelId","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":0,"val":"activities","end":""},{"old":"/teaching-content/levels/:levelId/activities/:activityId","type":1,"val":"activityId","end":""}],
    types: placeholder as Registry['teaching_content.activities.destroy']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
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
