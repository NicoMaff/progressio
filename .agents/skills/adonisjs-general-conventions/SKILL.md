---
name: adonisjs-general-conventions
version: 0.1.1
description: AdonisJS general conventions and skill router. Use in AdonisJS projects when reviewing backend structure, src feature organization, src/core boundaries, local convention priority, or deciding whether to use a more specific AdonisJS skill.
---

# Adonis Backend Convention

Use this skill only for AdonisJS projects. Prefer stricter local instructions, nearby code patterns, and repository architecture before these defaults.

## Activation

- Check `package.json` dependencies or devDependencies for `@adonisjs/core`.
- Check that `adonisrc.ts` exists.
- Apply this skill only when both checks pass.
- If AdonisJS is not detected, do not apply Adonis-specific skills.

## Source Of Truth

- Follow the official AdonisJS documentation for framework behavior and APIs: https://docs.adonisjs.com/introduction
- Prefer package manager scripts from `package.json` over hardcoded framework commands.
- Prefer aliases already configured in the project over deep relative imports.
- Read the touched feature/capability folder before editing.
- Keep code changes scoped to the module, feature, or capability implied by the request.

## Folder Structure

- Store backend application code under `src` when the project follows this convention.
- Organize `src` by feature/capability/resource, such as `auth`, `articles`, or `accounting`.
- Prefer this shape when creating new backend code:

```txt
src/
  articles/
    controllers/
    actions/
    services/
    validators/
    transformers/
  core/
    exceptions/
    middleware/
    models/
    providers/
    services/
```

- Keep `src/<capability>` for feature-owned controllers, actions, services, validators, transformers, and feature-specific behavior.
- Keep `src/core` for cross-feature logic, shared infrastructure, reusable domain building blocks, global exceptions, middleware, providers, models, and intentionally shared services.
- Keep Lucid models in `src/core/models` by default; move models into a capability only when that capability owns several strongly related models and the local architecture supports it.
- Prefer feature-local actions, services, validators, and transformers before adding shared abstractions to `core`.

## Use Specialized Skills

- Use `adonisjs-controller-flow` for routes, controllers, generated barrel files, HTTP validation, controller authorization, Inertia/page flows, or API controller responses.
- Use `adonisjs-persistence-services` for actions, services, queries, dependency injection, Lucid models, persistence, transactions, and action/service domain errors.
- Use `adonisjs-data-transformers` for transformers, browser/API payloads, exposed data, Tuyau, and generated frontend types.
- Use `adonisjs-japa-testing` for AdonisJS/Japa testing strategy, test commands, and test conventions.
