import { Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import {
  Button,
  ClassPacingIndicator,
  ClassSummaryRow,
  EmptyState,
  Icon,
  MetricCard,
  ProgressionFollowUpIndicator,
} from "@progressio/ui"
import { type InertiaProps } from "~/types"

type PageProps = InertiaProps<{
  dashboard: Data.Dashboard.AnnualDashboard
}>

export default function Home({ dashboard }: PageProps) {
  const { schoolYear, summary, levels } = dashboard

  return (
    <section className="mx-auto w-full max-w-7xl space-y-10 px-6 py-8 md:px-10 md:py-11">
      <header className="border-border relative overflow-hidden border-b pb-8">
        <div
          className="border-primary/25 absolute top-0 right-0 h-16 w-32 border-b border-l border-dashed"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl space-y-3">
          <p className="text-primary font-700 text-xs tracking-[0.18em] uppercase">Repère annuel</p>
          <h1 className="font-display font-600 text-foreground text-4xl tracking-tight md:text-5xl">
            {schoolYear.label}
          </h1>
          <p className="text-muted-foreground text-lg">{schoolYear.subject}</p>
          <p className="text-muted-foreground max-w-2xl text-sm">
            Une vue d’ensemble des classes et de leur progression à la date du jour.
          </p>
        </div>
      </header>

      <section aria-labelledby="annual-metrics-heading" className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="annual-metrics-heading" className="font-display font-600 text-foreground text-2xl">
            Vue d’ensemble
          </h2>
          <p className="text-muted-foreground text-sm">Séances futures exclues</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Niveaux" value={summary.levelCount} description="dans l’année scolaire" />
          <MetricCard label="Classes" value={summary.classCount} description="à suivre" />
          <MetricCard label="Séances dues" value={summary.dueSessionCount} description="jusqu’à aujourd’hui" />
          <MetricCard
            label="Suivi à vérifier"
            value={summary.followUpCount}
            description="sans bilan ou à revoir"
            tone="amber"
          />
        </div>
      </section>

      <section aria-labelledby="levels-heading" className="space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <div>
            <p className="text-primary font-700 text-xs tracking-[0.18em] uppercase">Organisation</p>
            <h2 id="levels-heading" className="font-display font-600 text-foreground mt-1 text-3xl">
              Niveaux et classes
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">
            {summary.classCount} {summary.classCount > 1 ? "classes à parcourir" : "classe à parcourir"}
          </p>
        </div>

        <div className="space-y-8">
          {levels.map((level, index) => (
            <section
              key={level.id}
              className="border-border/80 space-y-4 border-t pt-6 first:border-t-0 first:pt-0"
              aria-labelledby={`level-${level.id}`}
            >
              <header className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex min-w-0 items-start gap-4">
                  <span
                    className="border-border bg-secondary text-secondary-foreground font-display font-600 grid h-11 w-11 shrink-0 place-items-center rounded-md border text-lg"
                    aria-label={`Position ${index + 1}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-muted-foreground font-700 text-xs tracking-[0.16em] uppercase">
                      {level.shortCode}
                    </p>
                    <h3 id={`level-${level.id}`} className="font-display font-600 text-foreground mt-1 text-2xl">
                      {level.name}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-muted-foreground text-sm">
                    {level.classes.length} {level.classes.length > 1 ? "classes" : "classe"}
                  </span>
                  <Button
                    render={<Link href={`/dashboard/levels/${level.id}`} />}
                    variant="outline"
                    size="sm"
                    rightIcon={<Icon name="arrowRight" size="sm" />}
                  >
                    Voir le niveau
                  </Button>
                </div>
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
                        <Button
                          render={<Link href={`/planning/classes/${teachingClass.id}/progression`} />}
                          variant="ghost"
                          size="sm"
                          rightIcon={<Icon name="arrowRight" size="sm" />}
                        >
                          Ouvrir la progression
                        </Button>
                      }
                    />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </section>
    </section>
  )
}
