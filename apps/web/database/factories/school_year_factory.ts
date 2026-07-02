import SchoolYear from "#models/school_year"
import factory from "@adonisjs/lucid/factories"
import { DateTime } from "luxon"

export const SchoolYearFactory = factory
  .define(SchoolYear, () => ({
    label: "2025-2026",
    subject: "Mathématiques",
    startDate: DateTime.fromISO("2025-09-01"),
    endDate: DateTime.fromISO("2026-07-04"),
    firstTeachingDay: DateTime.fromISO("2025-09-02"),
    teachingHourDurationMinutes: 55,
  }))
  .build()
