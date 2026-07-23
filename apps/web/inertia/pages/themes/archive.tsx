import { Form, Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { type InertiaProps } from "~/types"

type PageProps = InertiaProps<{
  level: { id: string; name: string; shortCode: string }
  themes: Data.Themes.ThemeWorkspace[]
}>

export default function ThemesArchive({ level, themes }: PageProps) {
  return (
    <section className="w-full p-6 sm:p-9">
      <Link href={`/levels/${level.id}/themes`} className="text-sm font-semibold text-[var(--blue-8)]">
        ← Thèmes actifs
      </Link>
      <header className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[var(--gray-7)] uppercase">{level.shortCode}</p>
          <h1 className="text-7 font-650 mt-1">Thèmes archivés</h1>
        </div>
      </header>
      <ul className="mt-7 grid gap-3">
        {themes.map((theme) => (
          <li
            key={theme.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-[var(--gray-3)] p-4"
          >
            <div className="flex items-center gap-3">
              <span className="h-5 w-5 rounded-full" style={{ backgroundColor: theme.color }} aria-hidden="true" />
              <div>
                <p className="font-semibold">{theme.name}</p>
                <p className="text-sm text-[var(--gray-7)]">
                  {theme.shortCode} · {theme.chapterCount} chapitre{theme.chapterCount > 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Form route="themes.restore" routeParams={{ levelId: level.id, themeId: theme.id }}>
                {({ processing }) => (
                  <button type="submit" disabled={processing}>
                    Restaurer
                  </button>
                )}
              </Form>
              <Form
                route="themes.destroy"
                routeParams={{ levelId: level.id, themeId: theme.id }}
                onSubmit={(event) => {
                  if (!window.confirm(`Supprimer définitivement le thème ${theme.name} ?`)) event.preventDefault()
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
