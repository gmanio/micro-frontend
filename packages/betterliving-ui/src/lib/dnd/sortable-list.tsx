"use client"

import type { UniqueIdentifier } from "@dnd-kit/abstract"
import {
  RestrictToHorizontalAxis,
  RestrictToVerticalAxis,
} from "@dnd-kit/abstract/modifiers"
import { RestrictToElement } from "@dnd-kit/dom/modifiers"
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react"
import { useSortable } from "@dnd-kit/react/sortable"
import { GripVerticalIcon } from "lucide-react"
import * as React from "react"

import { cn } from "../utils"
import { reorderItems } from "./reorder"

type SortAxis = "vertical" | "horizontal" | "free"

type SortableListProviderProps<T> = {
  items: T[]
  getItemId: (item: T) => UniqueIdentifier
  onReorder: (items: T[]) => void
  children: React.ReactNode
  onDragEnd?: (event: DragEndEvent) => void
  className?: string
  /**
   * Restrict dragged items to this list container.
   * @see https://dndkit.com/react/guides/modifiers/
   * @default true
   */
  restrictToBoundary?: boolean
  /**
   * Restrict movement axis. Use `vertical` for stacked list cards.
   * @default "free"
   */
  axis?: SortAxis
}

/**
 * List-level DnD context. Keeps sortable logic out of item UI components.
 */
function SortableListProvider<T>({
  items,
  getItemId,
  onReorder,
  children,
  onDragEnd,
  className,
  restrictToBoundary = true,
  axis = "free",
}: SortableListProviderProps<T>) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const modifiers = React.useMemo(() => {
    const next = []

    if (axis === "vertical") next.push(RestrictToVerticalAxis)
    if (axis === "horizontal") next.push(RestrictToHorizontalAxis)

    if (restrictToBoundary) {
      next.push(
        RestrictToElement.configure({
          element: () => containerRef.current,
        })
      )
    }

    return next.length > 0 ? next : undefined
  }, [axis, restrictToBoundary])

  return (
    <DragDropProvider
      modifiers={modifiers}
      onDragEnd={(event) => {
        onDragEnd?.(event)
        if (event.canceled) return
        onReorder(reorderItems(items, event, getItemId))
      }}
    >
      <div
        ref={containerRef}
        data-slot="sortable-list"
        data-axis={axis}
        className={cn("relative", className)}
      >
        {children}
      </div>
    </DragDropProvider>
  )
}

type SortableItemRenderProps = {
  ref: (element: Element | null) => void
  handleRef: (element: Element | null) => void
  isDragging: boolean
  isDropTarget: boolean
}

type SortableItemProps = {
  id: UniqueIdentifier
  index: number
  className?: string
  /** Disable drag/drop for this item (e.g. while data is still loading). */
  disabled?: boolean
  /** When true, only the handle triggers drag (recommended with interactive children). */
  withHandle?: boolean
  /** Optional type for nested / multi-list sorting. */
  type?: string
  /** Restrict which types can be dropped onto this item. */
  accept?: string | string[]
  /** Group key for same-list sorting across containers. */
  group?: string
  children: React.ReactNode | ((props: SortableItemRenderProps) => React.ReactNode)
}

/**
 * DnD shell around each list item. Render your card/content as children —
 * do not put dnd-kit hooks inside the card itself.
 */
function SortableItem({
  id,
  index,
  className,
  disabled = false,
  withHandle = true,
  type,
  accept,
  group,
  children,
}: SortableItemProps) {
  const { ref, handleRef, isDragging, isDropTarget } = useSortable({
    id,
    index,
    disabled,
    type,
    accept,
    group,
  })

  const isRenderProp = typeof children === "function"
  const showHandle = withHandle && !isRenderProp && !disabled

  const renderProps: SortableItemRenderProps = {
    ref,
    handleRef,
    isDragging,
    isDropTarget,
  }

  return (
    <div
      ref={ref}
      data-slot="sortable-item"
      data-dragging={isDragging || undefined}
      data-drop-target={isDropTarget || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        "relative",
        isDragging && "z-10 opacity-60",
        className
      )}
    >
      {showHandle ? (
        <div className="absolute top-2 right-2 z-30">
          <SortableHandle handleRef={handleRef} />
        </div>
      ) : null}
      {isRenderProp ? children(renderProps) : children}
    </div>
  )
}

type SortableHandleProps = {
  handleRef: (element: Element | null) => void
  className?: string
  label?: string
}

function SortableHandle({
  handleRef,
  className,
  label = "Drag to reorder",
}: SortableHandleProps) {
  return (
    <button
      ref={handleRef}
      type="button"
      data-slot="sortable-handle"
      aria-label={label}
      className={cn(
        "inline-flex size-8 shrink-0 cursor-grab items-center justify-center rounded-md border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground active:cursor-grabbing",
        className
      )}
    >
      <GripVerticalIcon className="size-4" />
    </button>
  )
}

export {
  SortableListProvider,
  SortableItem,
  SortableHandle,
}
export type {
  SortableListProviderProps,
  SortableItemProps,
  SortableItemRenderProps,
  SortableHandleProps,
  SortAxis,
}
