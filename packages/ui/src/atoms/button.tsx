import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes, ReactNode } from "react"

export const buttonVariants = cva(
  "font-500 inline-flex h-10 items-center justify-center gap-2 rounded-md border text-sm text-white shadow-[0_4px_0_rgba(16,74,158,0.92),0_8px_14px_rgba(20,71,140,0.24)] transition-all duration-150 ease-out focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-1 active:shadow-[0_1px_0_rgba(16,74,158,0.95),0_3px_7px_rgba(20,71,140,0.18)] disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-55 disabled:shadow-[0_3px_0_rgba(148,163,184,0.8)]",
  {
    variants: {
      variant: {
        primary: "border-[#1665df] bg-[#2076FF] hover:bg-[#4a91ff]",
        secondary:
          "border-neutral-300 bg-white text-black shadow-[0_4px_0_rgba(148,163,184,0.85),0_8px_14px_rgba(71,85,105,0.14)] hover:bg-neutral-50 active:shadow-[0_1px_0_rgba(148,163,184,0.9),0_3px_7px_rgba(71,85,105,0.12)]",
        ghost:
          "border-2 border-neutral-950 bg-transparent text-neutral-950 shadow-none hover:bg-neutral-50 active:shadow-inner",
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
    leftIcon?: ReactNode
    rightIcon?: ReactNode
  }

export function Button({
  children,
  className,
  leftIcon,
  rightIcon,
  size,
  type = "button",
  variant,
  ...props
}: ButtonProps) {
  const classes = [buttonVariants({ size, variant }), className].filter(Boolean).join(" ")

  return (
    <button className={classes} type={type} {...props}>
      {leftIcon ? (
        <span className="inline-flex shrink-0 items-center" aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}
      {children}
      {rightIcon ? (
        <span className="inline-flex shrink-0 items-center" aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </button>
  )
}
