# Development Demo Data

Progressio uses a development-only demo seeder to fill the active work file with broad fake data for manual UI testing. The demo dataset covers the current work-file schema, including not-yet-exposed screens, so interface work can progress against existing data instead of empty states only.

The demo seeder targets a generic 2025-2026 school year and may recreate work-file content during local database refreshes. It is destructive by design and must remain a development workflow, not a user-facing import or reset feature.

Demo values are generated with faker-style randomness and do not need to persist between refreshes. Factories should still let tests override meaningful attributes explicitly, so test assertions depend on controlled inputs rather than incidental fake defaults.

The dataset should favor functional French labels and cover both ordinary and atypical states: pedagogical content, periods, template and planned progressions, actual sessions, interruptions, planning conflicts, archived referenced content, missing optional fields, draft actual sessions, cancelled or catch-up planned sessions, unplanned actual sessions, and replacement activities.
