import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Select, type SelectOption } from "./select.js"

const classOptions: SelectOption[] = [
  { value: "5a", label: "5e A" },
  { value: "5b", label: "5e B" },
  { value: "4a", label: "4e A", disabled: true },
]

const meta = {
  title: "Atoms/Select",
  component: Select,
  args: {
    options: classOptions,
    placeholder: "Choisir une classe",
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithInitialValue: Story = {
  args: {
    defaultValue: "5b",
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("5a")

    return <Select {...args} value={value} onValueChange={(nextValue) => setValue(nextValue ?? "")} />
  },
}

export const Empty: Story = {
  args: {
    options: [],
    placeholder: "Aucune classe disponible",
  },
}

export const Invalid: Story = {
  args: {
    "invalid": true,
    "aria-describedby": "class-error",
  },
  render: (args) => (
    <div className="w-80 space-y-2">
      <Select {...args} />
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
}

export const RequiredInNativeForm: Story = {
  args: {
    name: "class",
    required: true,
  },
  render: (args) => (
    <form className="w-80 space-y-3" onSubmit={(event) => event.preventDefault()}>
      <Select {...args} />
      <button type="submit">Enregistrer la séance</button>
    </form>
  ),
}
