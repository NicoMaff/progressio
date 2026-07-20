---
name: adonisjs-data-transformers
version: 0.2.1
description: AdonisJS data transformer and payload conventions. Use in AdonisJS projects when changing or reviewing transformers, browser/API payloads, exposed Lucid data, generated frontend types, or Tuyau client contracts.
---

# Adonis Data Transformers

## Activation

- Use this skill after AdonisJS is detected with `@adonisjs/core` in `package.json` and `adonisrc.ts`.
- Follow stricter local instructions and nearby code first.

## Docs

- Transformers: https://docs.adonisjs.com/guides/frontend/transformers
- API client and Tuyau: https://docs.adonisjs.com/guides/frontend/api-client

## Transformers And Payloads

- Always expose browser-facing or API-facing data through transformers when the project uses AdonisJS transformers.
- Do not expose Lucid model instances directly to Inertia pages or API clients.
- Return only the fields the client actually needs.
- Use the framework transformer API from the AdonisJS docs:
  - `transform(...)` for items and collections;
  - `paginate(...)` for paginated responses;
  - `useVariant(...)` only when a resource genuinely needs multiple output shapes;
  - `depth(...)` only when relation depth must be controlled explicitly;
  - `this.whenLoaded(...)` for optional relations.
- Keep transformers focused on shaping output.
- Do not trigger database queries from transformers by default.
- Prefer explicit eager loading in the controller, action, or service before calling the transformer.
- Lazy loading inside transformer-related code is acceptable only when explicitly needed and when it follows the documented `this.whenLoaded(...)` pattern.
- Use Lucid computed properties for simple derived fields that naturally belong on the model.
- For complex derived fields, permission-aware values, expensive calculations, or aggregates, calculate values in the controller, action, or service, then pass only the final value into the response/transformer flow.
- Use `toObject()` only to make the output shape explicit: it defines which fields and related resources should be returned in the serialized payload. Do not call `toObject()` from controllers or services; call `Transformer.transform(...)` for single items and collections, then let AdonisJS route the data through the transformer lifecycle.
- Do not add an explicit TypeScript return type to transformer `toObject()` methods. AdonisJS creates and manages this method as part of its transformer API, and its frontend types are inferred/generated from the transformer output (`InferData`, `InferVariants`, and `.adonisjs/client/data.d.ts`), so trying to manually type `toObject()` adds duplication and can fight the framework.
- Do not put complex business logic, database writes, reusable domain decisions, or custom exception logic in transformers.

## Tuyau And Types

- Prefer generated frontend types over hand-written frontend DTO types.
- In projects using Tuyau and AdonisJS generated client output, frontend types are generated automatically when the dev server reloads by reading controllers, transformers, and related backend metadata.
- Reload or restart the AdonisJS dev server after adding or changing controllers, transformers, or exported backend contracts that affect client types.
- Do not create manual frontend DTO/types when Tuyau can provide them.
- If generated types are stale or missing, regenerate via the documented app boot/dev server/package script.

## Cross-Skill Boundaries

- Use `adonisjs-controller-flow` for route/controller validation, controller authorization, generated barrel imports, and HTTP response flow.
- Use `adonisjs-persistence-services` for actions, services, Lucid model placement, queries, relation loading before transformation, transactions, and action/service errors.
