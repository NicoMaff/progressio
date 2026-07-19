import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "#atoms/button"
import { Tooltip } from "./tooltip.js"

const meta = {
  title: "Molecules/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const IconOnlyAction: Story = {
  args: {
    content: "Créer une nouvelle séance planifiée",
    trigger: <button type="button">Créer</button>,
  },
  render: () => (
    <Tooltip
      content="Créer une nouvelle séance planifiée"
      trigger={
        <Button size="icon" variant="ghost" aria-label="Créer une nouvelle séance planifiée">
          <span className="i-hugeicons-add-01" aria-hidden="true" />
        </Button>
      }
    />
  ),
}
