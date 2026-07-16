import type { Meta, StoryObj } from "@storybook/react-vite"
import { Checkbox } from "./checkbox.js"

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  args: {
    "aria-label": "Séance confirmée",
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

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithLongLabel: Story = {
  render: () => (
    <label className="text-foreground flex max-w-lg cursor-pointer items-start gap-3 text-sm">
      <Checkbox className="mt-0.5 shrink-0" />
      <span>Confirmer que le bilan de cette séance reflète bien la progression réellement constatée en classe.</span>
    </label>
  ),
}
