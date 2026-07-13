import type { Meta, StoryObj } from "@storybook/react-vite"
import { ProgressionChronologyEntry } from "./progression_chronology_entry.js"

const meta = {
  title: "Organisms/ProgressionChronologyEntry",
  component: ProgressionChronologyEntry,
  args: {
    dateLabel: "12 novembre 2026",
    kind: "planned",
    title: "Équations du premier degré",
  },
} satisfies Meta<typeof ProgressionChronologyEntry>

export default meta

type Story = StoryObj<typeof meta>

export const PlannedSessionWithActuals: Story = {
  args: {
    actualSessions: [
      { id: "actual-1", label: "12 novembre · 55 min", detail: "Cours et exercices guidés" },
      { id: "actual-2", label: "14 novembre · 30 min", detail: "Fin des exercices" },
    ],
    dateLabel: "12 novembre 2026",
    dateTime: "2026-11-12",
    detail: "Chapitre 3 · Résoudre et vérifier une équation",
    kind: "planned",
    outcomeLabel: "Partiellement réalisée",
    outcomeTone: "amber",
    title: "Équations du premier degré",
  },
  render: (args) => <ProgressionChronologyEntry {...args} className="w-[min(44rem,92vw)]" />,
}

export const UnplannedActualSession: Story = {
  args: {
    dateLabel: "18 novembre 2026",
    dateTime: "2026-11-18",
    detail: "Reprise collective après une évaluation formative.",
    kind: "unplannedActual",
    outcomeLabel: "Travail improvisé",
    outcomeTone: "blue",
    title: "Remédiation sur les équations",
  },
  render: (args) => <ProgressionChronologyEntry {...args} className="w-[min(44rem,92vw)]" />,
}
