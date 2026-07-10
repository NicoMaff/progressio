import adonisjs from "@adonisjs/vite/client"
import react from "@vitejs/plugin-react"
import UnoCSS from "unocss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    UnoCSS(),
    react(),
    adonisjs({
      entrypoints: ["inertia/app.tsx"],
      serverEntrypoints: ["inertia/ssr.tsx"],
      reload: ["resources/views/**/*.edge"],
    }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      "~/": `${import.meta.dirname}/inertia/`,
      "@generated": `${import.meta.dirname}/.adonisjs/client/`,
    },
  },

  server: {
    watch: {
      ignored: ["**/storage/**", "**/tmp/**"],
    },
  },
})
