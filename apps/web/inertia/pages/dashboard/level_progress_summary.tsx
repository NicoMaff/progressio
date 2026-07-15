import { Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { ClassPacingIndicator, ClassSummaryRow, EmptyState, ProgressionFollowUpIndicator } from "@progressio/ui"
import { type InertiaProps } from "~/types"

type PageProps = InertiaProps<{
  levelProgressSummary: Data.Dashboard.LevelProgressSummary
}>

export default function LevelProgressSummary({ levelProgressSummary }: PageProps) {
  const { schoolYear, level } = levelProgressSummary

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 p-6 md:p-9">
      <nav className="flex flex-wrap items-center justify-between gap-3" aria-label="Navigation du niveau">
        <Link className="font-600 text-sm text-sky-700 hover:text-sky-900 hover:underline" href="/">
          <span aria-hidden="true">← </span>Synthèse annuelle
        </Link>
        <Link
          className="font-600 text-sm text-sky-700 hover:text-sky-900 hover:underline"
          href={`/teaching-content/levels/${level.id}`}
        >
          Contenus du niveau <span aria-hidden="true">→</span>
        </Link>
      </nav>

      <header className="space-y-2">
        <p className="font-600 text-sm text-sky-700 uppercase">Synthèse du niveau</p>
        <h1 className="font-700 text-3xl tracking-tight text-neutral-950">{level.name}</h1>
        <p className="text-lg text-neutral-600">
          {level.shortCode} · {schoolYear.label} · {schoolYear.subject}
        </p>
      </header>

      {level.classes.length === 0 ? (
        <EmptyState
          title="Aucune classe dans ce niveau"
          description="Ajoutez une classe pour commencer à suivre sa progression."
        />
      ) : (
        <div className="space-y-3">
          {level.classes.map((teachingClass) => (
            <ClassSummaryRow
              key={teachingClass.id}
              classCode={teachingClass.shortCode}
              classLabel={teachingClass.name}
              pacing={
                <ClassPacingIndicator
                  dueSessionCount={teachingClass.dueSessionCount}
                  outcomeCounts={{
                    cancelled: teachingClass.outcomeCounts.cancelled,
                    partial: teachingClass.outcomeCounts.partial,
                    realized: teachingClass.outcomeCounts.realized,
                    shifted: teachingClass.outcomeCounts.shifted,
                    toCatchUp: teachingClass.outcomeCounts.toCatchUp,
                  }}
                  state={teachingClass.pacingState}
                />
              }
              progressionFollowUp={
                <ProgressionFollowUpIndicator
                  missingOutcomeCount={teachingClass.missingOutcomeCount}
                  reviewRequiredCount={teachingClass.reviewRequiredCount}
                />
              }
              action={
                <Link
                  className="font-600 text-sm text-sky-700 hover:text-sky-900 hover:underline"
                  href={`/planning/classes/${teachingClass.id}/progression`}
                >
                  Ouvrir la progression <span aria-hidden="true">→</span>
                </Link>
              }
            />
          ))}
        </div>
      )}
    </section>
  )
}
