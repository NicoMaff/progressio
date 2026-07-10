import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'teaching_content.render': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.list': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.store': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'themes.archive': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'themes.restore': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'chapters.store': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'chapters.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'chapters.archive': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'chapters.restore': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'activities.store': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'activities.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
    'activities.archive': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
    'activities.restore': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'teaching_content.render': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.list': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'teaching_content.render': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.list': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'themes.store': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.archive': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'themes.restore': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'chapters.store': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'chapters.archive': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'chapters.restore': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'activities.store': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'activities.archive': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
    'activities.restore': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'themes.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'chapters.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'activities.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}