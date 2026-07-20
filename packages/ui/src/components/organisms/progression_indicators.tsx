import type { HTMLAttributes } from "react"
import { Badge } from "#atoms/badge"
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
        <p className="font-600 text-muted-foreground text-xs tracking-wide uppercase">Rythme de classe</p>
        <p className="font-600 text-foreground text-sm">Progression à planifier</p>
      </div>
    )
  }

  if (state === "nothingDue") {
    return (
      <div className={cn("space-y-1", className)} {...props}>
        <p className="font-600 text-muted-foreground text-xs tracking-wide uppercase">Rythme de classe</p>
        <p className="text-muted-foreground text-sm">Aucune séance à suivre pour le moment</p>
      </div>
    )
  }

  const resolvedSessionCount = Object.values(outcomeCounts).reduce((sum, count) => sum + count, 0)
  const outcomeTags = [
    { count: outcomeCounts.realized, pluralLabel: "réalisées", singularLabel: "réalisée", tone: "completed" as const },
    {
      count: outcomeCounts.partial,
      pluralLabel: "partielles",
      singularLabel: "partielle",
      tone: "inProgress" as const,
    },
    { count: outcomeCounts.shifted, pluralLabel: "décalées", singularLabel: "décalée", tone: "primary" as const },
    { count: outcomeCounts.cancelled, pluralLabel: "annulées", singularLabel: "annulée", tone: "neutral" as const },
    {
      count: outcomeCounts.toCatchUp,
      pluralLabel: "à rattraper",
      singularLabel: "à rattraper",
      tone: "alert" as const,
    },
  ].filter((outcome) => outcome.count > 0)

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div>
        <p className="font-600 text-muted-foreground text-xs tracking-wide uppercase">Rythme de classe</p>
        <p className="font-600 text-foreground mt-0.5 text-sm">
          {resolvedSessionCount} sur {dueSessionCount} séances suivies
        </p>
      </div>
      {outcomeTags.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {outcomeTags.map((outcome) => (
            <Badge key={outcome.pluralLabel} tone={outcome.tone}>
              {outcome.count} {outcome.count > 1 ? outcome.pluralLabel : outcome.singularLabel}
            </Badge>
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
      <p className="font-600 text-muted-foreground text-xs tracking-wide uppercase">Suivi de progression</p>
      {followUpCount === 0 ? (
        <p className="font-600 text-completed inline-flex items-center gap-1.5 text-sm">
          <span className="bg-completed h-2 w-2 rounded-full" />
          Suivi à jour
        </p>
      ) : (
        <div className="space-y-1.5">
          <p className="font-600 text-in-progress inline-flex items-center gap-1.5 text-sm">
            <span className="bg-in-progress h-2 w-2 rounded-full" />
            {followUpCount} {followUpCount > 1 ? "séances à vérifier" : "séance à vérifier"}
          </p>
          <p className="text-muted-foreground text-xs">
            {missingOutcomeCount} sans bilan · {reviewRequiredCount} à revoir
          </p>
        </div>
      )}
    </div>
  )
}
