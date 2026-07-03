import { DateTime } from "luxon"

export function firstDateWithWeekday(startDate: DateTime, weekday: number) {
  return startDate.plus({ days: (weekday - startDate.weekday + 7) % 7 })
}

export function dateTimeOnSessionDate(sessionDate: DateTime, hour: number, minute = 0) {
  return DateTime.fromObject(
    {
      year: sessionDate.year,
      month: sessionDate.month,
      day: sessionDate.day,
      hour,
      minute,
    },
    { zone: "utc" }
  )
}
