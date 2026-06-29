import { defineConfig, presetWebFonts, presetWind4, transformerDirectives, transformerVariantGroup } from "unocss"

export default defineConfig({
  content: {
    filesystem: ["resources/views/**/*.tsx", "inertia/**/*.tsx"],
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
