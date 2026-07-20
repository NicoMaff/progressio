---
name: adonisjs-japa-testing
version: 0.2.1
description: AdonisJS testing conventions for Japa. Use in AdonisJS projects when adding, updating, diagnosing, or running Japa tests, including unit, functional, API, browser, database, and regression tests.
---

# AdonisJS Japa Testing

Use this skill only when the project uses Japa, especially with AdonisJS. Follow local test layout, helpers, suite names, and scripts ahead of these defaults.

## Activation Checks

Before applying this skill:

- Check `package.json` dependencies and devDependencies for `@japa/runner`, `@japa/assert`, `@japa/api-client`, `@japa/plugin-adonisjs`, or other `@japa/*` packages.
- Check for AdonisJS testing setup such as `node ace test`, `tests/bootstrap.*`, configured `adonisrc.ts` test suites, or suite folders under `tests`.
- Check nearby tests for factories, database helpers, transaction wrappers, API client usage, and assertion style.
- Check package scripts before choosing commands.
- Apply this skill only if Japa is actually used for backend tests, especially in an AdonisJS project with `@japa/plugin-adonisjs` or `node ace test`.
- If the repository has stricter local instructions, follow the local instructions first.
- If Japa is not detected, do not apply this skill.

## First Checks

- Read the nearest existing test file before adding or changing tests.
- Match suite naming, setup hooks, factories, database isolation, API/browser client usage, and assertion style.
- Inspect `tests/bootstrap.*` before changing plugins, suite hooks, database setup, HTTP server setup, or global test utilities.
- Prefer focused tests while iterating, such as a suite, file, group, test title, tag, or failed-test filter supported by the project's scripts.
- Run broader checks when the change touches shared behavior, security, routing, validation, persistence, or user-visible workflows.
- Prefer package manager scripts from `package.json` over hardcoded test commands.

## Official Docs

- AdonisJS testing: https://docs.adonisjs.com/guides/testing/introduction
- AdonisJS API tests: https://docs.adonisjs.com/guides/testing/api-tests
- AdonisJS resetting state: https://docs.adonisjs.com/guides/testing/resetting-state-between-tests
- Japa: https://japa.dev/docs/introduction
- Japa filtering tests: https://japa.dev/docs/filtering-tests

## Test Design

- Test behavior through the narrowest useful boundary: unit tests for isolated rules, API tests for JSON endpoints, functional/e2e tests for HTTP flows, and browser tests for Playwright-backed user flows.
- In AdonisJS API tests, prefer the configured Japa API client and route helpers over hand-built server bootstrapping.
- Cover regressions with clear setup, action, and assertion phases.
- Keep test data explicit enough to explain the behavior without duplicating unrelated fixture setup.
- Use factories, seeders, or helper builders already present in the project.
- Use AdonisJS `testUtils.db().withGlobalTransaction()` or `testUtils.db().truncate()` consistently with nearby tests when database state must reset between tests.
- Use `.env.test` or local test environment conventions for test-only drivers, databases, sessions, mailers, and external services.

## Verification

- Prefer package manager scripts from `package.json` when they exist. Otherwise, use `node ace test`.
- Run all tests with `node ace test`.
- Run tests by suite/type with `node ace test <suite>`, for example `node ace test unit`, `node ace test functional`, or `node ace test browser`, using the suite names configured in `adonisrc.ts`.
- Run tests by file or folder with `node ace test --files="<path>"`, for example `node ace test --files="posts/index"` or `node ace test --files="posts/*"`.
- Narrow further with `--groups="<group title>"`, `--tests="<test title>"`, `--tags="<tag>"`, or `--failed` when supported locally.
- During implementation, run the smallest relevant target first, then broaden the run as confidence increases.
- Before finishing a risky change, run the package's broader test script or the repository's documented checks.
- If a command fails, report the exact command and the relevant failure summary.
- Do not claim tests passed unless they actually ran successfully.
