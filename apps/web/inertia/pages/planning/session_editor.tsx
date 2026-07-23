import { Link } from "@adonisjs/inertia/react"
import { type InertiaProps } from "~/types"
import { type ReactElement } from "react"
import { type SessionEditor } from "~/pages/planning/progression_view"
import { SessionForm } from "~/pages/planning/progression_view"
import { urlFor } from "~/client"

type PageProps = InertiaProps<{ sessionEditor: SessionEditor }>

export default function SessionEditorPage({ sessionEditor }: PageProps): ReactElement {
  const { teachingClass, session } = sessionEditor
  return (
    <section className="mx-auto w-full max-w-4xl space-y-8 px-6 py-8 md:px-10">
      <nav aria-label="Fil d’Ariane" className="text-sm">
        <Link
          className="font-600 text-sky-700 underline"
          href={urlFor("planning.progression_view", { classId: teachingClass.id })}
        >
          Feuille de route de {teachingClass.name}
        </Link>
      </nav>
      <header>
        <p className="font-700 text-xs tracking-[0.16em] text-sky-700 uppercase">Séance · {session.statusLabel}</p>
        <h1 className="font-700 mt-2 text-3xl text-slate-950">{session.title || "Séance sans titre"}</h1>
        <p className="mt-2 text-slate-600">Cette page possède une URL stable pour les notes détaillées et le suivi.</p>
      </header>
      <SessionForm sessionEditor={sessionEditor} />
    </section>
  )
}
