import type { Meta, StoryObj } from "@storybook/react-vite"
import { Breadcrumb } from "./breadcrumb.js"

const meta = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>

export default meta

type Story = StoryObj<typeof meta>

export const CurrentPage: Story = {
  args: {
    items: [
      { id: "dashboard", label: "Tableau de bord", href: "#dashboard" },
      { id: "level", label: "Première générale", href: "#premiere-generale" },
      { id: "class", label: "Première générale 1", current: true },
    ],
  },
}

export const LongLabels: Story = {
  args: {
    items: [
      { id: "dashboard", label: "Tableau de bord et synthèse annuelle", href: "#dashboard" },
      {
        id: "level",
        label:
          "Première générale — enseignement de spécialité histoire-géographie, géopolitique et sciences politiques",
        href: "#premiere-generale",
      },
      { id: "class", label: "Première générale 1 — groupe du lundi matin", current: true },
    ],
  },
}

export const CustomLinkRenderer: Story = {
  args: {
    items: [
      { id: "dashboard", label: "Tableau de bord", href: "#dashboard" },
      { id: "class", label: "Première générale 1", current: true },
    ],
    renderLink: (item) => <a data-navigation="client" href={item.href} />,
  },
}
