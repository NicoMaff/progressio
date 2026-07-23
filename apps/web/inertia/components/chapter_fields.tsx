type Chapter = { id: string; name: string; shortCode: string; themeId: string | null; noteMarkdown: string | null }
type Theme = { id: string; name: string; shortCode: string }

export function ChapterFields({
  errors,
  themes,
  chapter,
}: {
  errors: Record<string, string>
  themes: Theme[]
  chapter?: Chapter
}) {
  const fieldId = (name: string) => (chapter ? `${name}-${chapter.id}` : name)
  return (
    <div className="grid gap-4">
      <label htmlFor={fieldId("name")}>
        Nom
        <input id={fieldId("name")} name="name" defaultValue={chapter?.name} maxLength={120} required />
        {errors.name && <span>{errors.name}</span>}
      </label>
      <label htmlFor={fieldId("shortCode")}>
        Code court
        <input id={fieldId("shortCode")} name="shortCode" defaultValue={chapter?.shortCode} maxLength={24} required />
        {errors.shortCode && <span>{errors.shortCode}</span>}
      </label>
      <label htmlFor={fieldId("themeId")}>
        Thème
        <select id={fieldId("themeId")} name="themeId" defaultValue={chapter?.themeId ?? ""}>
          <option value="">Sans thème</option>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.shortCode} · {theme.name}
            </option>
          ))}
        </select>
        {errors.themeId && <span>{errors.themeId}</span>}
      </label>
      <label htmlFor={fieldId("noteMarkdown")}>
        Notes
        <textarea
          id={fieldId("noteMarkdown")}
          name="noteMarkdown"
          defaultValue={chapter?.noteMarkdown ?? ""}
          maxLength={5000}
          rows={4}
        />
        {errors.noteMarkdown && <span>{errors.noteMarkdown}</span>}
      </label>
    </div>
  )
}
