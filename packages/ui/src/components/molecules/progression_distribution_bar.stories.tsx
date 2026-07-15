import type { Meta, StoryObj } from "@storybook/react-vite"
import { ProgressionDistributionBar } from "./progression_distribution_bar.js"

const meta = {
  title: "Molecules/ProgressionDistributionBar",
  component: ProgressionDistributionBar,
  args: {
    segments: [
      { label: "Réalisées", tone: "realized", value: 24 },
      { label: "Partielles", tone: "partial", value: 4 },
      { label: "Décalées", tone: "shifted", value: 2 },
      { label: "Annulées", tone: "cancelled", value: 1 },
      { label: "À rattraper", tone: "toCatchUp", value: 3 },
    ],
  },
} satisfies Meta<typeof ProgressionDistributionBar>

export default meta

type Story = StoryObj<typeof meta>

export const OutcomeCategories: Story = {
  render: (args) => <ProgressionDistributionBar {...args} className="w-[min(42rem,90vw)]" />,
}

export const NoOutcomeYet: Story = {
  args: {
    segments: [
      { label: "Réalisées", tone: "realized", value: 0 },
      { label: "Partielles", tone: "partial", value: 0 },
      { label: "Décalées", tone: "shifted", value: 0 },
      { label: "Annulées", tone: "cancelled", value: 0 },
      { label: "À rattraper", tone: "toCatchUp", value: 0 },
    ],
  },
  render: (args) => <ProgressionDistributionBar {...args} className="w-[min(42rem,90vw)]" />,
}
