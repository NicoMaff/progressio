import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Button } from "#atoms/button"
import { Modal } from "./modal.js"

const meta = {
  title: "Molecules/Modal",
  component: Modal,
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    actions: [
      { id: "cancel", label: "Annuler", type: "cancel" },
      { id: "confirm", label: "Créer la sauvegarde", type: "confirm" },
    ],
    children: <p className="text-sm">Vous pourrez continuer à travailler pendant la création de la sauvegarde.</p>,
    description: "Une copie datée du fichier de travail sera créée avant l'opération.",
    title: "Créer une sauvegarde",
    trigger: <Button>Ouvrir</Button>,
  },
}

export const Controlled: Story = {
  args: {
    actions: [],
    title: "",
    trigger: <Button>Ouvrir</Button>,
  },
  render: function ControlledModal() {
    const [open, setOpen] = useState(false)

    return (
      <Modal
        actions={[
          { id: "cancel", label: "Annuler", type: "cancel" },
          { id: "confirm", label: "Confirmer", onAction: () => setOpen(false), type: "confirm" },
        ]}
        description="Cet état est piloté par la page qui consomme la modale."
        onOpenChange={setOpen}
        open={open}
        title="Confirmer la publication"
        trigger={<Button>Ouvrir la modale contrôlée</Button>}
      >
        <p className="text-sm">La confirmation fermera cette modale avec son callback explicite.</p>
      </Modal>
    )
  },
}

export const LongContent: Story = {
  args: {
    actions: [],
    title: "",
    trigger: <Button>Ouvrir</Button>,
  },
  render: () => (
    <Modal
      actions={[
        { id: "cancel", label: "Revenir à la progression", type: "cancel" },
        { id: "archive", label: "Archiver la classe", tone: "destructive", type: "confirm" },
      ]}
      description="Cette action reste disponible pour consulter l'historique de l'année scolaire."
      title="Archiver Première générale 1"
      trigger={<Button variant="secondary">Afficher les conséquences</Button>}
    >
      <div className="space-y-4 text-sm">
        <p>
          L'archivage masque la classe des listes actives tout en conservant ses séances, sa progression annuelle et les
          bilans associés.
        </p>
        <p>
          Les contenus pédagogiques liés restent accessibles dans l'historique. Vous pourrez restaurer la classe à tout
          moment depuis les classes archivées.
        </p>
        <p>
          Vérifiez que toutes les séances réellement effectuées ont été renseignées avant de terminer l'année : elles
          alimentent les indicateurs de progression et les récapitulatifs de la classe.
        </p>
        <p>
          Cette opération ne supprime aucune donnée du fichier de travail. La classe restera consultable avec ses
          périodes, activités et interruptions documentées.
        </p>
      </div>
    </Modal>
  ),
}
