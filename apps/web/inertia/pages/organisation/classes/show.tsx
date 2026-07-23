import { Form, Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { type InertiaProps } from "~/types"
import { urlFor } from "~/client"
import { Button, EmptyState, Input } from "@progressio/ui"

type PageProps = InertiaProps<{
  schoolYear: { label: string; subject: string }
  levels: Data.Organisation.Level[]
  selectedLevel: Data.Organisation.Level | null
  classes: Data.Organisation.Class[]
}>

export default function ClassesIndex({ schoolYear, levels, selectedLevel, classes }: PageProps) {
  if (!selectedLevel) {
    return (
      <section className="mx-auto w-full max-w-4xl space-y-8 px-6 py-8 md:px-10">
        <header className="space-y-2">
          <p className="text-primary font-700 text-xs tracking-[0.18em] uppercase">Organisation</p>
          <h1 className="font-display text-foreground font-600 text-4xl">Classes</h1>
          <p className="text-muted-foreground">{schoolYear.label} · choisissez un niveau avant toute modification.</p>
        </header>
        <nav aria-label="Choisir un niveau" className="grid gap-3 sm:grid-cols-2">
          {levels.map((level) => (
            <Button
              key={level.id}
              render={<Link href={urlFor("organisation.classes.show", undefined, { qs: { level: level.id } })} />}
              variant="outline"
            >
              {level.shortCode} · {level.name}
            </Button>
          ))}
        </nav>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 px-6 py-8 md:px-10">
      <header className="space-y-2">
        <p className="text-primary font-700 text-xs tracking-[0.18em] uppercase">
          Organisation · {selectedLevel.shortCode}
        </p>
        <h1 className="font-display text-foreground font-600 text-4xl">Classes de {selectedLevel.name}</h1>
        <p className="text-muted-foreground">{schoolYear.label} · le niveau sélectionné est visible dans l’URL.</p>
      </header>
      <nav aria-label="Choisir un niveau" className="flex flex-wrap gap-2">
        {levels.map((level) => (
          <Button
            key={level.id}
            render={<Link href={urlFor("organisation.classes.show", undefined, { qs: { level: level.id } })} />}
            variant={level.id === selectedLevel.id ? "default" : "outline"}
            size="sm"
          >
            {level.shortCode}
          </Button>
        ))}
      </nav>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-labelledby="classes-list-heading" className="space-y-3">
          <h2 id="classes-list-heading" className="font-display font-600 text-2xl">
            Classes
          </h2>
          {classes.length === 0 ? (
            <EmptyState title="Aucune classe" description="Ajoutez une classe à ce niveau." />
          ) : null}
          {classes.map((teachingClass) => (
            <article
              key={teachingClass.id}
              className="border-border bg-card flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="text-muted-foreground font-700 text-xs tracking-wide uppercase">
                  {teachingClass.shortCode}
                </p>
                <h3 className="font-600 text-lg">{teachingClass.name}</h3>
              </div>
              <Button
                render={<Link href={urlFor("planning.progression_view", { classId: teachingClass.id })} />}
                variant="ghost"
                size="sm"
              >
                Ouvrir la progression
              </Button>
              <details>
                <summary className="text-primary font-600 cursor-pointer text-sm">Actions</summary>
                <Link
                  className="text-primary mt-2 block text-sm hover:underline"
                  href={urlFor("organisation.classes.edit", { classId: teachingClass.id })}
                >
                  Modifier
                </Link>
              </details>
            </article>
          ))}
        </section>
        <aside className="border-border bg-card rounded-lg border p-5" aria-labelledby="create-class-heading">
          <h2 id="create-class-heading" className="font-display font-600 text-xl">
            Nouvelle classe
          </h2>
          <Form route="organisation.classes.create" className="mt-4 space-y-4">
            {({ errors, processing }) => (
              <>
                <input name="levelId" type="hidden" value={selectedLevel.id} />
                <label className="font-600 block text-sm" htmlFor="class-name">
                  Nom
                  <Input id="class-name" name="name" required invalid={Boolean(errors.name)} />
                </label>
                <label className="font-600 block text-sm" htmlFor="class-short-code">
                  Code court
                  <Input id="class-short-code" name="shortCode" required invalid={Boolean(errors.shortCode)} />
                </label>
                <Button type="submit" disabled={processing}>
                  Créer la classe
                </Button>
              </>
            )}
          </Form>
        </aside>
      </div>
    </section>
  )
}
