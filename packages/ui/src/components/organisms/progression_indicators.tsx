import type { HTMLAttributes } from "react"
import { Tag } from "#atoms/tag"
import { cn } from "#lib/utils"

export type ClassPacingState = "tracked" | "notPlanned" | "nothingDue"

export type ClassPacingOutcomeCounts = {
  cancelled: number
  partial: number
  realized: number
  shifted: number
  toCatchUp: number
}

export type ClassPacingIndicatorProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  dueSessionCount: number
  outcomeCounts: ClassPacingOutcomeCounts
  state?: ClassPacingState
}

export function ClassPacingIndicator({
  className,
  dueSessionCount,
  outcomeCounts,
  state = "tracked",
  ...props
}: ClassPacingIndicatorProps) {
  if (state === "notPlanned") {
    return (
      <div className={cn("space-y-1", className)} {...props}>
        <p className="font-600 text-xs tracking-wide text-neutral-500 uppercase">Rythme de classe</p>
        <p className="font-600 text-sm text-neutral-800">Progression à planifier</p>
      </div>
    )
  }

  if (state === "nothingDue") {
    return (
      <div className={cn("space-y-1", className)} {...props}>
        <p className="font-600 text-xs tracking-wide text-neutral-500 uppercase">Rythme de classe</p>
        <p className="text-sm text-neutral-600">Aucune séance à suivre pour le moment</p>
      </div>
    )
  }

  const resolvedSessionCount = Object.values(outcomeCounts).reduce((sum, count) => sum + count, 0)
  const outcomeTags = [
    { count: outcomeCounts.realized, pluralLabel: "réalisées", singularLabel: "réalisée", tone: "green" as const },
    { count: outcomeCounts.partial, pluralLabel: "partielles", singularLabel: "partielle", tone: "amber" as const },
    { count: outcomeCounts.shifted, pluralLabel: "décalées", singularLabel: "décalée", tone: "blue" as const },
    { count: outcomeCounts.cancelled, pluralLabel: "annulées", singularLabel: "annulée", tone: "neutral" as const },
    { count: outcomeCounts.toCatchUp, pluralLabel: "à rattraper", singularLabel: "à rattraper", tone: "red" as const },
  ].filter((outcome) => outcome.count > 0)

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div>
        <p className="font-600 text-xs tracking-wide text-neutral-500 uppercase">Rythme de classe</p>
        <p className="font-600 mt-0.5 text-sm text-neutral-900">
          {resolvedSessionCount} sur {dueSessionCount} séances suivies
        </p>
      </div>
      {outcomeTags.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {outcomeTags.map((outcome) => (
            <Tag key={outcome.pluralLabel} tone={outcome.tone}>
              {outcome.count} {outcome.count > 1 ? outcome.pluralLabel : outcome.singularLabel}
            </Tag>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export type ProgressionFollowUpIndicatorProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  missingOutcomeCount: number
  reviewRequiredCount: number
}

export function ProgressionFollowUpIndicator({
  className,
  missingOutcomeCount,
  reviewRequiredCount,
  ...props
}: ProgressionFollowUpIndicatorProps) {
  const followUpCount = missingOutcomeCount + reviewRequiredCount

  return (
    <div className={cn("space-y-1", className)} {...props}>
      <p className="font-600 text-xs tracking-wide text-neutral-500 uppercase">Suivi de progression</p>
      {followUpCount === 0 ? (
        <p className="font-600 inline-flex items-center gap-1.5 text-sm text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Suivi à jour
        </p>
      ) : (
        <div className="space-y-1.5">
          <p className="font-600 inline-flex items-center gap-1.5 text-sm text-amber-800">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            {followUpCount} {followUpCount > 1 ? "séances à vérifier" : "séance à vérifier"}
          </p>
          <p className="text-xs text-neutral-500">
            {missingOutcomeCount} sans bilan · {reviewRequiredCount} à revoir
          </p>
        </div>
      )}
    </div>
  )
}
