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
  'teaching_content.themes.index': {
    methods: ["GET","HEAD"],
    pattern: '/teaching-content/levels/:levelId/themes',
    tokens: [{"old":"/teaching-content","type":0,"val":"teaching-content","end":""},{"old":"/levels","type":0,"val":"levels","end":""},{"old":"/:levelId","type":1,"val":"levelId","end":""},{"old":"/themes","type":0,"val":"themes","end":""}],
    types: placeholder as Registry['teaching_content.themes.index']['types'],
  },
  'teaching_content.themes.store': {
    methods: ["POST"],
    pattern: '/teaching-content/levels/:levelId/themes',
    tokens: [{"old":"/teaching-content","type":0,"val":"teaching-content","end":""},{"old":"/levels","type":0,"val":"levels","end":""},{"old":"/:levelId","type":1,"val":"levelId","end":""},{"old":"/themes","type":0,"val":"themes","end":""}],
    types: placeholder as Registry['teaching_content.themes.store']['types'],
  },
  'teaching_content.themes.update': {
    methods: ["PUT"],
    pattern: '/teaching-content/levels/:levelId/themes/:themeId',
    tokens: [{"old":"/teaching-content","type":0,"val":"teaching-content","end":""},{"old":"/levels","type":0,"val":"levels","end":""},{"old":"/:levelId","type":1,"val":"levelId","end":""},{"old":"/themes","type":0,"val":"themes","end":""},{"old":"/:themeId","type":1,"val":"themeId","end":""}],
    types: placeholder as Registry['teaching_content.themes.update']['types'],
  'teaching_content.render': {
    methods: ["GET","HEAD"],
    pattern: '/teaching-content/levels/:levelId',
    tokens: [{"old":"/teaching-content/levels/:levelId","type":0,"val":"teaching-content","end":""},{"old":"/teaching-content/levels/:levelId","type":0,"val":"levels","end":""},{"old":"/teaching-content/levels/:levelId","type":1,"val":"levelId","end":""}],
    types: placeholder as Registry['teaching_content.render']['types'],
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
