import { Form } from "@adonisjs/inertia/react"
import { useMemo, useState } from "react"
import { type InertiaProps } from "~/types"
type Activity = {
  id: string
  title: string
  chapterId: string | null
  chapter: { name: string; shortCode: string } | null
  activityType: { name: string; color: string | null } | null
  estimatedDurationMinutes: number | null
  displayOrder: number | null
}
type Props = InertiaProps<{
  schoolYear: { label: string; subject: string }
  level: { id: string; name: string; shortCode: string }
  chapters: { id: string; name: string; shortCode: string }[]
  activities: Activity[]
}>
export default function ListActivities({ schoolYear, level, activities }: Props) {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<string[]>([])
  const visible = useMemo(
    () => activities.filter((activity) => activity.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())),
    [activities, search]
  )
  function toggle(id: string) {
    setSelected((current) => (current.includes(id) ? current.filter((value) => value !== id) : [...current, id]))
  }
  return (
    <section className="w-full p-6 sm:p-9">
      <header>
        <p className="text-sm font-semibold text-[var(--gray-7)] uppercase">
          {schoolYear.label} · {schoolYear.subject} · {level.shortCode}
        </p>
        <h1 className="text-7 font-650 mt-1">Activités de {level.name}</h1>
      </header>
      <input
        className="mt-6"
        aria-label="Rechercher une activité"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value)
          setSelected([])
        }}
        placeholder="Rechercher"
      />
      {selected.length > 0 && (
        <Form action={`/levels/${level.id}/activities/bulk`} method="put" className="mt-4 flex gap-2">
          <input type="hidden" name="action" value="archive" />
          {selected.map((id) => (
            <input key={id} type="hidden" name="activityIds" value={id} />
          ))}
          <button type="submit">Archiver la sélection</button>
        </Form>
      )}
      <table className="mt-5 w-full">
        <thead>
          <tr>
            <th>
              <span className="sr-only">Sélection</span>
            </th>
            <th>Activité</th>
            <th>Chapitre</th>
            <th>Type</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((activity) => (
            <tr key={activity.id}>
              <td>
                <input
                  aria-label={`Sélectionner ${activity.title}`}
                  type="checkbox"
                  checked={selected.includes(activity.id)}
                  onChange={() => toggle(activity.id)}
                />
              </td>
              <td>{activity.title}</td>
              <td>{activity.chapter ? `${activity.chapter.shortCode} · ${activity.chapter.name}` : "Sans chapitre"}</td>
              <td>{activity.activityType?.name ?? "—"}</td>
              <td>{activity.estimatedDurationMinutes ? `${activity.estimatedDurationMinutes} min` : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
