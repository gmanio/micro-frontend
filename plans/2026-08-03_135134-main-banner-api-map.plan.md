---
name: Main banner API map util
created: 2026-08-03T13:51:34+09:00
updated: 2026-08-03T13:53:00+09:00
status: completed
overview: Map Main Banner Admin/Public API responses to SwiperMainBanner slides; export types + util.
todos:
  - id: plan-map
    content: Dated plan + README row
    status: completed
  - id: api-types-map
    content: Add API DTO types + mapMainBannerPublicToSlides (+ title markup helper)
    status: completed
  - id: wire-export
    content: Export from SwiperMainBanner index; Storybook FromApi story; build
    status: completed
---

# Main banner API → slide mapper

## Mapping

| API (`MainBannerPublicItemResponse`) | `MainBannerSlide` |
|---|---|
| `bannerId` | `key` (+ optional `bannerId`) |
| `pcImg` | `desktop` |
| `mobileImg` | `mobileKo` / `mobileEn` |
| `title1[locale]` | `episode` |
| `title2` / `title3` [locale] | `headlines` lines (desktop=mobile) |
| `routeKo` / `routeEn` | `href`, `externalFl` |
| (host) | `cta` via options |

Skip items missing `pcImg` (and mobile falls back to pc).

## Surface

- `@dndproperty/betterliving-ui/components/SwiperMainBanner`
  - `mapMainBannerPublicToSlides` / `mapMainBannerPublicItemToSlide`
  - API types from docs TS 예시
  - `parseMainBannerTitleMarkup` for `[bold]…[/bold]`
