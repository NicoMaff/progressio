import { useId, type HTMLAttributes, type ReactNode } from "react"
import { cn } from "#lib/utils"

export type ClassSummaryRowProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  action?: ReactNode
  classCode: string
  classLabel: string
  pacing: ReactNode
  progressionFollowUp: ReactNode
}

export function ClassSummaryRow({
  action,
  classCode,
  classLabel,
  className,
  pacing,
  progressionFollowUp,
  ...props
}: ClassSummaryRowProps) {
  const labelId = useId()

  return (
    <article
      aria-labelledby={labelId}
      className={cn(
        "border-border bg-card grid gap-4 rounded-lg border p-5 shadow-sm md:grid-cols-[minmax(10rem,0.8fr)_minmax(15rem,1.4fr)_minmax(12rem,1fr)_auto] md:items-center",
        className
      )}
      {...props}
    >
      <div>
        <p className="font-700 text-muted-foreground text-xs tracking-[0.12em] uppercase">{classCode}</p>
        <h3 id={labelId} className="font-display font-600 text-foreground mt-1 text-xl">
          {classLabel}
        </h3>
      </div>
      <div>{pacing}</div>
      <div className="border-border/70 border-t pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-4">
        {progressionFollowUp}
      </div>
      {action ? <div className="justify-self-start md:justify-self-end">{action}</div> : null}
    </article>
  )
}
