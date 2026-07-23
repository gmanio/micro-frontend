import type { UniqueIdentifier } from "@dnd-kit/abstract"
import { move } from "@dnd-kit/helpers"
import type { DragEndEvent } from "@dnd-kit/react"

/**
 * Reorders an item array from a dnd-kit drag end/over event.
 * Works with any item shape via `getItemId` (move() needs id[] or {id}[]).
 */
function reorderItems<T>(
  items: T[],
  event: DragEndEvent,
  getItemId: (item: T) => UniqueIdentifier
): T[] {
  if (event.canceled) return items

  const ids = items.map(getItemId)
  const nextIds = move(ids, event)

  if (nextIds === ids) return items

  const byId = new Map(items.map((item) => [String(getItemId(item)), item]))
  const next = nextIds
    .map((id) => byId.get(String(id)))
    .filter((item): item is T => item != null)

  return next.length === items.length ? next : items
}

export { reorderItems }
