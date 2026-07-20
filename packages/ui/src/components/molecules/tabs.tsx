import { Tabs as TabsPrimitive } from "@ark-ui/react/tabs"
import type { ReactNode } from "react"
import { cn } from "#lib/utils"

export type Tab = {
  content?: ReactNode
  disabled?: boolean
  id: string
  label: string
}

export type TabsProps = {
  className?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  renderPanel?: (tab: Tab) => ReactNode
  tabs: readonly Tab[]
  value?: string
}

export function Tabs({ className, defaultValue, onValueChange, renderPanel, tabs, value }: TabsProps) {
  return (
    <TabsPrimitive.Root
      className={className}
      defaultValue={defaultValue}
      onValueChange={(details) => onValueChange?.(details.value)}
      value={value}
    >
      <TabsPrimitive.List className="bg-muted text-muted-foreground inline-flex min-h-11 items-center justify-center rounded-lg p-1">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.id}
            className="ring-offset-background focus-visible:ring-ring data-[selected]:bg-card data-[selected]:text-foreground font-600 inline-flex min-h-9 items-center justify-center rounded-md px-3 py-1 text-sm whitespace-nowrap transition-colors focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[selected]:shadow-sm"
            disabled={tab.disabled}
            value={tab.id}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {tabs.map((tab) => (
        <TabsPrimitive.Content
          key={tab.id}
          className={cn(
            "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          )}
          value={tab.id}
        >
          {renderPanel ? renderPanel(tab) : tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
