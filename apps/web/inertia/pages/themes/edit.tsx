import { Form, Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { ThemeFields } from "~/components/theme_fields"
import { type InertiaProps } from "~/types"

type PageProps = InertiaProps<{ level: { id: string; name: string }; theme: Data.Themes.ThemeWorkspace }>

export default function EditTheme({ level, theme }: PageProps) {
  return (
    <section className="mx-auto max-w-3xl p-6 sm:p-9">
      <Link href={`/levels/${level.id}/themes`} className="text-sm font-semibold text-[var(--blue-8)]">
        ← Retour aux thèmes
      </Link>
      <h1 className="text-7 font-650 mt-5">Modifier {theme.name}</h1>
      <Form
        className="mt-7 rounded-xl border border-[var(--gray-3)] bg-white p-6"
        route="themes.update"
        routeParams={{ levelId: level.id, themeId: theme.id }}
      >
        {({ errors, processing }) => (
          <>
            <ThemeFields errors={errors} theme={theme} />
            <button className="mt-5" type="submit" disabled={processing}>
              Enregistrer
            </button>
          </>
        )}
      </Form>
    </section>
  )
}
