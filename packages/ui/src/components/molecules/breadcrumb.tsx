import { Slot } from "@radix-ui/react-slot"
import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from "react"
import { cn } from "#lib/utils"

export type BreadcrumbProps = ComponentPropsWithoutRef<"nav">

export function Breadcrumb({ className, ...props }: BreadcrumbProps) {
  return <nav aria-label="Fil d’Ariane" className={cn("text-sm", className)} {...props} />
}

export function BreadcrumbList({ className, ...props }: HTMLAttributes<HTMLOListElement>) {
  return <ol className={cn("flex flex-wrap items-center gap-2 text-neutral-500", className)} {...props} />
}

export function BreadcrumbItem({ className, ...props }: HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("inline-flex items-center gap-2", className)} {...props} />
}

export type BreadcrumbLinkProps = ComponentPropsWithoutRef<"a"> & {
  asChild?: boolean
}

export function BreadcrumbLink({ asChild = false, className, ...props }: BreadcrumbLinkProps) {
  const Component = asChild ? Slot : "a"

  return (
    <Component className={cn("font-500 text-neutral-600 hover:text-sky-700 hover:underline", className)} {...props} />
  )
}

export function BreadcrumbPage({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span aria-current="page" className={cn("font-600 text-neutral-950", className)} {...props} />
}

export type BreadcrumbSeparatorProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode
}

export function BreadcrumbSeparator({ children = "/", className, ...props }: BreadcrumbSeparatorProps) {
  return (
    <span aria-hidden="true" className={cn("text-neutral-300", className)} role="presentation" {...props}>
      {children}
    </span>
  )
}
