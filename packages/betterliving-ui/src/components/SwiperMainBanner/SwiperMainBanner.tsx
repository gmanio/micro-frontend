"use client"

import { useCallback, useRef, useState } from "react"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react"

import { cn } from "../../lib/utils"
import { MainBannerProgress } from "./MainBannerProgress"
import { MainBannerSlideCopy } from "./MainBannerSlideCopy"
import type {
  MainBannerImageFit,
  MainBannerSlide,
  SwiperMainBannerProps,
} from "./types"

function imageFitClass(fit: MainBannerImageFit | undefined): string {
  if (fit === "cover") return "bl-swiper-main-banner__image-cover"
  if (fit === "gasan") return "bl-swiper-main-banner__image-gasan"
  return "absolute inset-0 size-full max-w-none object-cover"
}

function SlideBackground({
  slide,
  isEn,
}: {
  slide: MainBannerSlide
  isEn: boolean
}) {
  const mobileSrc = isEn ? slide.mobileEn : slide.mobileKo

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute z-[100] h-full w-full bg-[linear-gradient(0deg,rgba(0,0,0,.12),rgba(0,0,0,.12)),linear-gradient(354.23deg,rgba(0,0,0,.3)_4.58%,rgba(0,0,0,0)_95.4%)]" />
      <img
        src={mobileSrc}
        alt=""
        className={cn(
          "bl-swiper-main-banner__img-mobile",
          imageFitClass(slide.mobileImageFit)
        )}
      />
      <img
        src={slide.desktop}
        alt=""
        fetchPriority={slide.highPriority ? "high" : undefined}
        className={cn(
          "bl-swiper-main-banner__img-desktop",
          imageFitClass(slide.desktopImageFit)
        )}
      />
    </div>
  )
}

export function SwiperMainBanner({
  slides,
  locale = "ko",
  autoplayDelay = 5000,
  className,
  onCtaClick,
}: SwiperMainBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperClass | null>(null)
  const isEn = locale === "en"
  const current = slides[activeIndex] ?? slides[0]

  const onSlideChange = useCallback((swiper: SwiperClass) => {
    setActiveIndex(swiper.realIndex)
  }, [])

  const goToSlide = useCallback((index: number) => {
    swiperRef.current?.slideToLoop(index)
  }, [])

  const handleCta = useCallback(
    (slide: MainBannerSlide, index: number) => {
      if (onCtaClick) {
        onCtaClick(slide, index)
        return
      }
      if (slide.externalFl) {
        window.open(slide.href, "_blank", "noopener,noreferrer")
        return
      }
      window.location.assign(slide.href)
    },
    [onCtaClick]
  )

  if (slides.length === 0 || !current) {
    return null
  }

  return (
    <div className={cn("bl-swiper-main-banner", className)}>
      <Swiper
        className={cn(
          "h-full w-full",
          "[&_.swiper-wrapper]:h-full",
          "[&_.swiper-slide]:h-full"
        )}
        modules={[Autoplay]}
        loop={slides.length > 1}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        onSlideChange={onSlideChange}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
          setActiveIndex(swiper.realIndex)
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.key} className="h-full overflow-hidden">
            <div className="relative h-full w-full">
              <SlideBackground slide={slide} isEn={isEn} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 z-10 mx-auto flex min-h-0 max-w-[1280px] flex-col px-4">
        <div className="flex min-h-0 flex-1 flex-col items-start justify-center">
          <div className="flex w-full max-w-[596px] flex-col">
            <div className="mt-20 flex flex-col gap-7">
              <MainBannerSlideCopy slide={current} activeIndex={activeIndex} />

              <button
                type="button"
                onClick={() => handleCta(current, activeIndex)}
                className="pointer-events-auto z-[5] inline-flex h-10 w-fit cursor-pointer items-center justify-center rounded-xl bg-black px-5 py-2 shadow-[2px_2px_8px_0px_rgba(0,0,0,0.2)] lg:h-auto"
              >
                <span className="text-sm/[1.4] leading-6 font-bold text-white lg:text-base/[1.4]">
                  {current.cta}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="pointer-events-none flex w-full max-w-[596px] shrink-0 flex-col items-start pt-7 pb-4">
          <MainBannerProgress
            activeIndex={activeIndex}
            total={slides.length}
            onSelectSlide={goToSlide}
          />
        </div>
      </div>
    </div>
  )
}
