import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "#lib/utils"

export const tagVariants = cva("font-500 inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs", {
  variants: {
    tone: {
      neutral: "border-neutral-200 bg-neutral-100 text-neutral-700",
      blue: "border-sky-200 bg-sky-50 text-sky-700",
      green: "border-emerald-200 bg-emerald-50 text-emerald-700",
      amber: "border-amber-200 bg-amber-50 text-amber-800",
      red: "border-red-200 bg-red-50 text-red-700",
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
})

export type TagProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof tagVariants> & {
    children: ReactNode
  }

export function Tag({ children, className, tone, ...props }: TagProps) {
  const classes = cn(tagVariants({ tone }), className)

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}
