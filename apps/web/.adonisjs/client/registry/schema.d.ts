/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'teaching_content.render': {
    methods: ["GET","HEAD"]
    pattern: '/teaching-content/levels/:levelId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { levelId: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#teaching_content/validators/teaching_content_archive_filter_validator').teachingContentArchiveFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/teaching_content_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/teaching_content_controller').default['render']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'teaching_content.themes.index': {
    methods: ["GET","HEAD"]
    pattern: '/teaching-content/levels/:levelId/themes'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { levelId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/themes_page_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/themes_page_controller').default['render']>>>
    }
  }
  'teaching_content.themes.store': {
    methods: ["POST"]
    pattern: '/teaching-content/levels/:levelId/themes'
    types: {
      body: ExtractBody<InferInput<(typeof import('#teaching_content/validators/theme_validator').createThemeValidator)>>
      paramsTuple: [ParamValue]
      params: { levelId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#teaching_content/validators/theme_validator').createThemeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/create_theme_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/create_theme_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'teaching_content.themes.update': {
    methods: ["PUT"]
    pattern: '/teaching-content/levels/:levelId/themes/:themeId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#teaching_content/validators/theme_validator').updateThemeValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { levelId: ParamValue; themeId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#teaching_content/validators/theme_validator').updateThemeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/update_theme_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/update_theme_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'teaching_content.themes.archive': {
    methods: ["POST"]
    pattern: '/teaching-content/levels/:levelId/themes/:themeId/archive'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { levelId: ParamValue; themeId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/archive_theme_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/archive_theme_controller').default['execute']>>>
    }
  }
  'teaching_content.themes.restore': {
    methods: ["POST"]
    pattern: '/teaching-content/levels/:levelId/themes/:themeId/restore'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { levelId: ParamValue; themeId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/restore_theme_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/restore_theme_controller').default['execute']>>>
    }
  }
  'teaching_content.chapters.store': {
    methods: ["POST"]
    pattern: '/teaching-content/levels/:levelId/chapters'
    types: {
      body: ExtractBody<InferInput<(typeof import('#teaching_content/validators/chapter_validator').createChapterValidator)>>
      paramsTuple: [ParamValue]
      params: { levelId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#teaching_content/validators/chapter_validator').createChapterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/create_chapter_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/create_chapter_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'teaching_content.chapters.update': {
    methods: ["PUT"]
    pattern: '/teaching-content/levels/:levelId/chapters/:chapterId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#teaching_content/validators/chapter_validator').updateChapterValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { levelId: ParamValue; chapterId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#teaching_content/validators/chapter_validator').updateChapterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/update_chapter_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/update_chapter_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'teaching_content.chapters.archive': {
    methods: ["POST"]
    pattern: '/teaching-content/levels/:levelId/chapters/:chapterId/archive'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { levelId: ParamValue; chapterId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/archive_chapter_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/archive_chapter_controller').default['execute']>>>
    }
  }
  'teaching_content.chapters.restore': {
    methods: ["POST"]
    pattern: '/teaching-content/levels/:levelId/chapters/:chapterId/restore'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { levelId: ParamValue; chapterId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/restore_chapter_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/restore_chapter_controller').default['execute']>>>
    }
  }
  'teaching_content.activities.store': {
    methods: ["POST"]
    pattern: '/teaching-content/levels/:levelId/activities'
    types: {
      body: ExtractBody<InferInput<(typeof import('#teaching_content/validators/activity_validator').createActivityValidator)>>
      paramsTuple: [ParamValue]
      params: { levelId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#teaching_content/validators/activity_validator').createActivityValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/create_activity_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/create_activity_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'teaching_content.activities.update': {
    methods: ["PUT"]
    pattern: '/teaching-content/levels/:levelId/activities/:activityId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#teaching_content/validators/activity_validator').updateActivityValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { levelId: ParamValue; activityId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#teaching_content/validators/activity_validator').updateActivityValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/update_activity_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/update_activity_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'teaching_content.activities.archive': {
    methods: ["POST"]
    pattern: '/teaching-content/levels/:levelId/activities/:activityId/archive'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { levelId: ParamValue; activityId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/archive_activity_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/archive_activity_controller').default['execute']>>>
    }
  }
  'teaching_content.activities.restore': {
    methods: ["POST"]
    pattern: '/teaching-content/levels/:levelId/activities/:activityId/restore'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { levelId: ParamValue; activityId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/restore_activity_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/restore_activity_controller').default['execute']>>>
    }
  }
  'new_account.create': {
    methods: ["GET","HEAD"]
    pattern: '/signup'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
    }
  }
  'new_account.store': {
    methods: ["POST"]
    pattern: '/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'session.create': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
    }
  }
  'session.store': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
    }
  }
  'session.destroy': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
    }
  }
}
