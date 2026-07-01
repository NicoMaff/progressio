import { Form } from "@adonisjs/inertia/react"

type ThemeScreenTheme = {
  id: string
  name: string
  shortCode: string
  color: string
  noteMarkdown: string | null
}

type ThemesProps = {
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
  themes: ThemeScreenTheme[]
}

export default function Themes({ schoolYear, level, themes }: ThemesProps) {
  const themesUrl = `/teaching-content/levels/${level.id}/themes`

  return (
    <section className="content-page">
      <header className="content-header">
        <div>
          <p className="content-kicker">
            {schoolYear.label} · {schoolYear.subject} · {level.shortCode}
          </p>
          <h1>Thèmes actifs de {level.name}</h1>
        </div>
      </header>

      <div className="content-grid">
        <section className="panel">
          <h2>Nouveau thème</h2>
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

        <section className="panel">
          <h2>Thèmes actifs</h2>
          {themes.length === 0 ? (
            <p className="empty-state">Aucun thème actif pour ce niveau.</p>
          ) : (
            <div className="theme-list">
              {themes.map((theme) => (
                <article key={theme.id} className="theme-row">
                  <div className="theme-row__summary">
                    <span className="theme-color" style={{ backgroundColor: theme.color }} aria-hidden="true" />
                    <div>
                      <h3>{theme.name}</h3>
                      <p>{theme.shortCode}</p>
                    </div>
                  </div>

                  <details>
                    <summary>Modifier</summary>
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

function ThemeFields({ errors, theme }: { errors: Record<string, string>; theme?: ThemeScreenTheme }) {
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
