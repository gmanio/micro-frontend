import type { Transition } from "motion/react"

export const BANNER_TEXT_Y = 32

export const bannerTextTransition = (delay = 0): Transition => ({
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
  delay,
})
