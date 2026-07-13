import type { Meta, StoryObj } from "@storybook/react-vite"
import { buttonVariants } from "#atoms/button"
import { EmptyState } from "./empty_state.js"

const meta = {
  title: "Molecules/EmptyState",
  component: EmptyState,
  args: {
    title: "Aucune classe dans ce niveau",
    description: "Ajoutez une classe pour commencer à suivre sa progression.",
  },
} satisfies Meta<typeof EmptyState>

export default meta

type Story = StoryObj<typeof meta>

export const LevelWithoutClasses: Story = {
  render: (args) => (
    <EmptyState
      {...args}
      className="w-[min(38rem,90vw)]"
      action={
        <a className={buttonVariants({ size: "sm", variant: "secondary" })} href="#contenus">
          Ouvrir les contenus pédagogiques
        </a>
      }
    />
  ),
}

export const ClassWithoutPlanning: Story = {
  args: {
    title: "Progression à planifier",
    description: "Cette classe ne contient encore aucune séance prévue pour l’année scolaire.",
  },
  render: (args) => <EmptyState {...args} className="w-[min(38rem,90vw)]" />,
}
