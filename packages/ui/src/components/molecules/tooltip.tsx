import { Tooltip as TooltipPrimitive } from "@ark-ui/react/tooltip"
import { Portal } from "@ark-ui/react/portal"
import type { ReactElement, ReactNode } from "react"

import { cn } from "#lib/utils"

export type TooltipProps = {
  content: ReactNode
  delayDuration?: number
  positioning?: "bottom" | "left" | "right" | "top"
  trigger: ReactElement
}

export function Tooltip({ content, delayDuration, positioning = "top", trigger }: TooltipProps) {
  return (
    <TooltipPrimitive.Root openDelay={delayDuration} positioning={{ placement: positioning }}>
      <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
      <Portal>
        <TooltipPrimitive.Positioner>
          <TooltipPrimitive.Content
            className={cn(
              "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-w-xs origin-[--transform-origin] overflow-hidden rounded-md px-3 py-2 text-xs shadow-lg"
            )}
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Positioner>
      </Portal>
    </TooltipPrimitive.Root>
  )
}
