---
name: SwiperMainBanner UI component
created: 2026-08-03T13:47:54+09:00
updated: 2026-08-03T13:55:00+09:00
status: completed
overview: Port warp-web SwiperMainBanner into @dndproperty/betterliving-ui with mock slides + Storybook.
todos:
  - id: dated-plan-smb
    content: Dated plan + plans/README for SwiperMainBanner
    status: completed
  - id: deps-smb
    content: Add swiper + motion; CSS export wiring
    status: completed
  - id: port-smb
    content: Port SwiperMainBanner, RotatingText, copy, progress, styles
    status: completed
  - id: mock-story-smb
    content: Mock slides (gasan/sindangPromo/sungsu/blog) + Storybook stories
    status: completed
  - id: verify-smb
    content: Build package + typecheck
    status: completed
---

# SwiperMainBanner in betterliving-ui

## Goal

Presentational main-banner carousel from warp-web `SwiperMainBanner` (+ related copy/config/CSS/RotatingText) into [`packages/betterliving-ui`](../packages/betterliving-ui). Host owns i18n/routing; package ships mock slides for Storybook.

## Package surface

- `@dndproperty/betterliving-ui/components/SwiperMainBanner`
- `@dndproperty/betterliving-ui/swiper-main-banner.css`
- Deps: `swiper`, `motion`

## Props model

- `slides: MainBannerSlide[]` — images, href, cta, episode, headlines (desktop/mobile), image fit
- `locale?: "ko" | "en"` — picks mobileKo vs mobileEn image
- Optional `autoplayDelay`, `className`, `onCtaClick`

## Mock / Storybook

- Active warp-web set: gasan, sindangPromo, sungsu (+ blog when en)
- Image URLs from `https://betterliving.kr/main-page/...`
- Stories: Korean, English, SingleSlide

## Non-goals

- warp-web migration; dictionary/i18n hook; ADR (component-only under 0011)
