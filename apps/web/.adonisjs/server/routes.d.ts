import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'teaching_content.render': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'teaching_content.themes.index': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'teaching_content.themes.store': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'teaching_content.themes.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'teaching_content.chapters.store': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'teaching_content.chapters.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'teaching_content.render': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'teaching_content.themes.index': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'teaching_content.render': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'teaching_content.themes.index': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'teaching_content.themes.store': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'teaching_content.chapters.store': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'teaching_content.themes.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'teaching_content.chapters.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}