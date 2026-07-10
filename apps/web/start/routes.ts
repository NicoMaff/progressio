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

const NewAccountController = () => import("#controllers/new_account_controller")
const SessionController = () => import("#controllers/session_controller")
router.on("/").renderInertia("home", {}).as("home")

router
  .get("/teaching-content/levels/:levelId", [controllers.teachingContent.TeachingContent, "render"])
  .as("teaching_content.render")

router
  .group(() => {
    router.get("levels/:levelId/themes", [controllers.teachingContent.ThemesPage, "render"]).as("themes.index")
    router.post("levels/:levelId/themes", [controllers.teachingContent.CreateTheme, "execute"]).as("themes.store")
    router
      .put("levels/:levelId/themes/:themeId", [controllers.teachingContent.UpdateTheme, "execute"])
      .as("themes.update")
    router
      .post("levels/:levelId/themes/:themeId/archive", [controllers.teachingContent.ArchiveTheme, "execute"])
      .as("themes.archive")
    router
      .post("levels/:levelId/themes/:themeId/restore", [controllers.teachingContent.RestoreTheme, "execute"])
      .as("themes.restore")
    router
      .delete("levels/:levelId/themes/:themeId", [controllers.teachingContent.DeleteTheme, "execute"])
      .as("themes.destroy")
    router.post("levels/:levelId/chapters", [controllers.teachingContent.CreateChapter, "execute"]).as("chapters.store")
    router
      .put("levels/:levelId/chapters/:chapterId", [controllers.teachingContent.UpdateChapter, "execute"])
      .as("chapters.update")
    router
      .post("levels/:levelId/chapters/:chapterId/archive", [controllers.teachingContent.ArchiveChapter, "execute"])
      .as("chapters.archive")
    router
      .post("levels/:levelId/chapters/:chapterId/restore", [controllers.teachingContent.RestoreChapter, "execute"])
      .as("chapters.restore")
    router
      .delete("levels/:levelId/chapters/:chapterId", [controllers.teachingContent.DeleteChapter, "execute"])
      .as("chapters.destroy")
    router
      .post("levels/:levelId/activities", [controllers.teachingContent.CreateActivity, "execute"])
      .as("activities.store")
    router
      .put("levels/:levelId/activities/:activityId", [controllers.teachingContent.UpdateActivity, "execute"])
      .as("activities.update")
    router
      .post("levels/:levelId/activities/:activityId/archive", [controllers.teachingContent.ArchiveActivity, "execute"])
      .as("activities.archive")
    router
      .post("levels/:levelId/activities/:activityId/restore", [controllers.teachingContent.RestoreActivity, "execute"])
      .as("activities.restore")
    router
      .delete("levels/:levelId/activities/:activityId", [controllers.teachingContent.DeleteActivity, "execute"])
      .as("activities.destroy")
  })
  .prefix("teaching-content")
  .as("teaching_content")

router
  .group(() => {
    router.get("signup", [NewAccountController, "create"])
    router.post("signup", [NewAccountController, "store"])

    router.get("login", [SessionController, "create"])
    router.post("login", [SessionController, "store"])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post("logout", [SessionController, "destroy"])
  })
  .use(middleware.auth())
