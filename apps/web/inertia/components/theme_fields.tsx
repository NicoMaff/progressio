import { type Data } from "@generated/data"

export type ThemeWorkspace = Data.Themes.ThemeWorkspace

export function ThemeFields({ errors, theme }: { errors: Record<string, string>; theme?: ThemeWorkspace }) {
  const fieldId = (name: string) => (theme ? `${name}-${theme.id}` : name)

  return (
    <div className="grid gap-4">
      <label htmlFor={fieldId("name")}>
        Nom
        <input id={fieldId("name")} name="name" defaultValue={theme?.name} maxLength={120} required />
        {errors.name ? <span>{errors.name}</span> : null}
      </label>
      <label htmlFor={fieldId("shortCode")}>
        Code court
        <input id={fieldId("shortCode")} name="shortCode" defaultValue={theme?.shortCode} maxLength={24} required />
        {errors.shortCode ? <span>{errors.shortCode}</span> : null}
      </label>
      <label htmlFor={fieldId("color")}>
        Couleur
        <input id={fieldId("color")} name="color" type="color" defaultValue={theme?.color ?? "#6B7280"} />
      </label>
      <label htmlFor={fieldId("noteMarkdown")}>
        Notes
        <textarea
          id={fieldId("noteMarkdown")}
          name="noteMarkdown"
          defaultValue={theme?.noteMarkdown ?? ""}
          maxLength={5000}
          rows={5}
        />
      </label>
    </div>
  )
}
