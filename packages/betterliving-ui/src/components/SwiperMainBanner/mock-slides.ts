import type { MainBannerLocale, MainBannerSlide } from "./types"

/** Production CDN paths used by warp-web `/public/main-page`. */
export const MAIN_BANNER_IMAGE = {
  gasanDesktop: "https://betterliving.kr/main-page/banner-gasan-desktop.png",
  gasanMobile: "https://betterliving.kr/main-page/banner-gasan-mobile.png",
  sindangPromoDesktop:
    "https://betterliving.kr/main-page/banner-sindang-promo-desktop.png",
  sindangPromoMobile:
    "https://betterliving.kr/main-page/banner-sindang-promo-mobile.png",
  sungsuDesktop: "https://betterliving.kr/main-page/banner-sungsu-desktop.png",
  sungsuMobile: "https://betterliving.kr/main-page/banner-sungsu-mobile.jpg",
  blogDesktop: "https://betterliving.kr/main-page/banner-blog-desktop.jpg",
  blogMobile: "https://betterliving.kr/main-page/banner-blog-mobile.png",
} as const

const COPY = {
  ko: {
    learnMore: "더 알아보기",
    gasan: {
      episode: "에피소드 컨비니 가산",
      headlines: {
        desktop: ["최대 5개월 월세 무료", "+ 가구 지원금 10만원 혜택!"] as [
          string,
          string,
        ],
        mobile: ["최대 5개월 월세 무료", "+ 가구 지원금 10만원 혜택!"] as [
          string,
          string,
        ],
      },
      href: "https://betterliving.kr/promo/gasan",
    },
    sindangPromo: {
      episode: "에피소드 컨비니 신당",
      headlines: {
        desktop: [
          "1년 이상 고민 중이라면?",
          "오래 살수록 커지는 신당 혜택!",
        ] as [string, string],
        mobile: [
          "1년 이상 고민 중이라면?",
          "오래 살수록 커지는 신당 혜택!",
        ] as [string, string],
      },
      href: "https://betterliving.kr/ko/promo/sindang",
    },
    sungsu: {
      episode: "에피소드 성수 101 & 121",
      headlines: {
        desktop: [
          "머물고 싶은 동네, 성수에 살아보세요",
          "에피소드 성수 상담&계약 오픈",
        ] as [string, string],
        mobile: [
          "지금 성수에서 살아볼 기회",
          "온라인 상담&계약 오픈",
        ] as [string, string],
      },
      href: "https://betterliving.kr/find?siteId=S20250728A066AFA763C",
    },
  },
  en: {
    learnMore: "Learn More",
    gasan: {
      episode: "EPISODE CONVENI GASAN",
      headlines: {
        desktop: [
          "Up to 5 Months FREE Rent",
          "+ ₩100K Furniture Bonus!",
        ] as [string, string],
        mobile: [
          "Up to 5 Months FREE Rent",
          "+ ₩100K Furniture Bonus!",
        ] as [string, string],
      },
      href: "https://betterliving.kr/en/promo/gasan",
    },
    sindangPromo: {
      episode: "EPISODE CONVENI SINDANG",
      headlines: {
        desktop: [
          "Planning a 1+ year stay?",
          "Unlock bigger rewards in Sindang!",
        ] as [string, string],
        mobile: [
          "Planning a 1+ year stay?",
          "Unlock bigger rewards in Sindang!",
        ] as [string, string],
      },
      href: "https://betterliving.kr/en/promo/sindang",
    },
    sungsu: {
      episode: "EPISODE SEONGSU 101 & 121",
      headlines: {
        desktop: [
          "Find Your New Home in Seongsu",
          "Online Chat & Contract Available",
        ] as [string, string],
        mobile: ["Start your Seongsu life", "Online contract open"] as [
          string,
          string,
        ],
      },
      href: "https://betterliving.kr/en/find?siteId=S20250728A066AFA763C",
    },
    blog: {
      episode: "BLOG OPEN",
      headlines: {
        desktop: [
          "Start Your Life in Seoul",
          "Discover housing tips and local guides",
        ] as [string, string],
        mobile: ["Find a Home in Seoul", "Tips, guides & local life"] as [
          string,
          string,
        ],
      },
      href: "https://betterliving.kr/en/blog",
    },
  },
} as const

/** Active warp-web main banner slides (gasan → sindangPromo → sungsu → blog@en). */
export function createMockMainBannerSlides(
  locale: MainBannerLocale = "ko"
): MainBannerSlide[] {
  const isEn = locale === "en"
  const copy = isEn ? COPY.en : COPY.ko

  const slides: MainBannerSlide[] = [
    {
      key: "gasan",
      desktop: MAIN_BANNER_IMAGE.gasanDesktop,
      mobileKo: MAIN_BANNER_IMAGE.gasanMobile,
      mobileEn: MAIN_BANNER_IMAGE.gasanMobile,
      cta: copy.learnMore,
      href: copy.gasan.href,
      episode: copy.gasan.episode,
      headlines: copy.gasan.headlines,
      headlineWeight: "bold",
      desktopImageFit: "gasan",
    },
    {
      key: "sindangPromo",
      desktop: MAIN_BANNER_IMAGE.sindangPromoDesktop,
      mobileKo: MAIN_BANNER_IMAGE.sindangPromoMobile,
      mobileEn: MAIN_BANNER_IMAGE.sindangPromoMobile,
      cta: copy.learnMore,
      href: copy.sindangPromo.href,
      episode: copy.sindangPromo.episode,
      headlines: copy.sindangPromo.headlines,
      headlineWeight: "bold",
      desktopImageFit: "cover",
      highPriority: true,
    },
    {
      key: "sungsu",
      desktop: MAIN_BANNER_IMAGE.sungsuDesktop,
      mobileKo: MAIN_BANNER_IMAGE.sungsuMobile,
      mobileEn: MAIN_BANNER_IMAGE.sungsuMobile,
      cta: copy.learnMore,
      href: copy.sungsu.href,
      episode: copy.sungsu.episode,
      headlines: copy.sungsu.headlines,
      headlineWeight: "light",
    },
  ]

  if (isEn) {
    slides.push({
      key: "blog",
      desktop: MAIN_BANNER_IMAGE.blogDesktop,
      mobileKo: MAIN_BANNER_IMAGE.blogMobile,
      mobileEn: MAIN_BANNER_IMAGE.blogMobile,
      cta: "Read More",
      href: COPY.en.blog.href,
      episode: COPY.en.blog.episode,
      headlines: COPY.en.blog.headlines,
      headlineWeight: "light",
    })
  }

  return slides
}

export const mockMainBannerSlidesKo = createMockMainBannerSlides("ko")
export const mockMainBannerSlidesEn = createMockMainBannerSlides("en")
