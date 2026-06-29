import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "#lib/utils"

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ className, ...props }, ref) {
  const classes = cn(
    "h-4 w-4 rounded border border-neutral-300 text-[#2076FF] accent-[#2076FF] focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    className
  )

  return <input ref={ref} className={classes} type="checkbox" {...props} />
})
