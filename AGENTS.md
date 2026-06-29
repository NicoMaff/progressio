# Progressio Agent Instructions

## Project Shape

- Progressio is a local-first application for a single teacher, using a local SQLite work file as the unit of work.
- For development, the active SQLite work file may be configured at application startup. The product target is user-driven direct opening of a selected work file. If direct opening proves too complex for the local web application, an import-copy workflow can be reconsidered explicitly.
- Create dated work-file backups before risky operations such as schema migrations, large imports, or global destructive operations. Also expose a manual backup action. Do not implement continuous version history unless a later ADR changes this scope.
- Support one active work file at a time. For now, the active work file is configured at application startup; do not implement recent files yet.
- Model the application state where no work file is open. Protect routes that require planning data with a work-file-required guard or middleware instead of assuming a database is always active.
- Create development work files through an Adonis Ace/dev command that creates the SQLite file, runs migrations, and may seed demo data when explicitly requested.
- Creating a work file requires at least a `School Year` and a `Subject`. Other setup data can be configured after creation unless a later workflow requires it.
- Store technical work-file metadata in a dedicated singleton table when needed, such as file identifier, format version, creation timestamp, and migration state. Do not duplicate `School Year` or `Subject` in this metadata table when those belong to domain tables.
- In the initial model, store `Subject` as a field of `School Year` rather than as a dedicated subject table.
- A work file contains exactly one `School Year` in the initial model. Do not build multi-year selection inside a single work file unless a later ADR changes this scope.
- Model `School Year` with at least a label, start date, end date, subject, and teaching-hour duration in minutes.
- Use UUID text identifiers for domain records by default. Generate UUIDs through Knex/migration-compatible defaults where possible, and keep the implementation portable between SQLite and PostgreSQL assumptions.
- Add `created_at` and `updated_at` timestamps to main domain tables by default. Store technical timestamps in UTC. Store domain dates such as school-year bounds or session dates as dates when time-of-day is not meaningful.
- Use `snake_case` SQL naming: plural table names, `snake_case` column names, and foreign keys named `{singular_table}_id` such as `school_year_id` or `class_id`.
- Do not add generic soft deletes by default. Use explicit domain concepts such as archived teaching content and controlled physical deletion rules.
- Enforce structural invariants with database constraints where practical: `NOT NULL`, foreign keys, unique indexes, and portable `CHECK` constraints. Keep workflow-dependent or UX-heavy validation in application validators, actions, or services.
- Use `apps/web/storage/work_files/dev.sqlite` as the default development work-file path. Ignore generated SQLite files, WAL/SHM files, and work-file backups in Git.
- Build Progressio as a local web application for now. Do not introduce a desktop wrapper such as Tauri or Electron unless a later ADR changes the product target.
- Use modern Yarn workspaces for monorepo dependency management and scripts.
- Use Corepack-managed Yarn 4 with `nodeLinker: node-modules`; do not use Plug'n'Play unless an ADR changes this decision.
- Keep the monorepo lightweight:
  - `apps/web` contains the `@progressio/web` AdonisJS application and Inertia frontend.
  - `packages/ui` contains the `@progressio/ui` reusable React UI components and Storybook.
- Do not introduce a separate backend API, SPA app, shared domain package, or service boundary unless a documented decision explicitly calls for it.

## AdonisJS And Inertia

