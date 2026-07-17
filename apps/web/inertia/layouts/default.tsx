import { type Data } from "@generated/data"
import { usePage } from "@inertiajs/react"
import { type ReactElement, useEffect } from "react"
import { Link } from "@adonisjs/inertia/react"

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

  const navigation = [
    { label: "Synthèse annuelle", href: "/", icon: "dashboard" as const, active: url === "/" },
    context.levelId
      ? {
          label: "Contenus",
          href: `/teaching-content/levels/${context.levelId}`,
          icon: "teachingContent" as const,
          active: url.startsWith("/teaching-content"),
        }
      : null,
    context.classId
      ? {
          label: "Progression",
          href: `/planning/classes/${context.classId}/progression`,
          icon: "planning" as const,
          active: url.startsWith("/planning"),
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null)

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
        </div>
        <Toaster position="top-right" richColors closeButton />
      </div>
    </TooltipProvider>
  )
}
