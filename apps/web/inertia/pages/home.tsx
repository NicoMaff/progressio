import { Link } from "@adonisjs/inertia/react"
import {
  ClassPacingIndicator,
  ClassSummaryRow,
  EmptyState,
  MetricCard,
  ProgressionFollowUpIndicator,
} from "@progressio/ui"
import { type InertiaProps } from "~/types"

type ClassSummary = {
  id: string
  name: string
  shortCode: string
  pacingState: "tracked" | "notPlanned" | "nothingDue"
  dueSessionCount: number
  outcomeCounts: { cancelled: number; partial: number; realized: number; shifted: number; toCatchUp: number }
  missingOutcomeCount: number
  reviewRequiredCount: number
}

type PageProps = InertiaProps<{
  dashboard: {
    schoolYear: { id: string; label: string; subject: string }
    summary: { levelCount: number; classCount: number; dueSessionCount: number; followUpCount: number }
    levels: { id: string; name: string; shortCode: string; classes: ClassSummary[] }[]
  }
}>

export default function Home({ dashboard }: PageProps) {
  const { schoolYear, summary, levels } = dashboard
  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 p-6 md:p-9">
      <header className="space-y-2">
        <p className="font-600 text-sm text-sky-700 uppercase">Synthèse annuelle</p>
        <h1 className="font-700 text-3xl tracking-tight text-neutral-950">{schoolYear.label}</h1>
        <p className="text-lg text-neutral-600">{schoolYear.subject}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Niveaux" value={summary.levelCount} description="dans l’année scolaire" />
        <MetricCard label="Classes" value={summary.classCount} description="à suivre" tone="blue" />
        <MetricCard
          label="Séances dues"
          value={summary.dueSessionCount}
          description="jusqu’à aujourd’hui"
          tone="green"
        />
        <MetricCard
          label="Suivi à vérifier"
          value={summary.followUpCount}
          description="sans bilan ou à revoir"
          tone="amber"
        />
      </div>

      <div className="space-y-8">
        {levels.map((level) => (
          <section key={level.id} className="space-y-4" aria-labelledby={`level-${level.id}`}>
            <header className="flex items-baseline justify-between gap-4">
              <div>
                <p className="font-600 text-xs tracking-[0.12em] text-sky-700 uppercase">{level.shortCode}</p>
                <h2 id={`level-${level.id}`} className="font-700 mt-1 text-2xl text-neutral-950">
                  {level.name}
                </h2>
              </div>
              <span className="text-sm text-neutral-500">
                {level.classes.length} {level.classes.length > 1 ? "classes" : "classe"}
              </span>
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
        ))}
      </div>
    </section>
  )
}
