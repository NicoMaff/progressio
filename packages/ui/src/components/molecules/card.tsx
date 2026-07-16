import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "#lib/utils"

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
}

export function Card({ children, className, ...props }: CardProps) {
  const classes = cn("rounded-lg border border-border bg-card text-card-foreground shadow-sm", className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }: CardProps) {
  const classes = cn("space-y-1.5 border-b border-border/70 p-5", className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...props }: CardProps) {
  const classes = cn("font-display text-xl font-600 text-foreground", className)

  return (
    <h3 className={classes} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className, ...props }: CardProps) {
  const classes = cn("text-sm text-muted-foreground", className)

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ children, className, ...props }: CardProps) {
  const classes = cn("p-5", className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className, ...props }: CardProps) {
  const classes = cn("flex items-center justify-end gap-2 border-t border-border/70 p-5", className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
