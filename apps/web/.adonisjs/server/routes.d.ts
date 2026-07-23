import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'dashboard.level_progress_summary': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'planning.progression_view': { paramsTuple: [ParamValue]; params: {'classId': ParamValue} }
    'teaching_content.render': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.select': { paramsTuple?: []; params?: {} }
    'teaching_content.themes.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'teaching_content.chapters.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'teaching_content.activities.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
    'themes.list': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.archived': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.edit': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'themes.store': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.reorder': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'themes.archive': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'themes.restore': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'themes.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'chapters.store': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'chapters.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'chapters.archive': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'chapters.restore': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'chapters.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'activities.store': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'activities.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
    'activities.archive': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
    'activities.restore': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
    'activities.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'dashboard.level_progress_summary': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'planning.progression_view': { paramsTuple: [ParamValue]; params: {'classId': ParamValue} }
    'teaching_content.render': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.select': { paramsTuple?: []; params?: {} }
    'themes.list': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.archived': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.edit': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'dashboard.level_progress_summary': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'planning.progression_view': { paramsTuple: [ParamValue]; params: {'classId': ParamValue} }
    'teaching_content.render': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.select': { paramsTuple?: []; params?: {} }
    'themes.list': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.archived': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.edit': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
  }
  DELETE: {
    'teaching_content.themes.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'teaching_content.chapters.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'teaching_content.activities.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
    'themes.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'chapters.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'activities.destroy': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
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
  }
  PUT: {
    'themes.reorder': { paramsTuple: [ParamValue]; params: {'levelId': ParamValue} }
    'themes.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'themeId': ParamValue} }
    'chapters.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'chapterId': ParamValue} }
    'activities.update': { paramsTuple: [ParamValue,ParamValue]; params: {'levelId': ParamValue,'activityId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}