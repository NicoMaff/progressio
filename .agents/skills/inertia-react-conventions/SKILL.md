---
name: inertia-react-conventions
version: 0.1.1
description: Inertia React conventions. Use in codebases when changing or reviewing Inertia.js React pages, layouts, forms, shared props, AdonisJS Inertia adapters, generated page or route types, routing, client-side state, UI behavior, or browser-facing code.
---

# Inertia React Convention

Use this skill only for projects that use Inertia with React. Follow local project instructions, generated page and route type systems, and nearby component patterns ahead of these defaults.

## Activation Checks

Before applying this skill:

- Check `package.json` dependencies and devDependencies for `@inertiajs/react`.
- Check for `createInertiaApp`, Inertia app setup, Inertia page resolution, or framework adapters such as `@adonisjs/inertia`.
- Check for an `inertia` directory, Inertia pages, shared layouts, page props, generated route helpers, or browser entry files.
- Check nearby code for form helpers, router usage, Link components, shared props, and local UI component conventions.
- Check whether the app is on Inertia v3 or still on Inertia v2 before using version-specific APIs.
- Apply this skill only if Inertia React is actually used.
- If the repository has stricter local instructions, follow the local instructions first.
- If Inertia React is not detected, do not apply this skill.

## First Checks

- Inspect nearby pages, layouts, forms, and shared components before editing.
- Match local composition, state, routing, and styling patterns.
- Preserve existing UI language and product terminology unless the task is explicitly about wording.
- Prefer aliases, page helpers, and route helpers already configured in the frontend TypeScript and Vite setup.
- Avoid broad visual redesigns when the task is a functional or data-flow change.

## Official Docs

- Inertia v3: https://inertiajs.com/docs/v3/getting-started
- Inertia v3 HTTP requests: https://inertiajs.com/docs/v3/the-basics/http-requests
- Inertia v2 for projects not migrated yet: https://inertiajs.com/docs/v2/getting-started
- AdonisJS Inertia guide: https://docs.adonisjs.com/guides/frontend/inertia
- `@adonisjs/inertia` adapter repository: https://github.com/adonisjs/inertia

Use the Inertia v3 docs by default for migrated projects. Use the v2 docs when package versions or local code show the project is not migrated yet. Treat the AdonisJS Inertia guide as the source for AdonisJS-specific integration details; it is still oriented around Inertia v2 until the AdonisJS docs and adapter guidance are updated for v3.

## AdonisJS Integration

- In AdonisJS apps, routing stays server-side in AdonisJS routes and controllers; do not introduce a separate client-side routing layer for Inertia pages.
- Render pages from controllers with the server-side Inertia adapter and let Inertia handle subsequent visits over its protocol.
- Store React frontend files in an `inertia` directory when using the AdonisJS adapter convention.
- Keep page components under the configured Inertia pages directory, commonly `inertia/pages`.
- Prefer `@adonisjs/inertia/react` components and helpers over raw `@inertiajs/react` imports when the project uses the AdonisJS adapter wrappers for named routes, forms, or generated typing.
- Keep `indexPages({ framework: "react" })` or the local equivalent configured when the project relies on generated page types.

## Generated Types And Aliases

- Ensure generated page, route, and shared prop types are reachable from the React app.
- Configure frontend `tsconfig` aliases for generated files when the project exposes generated pages, route types, or shared prop types.
- Configure Vite aliases to match TypeScript aliases so runtime resolution and editor/type resolution agree.
- Prefer existing generated helpers and typed route helpers over hand-built URLs.
- Treat server-provided props as an explicit contract; avoid assuming ORM shapes unless the backend intentionally exposes them.
- When the backend provides generated payload types through Tuyau, declare page props before the component with the global `Data` object and the Inertia `PageProps` helper.

```tsx
type Props = PageProps<{
  article: Data.Article
}>
```

## Pages, Layouts, And Props

- Keep page components focused on page composition and user interaction.
- Keep reusable UI in existing shared component layers when the project has them.
- Preserve shared props, layout selection, and page resolution conventions.
- Keep derived display state close to the page or component that owns it unless the project has a presenter or view-model pattern.

## Forms, Requests, And Navigation

- Use the project's established Inertia form pattern, such as `useForm`, the AdonisJS adapter `Form`, custom form components, or local request helpers.
- In Inertia v3 projects, consider `useHttp` for standalone HTTP requests that should not trigger an Inertia visit.
- Preserve validation error handling, pending states, redirects, flash messages, and scroll/state preservation behavior.
- Keep destructive or privileged actions behind the project's existing confirmation and authorization UX patterns.

## TypeScript And Client State

- Use explicit prop and payload types at boundaries.
- Avoid `any`; derive or import generated types when the project provides them.
- Keep local UI state local. Introduce shared stores only when nearby code already uses them or the state is genuinely cross-cutting.
- Preserve accessibility attributes and keyboard behavior present in nearby components.
