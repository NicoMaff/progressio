import type Interruption from "#models/interruption"
import PlannedSession from "#models/planned_session"
import PlanningConflict from "#models/planning_conflict"
import factory from "@adonisjs/lucid/factories"
import { createRelatedId, findSchoolYearIdForClass } from "#database/factories/helpers"
import { InterruptionFactory } from "#database/factories/interruption_factory"
import { PlannedSessionFactory } from "#database/factories/planned_session_factory"

export const PlanningConflictFactory = factory
  .define(PlanningConflict, () => ({
    resolvedAt: null,
    resolutionNoteMarkdown: null,
  }))
  .before("create", async (_, planningConflict, ctx) => {
    planningConflict.plannedSessionId ??= await createRelatedId<PlannedSession>(PlannedSessionFactory, ctx)

    if (planningConflict.interruptionId === undefined) {
      const plannedSession = await PlannedSession.findOrFail(planningConflict.plannedSessionId)
      planningConflict.interruptionId = await createRelatedId<Interruption>(InterruptionFactory, ctx, {
        schoolYearId: await findSchoolYearIdForClass(plannedSession.classId),
      })
    }
  })
  .build()
