import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "#atoms/button"
import { Badge } from "#atoms/badge"
import { Card } from "./card.js"

const meta = {
  title: "Molecules/Card",
  component: Card,
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Card
      className="w-90"
      footer={
        <Button variant="secondary" size="sm">
          Ouvrir
        </Button>
      }
      header={{
        title: "Séquence proportionnalité",
        description: "Classe de 5e A, période 2",
      }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-neutral-600">6 séances prévues</span>
          <Badge tone="blue">Planifié</Badge>
        </div>
      </div>
    </Card>
  ),
}
