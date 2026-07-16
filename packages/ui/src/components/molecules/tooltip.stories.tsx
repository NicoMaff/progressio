import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "#atoms/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip.js"

const meta = {
  title: "Molecules/Tooltip",
  component: Tooltip,
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const IconOnlyAction: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" aria-label="Créer une nouvelle séance planifiée">
            <span className="i-hugeicons-add-01" aria-hidden="true" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Créer une nouvelle séance planifiée</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
