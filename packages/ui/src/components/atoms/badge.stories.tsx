import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "./badge.js"

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  args: {
    children: "À planifier",
    tone: "neutral",
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["neutral", "primary", "completed", "inProgress", "alert", "interruption"],
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SemanticStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
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
  ),
}
