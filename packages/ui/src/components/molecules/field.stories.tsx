import type { Meta, StoryObj } from "@storybook/react-vite"
import { Checkbox } from "#atoms/checkbox"
import { Input } from "#atoms/input"
import { Select } from "#atoms/select"
import { Textarea } from "#atoms/textarea"
import { Field } from "./field.js"

const meta = {
  title: "Molecules/Field",
  component: Field,
} satisfies Meta<typeof Field>

export default meta

type Story = StoryObj<typeof meta>

export const TextField: Story = {
  args: { children: <Input /> },
  render: () => (
    <Field label="Nom de la classe" description="Ce nom sera visible dans votre planning.">
      <Input name="className" placeholder="Par exemple : 5e A" required />
    </Field>
  ),
}

export const InvalidTextArea: Story = {
  args: { children: <Textarea /> },
  render: () => (
    <Field label="Objectifs de la séance" error="Décrivez au moins un objectif pédagogique.">
      <Textarea name="objectives" defaultValue="Révision" />
    </Field>
  ),
}

export const SelectField: Story = {
  args: { children: <Select options={[]} /> },
  render: () => (
    <Field label="Classe" description="Choisissez la classe concernée par cette séance.">
      <Select
        name="class"
        options={[
          { value: "5a", label: "5e A" },
          { value: "5b", label: "5e B" },
        ]}
        placeholder="Choisir une classe"
      />
    </Field>
  ),
}

export const CheckboxField: Story = {
  args: { children: <Checkbox /> },
  render: () => (
    <Field error="La confirmation est requise.">
      <Checkbox name="confirmed">Je confirme que le bilan reflète la séance réalisée.</Checkbox>
    </Field>
  ),
}
