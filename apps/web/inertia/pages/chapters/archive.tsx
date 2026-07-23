import { Form, Link } from "@adonisjs/inertia/react"
import { type InertiaProps } from "~/types"

type PageProps = InertiaProps<{
  level: { id: string; name: string; shortCode: string }
  chapters: { id: string; name: string; shortCode: string; theme: { name: string } | null }[]
}>

export default function ChaptersArchive({ level, chapters }: PageProps) {
  return (
    <section className="w-full p-6 sm:p-9">
      <Link href={`/levels/${level.id}/chapters`} className="text-sm font-semibold text-[var(--blue-8)]">
        ← Chapitres actifs
      </Link>
      <h1 className="text-7 font-650 mt-5">Chapitres archivés</h1>
      <ul className="mt-7 grid gap-3">
        {chapters.map((chapter) => (
          <li
            key={chapter.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-[var(--gray-3)] p-4"
          >
            <div>
              <p className="font-semibold">{chapter.name}</p>
              <p className="text-sm text-[var(--gray-7)]">
                {chapter.shortCode} · {chapter.theme?.name ?? "Sans thème"}
              </p>
            </div>
            <div className="flex gap-2">
              <Form route="chapters.restore" routeParams={{ levelId: level.id, chapterId: chapter.id }}>
                {({ processing }) => (
                  <button type="submit" disabled={processing}>
                    Restaurer
                  </button>
                )}
              </Form>
              <Form
                route="chapters.destroy"
                routeParams={{ levelId: level.id, chapterId: chapter.id }}
                onSubmit={(event) => {
                  if (!window.confirm(`Supprimer définitivement le chapitre ${chapter.name} ?`)) event.preventDefault()
                }}
              >
                {({ processing }) => (
                  <button type="submit" disabled={processing}>
                    Supprimer
                  </button>
                )}
              </Form>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
