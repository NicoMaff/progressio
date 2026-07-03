import type { QueryClientContract } from "@adonisjs/lucid/types/database"
import { DateTime } from "luxon"
import { ActivityFactory, ChapterFactory, LevelFactory, TeachingClassFactory, ThemeFactory } from "#database/factories"
import { ACTIVITY_TITLES, CHAPTERS, LEVELS, THEMES } from "#database/seeders/demo_work_file/blueprints"
import type { DemoWorkFileSeedContext } from "#database/seeders/demo_work_file/context"
import type Activity from "#models/activity"

export default class TeachingContentSeeder {
  constructor(private client: QueryClientContract) {}

  async run(context: DemoWorkFileSeedContext) {
    const schoolYear = context.schoolYear!
    let archivedReusableActivityCreated = false

    for (const levelDefinition of LEVELS) {
      const level = await LevelFactory.client(this.client)
        .merge({
          schoolYearId: schoolYear.id,
          name: levelDefinition.name,
          shortCode: levelDefinition.shortCode,
        })
        .create()

      context.levels.push(level)

      for (const [classIndex, className] of levelDefinition.classes.entries()) {
        const teachingClass = await TeachingClassFactory.client(this.client)
          .merge({
            schoolYearId: schoolYear.id,
            levelId: level.id,
            name: className,
            shortCode: `${levelDefinition.shortCode.replace("E", "")}${String.fromCharCode(65 + classIndex)}`,
          })
          .create()

        context.classesByShortCode.set(teachingClass.shortCode, teachingClass)
      }

      const themes = []

      for (const theme of THEMES) {
        themes.push(
          await ThemeFactory.client(this.client)
            .merge({
              levelId: level.id,
              name: theme.name,
              shortCode: theme.shortCode,
              color: theme.color,
              noteMarkdown: "Regroupement fonctionnel pour les données de démonstration.",
            })
            .create()
        )
      }

      for (const chapterDefinition of CHAPTERS) {
        const chapter = await ChapterFactory.client(this.client)
          .merge({
            levelId: level.id,
            themeId: chapterDefinition.themeIndex === null ? null : themes[chapterDefinition.themeIndex]!.id,
            name: chapterDefinition.name,
            shortCode: chapterDefinition.shortCode,
            noteMarkdown: "Chapitre générique utilisé pour alimenter les écrans de contenu.",
          })
          .create()

        context.chaptersByShortCode.set(`${level.shortCode}:${chapter.shortCode}`, chapter)
        const chapterActivities: Activity[] = []

        for (const [activityIndex, activityTitle] of ACTIVITY_TITLES.entries()) {
          const shouldArchiveActivity: boolean =
            !archivedReusableActivityCreated && chapterDefinition.shortCode === "CALC"
          archivedReusableActivityCreated = archivedReusableActivityCreated || shouldArchiveActivity

          chapterActivities.push(
            await ActivityFactory.client(this.client)
              .merge({
                levelId: level.id,
                chapterId: chapter.id,
                activityTypeId: context.activityTypes[activityIndex % context.activityTypes.length].id,
                title: `${activityTitle} - ${chapter.name}`,
                estimatedDurationMinutes: activityIndex % 2 === 0 ? 30 + activityIndex * 10 : null,
                noteMarkdown: "Activité réutilisable du dataset de démonstration.",
                archivedAt: shouldArchiveActivity ? DateTime.utc().minus({ days: 30 }) : null,
              })
              .create()
          )
        }

        context.activitiesByChapterKey.set(`${level.shortCode}:${chapter.shortCode}`, chapterActivities)
      }
    }
  }
}
