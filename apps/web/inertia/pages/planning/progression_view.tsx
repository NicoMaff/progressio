import { Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { Icon } from "@progressio/ui"
import { type ReactNode, useCallback, useEffect, useRef } from "react"
import { urlFor } from "~/client"
import { type InertiaProps } from "~/types"

type PageProps = InertiaProps<{
  progressionView: Data.Dashboard.ProgressionView
}>

const statusClasses = {
  planned: "border-sky-200 bg-sky-50 text-sky-900",
  realized: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  danger: "border-rose-200 bg-rose-50 text-rose-900",
}

export default function ProgressionView({ progressionView }: PageProps) {
  const { schoolYear, level, teachingClass, roadmap } = progressionView
  const roadmapRef = useRef<HTMLDivElement>(null)

  const focusWeek = useCallback(() => {
    const viewport = roadmapRef.current
    const week = viewport?.querySelector<HTMLElement>(`[data-week-start="${roadmap.focusWeekStartDate}"]`)
    if (!viewport || !week) return
    viewport.scrollTo({
      left: week.offsetLeft - (viewport.clientWidth - week.offsetWidth) / 2,
      behavior: "auto",
    })
  }, [roadmap.focusWeekStartDate])

  function moveWeeks(direction: "previous" | "next") {
    const viewport = roadmapRef.current
    if (!viewport) return
    viewport.scrollBy({ left: (direction === "previous" ? -1 : 1) * viewport.clientWidth, behavior: "smooth" })
  }

  useEffect(() => {
    focusWeek()
  }, [focusWeek])

  return (
    <section className="w-full space-y-7 p-6 md:p-9">
      <nav className="flex flex-wrap items-center gap-3 text-sm" aria-label="Fil d’Ariane">
        <Link
          className="font-600 text-sky-700 hover:text-sky-900 hover:underline"
          href={urlFor("planning.progressions.list")}
        >
          Progressions
        </Link>
        <span aria-hidden="true">/</span>
        <span>{teachingClass.name}</span>
      </nav>

      <header className="flex flex-wrap items-end justify-between gap-5">
        <div className="space-y-2">
          <p className="font-600 text-sm text-sky-700 uppercase">Feuille de route</p>
          <h1 className="font-700 text-3xl tracking-tight text-neutral-950">{teachingClass.name}</h1>
          <p className="text-lg text-neutral-600">
            {teachingClass.shortCode} · {level.shortCode} · {schoolYear.label}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-slate-300 bg-white p-2 text-slate-700 hover:border-sky-400 focus-visible:outline focus-visible:outline-3 focus-visible:outline-sky-700"
            aria-label="Semaine précédente"
            onClick={() => moveWeeks("previous")}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="rounded-md border border-slate-300 bg-white p-2 text-slate-700 hover:border-sky-400 focus-visible:outline focus-visible:outline-3 focus-visible:outline-sky-700"
            aria-label="Semaine suivante"
            onClick={() => moveWeeks("next")}
          >
            <Icon name="arrowRight" size="sm" />
          </button>
          <button
            type="button"
            className="font-600 rounded-md bg-[#3e3c90] px-3 py-2 text-sm text-white hover:bg-[#2e2d6c] focus-visible:outline focus-visible:outline-3 focus-visible:outline-sky-700"
            onClick={focusWeek}
          >
            Revenir à cette semaine
          </button>
        </div>
      </header>

      <p id="roadmap-description" className="text-sm text-neutral-600">
        Chaque colonne représente une semaine civile. Les semaines sans séance restent visibles ; la semaine pédagogique
        est un repère secondaire.
      </p>

      <div
        ref={roadmapRef}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-5 md:-mx-9 md:px-9"
        aria-describedby="roadmap-description"
        aria-label="Feuille de route annuelle"
        role="region"
      >
        {roadmap.weeks.map((week) => (
          <article
            key={week.startDate}
            data-week-start={week.startDate}
            className="w-[calc(100vw-3rem)] shrink-0 snap-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:w-[calc((100vw-5rem)/2)] xl:w-[calc((100vw-22rem)/3)]"
            aria-label={week.label}
          >
            <header className="border-b border-slate-100 pb-3">
              <p className="font-700 text-sm text-neutral-950">{week.label}</p>
              <p className="mt-1 text-xs text-neutral-600">
                {week.schoolWeek === null ? "Hors semaines pédagogiques" : `Semaine pédagogique ${week.schoolWeek}`}
              </p>
            </header>

            <div className="mt-4 space-y-4">
              <RoadmapGroup title="Interruptions" emptyLabel="Aucune interruption">
                {week.interruptions.map((interruption) => (
                  <p
                    key={interruption.id}
                    className="rounded-md border border-amber-200 bg-amber-50 p-2 text-sm text-amber-950"
                  >
                    <span className="font-700">Interruption · </span>
                    {interruption.title}
                    <span className="block text-xs">{interruption.scopeLabel}</span>
                  </p>
                ))}
              </RoadmapGroup>
              <RoadmapGroup title="Prévu" emptyLabel="Aucune séance prévue">
                {week.plannedSessions.map((session) => (
                  <SessionCard key={session.id} session={session} conflictCount={session.conflictCount} />
                ))}
              </RoadmapGroup>
              <RoadmapGroup title="Réalisé" emptyLabel="Aucune séance effectuée">
                {week.actualSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </RoadmapGroup>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function RoadmapGroup({ title, emptyLabel, children }: { title: string; emptyLabel: string; children: ReactNode }) {
  const isEmpty = Array.isArray(children) && children.length === 0

  return (
    <section aria-label={title}>
      <h2 className="font-700 text-xs tracking-[0.12em] text-neutral-600 uppercase">{title}</h2>
      <div className="mt-2 space-y-2">
        {isEmpty ? <p className="text-sm text-neutral-500">{emptyLabel}</p> : children}
      </div>
    </section>
  )
}

function SessionCard({
  session,
  conflictCount,
}: {
  session: {
    id: string
    dateLabel: string
    detail: string
    title: string
    statusLabel: string
    statusTone: keyof typeof statusClasses
  }
  conflictCount?: number
}) {
  return (
    <article className={`rounded-md border p-3 text-sm ${statusClasses[session.statusTone]}`}>
      <p className="font-700">{session.title}</p>
      <p className="mt-1">
        {session.dateLabel} · {session.detail}
      </p>
      <p className="font-600 mt-2">
        <span aria-hidden="true">● </span>
        {session.statusLabel}
      </p>
      {conflictCount ? (
        <p className="font-600 mt-1">
          ⚠ {conflictCount} conflit{conflictCount > 1 ? "s" : ""}
        </p>
      ) : null}
    </article>
  )
}
