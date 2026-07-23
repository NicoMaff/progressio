import { Form, Link } from "@adonisjs/inertia/react"
import { type Data } from "@generated/data"
import { Button, Input } from "@progressio/ui"
import { type InertiaProps } from "~/types"
import { urlFor } from "~/client"

type PageProps = InertiaProps<{
  teachingClass: Data.Organisation.Class
  levels: { id: string; name: string; shortCode: string }[]
}>

export default function EditClass({ teachingClass, levels }: PageProps) {
  return (
    <section className="mx-auto w-full max-w-2xl space-y-7 px-6 py-8">
      <Link href={urlFor("organisation.classes.show")} className="text-primary font-600 text-sm hover:underline">
        ← Classes
      </Link>
      <header>
        <h1 className="font-display font-600 text-4xl">Modifier {teachingClass.name}</h1>
      </header>
      <Form
        route="organisation.classes.update"
        routeParams={{ classId: teachingClass.id }}
        className="border-border bg-card space-y-4 rounded-lg border p-5"
      >
        {({ errors, processing }) => (
          <>
            <label className="font-600 block text-sm">
              Nom
              <Input name="name" defaultValue={teachingClass.name} invalid={Boolean(errors.name)} required />
            </label>
            <label className="font-600 block text-sm">
              Code court
              <Input
                name="shortCode"
                defaultValue={teachingClass.shortCode}
                invalid={Boolean(errors.shortCode)}
                required
              />
            </label>
            <label className="font-600 block text-sm">
              Niveau
              <select name="levelId" defaultValue={teachingClass.levelId}>
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.shortCode} · {level.name}
                  </option>
                ))}
              </select>
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
