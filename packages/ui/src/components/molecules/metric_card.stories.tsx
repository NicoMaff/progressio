import type { Meta, StoryObj } from "@storybook/react-vite"
import { MetricCard } from "./metric_card.js"

const meta = {
  title: "Molecules/MetricCard",
  component: MetricCard,
  args: {
    label: "Séances prévues à date",
    value: "48",
  },
} satisfies Meta<typeof MetricCard>

export default meta

type Story = StoryObj<typeof meta>

export const AnnualIndicators: Story = {
  render: () => (
    <div className="grid w-[min(56rem,90vw)] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard label="Classes suivies" value="6" description="3 niveaux" />
      <MetricCard
        label="Séances prévues à date"
        value="48"
        description="Les séances futures sont exclues"
        tone="blue"
      />
      <MetricCard label="Séances réalisées" value="39" description="Bilans confirmés" tone="green" />
      <MetricCard label="Suivis à compléter" value="4" description="3 sans bilan · 1 à revoir" tone="amber" />
    </div>
  ),
}
