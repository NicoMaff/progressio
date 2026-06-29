import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes, ReactNode } from "react"

export const buttonVariants = cva(
  "inline-flex h-10 items-center justify-center rounded-md border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-neutral-950 bg-neutral-950 text-white hover:bg-neutral-800",
        secondary: "border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-100",
        ghost: "border-transparent bg-transparent text-neutral-950 hover:bg-neutral-100",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode
  }

export function Button({ children, className, size, type = "button", variant, ...props }: ButtonProps) {
  const classes = [buttonVariants({ size, variant }), className].filter(Boolean).join(" ")

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  )
}
