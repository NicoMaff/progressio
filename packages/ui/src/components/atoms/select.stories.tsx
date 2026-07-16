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

export const Invalid: Story = {
  args: {
    "invalid": true,
    "aria-describedby": "class-error",
  },
  render: (args) => (
    <div className="w-80 space-y-2">
      <Select {...args}>
        <SelectItem value="5a">5e A</SelectItem>
      </Select>
      <p id="class-error" className="text-alert text-sm">
        Sélectionnez une classe pour continuer.
      </p>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Aucune classe disponible pour cette année scolaire",
  },
  render: (args) => <Select {...args} className="w-96" />,
}
