import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "#lib/utils"

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ className, ...props }, ref) {
  const classes = cn(
    "h-6 w-6 rounded border border-input bg-card accent-primary focus-visible:ring-3 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    className
  )

  return <input ref={ref} className={classes} type="checkbox" {...props} />
})
