import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from "unocss"
import presetIcons from "@unocss/preset-icons/browser"

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
    presetIcons({
      collections: {
        hugeicons: () => import("@iconify-json/hugeicons/icons.json").then((module) => module.default),
      },
      scale: 1.5,
      unit: "rem",
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      completed: {
        DEFAULT: "hsl(var(--completed))",
        foreground: "hsl(var(--completed-foreground))",
        muted: "hsl(var(--completed-muted))",
      },
      "in-progress": {
        DEFAULT: "hsl(var(--in-progress))",
        foreground: "hsl(var(--in-progress-foreground))",
        muted: "hsl(var(--in-progress-muted))",
      },
      alert: {
        DEFAULT: "hsl(var(--alert))",
        foreground: "hsl(var(--alert-foreground))",
        muted: "hsl(var(--alert-muted))",
      },
      interruption: {
        DEFAULT: "hsl(var(--interruption))",
        foreground: "hsl(var(--interruption-foreground))",
        muted: "hsl(var(--interruption-muted))",
      },
    },
    fontFamily: {
      sans: '"Public Sans", system-ui, sans-serif',
      display: '"Newsreader", Georgia, serif',
      annotation: '"Caveat", cursive',
    },
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
