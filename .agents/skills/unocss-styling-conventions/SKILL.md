---
name: unocss-styling-conventions
version: 0.1.0
description: UnoCSS styling conventions. Use in codebases when changing or reviewing UnoCSS configuration, utility classes, presets, shortcuts, theme tokens, extractors, resets, or UI styling in projects that use UnoCSS.
---

# UnoCSS Convention

Use this skill only after confirming the project uses UnoCSS. Follow local design-system rules and nearby component styling patterns ahead of these defaults.

## Activation Checks

Before applying this skill:

- Check `package.json` dependencies and devDependencies for `unocss`, `@unocss/*`, or framework-specific UnoCSS integrations.
- Check for config files such as `uno.config.*`, Vite/Webpack integrations, preset imports, shortcuts, rules, safelists, or theme tokens.
- Check for UnoCSS utility usage in nearby components, templates, pages, or style entry files.
- Check whether the project also uses Tailwind tooling, class sorting, CVA, component variants, or a design system.
- Apply this skill only if UnoCSS is actually used.
- If the repository has stricter local instructions, follow the local instructions first.
- If UnoCSS is not detected, do not apply this skill.

## First Checks

- Inspect nearby components before changing utility classes.
- Reuse existing tokens, shortcuts, variants, and component primitives before adding new styling patterns.
- Keep style changes proportional to the task.
- Let the project's formatter or class sorter handle class ordering when configured.
- Avoid hand-formatting utility order if a formatter owns it.

## Official Docs

- UnoCSS: https://unocss.dev/
- Presets: https://unocss.dev/presets/
- Shortcuts: https://unocss.dev/config/shortcuts

## Utility Usage

- Prefer readable, local utility classes for one-off layout or spacing.
- Promote repeated class combinations into the project's existing abstraction, such as shortcuts, component variants, or shared components.
- Keep responsive and state variants close to the element they affect unless the design system provides a named abstraction.
- Preserve accessibility-visible states such as focus, disabled, aria, and reduced-motion styling.

## Config Changes

- Keep config additions narrow and documented by usage.
- Prefer existing presets and theme tokens over custom rules when possible.
- Add safelist entries only when classes are generated dynamically and cannot be statically extracted.
- Verify config changes with the project's build, typecheck, visual smoke test, or focused page where the class is used.
