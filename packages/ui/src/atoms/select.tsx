import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type OptionHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react"

export const selectVariants = cva(
  "h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-950 transition-colors focus:border-[#2076FF] focus:ring-2 focus:ring-sky-200 focus:outline-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500",
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

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  VariantProps<typeof selectVariants> & {
    children?: ReactNode
    placeholder?: string
  }

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { children, className, invalid, placeholder, ...props },
  ref
) {
  const classes = [selectVariants({ invalid }), className].filter(Boolean).join(" ")

  return (
    <select ref={ref} className={classes} aria-invalid={invalid || undefined} defaultValue="" {...props}>
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}
      {children}
    </select>
  )
})

export type SelectItemProps = OptionHTMLAttributes<HTMLOptionElement> & {
  children: ReactNode
}

export function SelectItem({ children, ...props }: SelectItemProps) {
  return <option {...props}>{children}</option>
}
