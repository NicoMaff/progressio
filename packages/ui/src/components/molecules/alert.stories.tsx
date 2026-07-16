import type { Meta, StoryObj } from "@storybook/react-vite"
import { Alert, AlertDescription, AlertTitle } from "./alert.js"

const meta = {
  title: "Molecules/Alert",
  component: Alert,
  args: {
    tone: "information",
  },
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const States: Story = {
  render: () => (
    <div className="grid w-[min(42rem,90vw)] gap-4">
      <Alert tone="completed">
        <span className="i-hugeicons-checkmark-circle-02" aria-hidden="true" />
        <AlertTitle>Sauvegarde terminée</AlertTitle>
        <AlertDescription>Le fichier de travail a été sauvegardé avant la modification.</AlertDescription>
      </Alert>
      <Alert tone="warning">
        <span className="i-hugeicons-alert-02" aria-hidden="true" />
        <AlertTitle>Suivi à compléter</AlertTitle>
        <AlertDescription>
          Trois séances planifiées depuis plus de deux semaines ne possèdent pas encore de bilan confirmé.
        </AlertDescription>
      </Alert>
      <Alert tone="destructive" role="alert">
        <span className="i-hugeicons-cancel-circle" aria-hidden="true" />
        <AlertTitle>Impossible d’enregistrer</AlertTitle>
        <AlertDescription>Vérifiez les champs signalés puis essayez à nouveau.</AlertDescription>
      </Alert>
    </div>
  ),
}
