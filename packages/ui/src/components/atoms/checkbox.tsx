import { Checkbox as CheckboxPrimitive } from "@ark-ui/react/checkbox"
import { type ReactNode, type Ref } from "react"
import { cn } from "#lib/utils"

export type CheckboxProps = {
  "aria-describedby"?: string
  "aria-label"?: string
  "checked"?: boolean
  "children"?: ReactNode
  "className"?: string
  "defaultChecked"?: boolean
  "disabled"?: boolean
  "id"?: string
  "invalid"?: boolean
  "name"?: string
  "onCheckedChange"?: (checked: boolean) => void
  "required"?: boolean
  "ref"?: Ref<HTMLInputElement>
  "value"?: string
}

export function Checkbox({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  checked,
  children,
  className,
  defaultChecked,
  disabled,
  id,
  invalid,
  name,
  onCheckedChange,
  required,
  ref,
  value,
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      invalid={invalid}
      onCheckedChange={(details) => onCheckedChange?.(details.checked === true)}
    >
      <CheckboxPrimitive.Control
        className={cn(
          "border-input bg-card text-primary focus-within:ring-ring/35 focus-within:ring-offset-background data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[invalid]:border-alert flex h-6 w-6 shrink-0 items-center justify-center rounded border focus-within:ring-3 focus-within:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          className
        )}
      >
        <CheckboxPrimitive.Indicator
          className="i-hugeicons-checkmark-01 text-primary-foreground h-4 w-4"
          aria-hidden="true"
        />
      </CheckboxPrimitive.Control>
      <CheckboxPrimitive.HiddenInput
        ref={ref}
        id={id}
        name={name}
        required={required}
        value={value}
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid || undefined}
        aria-label={ariaLabel}
      />
      {children}
    </CheckboxPrimitive.Root>
  )
}
