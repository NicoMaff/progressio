import * as SelectPrimitive from "@radix-ui/react-select"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type ComponentProps, type ReactNode } from "react"
import { cn } from "#lib/utils"

export const selectVariants = cva("", {
  variants: {
    invalid: {
      true: "border-alert focus-visible:border-alert focus-visible:ring-alert/25",
      false: "",
    },
  },
  defaultVariants: {
    invalid: false,
  },
})

export type SelectProps = ComponentProps<typeof SelectPrimitive.Root> &
  VariantProps<typeof selectVariants> & {
    "aria-describedby"?: string
    "aria-label"?: string
    "aria-labelledby"?: string
    "children"?: ReactNode
    "className"?: string
    "placeholder"?: string
  }

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    children,
    className,
    invalid,
    placeholder,
    ...props
  },
  ref
) {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectTrigger
        ref={ref}
        className={cn(selectVariants({ invalid }), className)}
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid || undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </SelectPrimitive.Root>
  )
})

export const SelectGroup = SelectPrimitive.Group

export const SelectValue = SelectPrimitive.Value

export const SelectTrigger = forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(function SelectTrigger({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "border-input bg-card text-foreground focus-visible:border-primary focus-visible:ring-ring/30 disabled:bg-muted disabled:text-muted-foreground data-[placeholder]:text-muted-foreground flex h-11 w-full items-center justify-between rounded-md border px-3 text-sm shadow-sm transition-colors focus-visible:ring-3 focus-visible:outline-none disabled:cursor-not-allowed [&>span]:line-clamp-1",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <span className="i-hugeicons-arrow-down-01 h-4 w-4 opacity-50" aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})

export const SelectScrollUpButton = forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(function SelectScrollUpButton({ className, ...props }, ref) {
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <span className="i-hugeicons-arrow-up-01 h-4 w-4" aria-hidden="true" />
    </SelectPrimitive.ScrollUpButton>
  )
})

export const SelectScrollDownButton = forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(function SelectScrollDownButton({ className, ...props }, ref) {
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <span className="i-hugeicons-arrow-down-01 h-4 w-4" aria-hidden="true" />
    </SelectPrimitive.ScrollDownButton>
  )
})

export const SelectContent = forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(function SelectContent({ className, children, position = "popper", ...props }, ref) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-border bg-popover text-popover-foreground relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] origin-[--radix-select-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-md border shadow-lg",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})

export const SelectLabel = forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(function SelectLabel({ className, ...props }, ref) {
  return <SelectPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
})

export type SelectItemProps = ComponentProps<typeof SelectPrimitive.Item> & {
  children: ReactNode
}

export const SelectItem = forwardRef<React.ComponentRef<typeof SelectPrimitive.Item>, SelectItemProps>(
  function SelectItem({ className, children, ...props }, ref) {
    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          "focus:bg-accent focus:text-accent-foreground relative flex min-h-10 w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        {...props}
      >
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          <SelectPrimitive.ItemIndicator>
            <span className="i-hugeicons-checkmark-circle-02 h-4 w-4" aria-hidden="true" />
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
  }
)

export const SelectSeparator = forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(function SelectSeparator({ className, ...props }, ref) {
  return <SelectPrimitive.Separator ref={ref} className={cn("bg-muted -mx-1 my-1 h-px", className)} {...props} />
})
