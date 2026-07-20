import { Menu as MenuPrimitive } from "@ark-ui/react/menu"
import { Portal } from "@ark-ui/react/portal"
import type { ReactElement, ReactNode } from "react"

import { cn } from "#lib/utils"

export type DropdownMenuAction = {
  disabled?: boolean
  id: string
  label: ReactNode
  onSelect?: () => void
  render?: (action: DropdownMenuAction) => ReactElement
  separatorBefore?: boolean
  tone?: "default" | "destructive"
}

export type DropdownMenuProps = {
  actions: DropdownMenuAction[]
  align?: "center" | "end" | "start"
  trigger: ReactElement
}

export function DropdownMenu({ actions, align = "start", trigger }: DropdownMenuProps) {
  return (
    <MenuPrimitive.Root
      positioning={{ placement: align === "center" ? "bottom" : align === "end" ? "bottom-end" : "bottom-start" }}
    >
      <MenuPrimitive.Trigger asChild>{trigger}</MenuPrimitive.Trigger>
      <Portal>
        <MenuPrimitive.Positioner>
          <MenuPrimitive.Content
            className={cn(
              "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-[var(--available-height)] min-w-[8rem] origin-[--transform-origin] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md"
            )}
          >
            {actions.map((action) => (
              <MenuAction action={action} key={action.id} />
            ))}
          </MenuPrimitive.Content>
        </MenuPrimitive.Positioner>
      </Portal>
    </MenuPrimitive.Root>
  )
}

function MenuAction({ action }: { action: DropdownMenuAction }) {
  return (
    <>
      {action.separatorBefore ? <MenuPrimitive.Separator className="bg-muted -mx-1 my-1 h-px" /> : null}
      <MenuPrimitive.Item
        className={cn(
          "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          action.tone === "destructive" && "text-destructive focus:bg-destructive/10 focus:text-destructive"
        )}
        disabled={action.disabled}
        onSelect={action.onSelect}
        value={action.id}
      >
        {action.render ? action.render(action) : action.label}
      </MenuPrimitive.Item>
    </>
  )
}
