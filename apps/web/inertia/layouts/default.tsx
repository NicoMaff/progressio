import { type Data } from "@generated/data"
import { usePage } from "@inertiajs/react"
import { Link } from "@adonisjs/inertia/react"
import { Icon, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@progressio/ui"
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

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const { url, props } = usePage<Data.SharedProps & PageContext>()
  const [isCollapsed, setIsCollapsed] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true"
  )

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

  const navigation = isWorkFileOpen
    ? [
        { label: "Synthèse annuelle", href: "/", icon: "dashboard" as const, active: url === "/" },
        ...(context.levelId
          ? [
              {
                label: "Contenus",
                href: `/teaching-content/levels/${context.levelId}`,
                icon: "teachingContent" as const,
                active: url.startsWith("/teaching-content"),
              },
            ]
          : []),
        ...(context.classId
          ? [
              {
                label: "Progression",
                href: `/planning/classes/${context.classId}/progression`,
                icon: "planning" as const,
                active: url.startsWith("/planning"),
              },
            ]
          : []),
      ]
    : [
        { label: "Synthèse annuelle", icon: "dashboard" as const },
        { label: "Contenus", icon: "teachingContent" as const },
        { label: "Progression", icon: "planning" as const },
      ]

  return (
    <TooltipProvider delayDuration={300}>
      <div className={`progressio-shell${isCollapsed ? "is-collapsed" : ""}`}>
        <aside className="progressio-sidebar" aria-label="Navigation principale">
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
          </div>
          <nav className="progressio-navigation">
            {navigation.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  {"href" in item ? (
                    <Link
                      className={item.active ? "progressio-navigation-link is-active" : "progressio-navigation-link"}
                      href={item.href}
                      aria-current={item.active ? "page" : undefined}
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
                  )}
                </TooltipTrigger>
                <TooltipContent side="right">
                  {"href" in item ? item.label : "Ouvrez un Work File pour accéder à cette destination"}
                </TooltipContent>
              </Tooltip>
            ))}
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
    </TooltipProvider>
  )
}
