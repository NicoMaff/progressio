import { Form, Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { type ReactNode } from "react"
import { type InertiaProps } from "~/types"

type TeachingContentPageData = Data.TeachingContent.TeachingContentPage
type TeachingContentArchiveFilter = "active" | "archived" | "all"
type TeachingContentPageProps = InertiaProps<TeachingContentPageData>
type TeachingContentPageTheme = TeachingContentPageData["themes"][number]
type TeachingContentPageChapter = TeachingContentPageData["chapters"][number]
type TeachingContentPageActivityType = TeachingContentPageData["activityTypes"][number]
type TeachingContentPageActivity = TeachingContentPageData["activities"][number]

export default function TeachingContentShow({
  level,
  schoolYear,
  themes,
  chapters,
  activityTypes,
  activities,
  archiveFilter,
}: TeachingContentPageProps) {
  const activeThemes = themes.filter((theme) => !theme.archivedAt)
  const activeChapters = chapters.filter((chapter) => !chapter.archivedAt)
  const archiveFilterLabel =
    archiveFilter === "active" ? "actifs" : archiveFilter === "archived" ? "archivés" : "affichés"

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

      <nav className="border-border flex gap-2 border-b px-12 py-4" aria-label="Filtrer les contenus">
        <ArchiveFilterLink levelId={level.id} filter="active" currentFilter={archiveFilter}>
          Actifs
        </ArchiveFilterLink>
        <ArchiveFilterLink levelId={level.id} filter="archived" currentFilter={archiveFilter}>
          Archivés
        </ArchiveFilterLink>
        <ArchiveFilterLink levelId={level.id} filter="all" currentFilter={archiveFilter}>
          Tous
        </ArchiveFilterLink>
      </nav>

      <div
        className={`grid grid-cols-1 items-start gap-8 px-12 py-10 ${archiveFilter === "archived" ? "" : "xl:grid-cols-[minmax(300px,380px)_1fr]"}`}
      >
        {archiveFilter !== "archived" && (
          <div className="grid gap-6">
            <section className="border-border rounded-md border p-5">
              <h2 className="mb-5 text-xl font-semibold">Nouvelle activité</h2>
              <Form route="activities.store" routeParams={{ levelId: level.id }}>
                {({ errors, processing }) => (
                  <>
                    <ActivityFields errors={errors} chapters={activeChapters} activityTypes={activityTypes} />
                    <button type="submit" disabled={processing}>
                      Créer l’activité
                    </button>
                  </>
                )}
              </Form>
            </section>

            <section className="border-border rounded-md border p-5">
              <h2 className="mb-5 text-xl font-semibold">Nouveau chapitre</h2>
              <Form route="chapters.store" routeParams={{ levelId: level.id }}>
                {({ errors, processing }) => (
                  <>
                    <ChapterFields errors={errors} themes={activeThemes} />
                    <button type="submit" disabled={processing}>
                      Créer le chapitre
                    </button>
                  </>
                )}
              </Form>
            </section>
          </div>
        )}

        <div className="grid gap-8">
          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold">Activités</h2>
              <span className="text-muted-foreground text-sm font-semibold">
                {activities.length} contenus {archiveFilterLabel}
              </span>
            </div>

            {activities.length === 0 ? (
              <p className="text-muted-foreground">Aucune activité pour ce filtre.</p>
            ) : (
              <div className="grid gap-3">
                {activities.map((activity) => (
                  <article key={activity.id} className="border-border rounded-md border p-4">
                    <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                      <div>
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold">{activity.title}</h3>
                          {activity.activityType && (
                            <span className="border-border text-muted-foreground rounded-md border px-2 py-0.5 text-sm font-bold">
                              {activity.activityType.name}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {activity.chapter
                            ? `${activity.chapter.name} · ${activity.chapter.shortCode}`
                            : "Sans chapitre"}
                        </p>
                      </div>
                      <div className="text-muted-foreground flex flex-wrap gap-2 text-sm">
                        <span>{activity.archivedAt ? "Archivée" : "Active"}</span>
                        <span>{formatDuration(activity.estimatedDurationMinutes)}</span>
                      </div>
                    </div>

                    <ArchiveRestoreForm
                      levelId={level.id}
                      contentType="activities"
                      contentId={activity.id}
                      archived={Boolean(activity.archivedAt)}
                    />

                    {!activity.archivedAt && (
                      <details className="mt-4">
                        <summary className="cursor-pointer font-semibold">Modifier</summary>
                        <Form route="activities.update" routeParams={{ levelId: level.id, activityId: activity.id }}>
                          {({ errors, processing }) => (
                            <>
                              <ActivityFields
                                errors={errors}
                                chapters={activeChapters}
                                activityTypes={activityTypes}
                                activity={activity}
                              />
                              <button type="submit" disabled={processing}>
                                Enregistrer
                              </button>
                            </>
                          )}
                        </Form>
                      </details>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold">Chapitres</h2>
              <span className="text-muted-foreground text-sm font-semibold">
                {chapters.length} contenus {archiveFilterLabel}
              </span>
            </div>

            {chapters.length === 0 ? (
              <p className="text-muted-foreground">Aucun chapitre pour ce filtre.</p>
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

                    <ArchiveRestoreForm
                      levelId={level.id}
                      contentType="chapters"
                      contentId={chapter.id}
                      archived={Boolean(chapter.archivedAt)}
                    />

                    {!chapter.archivedAt && (
                      <details className="mt-4">
                        <summary className="cursor-pointer font-semibold">Modifier</summary>
                        <Form route="chapters.update" routeParams={{ levelId: level.id, chapterId: chapter.id }}>
                          {({ errors, processing }) => (
                            <>
                              <ChapterFields errors={errors} themes={activeThemes} chapter={chapter} />
                              <button type="submit" disabled={processing}>
                                Enregistrer
                              </button>
                            </>
                          )}
                        </Form>
                      </details>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between gap-4">
              <h2 className="text-xl font-semibold">Thèmes</h2>
              <span className="text-muted-foreground text-sm font-semibold">
                {themes.length} contenus {archiveFilterLabel}
              </span>
            </div>

            {themes.length === 0 ? (
              <p className="text-muted-foreground">Aucun thème pour ce filtre.</p>
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
                    <ArchiveRestoreForm
                      levelId={level.id}
                      contentType="themes"
                      contentId={theme.id}
                      archived={Boolean(theme.archivedAt)}
                    />
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

function ArchiveFilterLink({
  levelId,
  filter,
  currentFilter,
  children,
}: {
  levelId: string
  filter: TeachingContentArchiveFilter
  currentFilter: TeachingContentArchiveFilter
  children: ReactNode
}) {
  return (
    <Link
      href={`/teaching-content/levels/${levelId}?archiveFilter=${filter}`}
      aria-current={filter === currentFilter ? "page" : undefined}
      className="border-border rounded-md border px-3 py-1.5 text-sm font-semibold"
    >
      {children}
    </Link>
  )
}

function ArchiveRestoreForm({
  levelId,
  contentType,
  contentId,
  archived,
}: {
  levelId: string
  contentType: "themes" | "chapters" | "activities"
  contentId: string
  archived: boolean
}) {
  const action = archived ? "restore" : "archive"
  const renderButton = ({ processing }: { processing: boolean }) => (
    <button type="submit" disabled={processing}>
      {archived ? "Restaurer" : "Archiver"}
    </button>
  )

  if (contentType === "themes") {
    return (
      <Form route={`themes.${action}`} routeParams={{ levelId, themeId: contentId }} className="mt-4">
        {renderButton}
      </Form>
    )
  }

  if (contentType === "chapters") {
    return (
      <Form route={`chapters.${action}`} routeParams={{ levelId, chapterId: contentId }} className="mt-4">
        {renderButton}
      </Form>
    )
  }

  return (
    <Form route={`activities.${action}`} routeParams={{ levelId, activityId: contentId }} className="mt-4">
      {renderButton}
    </Form>
  )
}

function ActivityFields({
  errors,
  chapters,
  activityTypes,
  activity,
}: {
  errors: Record<string, string>
  chapters: TeachingContentPageChapter[]
  activityTypes: TeachingContentPageActivityType[]
  activity?: TeachingContentPageActivity
}) {
  const fieldId = (name: string) => (activity ? `${name}-${activity.id}` : name)

  return (
    <div className="mb-4 grid gap-4">
      <div>
        <label htmlFor={fieldId("title")}>Titre</label>
        <input
          id={fieldId("title")}
          name="title"
          defaultValue={activity?.title}
          maxLength={160}
          data-invalid={errors.title ? "true" : undefined}
          required
        />
        {errors.title && <div>{errors.title}</div>}
      </div>

      <div>
        <label htmlFor={fieldId("activityTypeId")}>Type d’activité</label>
        <select
          id={fieldId("activityTypeId")}
          name="activityTypeId"
          defaultValue={activity?.activityTypeId ?? ""}
          data-invalid={errors.activityTypeId ? "true" : undefined}
          required
        >
          <option value="" disabled>
            Sélectionner un type
          </option>
          {activityTypes.map((activityType) => (
            <option key={activityType.id} value={activityType.id}>
              {activityType.name}
            </option>
          ))}
        </select>
        {errors.activityTypeId && <div>{errors.activityTypeId}</div>}
      </div>

      <div>
        <label htmlFor={fieldId("chapterId")}>Chapitre</label>
        <select
          id={fieldId("chapterId")}
          name="chapterId"
          defaultValue={activity?.chapterId ?? ""}
          data-invalid={errors.chapterId ? "true" : undefined}
        >
          <option value="">Sans chapitre</option>
          {chapters.map((chapter) => (
            <option key={chapter.id} value={chapter.id}>
              {chapter.shortCode} · {chapter.name}
            </option>
          ))}
        </select>
        {errors.chapterId && <div>{errors.chapterId}</div>}
      </div>

      <div>
        <label htmlFor={fieldId("estimatedDurationMinutes")}>Durée estimée</label>
        <input
          id={fieldId("estimatedDurationMinutes")}
          name="estimatedDurationMinutes"
          type="number"
          min={1}
          max={1440}
          defaultValue={activity?.estimatedDurationMinutes ?? ""}
          data-invalid={errors.estimatedDurationMinutes ? "true" : undefined}
        />
        {errors.estimatedDurationMinutes && <div>{errors.estimatedDurationMinutes}</div>}
      </div>

      <div>
        <label htmlFor={fieldId("noteMarkdown")}>Notes</label>
        <textarea
          id={fieldId("noteMarkdown")}
          name="noteMarkdown"
          defaultValue={activity?.noteMarkdown ?? ""}
          maxLength={5000}
          rows={4}
          data-invalid={errors.noteMarkdown ? "true" : undefined}
        />
        {errors.noteMarkdown && <div>{errors.noteMarkdown}</div>}
      </div>
    </div>
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

function formatDuration(durationMinutes: number | null) {
  return durationMinutes ? `${durationMinutes} min` : "Durée non renseignée"
}
