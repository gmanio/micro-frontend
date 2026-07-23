---
name: Storybook stories for all shadcn UI
created: 2026-07-23T10:09:18+09:00
updated: 2026-07-23T10:12:00+09:00
status: completed
overview: @repo/ui에 추가된 shadcn 컴포넌트마다 Storybook 스토리를 추가하고 preview(TooltipProvider)를 맞춘다.
todos:
  - id: preview
    content: preview에 TooltipProvider 데코레이터
    status: completed
  - id: stories
    content: stories/ui/* 스토리 파일 생성 (전 컴포넌트)
    status: completed
  - id: verify
    content: build:storybook 및 깨진 스토리 수정
    status: completed
---

# Storybook for all @repo/ui components

- 61 story files under `apps/storybook/stories/ui/`
- preview: TooltipProvider + Toaster
- `build:storybook` OK — 123 catalog entries, 61 UI titles
