import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "#lib/utils"

export const inputVariants = cva(
  "border-input bg-card text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-ring/30 disabled:bg-muted disabled:text-muted-foreground h-11 w-full rounded-md border px-3 text-sm shadow-sm transition-colors focus-visible:ring-3 focus-visible:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      invalid: {
        true: "border-alert focus-visible:border-alert focus-visible:ring-alert/25",
        false: "",
      },
    },
    defaultVariants: {
      invalid: false,
    },
  }
)

export type InputProps = InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputVariants>

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, invalid, ...props }, ref) {
  const classes = cn(inputVariants({ invalid }), className)

  return <input ref={ref} className={classes} aria-invalid={invalid || undefined} {...props} />
})
