import {
  createContext,
  type ButtonHTMLAttributes,
  type ComponentPropsWithoutRef,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { Icon } from "../atoms/icon.js"

type ModalContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

function useModalContext() {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error("Modal components must be rendered inside Modal")
  }

  return context
}

export type ModalProps = {
  children: ReactNode
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

export function Modal({ children, defaultOpen = false, onOpenChange, open: controlledOpen }: ModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const open = controlledOpen ?? uncontrolledOpen
  const value = useMemo(
    () => ({
      open,
      setOpen: (nextOpen: boolean) => {
        setUncontrolledOpen(nextOpen)
        onOpenChange?.(nextOpen)
      },
    }),
    [onOpenChange, open]
  )

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export type ModalTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export function ModalTrigger({ children, className, onClick, type = "button", ...props }: ModalTriggerProps) {
  const { setOpen } = useModalContext()
  const classes = [
    "font-500 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#1665df] bg-[#2076FF] px-4 text-sm text-white shadow-[0_4px_0_rgba(16,74,158,0.92),0_8px_14px_rgba(20,71,140,0.24)] transition-all duration-150 ease-out hover:bg-[#4a91ff] focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-1",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      className={classes}
      type={type}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          setOpen(true)
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export type ModalCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode
}

export function ModalClose({ children, className, onClick, type = "button", ...props }: ModalCloseProps) {
  const { setOpen } = useModalContext()
  const classes = [
    children
      ? "inline-flex h-10 items-center justify-center rounded-md border border-neutral-300 bg-white px-4 text-sm font-500 text-neutral-950 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:outline-none"
      : "absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:outline-none",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      className={classes}
      type={type}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          setOpen(false)
        }
      }}
      {...props}
    >
      {children ?? (
        <>
          <Icon name="close" size="sm" />
          <span className="sr-only">Fermer</span>
        </>
      )}
    </button>
  )
}

export type ModalContentProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode
}

export function ModalContent({ children, className, ...props }: ModalContentProps) {
  const { open, setOpen } = useModalContext()

  if (!open) {
    return null
  }

  const classes = [
    "fixed top-1/2 left-1/2 z-50 grid w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-md border border-neutral-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.24)] focus:outline-none",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return createPortal(
    <>
      <button
        className="fixed inset-0 z-40 cursor-default bg-black/45"
        aria-label="Fermer"
        onClick={() => setOpen(false)}
      />
      <div role="dialog" aria-modal="true" className={classes} {...props}>
        {children}
        <ModalClose />
      </div>
    </>,
    document.body
  )
}

export type ModalHeaderProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode
}

export function ModalHeader({ children, className, ...props }: ModalHeaderProps) {
  const classes = ["space-y-1 pr-8", className].filter(Boolean).join(" ")

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export type ModalTitleProps = ComponentPropsWithoutRef<"h2"> & {
  children: ReactNode
}

export function ModalTitle({ children, className, ...props }: ModalTitleProps) {
  const classes = ["text-lg font-600 text-neutral-950", className].filter(Boolean).join(" ")

  return (
    <h2 className={classes} {...props}>
      {children}
    </h2>
  )
}

export type ModalDescriptionProps = ComponentPropsWithoutRef<"p"> & {
  children: ReactNode
}

export function ModalDescription({ children, className, ...props }: ModalDescriptionProps) {
  const classes = ["text-sm text-neutral-500", className].filter(Boolean).join(" ")

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  )
}

export type ModalFooterProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode
}

export function ModalFooter({ children, className, ...props }: ModalFooterProps) {
  const classes = ["flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className].filter(Boolean).join(" ")

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
