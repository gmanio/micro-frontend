export type MainBannerLocale = "ko" | "en"

/** Desktop / mobile image positioning presets (ported from warp-web CSS modules). */
export type MainBannerImageFit = "default" | "cover" | "gasan"

export type MainBannerHeadlines = {
  desktop: [string, string]
  mobile: [string, string]
}

export type MainBannerSlide = {
  key: string
  /** Source banner id when mapped from API */
  bannerId?: string
  desktop: string
  mobileKo: string
  mobileEn: string
  cta: string
  href: string
  /** From API `route*.externalFl` — host may open in new tab when true */
  externalFl?: boolean
  episode: string
  headlines: MainBannerHeadlines
  /** Headline font weight — default medium (`font-md`) */
  headlineWeight?: "bold" | "medium" | "light"
  desktopImageFit?: MainBannerImageFit
  mobileImageFit?: MainBannerImageFit
  /** Prefer high fetch priority (e.g. LCP slide) */
  highPriority?: boolean
}

export type SwiperMainBannerProps = {
  slides: MainBannerSlide[]
  locale?: MainBannerLocale
  autoplayDelay?: number
  className?: string
  /** Called instead of default `window.open(href)` when set */
  onCtaClick?: (slide: MainBannerSlide, index: number) => void
}
