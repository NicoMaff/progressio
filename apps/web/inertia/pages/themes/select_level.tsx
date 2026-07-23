import { Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { type InertiaProps } from "~/types"

type PageProps = InertiaProps<{ levels: Data.TeachingContent.TeachingContentPageLevel[] }>

export default function SelectThemesLevel({ levels }: PageProps) {
  return (
    <section className="mx-auto max-w-3xl p-6 sm:p-9">
      <p className="text-sm font-semibold text-[var(--gray-7)] uppercase">Contenus</p>
      <h1 className="text-7 font-650 mt-2">Choisir un niveau</h1>
      <p className="mt-3 text-[var(--gray-7)]">Sélectionnez le niveau dont vous souhaitez organiser les thèmes.</p>
      <ul className="mt-7 grid gap-3">
        {levels.map((level) => (
          <li key={level.id}>
            <Link
              href={`/levels/${level.id}/themes`}
              className="flex items-center justify-between rounded-xl border border-[var(--gray-3)] bg-white px-5 py-4 font-semibold hover:border-[var(--blue-7)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--blue-7)]"
            >
              <span>{level.name}</span>
              <span className="text-sm text-[var(--gray-7)]">{level.shortCode}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
