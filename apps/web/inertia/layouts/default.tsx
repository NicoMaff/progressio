import { type Data } from "@generated/data"
import { usePage } from "@inertiajs/react"
import { Link } from "@adonisjs/inertia/react"
import { Icon, Tooltip } from "@progressio/ui"
import { urlFor } from "~/client"
import { toast, Toaster } from "sonner"
import { type ReactElement, useEffect, useMemo, useState } from "react"

const SIDEBAR_STORAGE_KEY = "progressio.app-shell.sidebar-collapsed"

type PageContext = {
  schoolYear?: { label: string; subject: string }
  dashboard?: { schoolYear: { label: string; subject: string }; levels: { id: string }[] }
  levelProgressSummary?: { schoolYear: { label: string; subject: string }; level: { id: string } }
  progressionView?: {
    schoolYear: { label: string; subject: string }
    level: { id: string }
    teachingClass: { id: string }
  }
  level?: { id: string }
}

type NavigationDestination = {
  label: string
  href: string | ((context: NavigationContext) => string)
  icon: "dashboard" | "organization" | "teachingContent" | "planning"
  children?: { label: string; href: string | ((context: NavigationContext) => string) }[]
}

type NavigationContext = { levelId?: string; classId?: string }

const navigationDestinations: NavigationDestination[] = [
  { label: "Vue d’ensemble", href: urlFor("home"), icon: "dashboard" },
  {
    label: "Organisation",
    href: urlFor("home"),
    icon: "organization",
    children: [
      { label: "Niveaux", href: urlFor("organisation.levels.show") },
      { label: "Classes", href: urlFor("organisation.classes.show") },
    ],
  },
  {
    label: "Contenus",
    href: ({ levelId }) => (levelId ? urlFor("teaching_content.render", { levelId }) : urlFor("home")),
    icon: "teachingContent",
    children: [
      { label: "Thèmes", href: ({ levelId }) => (levelId ? urlFor("themes.list", { levelId }) : urlFor("home")) },
      {
        label: "Chapitres",
        href: ({ levelId }) => (levelId ? urlFor("teaching_content.render", { levelId }) : urlFor("home")),
      },
      {
        label: "Activités",
        href: ({ levelId }) => (levelId ? urlFor("teaching_content.render", { levelId }) : urlFor("home")),
      },
    ],
  },
  {
    label: "Progressions",
    href: ({ classId }) => (classId ? urlFor("planning.progression_view", { classId }) : urlFor("home")),
    icon: "planning",
  },
]

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const { url, props } = usePage<Data.SharedProps & PageContext>()
  const [isCollapsed, setIsCollapsed] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true"
  )
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const context = useMemo(() => {
    const schoolYear =
      props.schoolYear ??
      props.dashboard?.schoolYear ??
      props.levelProgressSummary?.schoolYear ??
      props.progressionView?.schoolYear
    const levelId = props.level?.id ?? props.levelProgressSummary?.level.id ?? props.progressionView?.level.id

    return { schoolYear, levelId, classId: props.progressionView?.teachingClass.id }
  }, [props])
  const isWorkFileOpen = context.schoolYear !== undefined
  const navigationContext = { levelId: context.levelId, classId: context.classId }

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(isCollapsed))
  }, [isCollapsed])

  useEffect(() => {
    toast.dismiss()
  }, [url])

  useEffect(() => {
    if (props.flash.error) toast.error(props.flash.error)
    if (props.flash.success) toast.success(props.flash.success)
  }, [props.flash.error, props.flash.success])

  return (
    <div
      className={[
        "progressio-shell",
        isCollapsed ? "is-collapsed" : undefined,
        isOverlayOpen ? "is-overlay-open" : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        className="progressio-menu-button"
        type="button"
        aria-label="Ouvrir le menu"
        aria-expanded={isOverlayOpen}
        onClick={() => setIsOverlayOpen(true)}
      >
        <Icon name="menu" size="md" />
      </button>
      <button
        className="progressio-navigation-backdrop"
        type="button"
        aria-label="Fermer le menu"
        tabIndex={isOverlayOpen ? 0 : -1}
        onClick={() => setIsOverlayOpen(false)}
      />
      <aside className="progressio-sidebar">
        <div className="progressio-brand-row">
          <Link className="progressio-brand" href="/" aria-label="Progressio, synthèse annuelle">
            <span className="progressio-brand-mark" aria-hidden="true">
              P
            </span>
            <span className="progressio-brand-name">Progressio</span>
          </Link>
          <button
            className="progressio-collapse-button"
            type="button"
            aria-label={isCollapsed ? "Étendre le menu" : "Réduire le menu"}
            aria-expanded={!isCollapsed}
            onClick={() => setIsCollapsed((collapsed) => !collapsed)}
          >
            <Icon name="menu" size="md" />
          </button>
          <button
            className="progressio-overlay-close-button"
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setIsOverlayOpen(false)}
          >
            <Icon name="close" size="md" />
          </button>
        </div>
        <nav className="progressio-navigation" aria-label="Navigation principale">
          {navigationDestinations.map((item) => {
            const href = typeof item.href === "function" ? item.href(navigationContext) : item.href
            const isActive = url === href || (href !== "/" && url.startsWith(`${href}/`))

            return (
              <div
                key={item.label}
                className={isActive ? "progressio-navigation-group is-active" : "progressio-navigation-group"}
              >
                <Tooltip
                  content={isWorkFileOpen ? item.label : "Ouvrez un Work File pour accéder à cette destination"}
                  delayDuration={300}
                  positioning="right"
                  trigger={
                    isWorkFileOpen ? (
                      <Link
                        className="progressio-navigation-link"
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setIsOverlayOpen(false)}
                      >
                        <Icon name={item.icon} size="md" />
                        <span className="progressio-navigation-label">{item.label}</span>
                      </Link>
                    ) : (
                      <button
                        className="progressio-navigation-link is-unavailable"
                        type="button"
                        aria-describedby="work-file-required-description"
                        aria-disabled="true"
                      >
                        <Icon name={item.icon} size="md" />
                        <span className="progressio-navigation-label">{item.label}</span>
                      </button>
                    )
                  }
                />
                {item.children ? (
                  <div className="progressio-navigation-children">
                    {item.children.map((child) => {
                      const childHref = typeof child.href === "function" ? child.href(navigationContext) : child.href
                      const isChildActive = url === childHref || url.startsWith(`${childHref}/`)

                      return isWorkFileOpen ? (
                        <Link
                          key={child.label}
                          className={
                            isChildActive ? "progressio-navigation-child is-active" : "progressio-navigation-child"
                          }
                          href={childHref}
                          aria-current={isChildActive ? "page" : undefined}
                          onClick={() => setIsOverlayOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ) : (
                        <span
                          key={child.label}
                          className="progressio-navigation-child is-unavailable"
                          aria-hidden="true"
                        >
                          {child.label}
                        </span>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            )
          })}
        </nav>
      </aside>
      <div className="progressio-workspace">
        <header className="progressio-topbar">
          <div
            className="progressio-context"
            aria-label={isWorkFileOpen ? "Work File actif" : "Aucun Work File ouvert"}
          >
            <span className="progressio-context-label">Work File actif</span>
            <span className="progressio-context-value">
              {context.schoolYear
                ? `${context.schoolYear.label} · ${context.schoolYear.subject}`
                : "Aucun Work File ouvert"}
            </span>
          </div>
        </header>
        <main className="progressio-content">{children}</main>
      </div>
      <p id="work-file-required-description" className="progressio-visually-hidden">
        Ouvrez un Work File pour accéder aux données de planification.
      </p>
      <Toaster position="top-right" richColors closeButton />
    </div>
  )
}
