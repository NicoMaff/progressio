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
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/teaching_content_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#src/teaching_content/controllers/teaching_content_controller').default['render']>>>
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
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/teaching_content_themes_page_controller').default['render']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/teaching_content_themes_page_controller').default['render']>>>
    }
  }
  'teaching_content.themes.store': {
    methods: ["POST"]
    pattern: '/teaching-content/levels/:levelId/themes'
    types: {
      body: ExtractBody<InferInput<(typeof import('src/teaching_content/validators/theme_validator.js').createThemeValidator)>>
      paramsTuple: [ParamValue]
      params: { levelId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('src/teaching_content/validators/theme_validator.js').createThemeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/teaching_content_create_theme_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/teaching_content_create_theme_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'teaching_content.themes.update': {
    methods: ["PUT"]
    pattern: '/teaching-content/levels/:levelId/themes/:themeId'
    types: {
      body: ExtractBody<InferInput<(typeof import('src/teaching_content/validators/theme_validator.js').updateThemeValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { levelId: ParamValue; themeId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('src/teaching_content/validators/theme_validator.js').updateThemeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/teaching_content_update_theme_controller').default['execute']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/teaching_content_update_theme_controller').default['execute']>>> | { status: 422; response: { errors: SimpleError[] } }
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
