---
name: adonisjs-persistence-services
version: 0.1.1
description: AdonisJS persistence, actions, services, and Lucid conventions. Use in AdonisJS projects when changing or reviewing use cases, reusable services, queries, dependency injection, Lucid models, persistence, transactions, or action/service errors.
---

# Adonis Persistence Services

## Activation

- Use this skill after AdonisJS is detected with `@adonisjs/core` in `package.json` and `adonisrc.ts`.
- Follow stricter local instructions and nearby code first.

## Docs

- Dependency injection: https://docs.adonisjs.com/guides/concepts/dependency-injection
- Lucid: https://lucid.adonisjs.com/docs/introduction

## Actions, Queries, And Services

- Use actions for simple use cases.
- Use services for more complex behavior, reusable operations, or behavior with multiple related methods.
- Expose `run()` as the main action/service method unless the local project already has a stricter pattern.
- Keep simple queries inline in controllers when they are local, obvious, and not reused.
- Move a query into an action or service when it becomes complex, reused, or part of a larger use case.
- Do not create a separate `queries` folder by default unless the local project already uses one.
- Put feature-specific services in the feature/capability folder.
- Put a service in `core/services` only when it is already shared by multiple capabilities or intentionally designed as cross-capability.
- Keep detailed controller validation rules in `adonisjs-controller-flow`.
- Keep transformer and exposed payload rules in `adonisjs-data-transformers`.

## Dependency Injection

- Prefer AdonisJS dependency injection for controllers, actions, services, and transformers when dependencies are needed.
- Add `@inject()` from `@adonisjs/core` to classes or methods that rely on constructor-based or method-based dependency injection.
- Keep injected dependencies explicit.
- Prefer injecting actions or services over constructing them manually inside controllers.
- Do not hide simple local values behind dependency injection.

## Models And Persistence

- Use Lucid model, query builder, relationship, and transaction patterns already present in the feature.
- Keep Lucid models in `src/core/models` by default.
- Move models into a capability only when the project has grown enough that the capability owns several strongly related models and the local architecture supports feature-local models.
- Keep database writes atomic when multiple records must change together.
- Put transaction boundaries in actions or service methods, not controllers.
- Avoid hiding deployment-sensitive schema or migration behavior in unrelated refactors.
- Prefer focused domain methods, actions, or services over duplicated query fragments when shared behavior is already modeled that way.
- Avoid implicit relation loading when the response shape depends on a relation being present.
- Explicitly load relations before transformation unless the flow deliberately uses documented lazy/conditional transformer behavior.

## Errors

- Use native AdonisJS/framework conventions for framework-managed errors such as authentication, authorization, validation, and `findOrFail`-style missing resources.
- Use custom exceptions for domain or application errors that are not already represented by the framework.
- Put shared custom exceptions in `core/exceptions`.
- Throw custom exceptions from actions or services, not transformers.
- Keep error handling consistent with the project's exception handler and HTTP response conventions.