- The web app uses AdonisJS with InertiaJS, React, and TypeScript.
- Use AdonisJS-integrated Tuyau for generated route, page, and client contracts when available.
- Follow the AdonisJS Inertia adapter convention: Inertia views live under `apps/web/inertia/pages`.
- Keep Adonis routes and controllers server-side. Do not add a client-side router for Inertia pages.
- Store backend application code under `apps/web/src`.
- Organize backend code by feature first. Each feature may use the same generic subfolders, such as `controllers`, `validators`, `transformers`, `services`, and `actions`.
- Use these initial backend feature areas unless the codebase proves a different boundary is clearer: `work_files`, `school_years`, `teaching_content`, `planning`, `actuals`, and `interruptions`.
- Keep `Class` ownership in `teaching_content` with levels and other teaching reference data. Planning and actuals may reference classes but should not own class configuration.
- Keep `Period` ownership in `school_years`; periods are global subdivisions of the school year, not class or session-owned data.
- Keep `Recurring Slot` ownership in `planning`; recurring slots exist to generate and organize planned sessions for classes.
- Keep `Planning Conflict` ownership in `interruptions`; planning may consume conflict resolutions or apply rescheduling, but conflicts are created by interruptions.
- Keep `Template Progression` and `Template Session` ownership in `planning`; they structure planned teaching sequences and reference teaching content.
- Keep confirmed `Session Outcome` ownership in `planning` because it is the tracking result of a planned session. `actuals` provides the actual-session facts used to suggest or review outcomes.
- Store feature-owned enums inside the owning feature. Use `src/core/enums` only for genuinely cross-feature enum values.
- Each backend feature may define its own import alias in `apps/web/package.json`.
- Use `apps/web/src/core` for shared or cross-feature backend code only, including shared models, middleware, providers, exceptions, helpers, utils, enums, and transverse services.
- Store Lucid models in `apps/web/src/core/models` unless a later ADR introduces a stricter bounded-context split.
- Keep database migrations and seeders in the standard Adonis location under `apps/web/database`.
- Do not let `core` become a catch-all for feature behavior. Put feature-specific rules, actions, services, validators, and transformers inside the owning feature.
- Keep controllers thin. Use them to coordinate HTTP concerns, validation, authorization, and Inertia rendering; move use-case logic into feature actions or services, and shape browser-facing payloads with feature transformers.
- Keep `apps/web/start/routes.ts` as the main route entry point. Extract dedicated feature route files only when route complexity justifies it, and import those files from the main route file.
- Routes should import controllers from automatically generated barrel files when the Adonis setup provides them.
- Prefer atomic controllers with `render` for read/page responses and `execute` for command/write flows.

## Naming

- Use `camelCase` for variables, functions, methods, and local non-static constants.
- Use `PascalCase` for classes, React components, TypeScript types, TypeScript interfaces, and enums.
- Use `snake_case` for file and folder names unless an external framework convention requires otherwise.
- Use `SCREAMING_SNAKE_CASE` for global constants, static immutable constants, environment variables, and immutable configuration keys.
- React component names must use `PascalCase`; when no stricter local convention exists, their files should use `snake_case.tsx`.
- In `packages/ui`, component files should use `snake_case.tsx` and export `PascalCase` component names. Prefer `src/atoms/button.tsx` over `src/atoms/button/index.tsx` unless a component genuinely needs a local folder.
- Prefer named functional React components.
- Type React props with `type` by default; use `interface` only when extension or declaration merging is intentionally useful.
- Accept `className` on reusable UI components when composition or layout customization is expected.
- Declare `children` explicitly when a component renders children.
- Use `forwardRef` only for DOM-interactive or composition-heavy components that need ref forwarding.
- Use `class-variance-authority` for reusable component variants. Keep UnoCSS classes statically visible inside variant definitions so extraction remains reliable.
- Do not add a shared `cn` helper until the project has confirmed merge semantics that fit UnoCSS.
- Use the Tailwind Prettier plugin to order utility classes, while keeping UnoCSS as the styling engine.
- Use Radix UI as the initial accessibility primitive choice for complex components such as dialogs, popovers, dropdown menus, tabs, tooltips, and selects. Keep simple atoms like buttons, cards, badges, inputs, and labels local unless Radix provides clear value.
- shadcn-style components may be tested as a spike, but shadcn is not an official project architecture yet. Adapt any useful patterns to `@progressio/ui`, UnoCSS, CVA, and the atoms/molecules structure instead of importing incompatible assumptions blindly.
- Do not pass Lucid models or raw database rows directly to browser-facing components. Shape explicit payloads through Adonis transformers first.
- Transformers should return UI-neutral screen data: identifiers, canonical domain values, dates, durations, and displayable text when it belongs to the application contract. Do not return component-specific props, CSS classes, badge colors, or icon names from transformers.
- Prefer generated Tuyau/Inertia helpers and types over duplicated route strings, hand-written page contracts, or ad hoc fetch types.
- Do not manually edit generated Tuyau or Adonis output; regenerate it through the project scripts when backend routes, controllers, validators, or response contracts change.

## Frontend Boundaries

- `packages/ui` must not depend on AdonisJS, Lucid, Inertia, route helpers, or application persistence.
- Consume `@progressio/ui` from source inside the workspace. Do not add a library build pipeline or require a generated `dist` unless a concrete external consumption need appears.
- Expose `@progressio/ui` through controlled barrel exports such as `src/index.ts`, `src/atoms/index.ts`, and `src/molecules/index.ts`. App code should import from `@progressio/ui` instead of deep source paths.
- `packages/ui` may expose component layers such as:
  - `atoms`
  - `molecules`
  - `organisms`, only when a component is genuinely composed enough to justify it
