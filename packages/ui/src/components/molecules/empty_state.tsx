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
      className={cn(
        "rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-6 py-8 text-center",
        className
      )}
      {...props}
    >
      {icon ? (
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-500 shadow-sm">
          {icon}
        </div>
      ) : null}
      <h3 className="font-700 text-base text-neutral-900">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-neutral-600">{description}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  )
}
