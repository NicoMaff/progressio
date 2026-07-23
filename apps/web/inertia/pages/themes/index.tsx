import { Form, Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { useState } from "react"
import { ThemeFields, type ThemeWorkspace } from "~/components/theme_fields"
import { type InertiaProps } from "~/types"

type PageProps = InertiaProps<{
  schoolYear: { id: string; label: string; subject: string }
  level: { id: string; name: string; shortCode: string }
  themes: Data.Themes.ThemeWorkspace[]
}>

export default function ThemesIndex({ schoolYear, level, themes }: PageProps) {
  const [orderedThemes, setOrderedThemes] = useState(themes)
  const [panelTheme, setPanelTheme] = useState<ThemeWorkspace | null | undefined>(undefined)
  const [draggedThemeId, setDraggedThemeId] = useState<string | null>(null)

  function moveTheme(themeId: string, direction: -1 | 1) {
    setOrderedThemes((current) => {
      const index = current.findIndex((theme) => theme.id === themeId)
      const nextIndex = index + direction
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current
      const next = [...current]
      ;[next[index], next[nextIndex]] = [next[nextIndex], next[index]]
      return next
    })
  }

  function placeTheme(targetThemeId: string) {
    if (!draggedThemeId || draggedThemeId === targetThemeId) return
    setOrderedThemes((current) => {
      const sourceIndex = current.findIndex((theme) => theme.id === draggedThemeId)
      const targetIndex = current.findIndex((theme) => theme.id === targetThemeId)
      if (sourceIndex < 0 || targetIndex < 0) return current
      const next = [...current]
      const [theme] = next.splice(sourceIndex, 1)
      next.splice(targetIndex, 0, theme)
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
          <h1 className="text-7 font-650 mt-1">Thèmes de {level.name}</h1>
        </div>
        <div className="flex gap-3">
          <Link href={`/levels/${level.id}/themes/archive`} className="text-sm font-semibold text-[var(--blue-8)]">
            Archives
          </Link>
          <button type="button" onClick={() => setPanelTheme(null)}>
            Nouveau thème
          </button>
        </div>
      </header>

      <div className="mt-7 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <section aria-labelledby="active-themes-heading">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="active-themes-heading" className="text-5 font-650">
              Thèmes actifs
            </h2>
            <span className="text-sm text-[var(--gray-7)]">
              {orderedThemes.length} thème{orderedThemes.length > 1 ? "s" : ""}
            </span>
          </div>
          {orderedThemes.length === 0 ? (
            <p className="text-[var(--gray-7)]">Aucun thème actif pour ce niveau.</p>
          ) : (
            <Form route="themes.reorder" routeParams={{ levelId: level.id }}>
              {({ processing }) => (
                <>
                  <ol className="grid gap-2.5">
                    {orderedThemes.map((theme, index) => (
                      <li
                        key={theme.id}
                        draggable
                        onDragStart={() => setDraggedThemeId(theme.id)}
                        onDragEnd={() => setDraggedThemeId(null)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => placeTheme(theme.id)}
                        className="flex items-center gap-3 rounded-xl border border-[var(--gray-3)] bg-white p-3"
                      >
                        <span className="cursor-grab text-[var(--gray-7)]" aria-hidden="true">
                          ⠿
                        </span>
                        <span
                          className="h-5 w-5 shrink-0 rounded-full"
                          style={{ backgroundColor: theme.color }}
                          aria-hidden="true"
                        />
                        <button type="button" className="min-w-0 flex-1 text-left" onClick={() => setPanelTheme(theme)}>
                          <span className="block truncate font-semibold">{theme.name}</span>
                          <span className="block text-sm text-[var(--gray-7)]">
                            {theme.shortCode} · {theme.chapterCount} chapitre{theme.chapterCount > 1 ? "s" : ""} · Actif
                          </span>
                        </button>
                        <div className="flex gap-1" aria-label={`Réordonner ${theme.name}`}>
                          <button type="button" onClick={() => moveTheme(theme.id, -1)} disabled={index === 0}>
                            Monter
                          </button>
                          <button
                            type="button"
                            onClick={() => moveTheme(theme.id, 1)}
                            disabled={index === orderedThemes.length - 1}
                          >
                            Descendre
                          </button>
                        </div>
                        <input type="hidden" name="themeIds" value={theme.id} />
                      </li>
                    ))}
                  </ol>
                  <button className="mt-4" type="submit" disabled={processing}>
                    Enregistrer l’ordre
                  </button>
                </>
              )}
            </Form>
          )}
        </section>

        {panelTheme !== undefined ? (
          <aside
            className="sticky top-5 rounded-xl border border-[var(--gray-3)] bg-white p-5"
            aria-label={panelTheme ? `Modifier ${panelTheme.name}` : "Nouveau thème"}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-5 font-650">{panelTheme ? "Modifier le thème" : "Nouveau thème"}</h2>
              <button type="button" onClick={() => setPanelTheme(undefined)} aria-label="Fermer le panneau">
                ×
              </button>
            </div>
            <Form
              route={panelTheme ? "themes.update" : "themes.store"}
              routeParams={panelTheme ? { levelId: level.id, themeId: panelTheme.id } : { levelId: level.id }}
            >
              {({ errors, processing }) => (
                <>
                  <ThemeFields errors={errors} theme={panelTheme ?? undefined} />
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button type="submit" disabled={processing}>
                      {panelTheme ? "Enregistrer" : "Créer le thème"}
                    </button>
                    {panelTheme ? (
                      <Link
                        href={`/levels/${level.id}/themes/${panelTheme.id}/edit`}
                        className="text-sm font-semibold text-[var(--blue-8)]"
                      >
                        Ouvrir la page complète
                      </Link>
                    ) : null}
                  </div>
                </>
              )}
            </Form>
            {panelTheme ? (
              <Form className="mt-3" route="themes.archive" routeParams={{ levelId: level.id, themeId: panelTheme.id }}>
                {({ processing }) => (
                  <button type="submit" disabled={processing}>
                    Archiver ce thème
                  </button>
                )}
              </Form>
            ) : null}
          </aside>
        ) : null}
      </div>
    </section>
  )
}
