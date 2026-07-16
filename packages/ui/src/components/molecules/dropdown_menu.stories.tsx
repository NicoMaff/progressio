import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "#atoms/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown_menu.js"

const meta = {
  title: "Molecules/DropdownMenu",
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const ClassActions: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Actions de la classe</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Première générale 1</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Ouvrir la progression annuelle détaillée</DropdownMenuItem>
        <DropdownMenuItem>Créer une séance à partir du modèle sélectionné</DropdownMenuItem>
        <DropdownMenuItem disabled>Archiver la classe pendant l’année en cours</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
