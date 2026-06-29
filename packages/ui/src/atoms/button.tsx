import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import { cn } from "#lib/utils"

export const buttonVariants = cva(
  "font-500 inline-flex h-10 items-center justify-center gap-2 rounded-md border text-sm text-white shadow-[0_4px_0_rgba(16,74,158,0.92),0_8px_14px_rgba(20,71,140,0.24)] transition-all duration-150 ease-out focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-1 active:shadow-[0_1px_0_rgba(16,74,158,0.95),0_3px_7px_rgba(20,71,140,0.18)] disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-55 disabled:shadow-[0_3px_0_rgba(148,163,184,0.8)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-[#1665df] bg-[#2076FF] hover:bg-[#4a91ff]",
        primary: "border-[#1665df] bg-[#2076FF] hover:bg-[#4a91ff]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border-neutral-300 bg-white text-black shadow-[0_4px_0_rgba(148,163,184,0.85),0_8px_14px_rgba(71,85,105,0.14)] hover:bg-neutral-50 active:shadow-[0_1px_0_rgba(148,163,184,0.9),0_3px_7px_rgba(71,85,105,0.12)]",
        secondary:
          "border-neutral-300 bg-white text-black shadow-[0_4px_0_rgba(148,163,184,0.85),0_8px_14px_rgba(71,85,105,0.14)] hover:bg-neutral-50 active:shadow-[0_1px_0_rgba(148,163,184,0.9),0_3px_7px_rgba(71,85,105,0.12)]",
        ghost:
          "border-2 border-neutral-950 bg-transparent text-neutral-950 shadow-none hover:bg-neutral-50 active:shadow-inner",
        link: "border-transparent bg-transparent text-[#2076FF] underline-offset-4 shadow-none hover:underline active:translate-y-0 active:shadow-none",
      },
      size: {
        default: "h-10 px-4",
        md: "h-10 px-4",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-5",
        icon: "h-9 w-9",
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
    asChild?: boolean
    children: ReactNode
    leftIcon?: ReactNode
    rightIcon?: ReactNode
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { asChild = false, children, className, leftIcon, rightIcon, size, type = "button", variant, ...props },
  ref
) {
  const Component = asChild ? Slot : "button"

  return (
    <Component ref={ref} className={cn(buttonVariants({ size, variant }), className)} type={type} {...props}>
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
    </Component>
  )
})
