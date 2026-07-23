import { Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { urlFor } from "~/client"
import { type InertiaProps } from "~/types"

type PageProps = InertiaProps<{ levels: Data.TeachingContent.TeachingContentPageLevel[] }>

export default function SelectChaptersLevel({ levels }: PageProps) {
  return (
    <section className="w-full p-6 sm:p-9">
      <h1 className="text-7 font-650">Chapitres</h1>
      <p className="mt-2 text-[var(--gray-7)]">Choisissez un niveau pour organiser ses chapitres.</p>
      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {levels.map((level) => (
          <li key={level.id} className="rounded-xl border border-[var(--gray-3)] bg-white p-4">
            <Link href={urlFor("chapters.list", { levelId: level.id })} className="block font-semibold">
              {level.shortCode} · {level.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
