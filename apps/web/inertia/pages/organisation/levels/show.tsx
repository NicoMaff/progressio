import { Form, Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { type InertiaProps } from "~/types"
import { urlFor } from "~/client"
import { Button, EmptyState, Input } from "@progressio/ui"

type PageProps = InertiaProps<{ schoolYear: { label: string; subject: string }; levels: Data.Organisation.Level[] }>

export default function LevelsIndex({ schoolYear, levels }: PageProps) {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 px-6 py-8 md:px-10">
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div className="space-y-2">
          <p className="text-primary font-700 text-xs tracking-[0.18em] uppercase">Organisation</p>
          <h1 className="font-display text-foreground font-600 text-4xl">Niveaux</h1>
          <p className="text-muted-foreground">
            {schoolYear.label} · {schoolYear.subject}
          </p>
        </div>
        <Link className="text-primary font-600 text-sm hover:underline" href={urlFor("organisation.classes.show")}>
          Gérer les classes
        </Link>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-labelledby="levels-list-heading" className="space-y-3">
          <h2 id="levels-list-heading" className="font-display font-600 text-2xl">
            Niveaux de l’année
          </h2>
          {levels.length === 0 ? (
            <EmptyState title="Aucun niveau" description="Créez un niveau pour organiser les classes." />
          ) : null}
          {levels.map((level) => (
            <article
              key={level.id}
              className="border-border bg-card flex flex-wrap items-center justify-between gap-4 rounded-lg border p-4"
            >
              <div>
                <p className="text-muted-foreground font-700 text-xs tracking-wide uppercase">{level.shortCode}</p>
                <h3 className="font-600 text-lg">{level.name}</h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground text-sm">
                  {level.classCount} classe{level.classCount > 1 ? "s" : ""}
                </span>
                <Button
                  render={<Link href={urlFor("organisation.classes.show", undefined, { qs: { level: level.id } })} />}
                  variant="outline"
                  size="sm"
                >
                  Voir les classes
                </Button>
                <details>
                  <summary className="text-primary font-600 cursor-pointer text-sm">Actions</summary>
                  <Link
                    className="text-primary mt-2 block text-sm hover:underline"
                    href={urlFor("organisation.levels.edit", { levelId: level.id })}
                  >
                    Modifier
                  </Link>
                </details>
              </div>
            </article>
          ))}
        </section>
        <aside className="border-border bg-card rounded-lg border p-5" aria-labelledby="create-level-heading">
          <h2 id="create-level-heading" className="font-display font-600 text-xl">
            Nouveau niveau
          </h2>
          <Form route="organisation.levels.create" className="mt-4 space-y-4">
            {({ errors, processing }) => (
              <>
                <label className="font-600 block text-sm" htmlFor="level-name">
                  Nom
                  <Input id="level-name" name="name" required invalid={Boolean(errors.name)} />
                </label>
                <label className="font-600 block text-sm" htmlFor="level-short-code">
                  Code court
                  <Input id="level-short-code" name="shortCode" required invalid={Boolean(errors.shortCode)} />
                </label>
                <Button type="submit" disabled={processing}>
                  Créer le niveau
                </Button>
              </>
            )}
          </Form>
        </aside>
      </div>
    </section>
  )
}
