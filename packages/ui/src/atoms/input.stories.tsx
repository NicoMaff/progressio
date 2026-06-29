import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input } from "./input.js"

const meta = {
  title: "Atoms/Input",
  component: Input,
  args: {
    placeholder: "Nom de la classe",
  },
  argTypes: {
    invalid: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = {
  args: {
    defaultValue: "5e A",
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
    defaultValue: "Classe sans niveau",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Archivé",
  },
}
