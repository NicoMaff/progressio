import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "./button.js"

function CalendarIcon() {
  return <span className="i-hugeicons-calendar-03 h-4 w-4" />
}

function ArrowRightIcon() {
  return <span className="i-hugeicons-arrow-right-02 h-4 w-4" />
}

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
    size: "sm",
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

export const RenderedLink: Story = {
  args: {
    render: <a href="/progression">Ouvrir la progression</a>,
    children: "Ouvrir la progression",
  },
}

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <CalendarIcon />,
    children: "Planifier",
  },
}

export const WithRightIcon: Story = {
  args: {
    rightIcon: <ArrowRightIcon />,
    children: "Continuer",
  },
}
