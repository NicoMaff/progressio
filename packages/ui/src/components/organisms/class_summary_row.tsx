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
        "grid gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-[0_6px_18px_rgba(15,23,42,0.05)] md:grid-cols-[minmax(10rem,0.8fr)_minmax(15rem,1.4fr)_minmax(12rem,1fr)_auto] md:items-center",
        className
      )}
      {...props}
    >
      <div>
        <p className="font-700 text-xs tracking-[0.12em] text-sky-700 uppercase">{classCode}</p>
        <h3 id={labelId} className="font-700 mt-1 text-base text-neutral-950">
          {classLabel}
        </h3>
      </div>
      <div>{pacing}</div>
      <div className="border-t border-neutral-100 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-4">
        {progressionFollowUp}
      </div>
      {action ? <div className="justify-self-start md:justify-self-end">{action}</div> : null}
    </article>
  )
}
