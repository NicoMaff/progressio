import type { HTMLAttributes } from "react"
import { cn } from "#lib/utils"

export type ProgressionDistributionTone = "realized" | "partial" | "shifted" | "cancelled" | "toCatchUp"

export type ProgressionDistributionSegment = {
  label: string
  tone: ProgressionDistributionTone
  value: number
}

const DISTRIBUTION_TONE_CLASS_NAMES: Record<ProgressionDistributionTone, string> = {
  realized: "bg-emerald-500",
  partial: "bg-amber-400",
  shifted: "bg-sky-500",
  cancelled: "bg-neutral-400",
  toCatchUp: "bg-red-500",
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
        className="flex h-2.5 overflow-hidden rounded-full bg-neutral-100"
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
            className="inline-flex items-center gap-1.5 text-xs text-neutral-600"
          >
            <span className={cn("h-2 w-2 rounded-full", DISTRIBUTION_TONE_CLASS_NAMES[segment.tone])} />
            <span>{segment.label}</span>
            <span className="font-600 text-neutral-900">{segment.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
