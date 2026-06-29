import type { Meta, StoryObj } from "@storybook/react-vite"
import { Textarea } from "./textarea.js"

const meta = {
  title: "Atoms/Textarea",
  component: Textarea,
  args: {
    placeholder: "Objectifs de la séance",
  },
  argTypes: {
    invalid: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    defaultValue: "Reprendre la notion de proportionnalité puis corriger les exercices préparatoires.",
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
    defaultValue: "Trop court",
  },
}
