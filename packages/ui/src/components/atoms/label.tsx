import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type LabelHTMLAttributes } from "react"
import { cn } from "#lib/utils"

export const labelVariants = cva("text-sm leading-none font-medium")

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & VariantProps<typeof labelVariants>

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label({ className, ...props }, ref) {
  return <label ref={ref} className={cn(labelVariants(), className)} {...props} />
})
