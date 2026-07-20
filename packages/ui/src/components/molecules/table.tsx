import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "#lib/utils"

export type TableRow = {
  id: string
}

export type TableColumn<Row extends TableRow> = {
  id: string
  label: ReactNode
  cellClassName?: string
  headerClassName?: string
  render: (row: Row) => ReactNode
}

export type TableProps<Row extends TableRow> = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  caption?: ReactNode
  columns: TableColumn<Row>[]
  rows: Row[]
}

export function Table<Row extends TableRow>({ caption, className, columns, rows, ...props }: TableProps<Row>) {
  return (
    <div className={cn("border-border relative w-full overflow-auto rounded-lg border", className)} {...props}>
      <table className="w-full caption-bottom text-sm">
        {caption ? <caption className="text-muted-foreground mt-3 text-sm">{caption}</caption> : null}
        <thead className="bg-muted/70 [&_tr]:border-b">
          <tr>
            {columns.map((column) => (
              <th
                className={cn("font-700 text-foreground h-11 px-4 text-left align-middle", column.headerClassName)}
                key={column.id}
                scope="col"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-card [&_tr:last-child]:border-0">
          {rows.map((row) => (
            <tr
              className="border-border hover:bg-muted/45 data-[state=selected]:bg-accent border-b transition-colors"
              key={row.id}
            >
              {columns.map((column) => (
                <td className={cn("text-foreground p-4 align-middle", column.cellClassName)} key={column.id}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
