import { Form, Link } from "@adonisjs/inertia/react"
import { type InertiaProps } from "~/types"
import { ChapterFields } from "~/components/chapter_fields"

type PageProps = InertiaProps<{
  level: { id: string; name: string }
  themes: { id: string; name: string; shortCode: string }[]
  chapter: { id: string; name: string; shortCode: string; themeId: string | null; noteMarkdown: string | null }
}>

export default function EditChapter({ level, themes, chapter }: PageProps) {
  return (
    <section className="mx-auto max-w-3xl p-6 sm:p-9">
      <Link href={`/levels/${level.id}/chapters`} className="text-sm font-semibold text-[var(--blue-8)]">
        ← Retour aux chapitres
      </Link>
      <h1 className="text-7 font-650 mt-5">Modifier {chapter.name}</h1>
      <Form
        className="mt-7 rounded-xl border border-[var(--gray-3)] bg-white p-6"
        route="chapters.update"
        routeParams={{ levelId: level.id, chapterId: chapter.id }}
      >
        {({ errors, processing }) => (
          <>
            <ChapterFields errors={errors} themes={themes} chapter={chapter} />
            <button className="mt-5" type="submit" disabled={processing}>
              Enregistrer
            </button>
          </>
        )}
      </Form>
    </section>
  )
}
