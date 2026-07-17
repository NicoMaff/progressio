import { Icon } from "@progressio/ui"

export default function NoWorkFile() {
  return (
    <section className="flex min-h-full items-center justify-center p-6 md:p-9">
      <div className="border-border bg-card w-full max-w-2xl border border-dashed p-8 text-center shadow-sm md:p-12">
        <div className="bg-accent text-accent-foreground mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <Icon name="info" size="lg" />
        </div>
        <p className="font-600 text-primary mt-6 text-sm tracking-[0.12em] uppercase">État de l’application</p>
        <h1 className="font-display text-foreground mt-3 text-4xl md:text-5xl">Aucun Work File ouvert</h1>
        <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-base md:text-lg">
          Aucun Work File n’est configuré au démarrage. Ouvrez un fichier de travail pour retrouver votre année
          scolaire, vos contenus et votre planification.
        </p>
        <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-sm">
          Les destinations de planification restent indisponibles tant qu’aucun Work File n’est ouvert.
        </p>
      </div>
    </section>
  )
}
