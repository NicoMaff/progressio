import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "./modal.js"

const meta = {
  title: "Molecules/Modal",
  component: Modal,
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Modal>
      <ModalTrigger>Ouvrir</ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Créer une sauvegarde</ModalTitle>
          <ModalDescription>Une copie datée du fichier de travail sera créée avant l'opération.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose>Annuler</ModalClose>
          <ModalClose className="border-[#1665df] bg-[#2076FF] text-white hover:bg-[#4a91ff]">Confirmer</ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}
