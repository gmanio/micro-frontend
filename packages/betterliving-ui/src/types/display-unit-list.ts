import type { LocaleText } from "../components/UnitCard"

export type UnitListUnitRef = {
  unitId: string
  /** 0-based display order within the parent list */
  order: number
}

export type UnitListSection = {
  id: string
  /** 0-based display order among list sections (Y-axis) */
  order: number
  mainTitle: LocaleText
  subTitle: LocaleText
  routePath?: string | null
  externalFl: boolean
  units: UnitListUnitRef[]
}

export function sortByOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order)
}
