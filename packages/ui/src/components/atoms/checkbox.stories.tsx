import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Checkbox } from "./checkbox.js"

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  args: {
    children: "Séance confirmée",
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true)

    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

export const Invalid: Story = {
  args: {
    "invalid": true,
    "aria-describedby": "confirmation-error",
  },
  render: (args) => (
    <div className="space-y-2">
      <Checkbox {...args} />
      <p id="confirmation-error" className="text-alert text-sm">
        Confirmez la séance avant de continuer.
      </p>
    </div>
  ),
}

export const Required: Story = {
  args: {
    name: "confirmed",
    required: true,
    children: "Je confirme que le bilan reflète la séance réalisée.",
  },
}
