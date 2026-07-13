import type { Meta, StoryObj } from "@storybook/react-vite"
import { buttonVariants } from "#atoms/button"
import { ClassSummaryRow } from "./class_summary_row.js"
import { ClassPacingIndicator, ProgressionFollowUpIndicator } from "./progression_indicators.js"

const EMPTY_OUTCOME_COUNTS = {
  cancelled: 0,
  partial: 0,
  realized: 0,
  shifted: 0,
  toCatchUp: 0,
}

const meta = {
  title: "Organisms/ClassSummaryRow",
  component: ClassSummaryRow,
  args: {
    classCode: "1G1",
    classLabel: "Première générale 1",
    pacing: null,
    progressionFollowUp: null,
  },
} satisfies Meta<typeof ClassSummaryRow>

export default meta

type Story = StoryObj<typeof meta>

export const SemanticStates: Story = {
  render: () => (
    <div className="w-[min(72rem,94vw)] space-y-3">
      <ClassSummaryRow
        classCode="1G1"
        classLabel="Première générale 1"
        pacing={
          <ClassPacingIndicator
            dueSessionCount={12}
            outcomeCounts={{ cancelled: 1, partial: 1, realized: 8, shifted: 1, toCatchUp: 1 }}
          />
        }
        progressionFollowUp={<ProgressionFollowUpIndicator missingOutcomeCount={0} reviewRequiredCount={0} />}
        action={
          <a className={buttonVariants({ size: "sm" })} href="#progression-1g1">
            Voir la progression
          </a>
        }
      />
      <ClassSummaryRow
        classCode="1G2"
        classLabel="Première générale 2"
        pacing={
          <ClassPacingIndicator
            dueSessionCount={11}
            outcomeCounts={{ cancelled: 0, partial: 2, realized: 6, shifted: 0, toCatchUp: 1 }}
          />
        }
        progressionFollowUp={<ProgressionFollowUpIndicator missingOutcomeCount={1} reviewRequiredCount={1} />}
        action={
          <a className={buttonVariants({ size: "sm", variant: "secondary" })} href="#progression-1g2">
            Voir la progression
          </a>
        }
      />
      <ClassSummaryRow
        classCode="TG1"
        classLabel="Terminale générale 1"
        pacing={<ClassPacingIndicator dueSessionCount={0} outcomeCounts={EMPTY_OUTCOME_COUNTS} state="notPlanned" />}
        progressionFollowUp={<ProgressionFollowUpIndicator missingOutcomeCount={0} reviewRequiredCount={0} />}
      />
      <ClassSummaryRow
        classCode="TG2"
        classLabel="Terminale générale 2"
        pacing={<ClassPacingIndicator dueSessionCount={0} outcomeCounts={EMPTY_OUTCOME_COUNTS} state="nothingDue" />}
        progressionFollowUp={<ProgressionFollowUpIndicator missingOutcomeCount={0} reviewRequiredCount={0} />}
      />
    </div>
  ),
}
