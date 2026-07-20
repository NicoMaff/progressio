import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "#atoms/badge"

const meta = {
  title: "Foundations/Atelier cartographique",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

const tokens = [
  { className: "bg-background", label: "Surface ivoire" },
  { className: "bg-card", label: "Carte blanc cassé" },
  { className: "bg-foreground", label: "Encre" },
  { className: "bg-primary", label: "Interaction principale" },
  { className: "bg-border", label: "Bordure" },
  { className: "bg-completed", label: "Terminé" },
  { className: "bg-in-progress", label: "En cours" },
  { className: "bg-alert", label: "Alerte" },
  { className: "bg-interruption", label: "Interruption" },
]

export const VisualFoundation: Story = {
  render: () => (
    <main className="bg-background text-foreground min-h-screen p-8 sm:p-12">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="border-border border-b pb-8">
          <p className="font-annotation text-interruption mb-2 text-2xl" aria-hidden="true">
            repères pour préparer l’année
          </p>
          <h1 className="font-display font-600 text-5xl tracking-tight">Atelier pédagogique cartographique</h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-base">
            Une base éditoriale chaleureuse pour parcourir la progression annuelle sans perdre la précision des
            informations fonctionnelles.
          </p>
        </header>

        <section aria-labelledby="typography-title" className="space-y-5">
          <h2 id="typography-title" className="font-display font-600 text-3xl">
            Typographie
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="border-border bg-card rounded-lg border p-5 shadow-sm">
              <p className="font-display font-600 text-3xl">Newsreader</p>
              <p className="text-muted-foreground mt-2 text-sm">Titres éditoriaux et grands repères uniquement.</p>
            </article>
            <article className="border-border bg-card rounded-lg border p-5 shadow-sm">
              <p className="font-600 text-xl">Public Sans</p>
              <p className="text-muted-foreground mt-2 text-sm">Texte fonctionnel, données et contrôles.</p>
            </article>
            <article className="border-border bg-card rounded-lg border p-5 shadow-sm">
              <p className="font-annotation text-3xl">Caveat, avec parcimonie</p>
              <p className="text-muted-foreground mt-2 text-sm">Annotations décoratives rares, jamais essentielles.</p>
            </article>
          </div>
        </section>

        <section aria-labelledby="colors-title" className="space-y-5">
          <h2 id="colors-title" className="font-display font-600 text-3xl">
            Couleurs sémantiques
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tokens.map((token) => (
              <div key={token.label} className="border-border bg-card flex items-center gap-3 rounded-lg border p-3">
                <span className={`border-border h-10 w-10 rounded-md border ${token.className}`} aria-hidden="true" />
                <span className="font-600 text-sm">{token.label}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            Le vert-de-gris principal signale une action, une sélection ou le focus. Il ne sert pas à identifier un
            niveau ou une classe.
          </p>
        </section>

        <section aria-labelledby="statuses-title" className="space-y-5">
          <h2 id="statuses-title" className="font-display font-600 text-3xl">
            États explicites
          </h2>
          <div className="flex flex-wrap gap-3">
            <Badge tone="completed">
              <span className="i-hugeicons-checkmark-circle-02" aria-hidden="true" /> Terminé
            </Badge>
            <Badge tone="inProgress">
              <span className="i-hugeicons-clock-03" aria-hidden="true" /> En cours
            </Badge>
            <Badge tone="alert">
              <span className="i-hugeicons-alert-02" aria-hidden="true" /> À vérifier
            </Badge>
            <Badge tone="interruption">
              <span className="i-hugeicons-pause-circle" aria-hidden="true" /> Séance interrompue
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Chaque état associe une couleur stable à un libellé et une icône afin de rester compréhensible sans la
            couleur.
          </p>
        </section>
      </div>
    </main>
  ),
}
