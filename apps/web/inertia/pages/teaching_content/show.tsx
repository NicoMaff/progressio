import { Form } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { type InertiaProps } from "~/types"

type TeachingContentPageData = Data.TeachingContent.TeachingContentPage
type TeachingContentPageProps = InertiaProps<TeachingContentPageData>
type TeachingContentPageTheme = TeachingContentPageData["themes"][number]
type TeachingContentPageChapter = TeachingContentPageData["chapters"][number]

export default function TeachingContentShow({ level, schoolYear, themes, chapters }: TeachingContentPageProps) {
  return (
    <section className="flex flex-1 flex-col">
      <header className="border-border flex items-start justify-between gap-6 border-b px-12 py-10">
        <div>
          <p className="text-muted-foreground text-sm font-semibold">
            {schoolYear.label} · {schoolYear.subject}
          </p>
          <h1>Contenus de {level.name}</h1>
        </div>
        <span className="border-border text-muted-foreground min-w-11 flex-none rounded-md border px-2.5 py-1.5 text-center font-bold">
          {level.shortCode}
        </span>
      </header>

      <div className="grid grid-cols-1 items-start gap-8 px-12 py-10 xl:grid-cols-[minmax(300px,380px)_1fr]">
        <section className="border-border rounded-md border p-5">
          <h2 className="mb-5 text-xl font-semibold">Nouveau chapitre</h2>
          <Form route="teaching_content.chapters.store" routeParams={{ levelId: level.id }}>
            {({ errors, processing }) => (
              <>
                <ChapterFields errors={errors} themes={themes} />
                <button type="submit" disabled={processing}>
                  Créer le chapitre
                </button>
              </>
            )}
          </Form>
        </section>

        <div className="grid gap-8">
          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold">Chapitres actifs</h2>
              <span className="text-muted-foreground text-sm font-semibold">{chapters.length} actifs</span>
            </div>

            {chapters.length === 0 ? (
              <p className="text-muted-foreground">Aucun chapitre actif pour ce niveau.</p>
            ) : (
              <div className="grid gap-3">
                {chapters.map((chapter) => (
                  <article key={chapter.id} className="border-border rounded-md border p-4">
                    <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                      <div>
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold">{chapter.name}</h3>
                          <span className="border-border text-muted-foreground rounded-md border px-2 py-0.5 text-sm font-bold">
                            {chapter.shortCode}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {chapter.theme ? `${chapter.theme.name} · ${chapter.theme.shortCode}` : "Sans thème"}
                        </p>
                      </div>
                      <div className="text-muted-foreground flex flex-wrap gap-2 text-sm">
                        <span>{chapter.archivedAt ? "Archivé" : "Actif"}</span>
                        <span>{chapter.activityCount} activité(s)</span>
                      </div>
                    </div>

                    <details className="mt-4">
                      <summary className="cursor-pointer font-semibold">Modifier</summary>
                      <Form
                        route="teaching_content.chapters.update"
                        routeParams={{ levelId: level.id, chapterId: chapter.id }}
                      >
                        {({ errors, processing }) => (
                          <>
                            <ChapterFields errors={errors} themes={themes} chapter={chapter} />
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

          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold">Thèmes actifs</h2>
              <span className="text-muted-foreground text-sm font-semibold">{themes.length} actifs</span>
            </div>

            {themes.length === 0 ? (
              <p className="text-muted-foreground">Aucun thème actif pour ce niveau.</p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {themes.map((theme) => (
                  <article key={theme.id} className="border-border rounded-md border p-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="border-border h-5 w-5 flex-none rounded-full border"
                        style={{ backgroundColor: theme.color }}
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-semibold">{theme.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          {theme.shortCode} · {theme.chapterCount} chapitre(s)
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  )
}

function ChapterFields({
  errors,
  themes,
  chapter,
}: {
  errors: Record<string, string>
  themes: TeachingContentPageTheme[]
  chapter?: TeachingContentPageChapter
}) {
  const fieldId = (name: string) => (chapter ? `${name}-${chapter.id}` : name)

  return (
    <div className="mb-4 grid gap-4">
      <div>
        <label htmlFor={fieldId("name")}>Nom</label>
        <input
          id={fieldId("name")}
          name="name"
          defaultValue={chapter?.name}
          maxLength={120}
          data-invalid={errors.name ? "true" : undefined}
          required
        />
        {errors.name && <div>{errors.name}</div>}
      </div>

      <div>
        <label htmlFor={fieldId("shortCode")}>Code court</label>
        <input
          id={fieldId("shortCode")}
          name="shortCode"
          defaultValue={chapter?.shortCode}
          maxLength={24}
          data-invalid={errors.shortCode ? "true" : undefined}
          required
        />
        {errors.shortCode && <div>{errors.shortCode}</div>}
      </div>

      <div>
        <label htmlFor={fieldId("themeId")}>Thème</label>
        <select
          id={fieldId("themeId")}
          name="themeId"
          defaultValue={chapter?.themeId ?? ""}
          data-invalid={errors.themeId ? "true" : undefined}
        >
          <option value="">Sans thème</option>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.shortCode} · {theme.name}
            </option>
          ))}
        </select>
        {errors.themeId && <div>{errors.themeId}</div>}
      </div>

      <div>
        <label htmlFor={fieldId("noteMarkdown")}>Notes</label>
        <textarea
          id={fieldId("noteMarkdown")}
          name="noteMarkdown"
          defaultValue={chapter?.noteMarkdown ?? ""}
          maxLength={5000}
          rows={4}
          data-invalid={errors.noteMarkdown ? "true" : undefined}
        />
        {errors.noteMarkdown && <div>{errors.noteMarkdown}</div>}
      </div>
    </div>
  )
}
