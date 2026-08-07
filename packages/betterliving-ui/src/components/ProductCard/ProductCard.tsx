"use client"

import type * as React from "react"
import { useRef, useState } from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  SparklesIcon,
} from "lucide-react"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react"

import { Skeleton } from "../skeleton"
import { useInViewOnce } from "../../hooks/use-in-view-once"
import { cn } from "../../lib/utils"

import "../../styles/product-card.css"
import "swiper/css"
import "swiper/css/navigation"

export type ProductCardData = {
  title: string
  options: string
  description?: string
  originAmount?: string
  percent?: string
  totalAmount: string
  month: string
  imgs: string[]
  unitLabels?: string[]
}

export type ProductCardProps = React.ComponentProps<"div"> & {
  data: ProductCardData
  hideDiscount?: boolean
  onMapClick: () => void
  /** Replaces the default totalAmount + month row. */
  price?: React.ReactNode
  isPriceLoading?: boolean
  lazyRootMargin?: string
}

export function ProductCard({
  className,
  data,
  onMapClick,
  hideDiscount = false,
  price,
  isPriceLoading = false,
  lazyRootMargin = "200px",
  ...props
}: ProductCardProps) {
  void hideDiscount
  const swiperRef = useRef<SwiperClass | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const { ref, isActive } = useInViewOnce({ rootMargin: lazyRootMargin })
  const labels = data.unitLabels?.slice(0, 2) ?? []

  return (
    <div ref={ref} className={cn("relative flex flex-col", className)} {...props}>
      <Swiper
        slidesPerView={1}
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => {
          setActiveIdx(swiper.activeIndex)
        }}
        className="bl-product-card__swiper relative flex w-full hover:**:data-map-button:opacity-100 hover:**:data-prev-button:opacity-100 hover:**:data-next-button:opacity-100"
      >
        {data.imgs.map((src, idx) => (
          <SwiperSlide key={`${src}-${idx}`}>
            {isActive ? (
              <img
                src={src}
                alt={`${data.title}-${idx + 1}`}
                className="aspect-16/10 w-full object-cover"
              />
            ) : (
              <div className="aspect-16/10 w-full bg-muted" aria-hidden />
            )}
          </SwiperSlide>
        ))}

        <button
          type="button"
          data-map-button
          className="absolute right-2 bottom-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity"
          onClick={(e) => {
            e.stopPropagation()
            onMapClick()
          }}
          aria-label="지도 보기"
        >
          <MapPinIcon className="h-5 w-5 text-white" />
        </button>

        {activeIdx > 0 ? (
          <button
            type="button"
            data-prev-button
            className="absolute top-1/2 left-2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 transition-opacity lg:opacity-0"
            onClick={(e) => {
              e.stopPropagation()
              swiperRef.current?.slidePrev()
            }}
            aria-label="이전 이미지"
          >
            <ChevronLeftIcon className="h-5 w-5 text-white" />
          </button>
        ) : null}

        {data.imgs.length > 1 && data.imgs.length - 1 !== activeIdx ? (
          <button
            type="button"
            data-next-button
            className="absolute top-1/2 right-2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 transition-opacity lg:opacity-0"
            onClick={(e) => {
              e.stopPropagation()
              swiperRef.current?.slideNext()
            }}
            aria-label="다음 이미지"
          >
            <ChevronRightIcon className="h-5 w-5 text-white" />
          </button>
        ) : null}
      </Swiper>

      <div className="flex flex-col">
        {labels.length > 0 ? (
          <div className="mt-4 flex gap-x-2 truncate">
            {labels.map((label, index) => (
              <div
                key={label}
                className={cn(
                  "px-3 py-1 text-xs font-bold",
                  index < 1
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground",
                )}
              >
                {label}
              </div>
            ))}
          </div>
        ) : null}

        <div className="mt-4 px-1">
          <p className="text-base font-bold tracking-tight text-foreground lg:text-lg">
            {data.title}
          </p>
        </div>

        {data.options.length > 0 ? (
          <div className="mt-1 px-1">
            <p className="text-sm font-semibold break-all text-muted-foreground lg:text-base">
              {data.options}
            </p>
          </div>
        ) : null}

        {data.description ? (
          <div className="mt-4 flex w-fit max-w-[calc(100%-16px)] items-center gap-x-2 rounded-xl p-2 shadow-[0px_0px_8px_#0000001A]">
            <SparklesIcon className="h-5 w-5 shrink-0" aria-hidden />
            <p className="text-sm font-semibold break-normal text-foreground lg:text-base">
              {data.description}
            </p>
          </div>
        ) : null}

        <div className="mt-3" />

        <div className="mt-1 items-baseline px-1">
          {isPriceLoading ? (
            <Skeleton className="h-7 w-40 rounded-sm bg-muted" />
          ) : price != null ? (
            price
          ) : (
            <>
              <span className="text-xl font-bold tracking-tight text-foreground lg:text-2xl">
                {data.totalAmount}
              </span>
              <span className="text-base font-bold text-muted-foreground">
                &nbsp;{data.month}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
