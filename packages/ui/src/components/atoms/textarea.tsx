import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type TextareaHTMLAttributes } from "react"
import { cn } from "#lib/utils"

export const textareaVariants = cva(
  "border-input bg-card text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-ring/30 disabled:bg-muted disabled:text-muted-foreground min-h-28 w-full resize-y rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-3 focus-visible:outline-none disabled:cursor-not-allowed",
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

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & VariantProps<typeof textareaVariants>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, ...props },
  ref
) {
  const classes = cn(textareaVariants({ invalid }), className)

  return <textarea ref={ref} className={classes} aria-invalid={invalid || undefined} {...props} />
})
