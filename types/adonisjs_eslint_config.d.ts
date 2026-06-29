declare module "@adonisjs/eslint-config" {
  export function configApp(...configBlocksToMerge: unknown[]): unknown[]
  export function configPkg(...configBlocksToMerge: unknown[]): unknown[]
}

declare module "@adonisjs/eslint-config/react" {
  export const react: unknown[]
}
