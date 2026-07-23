/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { controllers } from "#generated/controllers"
import { middleware } from "#start/kernel"
import router from "@adonisjs/core/services/router"

router.get("/", [controllers.dashboard.ShowAnnualDashboard, "render"]).as("home")

router
  .group(() => {
    router
      .get("/dashboard/levels/:levelId", [controllers.dashboard.ShowLevelProgressSummary, "render"])
      .as("dashboard.level_progress_summary")

    router.get("/organisation/levels", [controllers.organisation.ListLevels, "render"]).as("organisation.levels.show")
    router
      .get("/organisation/levels/:levelId/edit", [controllers.organisation.ShowLevelEditor, "render"])
      .as("organisation.levels.edit")
    router
      .post("/organisation/levels", [controllers.organisation.CreateLevel, "execute"])
      .as("organisation.levels.create")
    router
      .put("/organisation/levels/:levelId", [controllers.organisation.UpdateLevel, "execute"])
      .as("organisation.levels.update")
    router
      .get("/organisation/classes", [controllers.organisation.ListClasses, "render"])
      .as("organisation.classes.show")
    router
      .get("/organisation/classes/:classId/edit", [controllers.organisation.ShowClassEditor, "render"])
      .as("organisation.classes.edit")
    router
      .post("/organisation/classes", [controllers.organisation.CreateClass, "execute"])
      .as("organisation.classes.create")
    router
      .put("/organisation/classes/:classId", [controllers.organisation.UpdateClass, "execute"])
      .as("organisation.classes.update")

    router
      .get("/planning/classes/:classId/progression", [controllers.dashboard.ShowProgressionView, "render"])
      .as("planning.progression_view")

    router
      .get("/teaching-content/levels/:levelId", [controllers.teachingContent.TeachingContent, "render"])
      .as("teaching_content.render")

    router.get("/themes", [controllers.themes.SelectThemesLevel, "render"]).as("themes.select")

    router
      .delete("/teaching-content/levels/:levelId/themes/:themeId", [controllers.teachingContent.DeleteTheme, "execute"])
      .as("teaching_content.themes.destroy")
    router
      .delete("/teaching-content/levels/:levelId/chapters/:chapterId", [
        controllers.teachingContent.DeleteChapter,
        "execute",
      ])
      .as("teaching_content.chapters.destroy")
    router
      .delete("/teaching-content/levels/:levelId/activities/:activityId", [
        controllers.teachingContent.DeleteActivity,
        "execute",
      ])
      .as("teaching_content.activities.destroy")

    router
      .group(() => {
        router.get("/", [controllers.themes.ListThemes, "render"]).as("list")
        router.get("/archive", [controllers.themes.ListArchivedThemes, "render"]).as("archived")
        router.get(":themeId/edit", [controllers.themes.RenderThemeEditor, "render"]).as("edit")
        router.post("/", [controllers.themes.CreateTheme, "execute"]).as("store")
        router.put("/reorder", [controllers.themes.ReorderThemes, "execute"]).as("reorder")
        router.put(":themeId", [controllers.themes.UpdateTheme, "execute"]).as("update")
        router.post(":themeId/archive", [controllers.themes.ArchiveTheme, "execute"]).as("archive")
        router.post(":themeId/restore", [controllers.themes.RestoreTheme, "execute"]).as("restore")
        router.delete(":themeId", [controllers.teachingContent.DeleteTheme, "execute"]).as("destroy")
      })
      .prefix("levels/:levelId/themes")
      .as("themes")

    router
      .group(() => {
        router.post("/", [controllers.chapters.CreateChapter, "execute"]).as("store")
        router.put(":chapterId", [controllers.chapters.UpdateChapter, "execute"]).as("update")
        router.post(":chapterId/archive", [controllers.chapters.ArchiveChapter, "execute"]).as("archive")
        router.post(":chapterId/restore", [controllers.chapters.RestoreChapter, "execute"]).as("restore")
        router.delete(":chapterId", [controllers.teachingContent.DeleteChapter, "execute"]).as("destroy")
      })
      .prefix("levels/:levelId/chapters")
      .as("chapters")

    router
      .group(() => {
        router.post("/", [controllers.activities.CreateActivity, "execute"]).as("store")
        router.put(":activityId", [controllers.activities.UpdateActivity, "execute"]).as("update")
        router.post(":activityId/archive", [controllers.activities.ArchiveActivity, "execute"]).as("archive")
        router.post(":activityId/restore", [controllers.activities.RestoreActivity, "execute"]).as("restore")
        router.delete(":activityId", [controllers.teachingContent.DeleteActivity, "execute"]).as("destroy")
      })
      .prefix("levels/:levelId/activities")
      .as("activities")
  })
  .use(middleware.workFileRequired())
