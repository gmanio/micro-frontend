"use client"

import { cn } from "../../lib/utils"

export function MainBannerProgress({
  activeIndex,
  total,
  onSelectSlide,
}: {
  activeIndex: number
  total: number
  onSelectSlide: (index: number) => void
}) {
  if (total <= 1) return null

  const segmentPct = 100 / total

  return (
    <div className="relative z-[12] w-[194px] max-w-full shrink-0">
      <div
        className="pointer-events-none absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-[rgba(217,217,217,0.5)]"
        aria-hidden
      >
        <div
          className={cn(
            "bl-swiper-main-banner__indicator-bar absolute top-0 h-full rounded-full bg-white transition-[left,width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          )}
          style={{
            width: `${segmentPct}%`,
            left: `${(activeIndex / total) * 100}%`,
          }}
        />
      </div>
      <div
        className="relative flex min-h-11 w-full items-center"
        role="tablist"
        aria-label="Main banner slides"
      >
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={`${i + 1} / ${total}`}
            className="bl-swiper-main-banner__interactive h-11 min-h-11 flex-1 border-0 bg-transparent p-0"
            onClick={() => onSelectSlide(i)}
          />
        ))}
      </div>
    </div>
  )
}
