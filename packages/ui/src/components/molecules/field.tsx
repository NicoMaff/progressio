import { cloneElement, forwardRef, useId, type HTMLAttributes, type ReactElement } from "react"
import { Label } from "#atoms/label"
import { cn } from "#lib/utils"

type FieldControlProps = {
  "aria-describedby"?: string
  "aria-invalid"?: boolean
  "id"?: string
  "invalid"?: boolean
}

export type FieldProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactElement<FieldControlProps>
  description?: string
  error?: string
  label?: string
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { children, className, description, error, label, ...props },
  ref
) {
  const generatedId = useId()
  const controlId = children.props.id ?? generatedId
  const descriptionId = description ? `${controlId}-description` : undefined
  const errorId = error ? `${controlId}-error` : undefined
  const describedBy =
    [children.props["aria-describedby"], descriptionId, errorId].filter(Boolean).join(" ") || undefined

  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props}>
      {label && (
        <Label className={cn(error && "text-alert")} htmlFor={controlId}>
          {label}
        </Label>
      )}
      {cloneElement(children, {
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : children.props["aria-invalid"],
        "id": controlId,
        "invalid": error ? true : children.props.invalid,
      })}
      {description && (
        <p id={descriptionId} className="text-muted-foreground text-[0.8rem]">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-alert text-[0.8rem] font-medium">
          {error}
        </p>
      )}
    </div>
  )
})
