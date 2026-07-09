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
- Use the root `package.json` as the owner for monorepo-level development tooling such as ESLint, Prettier, TypeScript, and related plugins. Do not redeclare those tools in child workspace manifests unless the package must be independently consumable or Yarn resolution requires it.
- Use the root `.yarnrc.yml` Yarn `catalog` for dependency versions shared across workspaces, especially ESLint, Prettier, TypeScript, React, React DOM, React type packages, Vite, date/UI helper libraries, and other frontend build/runtime packages reused by both `apps/web` and `packages/ui`.
- In child workspace manifests, reference catalog-managed versions with `catalog:` instead of repeating concrete version ranges.
- Use Volta's root Node pin when present; do not add competing per-workspace runtime pins unless a workspace genuinely requires a different runtime.
- Keep the monorepo lightweight:
  - `apps/web` contains the `@progressio/web` AdonisJS application and Inertia frontend.
  - `packages/ui` contains the `@progressio/ui` reusable React UI components and Storybook.
- Do not introduce a separate backend API, SPA app, shared domain package, or service boundary unless a documented decision explicitly calls for it.

## Agent Scope

- Read only the files useful for the current task: user-cited files first, then nearby files that establish the feature convention. Do not scan the whole project unless the impact is genuinely cross-cutting.
- Prefer local code, package scripts, ADRs, and skills before external documentation.
- Do not browse official documentation by default. Use it only for a concrete API/version doubt, a missing local answer, or an explicit theoretical/framework question.
- Do not manually edit generated Adonis, Tuyau, or Inertia output. Regenerate through project scripts or dev-server reload when needed.

## Skill Routing

Use the smallest useful set of skills from `.agents/skills/`; combine focused skills when a task crosses boundaries.

- `adonisjs-general-conventions`: backend structure, feature organization, `src/core` boundaries, or choosing a more specific Adonis skill.
- `adonisjs-controller-flow`: routes, controllers, HTTP validation, authorization, generated barrel imports, Inertia render/submit flows, API response flow.
- `adonisjs-persistence-services`: actions, services, Lucid queries/models, transactions, dependency injection, persistence rules, action/service errors.
- `adonisjs-data-transformers`: transformers, browser/API payloads, exposed data, generated frontend types, Tuyau/Inertia response contracts.
- `inertia-react-conventions`: Inertia React pages, layouts, forms, shared props, generated page/route types, navigation, client state, browser UI behavior.
- `tuyau-adonisjs-client-conventions`: Tuyau API calls, generated clients, typed request helpers, generated API contracts.
- `unocss-styling-conventions`: UnoCSS utilities, shortcuts, tokens, presets, extractors, CVA variants, styling changes.
- `adonisjs-japa-testing`: AdonisJS/Japa test structure, commands, database isolation, API/browser clients, regression strategy.
- `security-sensitive-files-policy`: mandatory for secrets, credentials, environment files, certificates, keys, tokens, or any task that could read, expose, move, delete, diff, or commit sensitive material.
- `personal-naming-conventions`: identifiers, file names, component names, TypeScript types/interfaces/enums, constants, and renames.
- `git-commit-message-convention`: commit creation, commit message proposals, commit review, amend, or squash-message work.

## Local Boundaries Not Owned By Skills

- Backend feature areas: `work_files`, `school_years`, `teaching_content`, `planning`, `actuals`, `interruptions`.
- Domain ownership: `Class` belongs to `teaching_content`; `Period` belongs to `school_years`; `Recurring Slot`, `Template Progression`, `Template Session`, and confirmed `Session Outcome` belong to `planning`; `Planning Conflict` belongs to `interruptions`.
- Backend code lives under `apps/web/src`; shared backend code belongs in `apps/web/src/core` only when it is genuinely cross-feature. Lucid models stay in `apps/web/src/core/models` unless a later ADR changes this.
- Migrations and seeders stay under `apps/web/database`; `apps/web/start/routes.ts` remains the main route entry point.
- Inertia pages live under `apps/web/inertia/pages`; app-specific layouts/components/partials/hooks/stores stay under `apps/web/inertia`.
- `packages/ui` must not depend on AdonisJS, Lucid, Inertia, route helpers, or persistence. App code imports UI through `@progressio/ui`, not deep source paths.
- Storybook belongs to `packages/ui/.storybook` and must not require AdonisJS, Inertia, database access, or app routes.
- Use French product copy by default. Do not add i18n initially.

## Global Conventions

- Apply `security-sensitive-files-policy` for sensitive files, secrets, credentials, environment files, certificates, keys, and tokens.
- Apply `personal-naming-conventions` for identifiers, file names, component names, constants, and renames.
- Apply `git-commit-message-convention` for commit messages and commit workflows.
- Prefer package scripts over hard-coded commands. Before proposing a commit message, inspect the relevant diff and run or report the relevant format/lint, typecheck, and test checks for the changed scope.

## Domain Language

- Use `CONTEXT.md` as the source of truth for Progressio domain vocabulary.
- Do not put implementation details in `CONTEXT.md`; it is a glossary only.
- Record hard-to-reverse architectural decisions in `docs/adr/` using the existing short ADR format.
