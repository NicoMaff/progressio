import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../atoms/button.js"
import { Tag } from "../atoms/tag.js"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card.js"

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
    <Card className="w-90">
      <CardHeader>
        <CardTitle>Séquence proportionnalité</CardTitle>
        <CardDescription>Classe de 5e A, période 2</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-neutral-600">6 séances prévues</span>
          <Tag tone="blue">Planifié</Tag>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm">
          Ouvrir
        </Button>
      </CardFooter>
    </Card>
  ),
}
