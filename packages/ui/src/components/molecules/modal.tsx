import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog.js"
import { Button } from "#atoms/button"
import { cn } from "#lib/utils"

export type ModalProps = {
  children: ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

export function Modal({ children, defaultOpen, onOpenChange, open }: ModalProps) {
  return (
    <Dialog defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      {children}
    </Dialog>
  )
}

export type ModalTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export function ModalTrigger({ children, className, type = "button", ...props }: ModalTriggerProps) {
  return (
    <DialogTrigger asChild>
      <Button className={className} type={type} {...props}>
        {children}
      </Button>
    </DialogTrigger>
  )
}

export type ModalCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
}

export function ModalClose({ children, className, type = "button", ...props }: ModalCloseProps) {
  const classes = children
    ? cn(
        "inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-card px-4 text-sm font-600 text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:outline-none",
        className
      )
    : cn(
        "absolute top-3 right-3 inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/35 focus-visible:outline-none",
        className
      )

  return (
    <DialogClose asChild>
      <button className={classes} type={type} {...props}>
        {children ?? (
          <>
            <span className="i-hugeicons-cancel-01 h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Fermer</span>
          </>
        )}
      </button>
    </DialogClose>
  )
}

export type ModalContentProps = ComponentPropsWithoutRef<typeof DialogContent> & {
  children: ReactNode
}

export function ModalContent({ children, className, ...props }: ModalContentProps) {
  return (
    <DialogContent className={className} {...props}>
      {children}
    </DialogContent>
  )
}

export type ModalHeaderProps = ComponentPropsWithoutRef<typeof DialogHeader> & {
  children: ReactNode
}

export function ModalHeader({ children, className, ...props }: ModalHeaderProps) {
  return (
    <DialogHeader className={className} {...props}>
      {children}
    </DialogHeader>
  )
}

export type ModalTitleProps = ComponentPropsWithoutRef<typeof DialogTitle> & {
  children: ReactNode
}

export function ModalTitle({ children, className, ...props }: ModalTitleProps) {
  return (
    <DialogTitle className={className} {...props}>
      {children}
    </DialogTitle>
  )
}

export type ModalDescriptionProps = ComponentPropsWithoutRef<typeof DialogDescription> & {
  children: ReactNode
}

export function ModalDescription({ children, className, ...props }: ModalDescriptionProps) {
  return (
    <DialogDescription className={className} {...props}>
      {children}
    </DialogDescription>
  )
}

export type ModalFooterProps = ComponentPropsWithoutRef<typeof DialogFooter> & {
  children: ReactNode
}

export function ModalFooter({ children, className, ...props }: ModalFooterProps) {
  return (
    <DialogFooter className={className} {...props}>
      {children}
    </DialogFooter>
  )
}
