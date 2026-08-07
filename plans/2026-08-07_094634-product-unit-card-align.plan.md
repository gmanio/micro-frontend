---
name: ProductCard + UnitCard warp-ui align
created: 2026-08-07T09:46:34+09:00
updated: 2026-08-07T10:00:00+09:00
status: completed
overview: Port warp-ui ProductCard into betterliving-ui and align UnitCard visuals to warp-ui UnitCard; Storybook coverage.
todos:
  - id: unit-card-ui
    content: Align UnitCard markup/styles to warp-ui (labels, shadow-box, price row, skeleton)
    status: completed
  - id: product-card
    content: Add ProductCard (Swiper + map/nav) + CSS + package exports
    status: completed
  - id: stories
    content: ProductCard stories; refresh UnitCard stories
    status: completed
  - id: verify
    content: Build + typecheck betterliving-ui
    status: completed
---

# ProductCard + UnitCard align

Source of truth: `vscode2/warp-ui/lib/layouts/{UnitCard,ProductCard}`.

Keep betterliving extras: `soldOut`, `toUnitCardData`, DisplayUnitEditor click handling via `href ?? data.href`.
