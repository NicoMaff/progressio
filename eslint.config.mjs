/// <reference path="./types/adonisjs_eslint_config.d.ts" />

import { configApp } from "@adonisjs/eslint-config"
import { react } from "@adonisjs/eslint-config/react"

export default configApp(
  {
    ignores: ["./apps/web/.adonisjs/**", "./apps/web/database/schema.ts", ".adonisjs/**", "database/schema.ts"],
  },
  ...react
)
