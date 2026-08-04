import type { MainBannerMappableItem } from "./api-types"
import type { MainBannerLocale, MainBannerSlide } from "./types"

const DEFAULT_CTA: Record<MainBannerLocale, string> = {
  ko: "더 알아보기",
  en: "Learn More",
}

export type MapMainBannerToSlideOptions = {
  locale: MainBannerLocale
  /**
   * CTA label. Defaults to "더 알아보기" / "Learn More".
   * Pass a function to vary per banner.
   */
  cta?: string | ((item: MainBannerMappableItem) => string)
  headlineWeight?: MainBannerSlide["headlineWeight"]
  desktopImageFit?: MainBannerSlide["desktopImageFit"]
  mobileImageFit?: MainBannerSlide["mobileImageFit"]
  highPriority?: boolean
}

function pickLocaleText(
  value: { ko: string; en: string } | null | undefined,
  locale: MainBannerLocale
): string {
  if (!value) return ""
  return (locale === "en" ? value.en : value.ko)?.trim() ?? ""
}

function resolveHref(
  item: MainBannerMappableItem,
  locale: MainBannerLocale
): { href: string; externalFl: boolean } {
  const route = locale === "en" ? item.routeEn : item.routeKo
  const href = route?.routePath?.trim() || "#"
  return { href, externalFl: Boolean(route?.externalFl) }
}

function resolveCta(
  item: MainBannerMappableItem,
  options: MapMainBannerToSlideOptions
): string {
  if (typeof options.cta === "function") return options.cta(item)
  if (typeof options.cta === "string" && options.cta.length > 0) {
    return options.cta
  }
  return DEFAULT_CTA[options.locale]
}

/**
 * Map one Public/Detail banner item → `MainBannerSlide`.
 * Returns `null` when `pcImg` is missing (cannot render background).
 */
export function mapMainBannerPublicItemToSlide(
  item: MainBannerMappableItem,
  options: MapMainBannerToSlideOptions
): MainBannerSlide | null {
  const pcImg = item.pcImg?.trim() || null
  if (!pcImg) return null

  const mobileImg = item.mobileImg?.trim() || pcImg
  const { locale } = options
  const { href, externalFl } = resolveHref(item, locale)

  const line1 = pickLocaleText(item.title2, locale)
  const line2 = pickLocaleText(item.title3, locale)

  return {
    key: item.bannerId,
    bannerId: item.bannerId,
    desktop: pcImg,
    mobileKo: mobileImg,
    mobileEn: mobileImg,
    cta: resolveCta(item, options),
    href,
    externalFl,
    episode: pickLocaleText(item.title1, locale),
    headlines: {
      desktop: [line1, line2],
      mobile: [line1, line2],
    },
    headlineWeight: options.headlineWeight ?? "bold",
    desktopImageFit: options.desktopImageFit,
    mobileImageFit: options.mobileImageFit,
    highPriority: options.highPriority,
  }
}

export type MapMainBannerToSlidesOptions = Omit<
  MapMainBannerToSlideOptions,
  "highPriority"
> & {
  /** Mark the first mapped slide as LCP/high-priority (default true). */
  markFirstHighPriority?: boolean
}

/**
 * Map Public list `items` (or a raw array) → slides for `SwiperMainBanner`.
 * Preserves input order (server already sorts by `inOrder`).
 */
export function mapMainBannerPublicToSlides(
  items: readonly MainBannerMappableItem[],
  options: MapMainBannerToSlidesOptions
): MainBannerSlide[] {
  const markFirst = options.markFirstHighPriority !== false
  const slides: MainBannerSlide[] = []

  for (const item of items) {
    const slide = mapMainBannerPublicItemToSlide(item, {
      ...options,
      highPriority: markFirst && slides.length === 0,
    })
    if (slide) slides.push(slide)
  }

  return slides
}

/** Convenience: accept full Public list response. */
export function mapMainBannerPublicListToSlides(
  response: { items: readonly MainBannerMappableItem[] },
  options: MapMainBannerToSlidesOptions
): MainBannerSlide[] {
  return mapMainBannerPublicToSlides(response.items, options)
}
