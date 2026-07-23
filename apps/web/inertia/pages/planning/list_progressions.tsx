import { Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { EmptyState } from "@progressio/ui"
import { useMemo, useState } from "react"
import { urlFor } from "~/client"
import { type InertiaProps } from "~/types"

type PageProps = InertiaProps<{
  progressionsList: Data.Dashboard.ProgressionsList
}>

export default function ListProgressions({ progressionsList }: PageProps) {
  const [selectedLevelId, setSelectedLevelId] = useState("all")
  const levels = useMemo(
    () =>
      selectedLevelId === "all"
        ? progressionsList.levels
        : progressionsList.levels.filter((level) => level.id === selectedLevelId),
    [progressionsList.levels, selectedLevelId]
  )

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 p-6 md:p-9">
      <header className="space-y-2">
        <p className="font-600 text-sm text-sky-700 uppercase">Planification</p>
        <h1 className="font-700 text-3xl tracking-tight text-neutral-950">Progressions</h1>
        <p className="text-lg text-neutral-600">
          Choisissez une classe pour parcourir sa feuille de route de {progressionsList.schoolYear.label}.
        </p>
      </header>

      <label className="block max-w-sm">
        <span>Niveau</span>
        <select value={selectedLevelId} onChange={(event) => setSelectedLevelId(event.target.value)}>
          <option value="all">Tous les niveaux</option>
          {progressionsList.levels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.shortCode} · {level.name}
            </option>
          ))}
        </select>
      </label>

      {levels.length === 0 ? (
        <EmptyState
          title="Aucun niveau"
          description="Ajoutez un niveau et une classe pour commencer une progression."
        />
      ) : (
        <div className="space-y-7">
          {levels.map((level) => (
            <section key={level.id} aria-labelledby={`progressions-level-${level.id}`} className="space-y-3">
              <header>
                <p className="font-600 text-xs tracking-[0.12em] text-sky-700 uppercase">{level.shortCode}</p>
                <h2 id={`progressions-level-${level.id}`} className="font-700 text-xl text-neutral-950">
                  {level.name}
                </h2>
              </header>
              {level.classes.length === 0 ? (
                <p className="text-sm text-neutral-600">Aucune classe dans ce niveau.</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {level.classes.map((teachingClass) => (
                    <Link
                      key={teachingClass.id}
                      href={urlFor("planning.progression_view", { classId: teachingClass.id })}
                      className="text-decoration-none rounded-lg border border-slate-200 bg-white p-4 hover:border-sky-300 focus-visible:outline focus-visible:outline-3 focus-visible:outline-sky-700"
                    >
                      <p className="font-700 text-neutral-950">{teachingClass.name}</p>
                      <p className="mt-1 text-sm text-neutral-600">
                        {teachingClass.shortCode} · Ouvrir la feuille de route
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </section>
  )
}
