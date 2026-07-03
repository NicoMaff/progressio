import type { QueryClientContract } from "@adonisjs/lucid/types/database"
import { DateTime } from "luxon"
import { InterruptionClassFactory, InterruptionFactory, PlanningConflictFactory } from "#database/factories"
import type { DemoWorkFileSeedContext } from "#database/seeders/demo_work_file/context"
import { dateTimeOnSessionDate } from "#database/seeders/demo_work_file/dates"

export default class InterruptionsSeeder {
  constructor(private client: QueryClientContract) {}

  async run(context: DemoWorkFileSeedContext) {
    const schoolYear = context.schoolYear!
    const globalConflictSessionSet = context.plannedSessionSets[0]!
    const classConflictClass = context.classesByShortCode.get("5B")!
    const classConflictSessionSet =
      context.plannedSessionSets.find(({ session }) => session.classId === classConflictClass.id) ??
      context.plannedSessionSets[1]!
    const resolvedConflictSessionSet =
      context.plannedSessionSets.find(({ session }) => session.id !== globalConflictSessionSet.session.id) ??
      classConflictSessionSet

    const globalInterruption = await InterruptionFactory.client(this.client)
      .merge({
        schoolYearId: schoolYear.id,
        interruptionTypeId: context.interruptionTypes[0]!.id,
        scope: "global",
        title: "Matinée banalisée de rentrée",
        startsAt: dateTimeOnSessionDate(globalConflictSessionSet.session.sessionDate, 8),
        endsAt: dateTimeOnSessionDate(globalConflictSessionSet.session.sessionDate, 12),
        noteMarkdown: "Interruption globale utilisée pour inspecter les conflits non résolus.",
      })
      .create()

    const classInterruption = await InterruptionFactory.client(this.client)
      .merge({
        schoolYearId: schoolYear.id,
        interruptionTypeId: context.interruptionTypes[2]!.id,
        scope: "class",
        title: `Salle indisponible - ${classConflictClass.name}`,
        startsAt: dateTimeOnSessionDate(classConflictSessionSet.session.sessionDate, 8),
        endsAt: dateTimeOnSessionDate(classConflictSessionSet.session.sessionDate, 18),
        noteMarkdown: "Interruption limitée à une classe pour préparer les écrans de résolution.",
      })
      .create()

    await InterruptionClassFactory.client(this.client)
      .merge({
        interruptionId: classInterruption.id,
        classId: classConflictClass.id,
      })
      .create()

    await PlanningConflictFactory.client(this.client)
      .merge({
        plannedSessionId: globalConflictSessionSet.session.id,
        interruptionId: globalInterruption.id,
        resolvedAt: null,
        resolutionNoteMarkdown: null,
      })
      .create()

    await PlanningConflictFactory.client(this.client)
      .merge({
        plannedSessionId: classConflictSessionSet.session.id,
        interruptionId: classInterruption.id,
        resolvedAt: null,
        resolutionNoteMarkdown: null,
      })
      .create()

    await PlanningConflictFactory.client(this.client)
      .merge({
        plannedSessionId: resolvedConflictSessionSet.session.id,
        interruptionId: globalInterruption.id,
        resolvedAt: DateTime.utc().minus({ days: 2 }),
        resolutionNoteMarkdown: "Conflit résolu par déplacement de la séance dans le planning de démonstration.",
      })
      .create()
  }
}
