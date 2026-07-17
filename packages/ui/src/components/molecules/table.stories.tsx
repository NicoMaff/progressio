import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "#atoms/tag"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./table.js"

const meta = {
  title: "Molecules/Table",
  component: Table,
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

export const AnnualProgress: Story = {
  render: () => (
    <div className="w-[min(58rem,92vw)]">
      <Table>
        <TableCaption>Progression arrêtée au 16 juillet 2026.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Classe</TableHead>
            <TableHead>Dernière séquence travaillée</TableHead>
            <TableHead>État</TableHead>
            <TableHead className="text-right">Séances réalisées</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-600">Première générale 1</TableCell>
            <TableCell>Étude approfondie des fonctions exponentielles et de leurs applications</TableCell>
            <TableCell>
              <Badge tone="completed">
                <span className="i-hugeicons-checkmark-circle-02" aria-hidden="true" /> À jour
              </Badge>
            </TableCell>
            <TableCell className="text-right">39</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-600">Première générale 2</TableCell>
            <TableCell>Probabilités conditionnelles</TableCell>
            <TableCell>
              <Badge tone="inProgress">
                <span className="i-hugeicons-clock-03" aria-hidden="true" /> En cours
              </Badge>
            </TableCell>
            <TableCell className="text-right">35</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}
