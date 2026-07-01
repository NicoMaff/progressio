type TeachingContentPageProps = {
  level: {
    id: string
    name: string
    shortCode: string
  }
  schoolYear: {
    id: string
    label: string
    subject: string
  }
}

export default function TeachingContentShow({ level, schoolYear }: TeachingContentPageProps) {
  return (
    <section className="flex flex-1 flex-col">
      <header className="border-border flex items-start justify-between gap-6 border-b px-12 py-10">
        <div>
          <p className="text-muted-foreground text-sm font-semibold">
            {schoolYear.label} · {schoolYear.subject}
          </p>
          <h1>Contenus de {level.name}</h1>
        </div>
        <span className="border-border text-muted-foreground min-w-11 flex-none rounded-md border px-2.5 py-1.5 text-center font-bold">
          {level.shortCode}
        </span>
      </header>

      <div className="max-w-3xl px-12 py-10">
        <h2>Référentiel pédagogique</h2>
        <p>Les thèmes, chapitres et activités de ce niveau seront organisés ici.</p>
      </div>
    </section>
  )
}
