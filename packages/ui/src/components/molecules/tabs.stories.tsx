import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs.js"

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const ProgressionViews: Story = {
  render: () => (
    <Tabs className="w-[min(46rem,90vw)]" defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Vue d’ensemble</TabsTrigger>
        <TabsTrigger value="follow-up">Suivi de progression détaillé</TabsTrigger>
        <TabsTrigger value="interruptions" disabled>
          Interruptions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="border-border bg-card rounded-lg border p-5">
        Synthèse des séances prévues et réalisées pour l’année scolaire.
      </TabsContent>
      <TabsContent value="follow-up" className="border-border bg-card rounded-lg border p-5">
        Écarts entre la progression planifiée et la progression constatée.
      </TabsContent>
    </Tabs>
  ),
}
