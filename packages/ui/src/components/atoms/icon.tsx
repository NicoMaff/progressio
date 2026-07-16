import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

const iconClassNames = {
  calendar: "i-hugeicons-calendar-03",
  check: "i-hugeicons-checkmark-circle-02",
  chevronDown: "i-hugeicons-arrow-down-01",
  close: "i-hugeicons-cancel-01",
  dashboard: "i-hugeicons-dashboard-square-01",
  menu: "i-hugeicons-menu-01",
  planning: "i-hugeicons-calendar-03",
  teachingContent: "i-hugeicons-book-open-01",
  info: "i-hugeicons-information-circle",
  search: "i-hugeicons-search-01",
} as const

export type IconName = keyof typeof iconClassNames

export const iconVariants = cva("inline-block shrink-0", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export type IconProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof iconVariants> & {
    name: IconName
  }

export function Icon({ className, name, size, ...props }: IconProps) {
  const classes = [iconClassNames[name], iconVariants({ size }), className].filter(Boolean).join(" ")

  return <span aria-hidden="true" className={classes} {...props} />
}
