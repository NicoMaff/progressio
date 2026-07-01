import type Level from "#models/level"
import type SchoolYear from "#models/school_year"

export type TeachingContentPageProps = {
  level: {
    id: string
    name: string
    shortCode: string
  }
  schoolYear: {
    id: string
    label: string
    subject: string
  }
}

export default class TeachingContentPageTransformer {
  transform(level: Level, schoolYear: SchoolYear): TeachingContentPageProps {
    return {
      level: {
        id: level.id,
        name: level.name,
        shortCode: level.shortCode,
      },
      schoolYear: {
        id: schoolYear.id,
        label: schoolYear.label,
        subject: schoolYear.subject,
      },
    }
  }
}
