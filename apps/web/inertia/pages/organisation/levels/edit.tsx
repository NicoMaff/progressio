import { Form, Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { Button, Input } from "@progressio/ui"
import { type InertiaProps } from "~/types"
import { urlFor } from "~/client"

type PageProps = InertiaProps<{ schoolYear: { label: string; subject: string }; level: Data.Organisation.Level }>

export default function EditLevel({ schoolYear, level }: PageProps) {
  return (
    <section className="mx-auto w-full max-w-2xl space-y-7 px-6 py-8">
      <Link href={urlFor("organisation.levels.show")} className="text-primary font-600 text-sm hover:underline">
        ← Niveaux
      </Link>
      <header>
        <p className="text-muted-foreground">
          {schoolYear.label} · {schoolYear.subject}
        </p>
        <h1 className="font-display font-600 text-4xl">Modifier {level.name}</h1>
      </header>
      <Form
        route="organisation.levels.update"
        routeParams={{ levelId: level.id }}
        className="border-border bg-card space-y-4 rounded-lg border p-5"
      >
        {({ errors, processing }) => (
          <>
            <label className="font-600 block text-sm">
              Nom
              <Input name="name" defaultValue={level.name} invalid={Boolean(errors.name)} required />
            </label>
            <label className="font-600 block text-sm">
              Code court
              <Input name="shortCode" defaultValue={level.shortCode} invalid={Boolean(errors.shortCode)} required />
            </label>
            <Button type="submit" disabled={processing}>
              Enregistrer
            </Button>
          </>
        )}
      </Form>
    </section>
  )
}
