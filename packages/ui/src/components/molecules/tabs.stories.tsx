import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Tabs } from "./tabs.js"

const tabs = [
  {
    id: "overview",
    label: "Vue d’ensemble",
    content: "Les repères essentiels de la progression annuelle.",
  },
  {
    id: "follow-up",
    label: "Suivi de progression détaillé",
    content: "Écarts entre la progression planifiée et la progression constatée.",
  },
  {
    id: "interruptions",
    label: "Interruptions et ajustements",
    content: "Les interruptions seront renseignées ici.",
    disabled: true,
  },
]

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const InitialSelection: Story = {
  args: {
    className: "w-[min(46rem,90vw)]",
    tabs,
    defaultValue: "follow-up",
  },
}

export const Controlled: Story = {
  args: {
    tabs,
  },
  render: () => {
    const [value, setValue] = useState("overview")

    return <Tabs tabs={tabs} value={value} onValueChange={setValue} />
  },
}

export const RenderedPanels: Story = {
  args: {
    tabs,
    defaultValue: "overview",
    renderPanel: (tab) => <div className="border-border bg-card rounded-lg border p-5">{tab.content}</div>,
  },
}
