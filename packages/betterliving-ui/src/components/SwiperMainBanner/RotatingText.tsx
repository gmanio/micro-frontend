"use client"

import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
} from "motion/react"
import * as React from "react"

import { cn } from "../../lib/utils"

export type RotatingTextProps = {
  text?: string | string[]
  /** Rich copy. When set, `motionKey` is used for AnimatePresence. */
  children?: React.ReactNode
  /** Required when `children` is used — stable key per slide / line. */
  motionKey?: string
  duration?: number
  /** Enter transition (delay applies to enter only). */
  transition?: Transition
  /**
   * Exit with no animation. Default true so stagger delays share the same
   * start clock after a swipe (exit no longer pushes enter timing).
   */
  instantExit?: boolean
  y?: number
  containerClassName?: string
} & Omit<HTMLMotionProps<"div">, "children">

export function RotatingText({
  text,
  children,
  motionKey,
  y = -50,
  duration = 2000,
  transition = { duration: 0.3, ease: "easeOut" },
  instantExit = true,
  containerClassName,
  ...props
}: RotatingTextProps) {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    if (!Array.isArray(text)) {
      return
    }
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % text.length)
    }, duration)
    return () => clearInterval(interval)
  }, [text, duration])

  const currentText = Array.isArray(text) ? text[index] : text

  const presenceKey =
    children != null
      ? (motionKey ?? "rotating-text-rich")
      : Array.isArray(text)
        ? currentText
        : currentText

  const enterTransition: Transition = {
    ...transition,
    delay: typeof transition.delay === "number" ? transition.delay : 0,
  }

  return (
    <div className={cn("overflow-hidden py-0", containerClassName)}>
      <AnimatePresence mode="sync">
        <motion.div
          {...(props as HTMLMotionProps<"div">)}
          key={presenceKey}
          initial={{ opacity: 0, y: -y }}
          animate={{
            opacity: 1,
            y: 0,
            transition: enterTransition,
          }}
          exit={{
            opacity: 0,
            y,
            transition: instantExit
              ? { duration: 0, delay: 0 }
              : { duration: 0.2, delay: 0 },
          }}
        >
          {children ?? currentText}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default RotatingText
