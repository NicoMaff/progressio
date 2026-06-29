import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tag } from "./tag.js"

const meta = {
  title: "Atoms/Tag",
  component: Tag,
  args: {
    children: "Prévu",
    tone: "neutral",
  },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["neutral", "blue", "green", "amber", "red"],
    },
  },
} satisfies Meta<typeof Tag>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag tone="neutral">Brouillon</Tag>
      <Tag tone="blue">Planifié</Tag>
      <Tag tone="green">Validé</Tag>
      <Tag tone="amber">À revoir</Tag>
      <Tag tone="red">Conflit</Tag>
    </div>
  ),
}
