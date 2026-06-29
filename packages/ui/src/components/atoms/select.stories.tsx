import type { Meta, StoryObj } from "@storybook/react-vite"
import { Select, SelectItem } from "./select.js"

const meta = {
  title: "Atoms/Select",
  component: Select,
  args: {
    placeholder: "Choisir une classe",
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectItem value="5a">5e A</SelectItem>
      <SelectItem value="5b">5e B</SelectItem>
      <SelectItem value="4a">4e A</SelectItem>
    </Select>
  ),
}

export const WithValue: Story = {
  render: (args) => (
    <Select {...args} defaultValue="5b">
      <SelectItem value="5a">5e A</SelectItem>
      <SelectItem value="5b">5e B</SelectItem>
      <SelectItem value="4a">4e A</SelectItem>
    </Select>
  ),
}
