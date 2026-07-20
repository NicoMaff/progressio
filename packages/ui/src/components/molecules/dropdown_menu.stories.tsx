import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "#atoms/button"
import { DropdownMenu } from "./dropdown_menu.js"

const meta = {
  title: "Molecules/DropdownMenu",
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const ClassActions: Story = {
  args: {
    actions: [
      { id: "open", label: "Ouvrir la progression annuelle détaillée" },
      { id: "create", label: "Créer une séance à partir du modèle sélectionné" },
      {
        disabled: true,
        id: "archive",
        label: "Archiver la classe pendant l’année en cours",
        separatorBefore: true,
        tone: "destructive",
      },
    ],
    align: "end",
    trigger: <Button variant="secondary">Actions de la classe</Button>,
  },
}
