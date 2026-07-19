import { cva, type VariantProps } from "class-variance-authority"
import {
  cloneElement,
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
} from "react"
import { cn } from "#lib/utils"

export const buttonVariants = cva(
  "font-600 focus-visible:ring-ring/35 focus-visible:ring-offset-background inline-flex min-h-11 items-center justify-center gap-2 rounded-md border text-sm shadow-sm transition-colors focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
        primary: "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground",
        secondary: "border-border bg-secondary text-secondary-foreground hover:bg-muted",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground border-transparent bg-transparent shadow-none",
        link: "text-primary min-h-0 border-transparent bg-transparent underline-offset-4 shadow-none hover:underline",
      },
      size: {
        default: "px-4",
        md: "px-4",
        sm: "min-h-10 px-3 text-xs",
        lg: "min-h-12 px-5",
        icon: "h-11 w-11",
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
    render?: ReactElement<{ children?: ReactNode; className?: string } & RefAttributes<HTMLElement>>
    rightIcon?: ReactNode
  }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, leftIcon, render, rightIcon, size, type = "button", variant, ...props },
  ref
) {
  const content = (
    <>
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
    </>
  )

  if (render) {
    return cloneElement(render, {
      className: cn(buttonVariants({ size, variant }), className, render.props.className),
      children: content,
      ref,
      ...props,
    })
  }

  return (
    <button ref={ref} className={cn(buttonVariants({ size, variant }), className)} type={type} {...props}>
      {content}
    </button>
  )
})
