import type { HTMLAttributes, ReactNode } from "react"
import { Tag, type TagProps } from "#atoms/tag"
import { cn } from "#lib/utils"

export type LinkedActualSession = {
  detail?: ReactNode
  id: string
  label: ReactNode
}

export type ProgressionChronologyEntryProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  actualSessions?: LinkedActualSession[]
  dateLabel: ReactNode
  dateTime?: string
  detail?: ReactNode
  kind: "planned" | "unplannedActual"
  outcomeLabel?: ReactNode
  outcomeTone?: TagProps["tone"]
  title: ReactNode
}

export function ProgressionChronologyEntry({
  actualSessions = [],
  className,
  dateLabel,
  dateTime,
  detail,
  kind,
  outcomeLabel,
  outcomeTone = "neutral",
  title,
  ...props
}: ProgressionChronologyEntryProps) {
  const isPlanned = kind === "planned"

  return (
    <article className={cn("relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3", className)} {...props}>
      <div className="relative flex justify-center">
        <span
          className={cn("mt-1.5 h-3 w-3 rounded-full ring-4 ring-white", isPlanned ? "bg-sky-500" : "bg-violet-500")}
        />
        <span className="absolute top-5 -bottom-3 w-px bg-neutral-200 last:hidden" aria-hidden="true" />
      </div>
      <div
        className={cn(
          "rounded-lg border bg-white p-4 shadow-[0_6px_18px_rgba(15,23,42,0.05)]",
          isPlanned ? "border-neutral-200" : "border-violet-200 bg-violet-50/45"
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="font-600 text-xs tracking-wide text-neutral-500 uppercase">
              {isPlanned ? "Séance prévue" : "Séance effectuée non prévue"}
            </p>
            <h3 className="font-700 mt-1 text-neutral-950">{title}</h3>
          </div>
          <time dateTime={dateTime} className="font-600 text-xs text-neutral-600">
            {dateLabel}
          </time>
        </div>
        {detail ? <div className="mt-2 text-sm text-neutral-600">{detail}</div> : null}
        {outcomeLabel ? (
          <div className="mt-3">
            <Tag tone={outcomeTone}>{outcomeLabel}</Tag>
          </div>
        ) : null}
        {actualSessions.length > 0 ? (
          <div className="mt-4 border-t border-neutral-100 pt-3">
            <p className="font-600 text-xs tracking-wide text-neutral-500 uppercase">Séances effectuées liées</p>
            <ul className="mt-2 space-y-2">
              {actualSessions.map((actualSession) => (
                <li key={actualSession.id} className="rounded-md bg-neutral-50 px-3 py-2 text-sm text-neutral-800">
                  <span className="font-600">{actualSession.label}</span>
                  {actualSession.detail ? (
                    <span className="ml-1 text-neutral-500">— {actualSession.detail}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  )
}
