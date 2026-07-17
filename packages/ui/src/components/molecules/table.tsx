import {
  forwardRef,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react"
import { cn } from "#lib/utils"

export const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(function Table(
  { className, ...props },
  ref
) {
  return (
    <div className="border-border relative w-full overflow-auto rounded-lg border">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  )
})

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableHeader({ className, ...props }, ref) {
    return <thead ref={ref} className={cn("bg-muted/70 [&_tr]:border-b", className)} {...props} />
  }
)

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, ...props }, ref) {
    return <tbody ref={ref} className={cn("bg-card [&_tr:last-child]:border-0", className)} {...props} />
  }
)

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(function TableRow(
  { className, ...props },
  ref
) {
  return (
    <tr
      ref={ref}
      className={cn(
        "border-border hover:bg-muted/45 data-[state=selected]:bg-accent border-b transition-colors",
        className
      )}
      {...props}
    />
  )
})

export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(function TableHead(
  { className, ...props },
  ref
) {
  return (
    <th ref={ref} className={cn("font-700 text-foreground h-11 px-4 text-left align-middle", className)} {...props} />
  )
})

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(function TableCell(
  { className, ...props },
  ref
) {
  return <td ref={ref} className={cn("text-foreground p-4 align-middle", className)} {...props} />
})

export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
  function TableCaption({ className, ...props }, ref) {
    return <caption ref={ref} className={cn("text-muted-foreground mt-3 text-sm", className)} {...props} />
  }
)
