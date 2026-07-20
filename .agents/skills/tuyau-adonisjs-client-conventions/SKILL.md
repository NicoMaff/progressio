---
name: tuyau-adonisjs-client-conventions
version: 0.1.1
description: Tuyau client conventions for AdonisJS APIs. Use in codebases when changing or reviewing API calls made through a Tuyau generated client, typed request helpers, generated route types, or generated API response contracts.
---

# Tuyau Client Convention

Use this skill only after confirming the frontend uses Tuyau as an API client for an AdonisJS backend. It can apply without Inertia and in separate frontend/backend workspaces. Follow local API-client wrappers, generated type locations, and generation scripts ahead of these defaults.

## Activation Checks

Before applying this skill:

- Check `package.json` dependencies and devDependencies for `@tuyau/core`.
- Check nearby frontend code for imports from a Tuyau generated registry, generated client, or local wrappers around it.
- Apply this skill only if Tuyau client usage is actually present or being introduced.
- If the repository has stricter local instructions, follow the local instructions first.
- If `@tuyau/core` is not detected, do not apply this skill.

## First Checks

- Inspect the local generated client, wrappers, and nearby API calls before editing.
- Prefer existing Tuyau client methods or typed request helpers over hand-built URLs or ad hoc fetch calls.
- Use package manager scripts from `package.json` when regeneration is needed.
- Do not manually edit generated Tuyau output.
- Keep generated output out of manual refactors unless the repository intentionally tracks it.

## Official Docs

- Tuyau: https://tuyau.julr.dev/
- AdonisJS API client: https://docs.adonisjs.com/guides/frontend/api-client

## Client Usage

- Keep request and response types explicit at boundaries.
- Preserve the project's existing error, validation, redirect, and authentication handling.
- Co-locate API calls with the local pattern: page-level handlers, hooks, services, or client modules.
- Avoid duplicating route strings when a typed route helper or generated client method exists.
- Avoid duplicating response DTOs when the generated client already exposes the contract.
- Keep cache invalidation or UI refresh behavior consistent with nearby code.

## Backend Contract Awareness

- Treat backend route names, validators, serializers, and response shapes as the source contract.
- When changing server contracts, update frontend usage and regenerate types if required.
- Do not expose raw persistence models to the frontend merely because the generated client can type them.
