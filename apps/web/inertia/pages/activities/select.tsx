import { Link } from "@adonisjs/inertia/react"
import { type InertiaProps } from "~/types"
export default function SelectActivities({
  levels,
}: InertiaProps<{ levels: { id: string; name: string; shortCode: string }[] }>) {
  return (
    <section className="w-full p-6 sm:p-9">
      <h1 className="text-7 font-650">Activités</h1>
      <p className="mt-2 text-[var(--gray-7)]">Choisissez un niveau pour organiser ses activités.</p>
      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {levels.map((level) => (
          <li key={level.id} className="rounded-xl border border-[var(--gray-3)] bg-white p-4">
            <Link href={`/levels/${level.id}/activities`} className="block font-semibold">
              {level.shortCode} · {level.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
