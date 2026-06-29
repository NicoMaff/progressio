import { defineConfig, presetWebFonts, presetWind4, transformerDirectives, transformerVariantGroup } from "unocss"

const contentFilesystem = [
  "apps/web/inertia/**/*.{ts,tsx,js,jsx}",
  "apps/web/resources/views/**/*.edge",
  "packages/ui/.storybook/**/*.{ts,tsx,js,jsx,mdx}",
  "packages/ui/src/**/*.{ts,tsx,js,jsx,mdx}",

  // The Adonis Vite plugin can resolve the root UnoCSS config from apps/web.
  // Keep these app-relative patterns so extraction also works from that cwd.
  "inertia/**/*.{ts,tsx,js,jsx}",
  "resources/views/**/*.edge",
]

export default defineConfig({
  content: {
    filesystem: contentFilesystem,
  },
  presets: [
    presetWind4(),
    presetWebFonts({
      //   provider: "bunny",
      //   fonts: {
      //     // font name in project
      //     gantari: {
      //       // real font name
      //       name: "Gantari",
      //       weights: ["200", "300", "400", "500", "600", "700", "800", "900"],
      //     },
      //   },
      // }),
      // // Set the unit and the default size of icons, if import them from a provider (icones.js.org)
      // presetIcons({
      //   unit: "rem",
      //   scale: 1.5,
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    // colors: {
    //   // Add custom colors from key: object template
    //   brand: {
    //     // The DEFAULT key allow to link a value to the key parent
    //     DEFAULT: "hsl(152,97%,73%)",
    //     1: "hsl(152,97%,73%)",
    //   },
    // },
  },
  variants: [
    (matcher) => {
      if (!matcher.startsWith("pointer-fine:")) {
        return matcher
      }

      return {
        matcher: matcher.slice("pointer-fine:".length),
        parent: "@media (pointer: fine)",
      }
    },
  ],
})
