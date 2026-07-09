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
const TeachingContentThemesPageController = () => import("#controllers/teaching_content_themes_page_controller")
const TeachingContentCreateThemeController = () => import("#controllers/teaching_content_create_theme_controller")
const TeachingContentUpdateThemeController = () => import("#controllers/teaching_content_update_theme_controller")
const TeachingContentCreateChapterController = () => import("#controllers/teaching_content_create_chapter_controller")
const TeachingContentUpdateChapterController = () => import("#controllers/teaching_content_update_chapter_controller")

router.on("/").renderInertia("home", {}).as("home")

router
  .get("/teaching-content/levels/:levelId", [controllers.teachingContent.TeachingContent, "render"])
  .as("teaching_content.render")

router
  .group(() => {
    router.get("levels/:levelId/themes", [TeachingContentThemesPageController, "render"]).as("themes.index")
    router.post("levels/:levelId/themes", [TeachingContentCreateThemeController, "execute"]).as("themes.store")
    router.put("levels/:levelId/themes/:themeId", [TeachingContentUpdateThemeController, "execute"]).as("themes.update")
    router.post("levels/:levelId/chapters", [TeachingContentCreateChapterController, "execute"]).as("chapters.store")
    router
      .put("levels/:levelId/chapters/:chapterId", [TeachingContentUpdateChapterController, "execute"])
      .as("chapters.update")
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
