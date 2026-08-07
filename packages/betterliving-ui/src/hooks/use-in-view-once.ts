"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Lightweight IntersectionObserver helper (warp-ui `useInView` equivalent).
 * Becomes active once and stays active (image lazy-load gate).
 */
export function useInViewOnce(options?: {
  rootMargin?: string
  threshold?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || isActive) return

    if (typeof IntersectionObserver === "undefined") {
      setIsActive(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsActive(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: options?.rootMargin ?? "200px",
        threshold: options?.threshold ?? 0,
      },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [isActive, options?.rootMargin, options?.threshold])

  return { ref, isActive }
}
