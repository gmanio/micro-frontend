import type * as React from "react"

export type LocaleText = {
  ko: string
  en: string
}

export type Locale = keyof LocaleText

export type Unit = {
  unitId: string
  siteId: string
  unitLabel: LocaleText
  images: string[]
  unitNm: LocaleText
  unitDesc: LocaleText
  serviceTitle1: LocaleText
  unitConfig: LocaleText
  rentAmtStandard: number
  rentAmt12: number
  coordinate: { lat: number; lon: number }
  externalFl: boolean
  representativeImg: string
  siteNm: LocaleText
  soldOut: boolean
}

export type UnitCardData = {
  id: string
  title: string
  options: string
  description?: string
  originAmount?: string
  percent?: string
  totalAmount: string
  month: string
  imgs: string[]
  unitLabels?: string[]
  soldOut?: boolean
  href?: string
}

export type UnitCardProps = React.ComponentProps<"div"> & {
  data: UnitCardData
  /** When set (or `data.href`), wraps the card in an anchor. */
  href?: string
  as?: React.ElementType
  textTheme?: "light" | "dark"
  /** Replaces the default totalAmount + month row. */
  price?: React.ReactNode
  isPriceLoading?: boolean
  lazyRootMargin?: string
}

export function formatWon(amount: number) {
  return `${amount.toLocaleString("ko-KR")} 원`
}

function getUnitLabels(unit: Unit, locale: Locale): string[] {
  const labels = unit.unitLabel[locale]?.trim()
  if (!labels) return []
  return labels
    .split(",")
    .map((label) => label.trim())
    .filter(Boolean)
}

export function toUnitCardData(
  unit: Unit,
  locale: Locale = "ko",
): UnitCardData {
  const description = unit.serviceTitle1[locale]?.trim()

  return {
    id: unit.unitId,
    title: unit.unitNm[locale],
    imgs: unit.representativeImg
      ? [unit.representativeImg]
      : unit.images.slice(0, 1),
    description: description || undefined,
    options: unit.unitConfig[locale] ?? "",
    totalAmount: formatWon(unit.rentAmt12),
    month: "/월",
    unitLabels: getUnitLabels(unit, locale),
    soldOut: unit.soldOut,
    href: `/units/${unit.unitId}`,
  }
}
