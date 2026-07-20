import { cloneElement, type ReactElement, type ReactNode } from "react"
import { cn } from "#lib/utils"

export type BreadcrumbItem =
  | {
      current: true
      href?: never
      id: string
      label: string
    }
  | {
      current?: false
      href: string
      id: string
      label: string
    }

export type BreadcrumbProps = {
  className?: string
  items: readonly BreadcrumbItem[]
  renderLink?: (item: BreadcrumbItem) => ReactElement<{ children?: ReactNode; className?: string }>
}

function BreadcrumbLink({ item, renderLink }: Pick<BreadcrumbProps, "renderLink"> & { item: BreadcrumbItem }) {
  if (item.current) {
    return null
  }

  if (!renderLink) {
    return (
      <a className="font-500 text-muted-foreground hover:text-primary hover:underline" href={item.href}>
        {item.label}
      </a>
    )
  }

  const link = renderLink(item)

  return cloneElement(link, {
    className: cn("font-500 text-muted-foreground hover:text-primary hover:underline", link.props.className),
    children: item.label,
  })
}

export function Breadcrumb({ className, items, renderLink }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d’Ariane" className={cn("text-sm", className)}>
      <ol className="text-muted-foreground flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.id} className="inline-flex items-center gap-2">
            {item.current ? (
              <span aria-current="page" className="font-600 text-foreground">
                {item.label}
              </span>
            ) : (
              <BreadcrumbLink item={item} renderLink={renderLink} />
            )}
            {index < items.length - 1 ? (
              <span aria-hidden="true" className="text-border" role="presentation">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
