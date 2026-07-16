import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "#lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 pl-11 text-sm [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4",
  {
    variants: {
      tone: {
        information: "border-primary/30 bg-accent text-accent-foreground",
        completed: "border-completed/30 bg-completed-muted text-completed",
        warning: "border-in-progress/30 bg-in-progress-muted text-in-progress",
        destructive: "border-alert/30 bg-alert-muted text-alert",
      },
    },
    defaultVariants: {
      tone: "information",
    },
  }
)

export type AlertProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>

export function Alert({ className, tone, ...props }: AlertProps) {
  return <div role="status" className={cn(alertVariants({ tone }), className)} {...props} />
}

export function AlertTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cn("font-700 mb-1 leading-none tracking-tight", className)} {...props} />
}

export function AlertDescription({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("leading-relaxed opacity-90", className)} {...props} />
}
