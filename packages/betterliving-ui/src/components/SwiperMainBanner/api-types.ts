/** Main Banner Admin/Public API DTOs — see lp-api `main-banner-admin-api.md`. */

export type LanguageDto = {
  ko: string
  en: string
}

export type MainBannerRouteDto = {
  routePath?: string | null
  externalFl?: boolean
}

export type MainBannerDisplayPeriodDto = {
  /** ISO datetime */
  startDt: string
  endDt: string
}

export type MainBannerPublicItemResponse = {
  bannerId: string
  displayPosition: string
  defaultFl: boolean
  title1: LanguageDto
  title2: LanguageDto
  title3: LanguageDto
  displayPeriod: MainBannerDisplayPeriodDto
  /** file_url */
  pcImg: string | null
  /** file_url */
  mobileImg: string | null
  inOrder: number
  routeKo: MainBannerRouteDto
  routeEn: MainBannerRouteDto
}

export type MainBannerPublicListResponse = {
  displayPosition: string
  items: MainBannerPublicItemResponse[]
}

export type MainBannerSummaryResponse = {
  bannerId: string
  displayFl: boolean
  defaultFl: boolean
  displayPosition: string
  title: string
  displayPeriod: MainBannerDisplayPeriodDto
  inOrder: number
  regId: string
  regDt: string
}

export type MainBannerDetailResponse = {
  bannerId: string
  displayFl: boolean
  defaultFl: boolean
  displayPosition: string
  title: string
  title1: LanguageDto
  title2: LanguageDto
  title3: LanguageDto
  displayPeriod: MainBannerDisplayPeriodDto
  pcImgFileId: string
  pcImg: string | null
  mobileImgFileId: string
  mobileImg: string | null
  inOrder: number
  routeKo: MainBannerRouteDto
  routeEn: MainBannerRouteDto
  regId: string
  regDt: string
  modId: string
  modDt: string
}

export type SearchMainBannerResponse = {
  total: number
  items: MainBannerSummaryResponse[]
}

/** Fields required to map a banner row into a carousel slide. */
export type MainBannerMappableItem = Pick<
  MainBannerPublicItemResponse,
  | "bannerId"
  | "title1"
  | "title2"
  | "title3"
  | "pcImg"
  | "mobileImg"
  | "routeKo"
  | "routeEn"
  | "defaultFl"
  | "inOrder"
>
