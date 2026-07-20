import { Dialog as DialogPrimitive } from "@ark-ui/react/dialog"
import { Portal } from "@ark-ui/react/portal"
import type { ReactElement, ReactNode, RefObject } from "react"
import { Button } from "#atoms/button"

export type ModalAction = {
  disabled?: boolean
  id: string
  label: ReactNode
  onAction?: () => void
  tone?: "default" | "destructive"
  type: "cancel" | "confirm"
}

export type ModalProps = {
  actions: ModalAction[]
  children?: ReactNode
  closeOnInteractOutside?: boolean
  defaultOpen?: boolean
  description?: ReactNode
  initialFocus?: RefObject<HTMLElement | null>
  onOpenChange?: (open: boolean) => void
  open?: boolean
  title: ReactNode
  trigger: ReactElement
}

export function Modal({
  actions,
  children,
  closeOnInteractOutside,
  defaultOpen,
  description,
  initialFocus,
  onOpenChange,
  open,
  title,
  trigger,
}: ModalProps) {
  return (
    <DialogPrimitive.Root
      defaultOpen={defaultOpen}
      closeOnInteractOutside={closeOnInteractOutside}
      initialFocusEl={initialFocus ? () => initialFocus.current : undefined}
      onOpenChange={({ open: nextOpen }) => onOpenChange?.(nextOpen)}
      open={open}
    >
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/45" />
        <DialogPrimitive.Positioner className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPrimitive.Content className="border-border bg-card text-card-foreground grid w-full max-w-lg gap-4 rounded-lg border p-6 shadow-xl focus:outline-none">
            <DialogPrimitive.Title className="font-display font-600 text-foreground pr-8 text-2xl">
              {title}
            </DialogPrimitive.Title>
            {description ? (
              <DialogPrimitive.Description className="text-muted-foreground -mt-3 text-sm">
                {description}
              </DialogPrimitive.Description>
            ) : null}
            {children}
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              {actions.map((action) => (
                <ModalActionButton action={action} key={action.id} />
              ))}
            </div>
            <DialogPrimitive.CloseTrigger className="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/35 absolute top-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-md transition-colors focus-visible:ring-3 focus-visible:outline-none disabled:pointer-events-none">
              <span className="i-hugeicons-cancel-01 h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Fermer</span>
            </DialogPrimitive.CloseTrigger>
          </DialogPrimitive.Content>
        </DialogPrimitive.Positioner>
      </Portal>
    </DialogPrimitive.Root>
  )
}

function ModalActionButton({ action }: { action: ModalAction }) {
  const button = (
    <Button
      disabled={action.disabled}
      onClick={action.onAction}
      variant={action.type === "cancel" ? "outline" : action.tone === "destructive" ? "destructive" : "primary"}
    >
      {action.label}
    </Button>
  )

  if (action.type === "cancel") {
    return <DialogPrimitive.CloseTrigger asChild>{button}</DialogPrimitive.CloseTrigger>
  }

  return button
}
