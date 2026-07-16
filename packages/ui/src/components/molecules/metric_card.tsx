import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "#lib/utils"

const metricCardVariants = cva("bg-card rounded-lg border p-5 shadow-sm", {
  variants: {
    tone: {
      neutral: "border-border",
      blue: "border-primary/30 bg-accent",
      green: "border-completed/30 bg-completed-muted",
      amber: "border-in-progress/30 bg-in-progress-muted",
    },
  },
  defaultVariants: {
    tone: "neutral",
  },
})

export type MetricCardProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> &
  VariantProps<typeof metricCardVariants> & {
    description?: ReactNode
    label: ReactNode
    value: ReactNode
  }

export function MetricCard({ className, description, label, tone, value, ...props }: MetricCardProps) {
  return (
    <div className={cn(metricCardVariants({ tone }), className)} {...props}>
      <p className="font-500 text-muted-foreground text-sm">{label}</p>
      <p className="font-display font-600 text-foreground mt-2 text-3xl tracking-tight">{value}</p>
      {description ? <p className="text-muted-foreground mt-1 text-xs">{description}</p> : null}
    </div>
  )
}
