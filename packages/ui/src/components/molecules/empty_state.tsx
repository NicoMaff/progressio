import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "#lib/utils"

export type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  action?: ReactNode
  description: ReactNode
  icon?: ReactNode
  title: ReactNode
}

export function EmptyState({ action, className, description, icon, title, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn("border-border bg-muted/50 rounded-lg border border-dashed px-6 py-8 text-center", className)}
      {...props}
    >
      {icon ? (
        <div className="bg-card text-muted-foreground mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full shadow-sm">
          {icon}
        </div>
      ) : null}
      <h3 className="font-display font-600 text-foreground text-xl">{title}</h3>
      <p className="text-muted-foreground mx-auto mt-1 max-w-md text-sm">{description}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  )
}