- UI components can include Progressio-specific visual components, but they must be driven by plain props and not backend models.
- Inertia pages in `apps/web/inertia/pages` compose UI components and adapt generated Adonis/Tuyau-backed page data into UI props.
- Organize Inertia pages by product area under `apps/web/inertia/pages`, aligned with the main feature areas when practical.
- Use `apps/web/inertia/layouts` for page layouts, `apps/web/inertia/components` for app-specific reusable components, and `apps/web/inertia/partials` for reusable page blocks such as headers, footers, and navigation.
- App-specific Inertia components, layouts, and partials may depend on Inertia helpers, typed routes, and shared props. This exception does not apply to `@progressio/ui`.
- Put Inertia-aware or app-specific React hooks in `apps/web/inertia/hooks`. Put only UI-agnostic hooks in `packages/ui/src/hooks`, and do not put domain or Inertia behavior in the UI package.
- Prefer page props and local React state for frontend state. If cross-page or genuinely shared client state is needed, use Zustand stores under `apps/web/inertia/stores`; do not put app state stores in `@progressio/ui`.
- Use Adonis/Inertia form and request helpers as long as they are sufficient. Add custom form abstractions only after repeated local patterns justify them.
- Do not add an i18n library initially. Use French product copy by default, and centralize repeated domain labels when needed.
- Keep generated backend/frontend contracts owned by `@progressio/web`; keep UI component prop types owned by `@progressio/ui`.
- Prefer TypeScript `satisfies` at the adaptation boundary to keep generated page data and UI props aligned:

```ts
const cardProps = {
  title: session.title,
  dateLabel: formatDate(session.date),
  outcome: session.outcome,
} satisfies SessionCardProps
```

## Styling

- UnoCSS is configured at the monorepo root and shared by workspace packages.
- Use the Wind 4 preset.
- Use the UnoCSS Icons preset for icons. Do not add an icon React package by default; choose the icon collection deliberately when implementing the UI.
- `packages/ui` consumes shared styling conventions but does not own the theme.
- Prefer reusable UI component behavior and accessible states over page-specific styling inside `packages/ui`.
- Add UnoCSS shortcuts or tokens at the root only when repetition or design consistency justifies it.
- Treat class sorting as formatting only. Do not rely on it to validate whether a utility class exists or whether conflicting UnoCSS utilities merge correctly.

## Tooling

- Keep shared quality configuration at the monorepo root, including Prettier, ESLint, and the base TypeScript configuration.
- Use root ESLint flat config with TypeScript and React support. Use Prettier separately for formatting; do not replace this setup with Biome unless an ADR changes the decision.
- Workspace packages may define package-local scripts and `tsconfig.json` files, but they should extend the root conventions.
- Root scripts should delegate to workspaces for common tasks: `dev` to `@progressio/web`, `storybook` to `@progressio/ui`, and workspace-wide `lint`, `typecheck`, `test`, `format`, and `format:check` commands.
- If a workspace has no meaningful tests yet, make that explicit with a no-op script or configure the workspace command so missing scripts are handled intentionally.
- Before proposing a commit message in this repository, run or report the relevant quality checks first: formatting/linting, typechecking, and tests appropriate to the changed scope.

## Storybook

- Storybook belongs with the UI package.
- Keep Storybook configuration in `packages/ui/.storybook`.
- Root scripts may delegate to `@progressio/ui` Storybook commands, but Storybook itself should not own app-level concerns.
- Stories should document component states, variants, accessibility-relevant behavior, and expected composition.
- Stories must not require AdonisJS, Inertia, database access, or app routes.
- Do not add UI unit test tooling by default. Add Vitest, Testing Library, or interaction tests only when a component has behavior that Storybook alone does not cover well.

## Testing

- Use Japa for AdonisJS backend tests.
- Focus backend tests on behavior with real risk: feature actions, services, domain rules, persistence constraints, important HTTP/Inertia flows, and regressions.
- Keep controllers thin enough that most behavior is tested through actions or services; add controller or HTTP tests when routing, validation, middleware, Inertia responses, or persistence integration matters.
- Prefer the package scripts defined in `apps/web/package.json` for running tests.

## Domain Language

- Use `CONTEXT.md` as the source of truth for Progressio domain vocabulary.
- Do not put implementation details in `CONTEXT.md`; it is a glossary only.
- Record hard-to-reverse architectural decisions in `docs/adr/` using the existing short ADR format.
