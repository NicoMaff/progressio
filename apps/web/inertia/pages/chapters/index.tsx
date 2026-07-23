import { Form, Link } from "@adonisjs/inertia/react"
import { useState } from "react"
import { urlFor } from "~/client"
import { ChapterFields } from "~/components/chapter_fields"
import { type InertiaProps } from "~/types"

type Chapter = {
  id: string
  name: string
  shortCode: string
  themeId: string | null
  theme: Theme | null
  noteMarkdown: string | null
  displayOrder: number
  archivedAt: string | null
}
type Theme = { id: string; name: string; shortCode: string; color: string }
type PageProps = InertiaProps<{
  schoolYear: { id: string; label: string; subject: string }
  level: { id: string; name: string; shortCode: string }
  themes: Theme[]
  chapters: Chapter[]
}>

export default function ChaptersIndex({ schoolYear, level, themes, chapters }: PageProps) {
  const [panelChapter, setPanelChapter] = useState<Chapter | null | undefined>(undefined)
  const [ordered, setOrdered] = useState(chapters)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const groups = [{ id: null, name: "Sans thème", color: "var(--gray-5)" }, ...themes]

  function move(chapterId: string, direction: -1 | 1) {
    setOrdered((current) => {
      const chapter = current.find((item) => item.id === chapterId)
      if (!chapter) return current
      const group = current.filter((item) => item.themeId === chapter.themeId)
      const index = group.findIndex((item) => item.id === chapterId)
      const nextIndex = index + direction
      if (nextIndex < 0 || nextIndex >= group.length) return current
      const nextGroup = [...group]
      ;[nextGroup[index], nextGroup[nextIndex]] = [nextGroup[nextIndex], nextGroup[index]]
      return current.map((item) => nextGroup.find((next) => next.id === item.id) ?? item)
    })
  }

  function place(targetId: string) {
    if (!draggedId || draggedId === targetId) return
    setOrdered((current) => {
      const source = current.find((item) => item.id === draggedId)
      const target = current.find((item) => item.id === targetId)
      if (!source || !target || source.themeId !== target.themeId) return current
      const next = current.filter((item) => item.id !== draggedId)
      next.splice(
        next.findIndex((item) => item.id === targetId),
        0,
        source
      )
      return next
    })
  }

  return (
    <section className="w-full p-6 sm:p-9">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[var(--gray-7)] uppercase">
            {schoolYear.label} · {schoolYear.subject} · {level.shortCode}
          </p>
          <h1 className="text-7 font-650 mt-1">Chapitres de {level.name}</h1>
        </div>
        <div className="flex gap-3">
          <Link
            href={urlFor("chapters.archived", { levelId: level.id })}
            className="text-sm font-semibold text-[var(--blue-8)]"
          >
            Archives
          </Link>
          <button type="button" onClick={() => setPanelChapter(null)}>
            Nouveau chapitre
          </button>
        </div>
      </header>

      <div className="mt-7 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="grid gap-6">
          {groups.map((group) => {
            const items = ordered.filter((chapter) => chapter.themeId === group.id)
            return (
              <section key={group.id ?? "unassigned"} aria-labelledby={`chapter-group-${group.id ?? "none"}`}>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: group.color }} aria-hidden="true" />
                  <h2 id={`chapter-group-${group.id ?? "none"}`} className="text-5 font-650">
                    {group.name}
                  </h2>
                  <span className="text-sm text-[var(--gray-7)]">{items.length}</span>
                </div>
                <Form action={urlFor("chapters.reorder", { levelId: level.id })} method="put">
                  {({ processing }) => (
                    <>
                      <input type="hidden" name="themeId" value={group.id ?? ""} />
                      <ol className="grid gap-2.5">
                        {items.map((chapter, index) => (
                          <li
                            key={chapter.id}
                            draggable
                            onDragStart={() => setDraggedId(chapter.id)}
                            onDragEnd={() => setDraggedId(null)}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={() => place(chapter.id)}
                            className="flex items-center gap-3 rounded-xl border border-[var(--gray-3)] bg-white p-3"
                          >
                            <span className="cursor-grab text-[var(--gray-7)]" aria-hidden="true">
                              ⠿
                            </span>
                            <button
                              type="button"
                              className="min-w-0 flex-1 text-left"
                              onClick={() => setPanelChapter(chapter)}
                            >
                              <span className="block truncate font-semibold">{chapter.name}</span>
                              <span className="block text-sm text-[var(--gray-7)]">{chapter.shortCode} · Actif</span>
                            </button>
                            <div className="flex gap-1" aria-label={`Réordonner ${chapter.name}`}>
                              <button type="button" onClick={() => move(chapter.id, -1)} disabled={index === 0}>
                                Monter
                              </button>
                              <button
                                type="button"
                                onClick={() => move(chapter.id, 1)}
                                disabled={index === items.length - 1}
                              >
                                Descendre
                              </button>
                            </div>
                            <input type="hidden" name="chapterIds" value={chapter.id} />
                          </li>
                        ))}
                      </ol>
                      {items.length > 0 && (
                        <button className="mt-3" type="submit" disabled={processing}>
                          Enregistrer l’ordre
                        </button>
                      )}
                    </>
                  )}
                </Form>
              </section>
            )
          })}
        </div>

        {panelChapter !== undefined && (
          <aside
            className="sticky top-5 rounded-xl border border-[var(--gray-3)] bg-white p-5"
            aria-label={panelChapter ? `Modifier ${panelChapter.name}` : "Nouveau chapitre"}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-5 font-650">{panelChapter ? "Modifier le chapitre" : "Nouveau chapitre"}</h2>
              <button type="button" onClick={() => setPanelChapter(undefined)} aria-label="Fermer le panneau">
                ×
              </button>
            </div>
            <Form
              route={panelChapter ? "chapters.update" : "chapters.store"}
              routeParams={panelChapter ? { levelId: level.id, chapterId: panelChapter.id } : { levelId: level.id }}
            >
              {({ errors, processing }) => (
                <>
                  <ChapterFields errors={errors} themes={themes} chapter={panelChapter ?? undefined} />
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button type="submit" disabled={processing}>
                      {panelChapter ? "Enregistrer" : "Créer le chapitre"}
                    </button>
                    {panelChapter && (
                      <Link
                        href={urlFor("chapters.edit", { levelId: level.id, chapterId: panelChapter.id })}
                        className="text-sm font-semibold text-[var(--blue-8)]"
                      >
                        Ouvrir la page complète
                      </Link>
                    )}
                  </div>
                </>
              )}
            </Form>
            {panelChapter && (
              <Form
                className="mt-3"
                route="chapters.archive"
                routeParams={{ levelId: level.id, chapterId: panelChapter.id }}
              >
                {({ processing }) => (
                  <button type="submit" disabled={processing}>
                    Archiver ce chapitre
                  </button>
                )}
              </Form>
            )}
          </aside>
        )}
      </div>
    </section>
  )
}
