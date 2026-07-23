---
name: Storybook stories for all shadcn UI
created: 2026-07-23T10:09:18+09:00
updated: 2026-07-23T10:09:18+09:00
status: active
overview: @repo/ui에 추가된 shadcn 컴포넌트마다 Storybook 스토리를 추가하고 preview(TooltipProvider)를 맞춘다.
todos:
  - id: preview
    content: preview에 TooltipProvider 데코레이터
    status: pending
  - id: stories
    content: stories/ui/* 스토리 파일 생성 (전 컴포넌트)
    status: pending
  - id: verify
    content: build:storybook 및 깨진 스토리 수정
    status: pending
---

# Storybook for all @repo/ui components

Import via `@repo/ui/components/ui/<name>`. Titles under `UI/<Name>`. Keep compositions minimal but interactive.
