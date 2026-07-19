import { Select as SelectPrimitive, createListCollection } from "@ark-ui/react/select"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, useMemo } from "react"
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

export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

export type SelectProps = VariantProps<typeof selectVariants> & {
  "aria-describedby"?: string
  "aria-label"?: string
  "aria-labelledby"?: string
  "className"?: string
  "defaultValue"?: string
  "disabled"?: boolean
  "id"?: string
  "name"?: string
  "onValueChange"?: (value: string | null) => void
  "options": readonly SelectOption[]
  "placeholder"?: string
  "required"?: boolean
  "value"?: string
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    className,
    defaultValue,
    disabled,
    id,
    invalid,
    name,
    onValueChange,
    options,
    placeholder = "Sélectionner une option",
    required,
    value,
  },
  ref
) {
  const collection = useMemo(
    () =>
      createListCollection({
        items: options,
        itemToString: (option) => option.label,
        itemToValue: (option) => option.value,
        isItemDisabled: (option) => option.disabled === true,
      }),
    [options]
  )

  return (
    <SelectPrimitive.Root
      collection={collection}
      defaultValue={defaultValue === undefined ? undefined : [defaultValue]}
      disabled={disabled}
      invalid={invalid ?? false}
      name={name}
      onValueChange={(details) => onValueChange?.(details.value[0] ?? null)}
      required={required}
      value={value === undefined ? undefined : [value]}
    >
      <SelectPrimitive.Control>
        <SelectPrimitive.Trigger
          ref={ref}
          id={id}
          className={cn(
            "border-input bg-card text-foreground focus-visible:border-primary focus-visible:ring-ring/30 disabled:bg-muted disabled:text-muted-foreground data-[placeholder-shown]:text-muted-foreground flex h-11 w-full items-center justify-between rounded-md border px-3 text-sm shadow-sm transition-colors focus-visible:ring-3 focus-visible:outline-none disabled:cursor-not-allowed",
            selectVariants({ invalid }),
            className
          )}
          aria-describedby={ariaDescribedBy}
          aria-invalid={invalid || undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        >
          <SelectPrimitive.ValueText placeholder={placeholder} />
          <SelectPrimitive.Indicator className="i-hugeicons-arrow-down-01 h-4 w-4 opacity-50" aria-hidden="true" />
        </SelectPrimitive.Trigger>
      </SelectPrimitive.Control>
      <SelectPrimitive.Positioner>
        <SelectPrimitive.Content className="border-border bg-popover text-popover-foreground relative z-50 max-h-72 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-lg">
          {options.map((option) => (
            <SelectPrimitive.Item
              key={option.value}
              item={option}
              className="data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex min-h-10 w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                <span className="i-hugeicons-checkmark-circle-02 h-4 w-4" aria-hidden="true" />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Content>
      </SelectPrimitive.Positioner>
      <SelectPrimitive.HiddenSelect />
    </SelectPrimitive.Root>
  )
})
