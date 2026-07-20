import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "#lib/utils"

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  footer?: ReactNode
  header?: CardHeader
}

export type CardHeader = {
  action?: ReactNode
  description?: ReactNode
  title: ReactNode
}

export function Card({ children, className, footer, header, ...props }: CardProps) {
  const classes = cn("rounded-lg border border-border bg-card text-card-foreground shadow-sm", className)

  return (
    <div className={classes} {...props}>
      {header ? (
        <div className="border-border/70 space-y-1.5 border-b p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display font-600 text-foreground text-xl">{header.title}</h3>
              {header.description ? <p className="text-muted-foreground text-sm">{header.description}</p> : null}
            </div>
            {header.action ? <div className="shrink-0">{header.action}</div> : null}
          </div>
        </div>
      ) : null}
      {children}
      {footer ? (
        <div className="border-border/70 flex items-center justify-end gap-2 border-t p-5">{footer}</div>
      ) : null}
    </div>
  )
}
