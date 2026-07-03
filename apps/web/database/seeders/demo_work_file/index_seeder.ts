import { BaseSeeder } from "@adonisjs/lucid/seeders"
import SchoolYearReferencesSeeder from "#database/seeders/demo_work_file/01_school_year_references_seeder"
import TeachingContentSeeder from "#database/seeders/demo_work_file/02_teaching_content_seeder"
import PlanningSeeder from "#database/seeders/demo_work_file/03_planning_seeder"
import ActualsSeeder from "#database/seeders/demo_work_file/04_actuals_seeder"
import InterruptionsSeeder from "#database/seeders/demo_work_file/05_interruptions_seeder"
import { createDemoWorkFileSeedContext } from "#database/seeders/demo_work_file/context"

export default class DemoWorkFileSeeder extends BaseSeeder {
  static environment = ["development"]

  async run() {
    const context = createDemoWorkFileSeedContext()

    await new SchoolYearReferencesSeeder(this.client).run(context)
    await new TeachingContentSeeder(this.client).run(context)
    await new PlanningSeeder(this.client).run(context)
    await new ActualsSeeder(this.client).run(context)
    await new InterruptionsSeeder(this.client).run(context)
  }
}
