---
name: SecurityPinKeypad UI component
created: 2026-08-07T11:12:10+09:00
updated: 2026-08-07T11:20:00+09:00
status: completed
overview: Port warp-web SecurityPinKeypad into @dndproperty/betterliving-ui with CSS export and Storybook.
todos:
  - id: component
    content: Add SecurityPinKeypad + CSS (ripple), no warp-ui deps
    status: completed
  - id: export
    content: package.json exports + copy-styles + Storybook story/alias
    status: completed
  - id: verify
    content: Build betterliving-ui
    status: completed
---

# SecurityPinKeypad

Source: `warp-web/src/components/SecurityPinKeypad`.

Replace `Box`/`Text`/`Icon` from warp-ui with div/span + lucide-react `ChevronLeft`.
