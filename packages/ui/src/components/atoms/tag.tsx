import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "#lib/utils"

export const badgeVariants = cva("font-600 inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs", {
  variants: {
    tone: {
      neutral: "border-border bg-muted text-muted-foreground",
      primary: "border-primary/30 bg-accent text-accent-foreground",
      completed: "border-completed/30 bg-completed-muted text-completed",
      inProgress: "border-in-progress/30 bg-in-progress-muted text-in-progress",
      alert: "border-alert/30 bg-alert-muted text-alert",
      interruption: "border-interruption/30 bg-interruption-muted text-interruption",
      blue: "border-primary/30 bg-accent text-accent-foreground",
      green: "border-completed/30 bg-completed-muted text-completed",
      amber: "border-in-progress/30 bg-in-progress-muted text-in-progress",
      red: "border-alert/30 bg-alert-muted text-alert",
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
})

/** @deprecated Use `badgeVariants` instead. */
export const tagVariants = badgeVariants

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    children: ReactNode
  }

export function Badge({ children, className, tone, ...props }: BadgeProps) {
  const classes = cn(badgeVariants({ tone }), className)

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}

/** @deprecated Use `BadgeProps` instead. */
export type TagProps = BadgeProps

/** @deprecated Use `Badge` instead. */
export function Tag(props: TagProps) {
  return <Badge {...props} />
}
