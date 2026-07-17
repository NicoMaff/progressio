import type { Meta, StoryObj } from "@storybook/react-vite"
import { Icon } from "./icon.js"

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  args: {
    name: "calendar",
    size: "md",
  },
  argTypes: {
    name: {
      control: "select",
      options: ["arrowRight", "calendar", "check", "chevronDown", "close", "info", "search"],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Set: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-neutral-700">
      <Icon name="arrowRight" />
      <Icon name="calendar" />
      <Icon name="search" />
      <Icon name="info" />
      <Icon name="check" />
      <Icon name="chevronDown" />
      <Icon name="close" />
    </div>
  ),
}
