import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "#atoms/badge"
import { Table, type TableColumn } from "./table.js"

type AnnualProgressRow = {
  id: string
  classLabel: string
  completedSessionCount: number
  progressLabel: string
  tone: "completed" | "inProgress"
}

const rows: AnnualProgressRow[] = [
  {
    id: "premiere-generale-1",
    classLabel: "Première générale 1",
    completedSessionCount: 39,
    progressLabel: "Étude approfondie des fonctions exponentielles et de leurs applications",
    tone: "completed",
  },
  {
    id: "premiere-generale-2",
    classLabel: "Première générale 2",
    completedSessionCount: 35,
    progressLabel: "Probabilités conditionnelles",
    tone: "inProgress",
  },
]

const columns = [
  { id: "class", label: "Classe", render: (row) => <span className="font-600">{row.classLabel}</span> },
  { id: "progress", label: "Dernière séquence travaillée", render: (row) => row.progressLabel },
  {
    id: "status",
    label: "État",
    render: (row) => (
      <Badge tone={row.tone}>
        <span
          className={row.tone === "completed" ? "i-hugeicons-checkmark-circle-02" : "i-hugeicons-clock-03"}
          aria-hidden="true"
        />
        {row.tone === "completed" ? "À jour" : "En cours"}
      </Badge>
    ),
  },
  {
    id: "completedSessions",
    label: "Séances réalisées",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (row) => row.completedSessionCount,
  },
] satisfies TableColumn<AnnualProgressRow>[]

const meta = {
  title: "Molecules/Table",
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const AnnualProgress: Story = {
  render: () => (
    <div className="w-[min(58rem,92vw)]">
      <Table caption="Progression arrêtée au 16 juillet 2026." columns={columns} rows={rows} />
    </div>
  ),
}
