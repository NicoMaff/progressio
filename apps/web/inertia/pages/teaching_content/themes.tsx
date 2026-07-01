import { Form } from "@adonisjs/inertia/react"
import { type InertiaProps } from "~/types"

type ThemePageTheme = {
  id: string
  name: string
  shortCode: string
  color: string
  noteMarkdown: string | null
}

type PageProps = InertiaProps<{
  schoolYear: {
    id: string
    label: string
    subject: string
  }
  level: {
    id: string
    name: string
    shortCode: string
  }
  themes: ThemePageTheme[]
}>

export default function Themes({ schoolYear, level, themes }: PageProps) {
  const themesUrl = `/teaching-content/levels/${level.id}/themes`

  return (
    <section className="w-full p-9">
      <header className="mb-7 p-0">
        <div>
          <p className="font-600 text-sm text-[var(--gray-7)] uppercase">
            {schoolYear.label} · {schoolYear.subject} · {level.shortCode}
          </p>
          <h1 className="text-8 font-650">Thèmes actifs de {level.name}</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(280px,360px)_1fr]">
        <section className="rounded-2 border border-[var(--gray-3)] p-5">
          <h2 className="text-5 mb-4.5">Nouveau thème</h2>
          <Form action={{ url: themesUrl, method: "post" }}>
            {({ errors, processing }) => (
              <>
                <ThemeFields errors={errors} />
                <button type="submit" disabled={processing}>
                  Créer le thème
                </button>
              </>
            )}
          </Form>
        </section>

        <section className="rounded-2 border border-[var(--gray-3)] p-5">
          <h2 className="text-5 mb-4.5">Thèmes actifs</h2>
          {themes.length === 0 ? (
            <p className="text-[var(--gray-7)]">Aucun thème actif pour ce niveau.</p>
          ) : (
            <div className="grid gap-3.5">
              {themes.map((theme) => (
                <article key={theme.id} className="rounded-2 border border-[var(--gray-3)] p-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-6 w-6 flex-shrink-0 rounded-full border border-[var(--gray-4)]"
                      style={{ backgroundColor: theme.color }}
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-4.5">{theme.name}</h3>
                      <p className="font-600 text-sm text-[var(--gray-7)]">{theme.shortCode}</p>
                    </div>
                  </div>

                  <details className="mt-3.5">
                    <summary className="font-600 cursor-pointer text-[var(--gray-8)]">Modifier</summary>
                    <Form action={{ url: `${themesUrl}/${theme.id}`, method: "put" }}>
                      {({ errors, processing }) => (
                        <>
                          <ThemeFields errors={errors} theme={theme} />
                          <button type="submit" disabled={processing}>
                            Enregistrer
                          </button>
                        </>
                      )}
                    </Form>
                  </details>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

function ThemeFields({ errors, theme }: { errors: Record<string, string>; theme?: ThemePageTheme }) {
  return (
    <>
      <div>
        <label htmlFor={theme ? `name-${theme.id}` : "name"}>Nom</label>
        <input
          id={theme ? `name-${theme.id}` : "name"}
          name="name"
          defaultValue={theme?.name}
          maxLength={120}
          data-invalid={errors.name ? "true" : undefined}
          required
        />
        {errors.name && <div>{errors.name}</div>}
      </div>

      <div>
        <label htmlFor={theme ? `shortCode-${theme.id}` : "shortCode"}>Code court</label>
        <input
          id={theme ? `shortCode-${theme.id}` : "shortCode"}
          name="shortCode"
          defaultValue={theme?.shortCode}
          maxLength={24}
          data-invalid={errors.shortCode ? "true" : undefined}
          required
        />
        {errors.shortCode && <div>{errors.shortCode}</div>}
      </div>

      <div>
        <label htmlFor={theme ? `color-${theme.id}` : "color"}>Couleur</label>
        <input
          id={theme ? `color-${theme.id}` : "color"}
          name="color"
          type="color"
          defaultValue={theme?.color ?? "#6B7280"}
          data-invalid={errors.color ? "true" : undefined}
        />
        {errors.color && <div>{errors.color}</div>}
      </div>

      <div>
        <label htmlFor={theme ? `noteMarkdown-${theme.id}` : "noteMarkdown"}>Notes</label>
        <textarea
          id={theme ? `noteMarkdown-${theme.id}` : "noteMarkdown"}
          name="noteMarkdown"
          defaultValue={theme?.noteMarkdown ?? ""}
          maxLength={5000}
          rows={4}
          data-invalid={errors.noteMarkdown ? "true" : undefined}
        />
        {errors.noteMarkdown && <div>{errors.noteMarkdown}</div>}
      </div>
    </>
  )
}
