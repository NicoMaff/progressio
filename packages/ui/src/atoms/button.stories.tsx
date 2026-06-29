import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button.js"

const meta = {
  title: "Atoms/Button",
  component: Button,
  args: {
    children: "Planifier",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "ghost"],
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: "primary",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
