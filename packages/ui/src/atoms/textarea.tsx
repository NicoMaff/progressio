import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type TextareaHTMLAttributes } from "react"

export const textareaVariants = cva(
  "min-h-28 w-full resize-y rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-950 transition-colors placeholder:text-neutral-400 focus:border-[#2076FF] focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500",
  {
    variants: {
      invalid: {
        true: "border-red-500 focus:border-red-500 focus:ring-red-100",
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
  const classes = [textareaVariants({ invalid }), className].filter(Boolean).join(" ")

  return <textarea ref={ref} className={classes} aria-invalid={invalid || undefined} {...props} />
})
