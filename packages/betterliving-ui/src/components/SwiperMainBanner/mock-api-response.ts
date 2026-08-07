import type { MainBannerPublicListResponse } from "./api-types"
import { MAIN_BANNER_IMAGE } from "./mock-slides"

/** Example Public API response shaped for Storybook / local demos. */
export const mockMainBannerPublicListResponse: MainBannerPublicListResponse = {
  displayPosition: "MAIN",
  items: [
    {
      bannerId: "BN20260803GASAN0001",
      displayPosition: "MAIN",
      defaultFl: false,
      title1: {
        ko: "에피소드 컨비니 가산",
        en: "EPISODE CONVENI GASAN",
      },
      title2: {
        ko: "최대 5개월 월세 무료",
        en: "Up to 5 Months FREE Rent",
      },
      title3: {
        ko: "+ 가구 지원금 <strong>10만원</strong> 혜택!",
        en: "+ <strong>₩100K</strong> Furniture Bonus!",
      },
      displayPeriod: {
        startDt: "2026-07-01T00:00:00",
        endDt: "2026-12-31T23:59:59",
      },
      pcImg: MAIN_BANNER_IMAGE.gasanDesktop,
      mobileImg: MAIN_BANNER_IMAGE.gasanMobile,
      inOrder: 1,
      routeKo: {
        routePath: "https://betterliving.kr/promo/gasan",
        externalFl: true,
      },
      routeEn: {
        routePath: "https://betterliving.kr/en/promo/gasan",
        externalFl: true,
      },
    },
    {
      bannerId: "BN20260803SINDANG001",
      displayPosition: "MAIN",
      defaultFl: false,
      title1: {
        ko: "에피소드 컨비니 신당",
        en: "EPISODE CONVENI SINDANG",
      },
      title2: {
        ko: "1년 이상 고민 중이라면?",
        en: "Planning a 1+ year stay?",
      },
      title3: {
        ko: "오래 살수록 커지는 [bold]신당 혜택![/bold]",
        en: "Unlock bigger rewards in [bold]Sindang![/bold]",
      },
      displayPeriod: {
        startDt: "2026-07-01T00:00:00",
        endDt: "2026-12-31T23:59:59",
      },
      pcImg: MAIN_BANNER_IMAGE.sindangPromoDesktop,
      mobileImg: MAIN_BANNER_IMAGE.sindangPromoMobile,
      inOrder: 2,
      routeKo: { routePath: "/ko/promo/sindang", externalFl: false },
      routeEn: { routePath: "/en/promo/sindang", externalFl: false },
    },
    {
      bannerId: "BN20260803SUNGSU0001",
      displayPosition: "MAIN",
      defaultFl: true,
      title1: {
        ko: "에피소드 성수 101 & 121",
        en: "EPISODE SEONGSU 101 & 121",
      },
      title2: {
        ko: "머물고 싶은 동네, 성수에 살아보세요",
        en: "Find Your New Home in Seongsu",
      },
      title3: {
        ko: "에피소드 성수 상담&계약 오픈",
        en: "Online Chat & Contract Available",
      },
      displayPeriod: {
        startDt: "2026-07-01T00:00:00",
        endDt: "2026-12-31T23:59:59",
      },
      pcImg: MAIN_BANNER_IMAGE.sungsuDesktop,
      mobileImg: MAIN_BANNER_IMAGE.sungsuMobile,
      inOrder: 3,
      routeKo: {
        routePath: "/find?siteId=S20250728A066AFA763C",
        externalFl: false,
      },
      routeEn: {
        routePath: "/en/find?siteId=S20250728A066AFA763C",
        externalFl: false,
      },
    },
  ],
}
