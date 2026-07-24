import ProgressioSchema from "#database/progressio_schema"

export default class extends ProgressioSchema {
  async up() {
    this.createTable("school_years", (table) => {
      table.text("label").notNullable()
      table.text("subject").notNullable()
      table.date("start_date").notNullable()
      table.date("end_date").notNullable()
      table.date("first_teaching_day").notNullable()
      table.integer("teaching_hour_duration_minutes").notNullable()

      table.check("end_date >= start_date")
      table.check("teaching_hour_duration_minutes > 0")
    })

    this.createTable("levels", (table) => {
      table.text("school_year_id").notNullable().references("id").inTable("school_years").onDelete("RESTRICT")
      table.text("name").notNullable()
      table.text("short_code").notNullable()

      table.unique(["school_year_id", "short_code"])
    })

    this.createTable("classes", (table) => {
      table.text("school_year_id").notNullable().references("id").inTable("school_years").onDelete("RESTRICT")
      table.text("level_id").notNullable().references("id").inTable("levels").onDelete("RESTRICT")
      table.text("name").notNullable()
      table.text("short_code").notNullable()

      table.unique(["school_year_id", "short_code"])
    })

    this.createTable("periods", (table) => {
      table.text("school_year_id").notNullable().references("id").inTable("school_years").onDelete("CASCADE")
      table.text("name").notNullable()
      table.date("start_date").notNullable()
      table.date("end_date").notNullable()

      table.unique(["school_year_id", "name"])
      table.index(["school_year_id", "start_date"])
      table.check("end_date >= start_date")
    })

    this.createTable("activity_types", (table) => {
      table.text("school_year_id").notNullable().references("id").inTable("school_years").onDelete("CASCADE")
      table.text("name").notNullable()
      table.text("color").nullable()
      table.integer("display_order").notNullable()

      table.unique(["school_year_id", "name"])
    })

    this.createTable("slot_types", (table) => {
      table.text("school_year_id").notNullable().references("id").inTable("school_years").onDelete("CASCADE")
      table.text("name").notNullable()
      table.text("color").nullable()
      table.integer("display_order").notNullable()

      table.unique(["school_year_id", "name"])
    })

    this.createTable("interruption_types", (table) => {
      table.text("school_year_id").notNullable().references("id").inTable("school_years").onDelete("CASCADE")
      table.text("name").notNullable()
      table.text("color").nullable()
      table.integer("display_order").notNullable()

      table.unique(["school_year_id", "name"])
    })

    this.createTable("themes", (table) => {
      table.text("level_id").notNullable().references("id").inTable("levels").onDelete("RESTRICT")
      table.text("name").notNullable()
      table.text("short_code").notNullable()
      table.text("color").notNullable()
      table.text("note_markdown").nullable()
      table.timestamp("archived_at").nullable()
      table.integer("display_order").notNullable()

      table.unique(["level_id", "short_code"])
      table.unique(["level_id", "display_order"])
    })

    this.createTable("chapters", (table) => {
      table.text("level_id").notNullable().references("id").inTable("levels").onDelete("RESTRICT")
      table.text("theme_id").nullable().references("id").inTable("themes").onDelete("SET NULL")
      table.text("name").notNullable()
      table.text("short_code").notNullable()
      table.text("note_markdown").nullable()
      table.timestamp("archived_at").nullable()
      table.integer("display_order").notNullable()

      table.unique(["level_id", "short_code"])
      table.index(["level_id", "theme_id", "display_order"])
    })

    this.createTable("activities", (table) => {
      table.text("level_id").notNullable().references("id").inTable("levels").onDelete("RESTRICT")
      table.text("chapter_id").nullable().references("id").inTable("chapters").onDelete("SET NULL")
      table.text("activity_type_id").notNullable().references("id").inTable("activity_types").onDelete("RESTRICT")
      table.text("title").notNullable()
      table.integer("estimated_duration_minutes").nullable()
      table.text("note_markdown").nullable()
      table.timestamp("archived_at").nullable()
      table.integer("display_order").nullable()

      table.index(["level_id", "chapter_id", "display_order"])
      table.check("estimated_duration_minutes IS NULL OR estimated_duration_minutes > 0")
    })

    this.createTable("template_progressions", (table) => {
      table.text("level_id").notNullable().references("id").inTable("levels").onDelete("CASCADE")
      table.text("name").notNullable()

      table.unique(["level_id"])
    })

    this.createTable("template_sessions", (table) => {
      table
        .text("template_progression_id")
        .notNullable()
        .references("id")
        .inTable("template_progressions")
        .onDelete("CASCADE")
      table.text("main_chapter_id").nullable().references("id").inTable("chapters").onDelete("SET NULL")
      table.text("title").nullable()
      table.integer("session_order").notNullable()
      table.integer("planned_duration_minutes").nullable()
      table.text("note_markdown").nullable()

      table.unique(["template_progression_id", "session_order"])
      table.check("session_order > 0")
      table.check("planned_duration_minutes IS NULL OR planned_duration_minutes > 0")
    })

    this.createTable("template_session_activities", (table) => {
      table.text("template_session_id").notNullable().references("id").inTable("template_sessions").onDelete("CASCADE")
      table.text("activity_id").nullable().references("id").inTable("activities").onDelete("RESTRICT")
      table.text("activity_type_id").nullable().references("id").inTable("activity_types").onDelete("RESTRICT")
      table.text("local_title").nullable()
      table.text("local_description_markdown").nullable()
      table.integer("activity_order").notNullable()
      table.integer("planned_duration_minutes").nullable()

      table.unique(["template_session_id", "activity_order"])
      table.check("activity_order > 0")
      table.check("planned_duration_minutes IS NULL OR planned_duration_minutes > 0")
      table.check(
        "(activity_id IS NOT NULL AND activity_type_id IS NULL AND local_title IS NULL AND local_description_markdown IS NULL) OR (activity_id IS NULL AND activity_type_id IS NOT NULL AND local_title IS NOT NULL)"
      )
    })

    this.createTable("recurring_slots", (table) => {
      table.text("class_id").notNullable().references("id").inTable("classes").onDelete("RESTRICT")
      table.text("slot_type_id").notNullable().references("id").inTable("slot_types").onDelete("RESTRICT")
      table.integer("weekday").notNullable()
      table.time("start_time").notNullable()
      table.integer("duration_minutes").notNullable()
      table.date("valid_from").nullable()
      table.date("valid_until").nullable()

      table.check("weekday BETWEEN 1 AND 7")
      table.check("duration_minutes > 0")
      table.check("valid_until IS NULL OR valid_from IS NULL OR valid_until >= valid_from")
    })

    this.createTable("planned_sessions", (table) => {
      table.text("class_id").notNullable().references("id").inTable("classes").onDelete("RESTRICT")
      table.text("recurring_slot_id").nullable().references("id").inTable("recurring_slots").onDelete("SET NULL")
      table.text("template_session_id").nullable().references("id").inTable("template_sessions").onDelete("SET NULL")
      table.text("main_chapter_id").nullable().references("id").inTable("chapters").onDelete("SET NULL")
      table.text("title").nullable()
      table.date("session_date").notNullable()
      table.time("start_time").notNullable()
      table.integer("duration_minutes").notNullable()
      table.integer("session_order").notNullable()
      table.text("outcome").nullable()
      table.boolean("outcome_review_required").notNullable()
      table.timestamp("outcome_reviewed_at").nullable()
      table.text("note_markdown").nullable()

      table.unique(["class_id", "session_order"])
      table.index(["class_id", "session_date", "start_time"])
      table.check("duration_minutes > 0")
      table.check("session_order > 0")
      table.check("outcome IS NULL OR outcome IN ('realized', 'shifted', 'partial', 'cancelled', 'to_catch_up')")
    })

    this.createTable("planned_session_activities", (table) => {
      table.text("planned_session_id").notNullable().references("id").inTable("planned_sessions").onDelete("CASCADE")
      table.text("activity_id").nullable().references("id").inTable("activities").onDelete("RESTRICT")
      table
        .text("template_session_activity_id")
        .nullable()
        .references("id")
        .inTable("template_session_activities")
        .onDelete("SET NULL")
      table.text("activity_type_id").nullable().references("id").inTable("activity_types").onDelete("RESTRICT")
      table.text("local_title").nullable()
      table.text("local_description_markdown").nullable()
      table.integer("activity_order").notNullable()
      table.integer("planned_duration_minutes").nullable()

      table.unique(["planned_session_id", "activity_order"])
      table.check("activity_order > 0")
      table.check("planned_duration_minutes IS NULL OR planned_duration_minutes > 0")
      table.check(
        "(activity_id IS NOT NULL AND activity_type_id IS NULL AND local_title IS NULL AND local_description_markdown IS NULL) OR (activity_id IS NULL AND activity_type_id IS NOT NULL AND local_title IS NOT NULL)"
      )
    })

    this.createTable("actual_sessions", (table) => {
      table.text("class_id").notNullable().references("id").inTable("classes").onDelete("RESTRICT")
      table.text("planned_session_id").nullable().references("id").inTable("planned_sessions").onDelete("SET NULL")
      table.text("main_chapter_id").nullable().references("id").inTable("chapters").onDelete("SET NULL")
      table.text("title").nullable()
      table.date("session_date").notNullable()
      table.time("start_time").notNullable()
      table.integer("duration_minutes").notNullable()
      table.integer("session_order").notNullable()
      table.text("state").notNullable()
      table.timestamp("completed_at").nullable()
      table.text("note_markdown").nullable()

      table.index(["class_id", "session_order"])
      table.index(["class_id", "session_date", "start_time"])
      table.check("duration_minutes > 0")
      table.check("session_order > 0")
      table.check("state IN ('draft', 'completed')")
      table.check("(state = 'completed' AND completed_at IS NOT NULL) OR (state = 'draft' AND completed_at IS NULL)")
    })

    this.createTable("actual_session_activities", (table) => {
      table.text("actual_session_id").notNullable().references("id").inTable("actual_sessions").onDelete("CASCADE")
      table.text("activity_id").nullable().references("id").inTable("activities").onDelete("RESTRICT")
      table
        .text("planned_session_activity_id")
        .nullable()
        .references("id")
        .inTable("planned_session_activities")
        .onDelete("SET NULL")
      table
        .text("replaces_planned_session_activity_id")
        .nullable()
        .references("id")
        .inTable("planned_session_activities")
        .onDelete("SET NULL")
      table.text("activity_type_id").nullable().references("id").inTable("activity_types").onDelete("RESTRICT")
      table.text("local_title").nullable()
      table.text("local_description_markdown").nullable()
      table.integer("activity_order").notNullable()
      table.integer("actual_duration_minutes").nullable()

      table.unique(["actual_session_id", "activity_order"])
      table.check("activity_order > 0")
      table.check("actual_duration_minutes IS NULL OR actual_duration_minutes > 0")
      table.check(
        "(activity_id IS NOT NULL AND activity_type_id IS NULL AND local_title IS NULL AND local_description_markdown IS NULL) OR (activity_id IS NULL AND activity_type_id IS NOT NULL AND local_title IS NOT NULL)"
      )
      table.check("planned_session_activity_id IS NULL OR replaces_planned_session_activity_id IS NULL")
    })

    this.createTable("interruptions", (table) => {
      table.text("school_year_id").notNullable().references("id").inTable("school_years").onDelete("CASCADE")
      table
        .text("interruption_type_id")
        .notNullable()
        .references("id")
        .inTable("interruption_types")
        .onDelete("RESTRICT")
      table.text("scope").notNullable()
      table.text("title").notNullable()
      table.timestamp("starts_at").notNullable()
      table.timestamp("ends_at").notNullable()
      table.text("note_markdown").nullable()

      table.index(["school_year_id", "starts_at"])
      table.check("scope IN ('global', 'class')")
      table.check("ends_at > starts_at")
    })

    this.createTable("interruption_classes", (table) => {
      table.text("interruption_id").notNullable().references("id").inTable("interruptions").onDelete("CASCADE")
      table.text("class_id").notNullable().references("id").inTable("classes").onDelete("CASCADE")

      table.unique(["interruption_id", "class_id"])
    })

    this.createTable("planning_conflicts", (table) => {
      table.text("planned_session_id").notNullable().references("id").inTable("planned_sessions").onDelete("RESTRICT")
      table.text("interruption_id").notNullable().references("id").inTable("interruptions").onDelete("RESTRICT")
      table.timestamp("resolved_at").nullable()
      table.text("resolution_note_markdown").nullable()

      table.unique(["planned_session_id", "interruption_id"])
    })
  }

  async down() {
    this.schema.dropTable("planning_conflicts")
    this.schema.dropTable("interruption_classes")
    this.schema.dropTable("interruptions")
    this.schema.dropTable("actual_session_activities")
    this.schema.dropTable("actual_sessions")
    this.schema.dropTable("planned_session_activities")
    this.schema.dropTable("planned_sessions")
    this.schema.dropTable("recurring_slots")
    this.schema.dropTable("template_session_activities")
    this.schema.dropTable("template_sessions")
    this.schema.dropTable("template_progressions")
    this.schema.dropTable("activities")
    this.schema.dropTable("chapters")
    this.schema.dropTable("themes")
    this.schema.dropTable("interruption_types")
    this.schema.dropTable("slot_types")
    this.schema.dropTable("activity_types")
    this.schema.dropTable("periods")
    this.schema.dropTable("classes")
    this.schema.dropTable("levels")
    this.schema.dropTable("school_years")
  }
}
