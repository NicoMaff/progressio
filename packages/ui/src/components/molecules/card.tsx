import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "#lib/utils"

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
}

export function Card({ children, className, ...props }: CardProps) {
  const classes = cn("rounded-md border border-neutral-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]", className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }: CardProps) {
  const classes = cn("space-y-1.5 border-b border-neutral-100 p-4", className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...props }: CardProps) {
  const classes = cn("text-base font-600 text-neutral-950", className)

  return (
    <h3 className={classes} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className, ...props }: CardProps) {
  const classes = cn("text-sm text-neutral-500", className)

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ children, className, ...props }: CardProps) {
  const classes = cn("p-4", className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className, ...props }: CardProps) {
  const classes = cn("flex items-center justify-end gap-2 border-t border-neutral-100 p-4", className)

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
