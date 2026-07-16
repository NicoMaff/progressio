import type { HTMLAttributes } from "react"
import { cn } from "#lib/utils"

export type ProgressionDistributionTone = "realized" | "partial" | "shifted" | "cancelled" | "toCatchUp"

export type ProgressionDistributionSegment = {
  label: string
  tone: ProgressionDistributionTone
  value: number
}

const DISTRIBUTION_TONE_CLASS_NAMES: Record<ProgressionDistributionTone, string> = {
  realized: "bg-completed",
  partial: "bg-in-progress",
  shifted: "bg-primary",
  cancelled: "bg-muted-foreground",
  toCatchUp: "bg-alert",
}

export type ProgressionDistributionBarProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  accessibleLabel?: string
  segments: ProgressionDistributionSegment[]
}

export function ProgressionDistributionBar({
  accessibleLabel = "Répartition des séances",
  className,
  segments,
  ...props
}: ProgressionDistributionBarProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)
  const populatedSegments = segments.filter((segment) => segment.value > 0)
  const summary = populatedSegments.map((segment) => `${segment.label} : ${segment.value}`).join(", ")

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div
        aria-label={`${accessibleLabel}${summary ? ` — ${summary}` : " — aucune donnée"}`}
        className="bg-muted flex h-2.5 overflow-hidden rounded-full"
        role="img"
      >
        {total > 0
          ? populatedSegments.map((segment) => (
              <span
                key={`${segment.tone}-${segment.label}`}
                className={DISTRIBUTION_TONE_CLASS_NAMES[segment.tone]}
                style={{ width: `${(segment.value / total) * 100}%` }}
              />
            ))
          : null}
      </div>
      <ul className="flex flex-wrap gap-x-3 gap-y-1" aria-hidden="true">
        {segments.map((segment) => (
          <li
            key={`${segment.tone}-${segment.label}`}
            className="text-muted-foreground inline-flex items-center gap-1.5 text-xs"
          >
            <span className={cn("h-2 w-2 rounded-full", DISTRIBUTION_TONE_CLASS_NAMES[segment.tone])} />
            <span>{segment.label}</span>
            <span className="font-600 text-foreground">{segment.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
