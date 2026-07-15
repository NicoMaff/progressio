import { Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  EmptyState,
  ProgressionChronologyEntry,
} from "@progressio/ui"
import { type InertiaProps } from "~/types"

type PageProps = InertiaProps<{
  progressionView: Data.Dashboard.ProgressionView
}>

export default function ProgressionView({ progressionView }: PageProps) {
  const { schoolYear, level, teachingClass, window, chronology } = progressionView
  const isAnnualView = window.kind === "schoolYear"

  return (
    <section className="mx-auto w-full max-w-4xl space-y-8 p-6 md:p-9">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Synthèse annuelle</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/dashboard/levels/${level.id}`}>{level.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{teachingClass.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="font-600 text-sm text-sky-700 uppercase">Progression de la classe</p>
          <h1 className="font-700 text-3xl tracking-tight text-neutral-950">{teachingClass.name}</h1>
          <p className="text-lg text-neutral-600">
            {teachingClass.shortCode} · {level.shortCode} · {schoolYear.label}
          </p>
        </div>
        {isAnnualView ? (
          <Link
            className="font-600 text-sm text-sky-700 hover:text-sky-900 hover:underline"
            href={`/planning/classes/${teachingClass.id}/progression`}
          >
            Retour à la période en cours
          </Link>
        ) : (
          <Link
            className="font-600 text-sm text-sky-700 hover:text-sky-900 hover:underline"
            href={`/planning/classes/${teachingClass.id}/progression?window=annual`}
          >
            Voir l’année scolaire <span aria-hidden="true">→</span>
          </Link>
        )}
      </header>

      <section aria-labelledby="progression-window-heading" className="space-y-5">
        <div>
          <p className="font-600 text-xs tracking-[0.12em] text-sky-700 uppercase">
            {isAnnualView ? "Vue annuelle" : "Fenêtre en cours"}
          </p>
          <h2 id="progression-window-heading" className="font-700 mt-1 text-2xl text-neutral-950">
            {window.label}
          </h2>
        </div>

        {chronology.length === 0 ? (
          <EmptyState
            title="Aucune séance dans cette période"
            description="Les séances prévues et les séances effectuées non prévues apparaîtront ici."
          />
        ) : (
          <div className="space-y-3">
            {chronology.map((entry) => (
              <ProgressionChronologyEntry
                key={`${entry.kind}-${entry.id}`}
                actualSessions={
                  entry.kind === "planned"
                    ? entry.actualSessions.map((actualSession) => ({
                        id: actualSession.id,
                        label: `${actualSession.dateLabel} · ${actualSession.title}`,
                        detail: actualSession.detail,
                      }))
                    : undefined
                }
                dateLabel={entry.dateLabel}
                dateTime={entry.date}
                detail={entry.detail}
                kind={entry.kind}
                outcomeLabel={entry.kind === "planned" ? entry.outcomeLabel : undefined}
                outcomeTone={entry.kind === "planned" ? entry.outcomeTone : undefined}
                title={entry.title}
              />
            ))}
          </div>
        )}
      </section>
    </section>
  )
}
