---
name: adonisjs-controller-flow
version: 0.1.1
description: AdonisJS controller flow conventions. Use in AdonisJS projects when changing or reviewing routes, controllers, HTTP validation, authorization, generated barrel files, Inertia page flows, or API response conventions.
---

# Adonis Controller Flow

## Activation

- Use this skill after AdonisJS is detected with `@adonisjs/core` in `package.json` and `adonisrc.ts`.
- Follow stricter local instructions and nearby code first.

## Docs

- Routing: https://docs.adonisjs.com/guides/basics/routing
- Controllers: https://docs.adonisjs.com/guides/basics/controllers
- Barrel files: https://docs.adonisjs.com/guides/concepts/barrel-files
- Validation: https://docs.adonisjs.com/guides/basics/validation
- Inertia: https://docs.adonisjs.com/guides/frontend/inertia

## Routes And Barrel Files

- Prefer one route per controller flow.
- Do not use `Route.resource(...)` unless explicitly requested or already established locally for a simple resource.
- Point a route to one controller and one method when practical: `render` for read/page rendering and `execute` for command/write flows.
- Preserve existing route groups, middleware, `.as(...)` usage, and route helper patterns.
- Use AdonisJS generated barrel files for controller imports when the project uses them.
- Import controllers and generated server helpers through the project generated alias, usually `#generated`, instead of importing controller files directly.
- Do not manually edit generated files under `.adonisjs/server/**` or `.adonisjs/client/**`.
- After adding, renaming, moving, or deleting a controller, restart or reload the AdonisJS dev server so generated barrel files and client types are regenerated.

## Controllers

- Create one controller per execution flow.
- Use only these public controller methods by convention: `render` for read/page responses and `execute` for command/write flows.
- A controller may contain both `render` and `execute` when a flow has both display and submit routes, such as a form.
- Keep controllers thin: coordinate HTTP concerns, validate input, call actions/queries/services, transform payloads, and return the HTTP response.
- Keep transactions, complex domain logic, persistence-heavy logic, reusable calculations, Lucid model rules, and transformer details in the specialized skills that own them.

## Controller Workflow

For Inertia/page rendering:

1. Let route middleware run before the controller; use it for broad authentication/authorization when configured.
2. In the controller, read route params, query string, and request input.
3. Validate request data near the beginning of the controller flow.
4. Use Bouncer or the local policy layer for resource-specific authorization.
5. Call simple local queries inline only when obvious and not reused.
6. Delegate complex reads/writes to actions or services; use `adonisjs-persistence-services` for those rules.
7. Prepare computed values that are too complex for model computed properties.
8. Return `inertia.render(...)` with transformed data; use `adonisjs-data-transformers` for payload shaping.

For API responses:

1. Let route middleware run before the controller for broad auth concerns.
2. In the controller, read route params, query string, and request input.
3. Validate request data near the beginning of the controller flow.
4. Use Bouncer or the local policy layer for resource-specific authorization.
5. Call actions, services, or simple inline queries.
6. Return serialized transformed data with the `serialize` API from `HttpContext` when the project uses AdonisJS transformers.

## Validation

- Use the validation library already present in the project.
- Prefer current VineJS APIs used by the project.
- Use `vine.create(...)` for new inline validators when the project is on the current VineJS/AdonisJS API.
- Do not introduce legacy `vine.compile(...)` patterns unless the local project still uses them.
- Validate in the controller near the beginning of the flow, even when delegating work to actions or services.
- Put validators in feature-local `validators` folders by default.
- Prefer one validator file per resource, with several named exports when needed:

```ts
export const createArticleValidator = vine.create(...)
export const updateArticleValidator = vine.create(...)
export const filterArticlesValidator = vine.create(...)
```

- Inline static controller validators are acceptable for very small validators: about 5 or 6 fields, no conditional validation, and no expected reuse.
- Move larger, conditional, or reused validators to the feature `validators` folder.

## Authorization

- Use middleware for broad route-level authentication and authorization; it runs before the request reaches the controller.
- Use Bouncer or the project's policy layer for resource-specific authorization.
- Keep authorization close to the controller flow when it depends on the current HTTP request, user, or loaded resource.
- Do not bury resource authorization inside transformers.
- Preserve existing middleware groups, policy organization, and Bouncer conventions.
