import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "#lib/utils"

const metricCardVariants = cva("rounded-lg border bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]", {
  variants: {
    tone: {
      neutral: "border-neutral-200",
      blue: "border-sky-200 bg-sky-50/55",
      green: "border-emerald-200 bg-emerald-50/55",
      amber: "border-amber-200 bg-amber-50/55",
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
      <p className="font-500 text-sm text-neutral-600">{label}</p>
      <p className="font-700 mt-2 text-2xl tracking-tight text-neutral-950">{value}</p>
      {description ? <p className="mt-1 text-xs text-neutral-500">{description}</p> : null}
    </div>
  )
}
