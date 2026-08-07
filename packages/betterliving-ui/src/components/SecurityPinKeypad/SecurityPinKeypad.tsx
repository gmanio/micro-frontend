"use client"

import {
  useCallback,
  useRef,
  useState,
  type Dispatch,
  type PointerEvent,
  type ReactNode,
  type SetStateAction,
} from "react"
import { ChevronLeft } from "lucide-react"

import { cn } from "../../lib/utils"

import "../../styles/security-pin-keypad.css"

const BASE_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Flex"]

const shuffleKeys = (keys: string[]) =>
  [...keys].sort(() => 0.5 - Math.random())

const KEYPAD_KEY_CLASS = cn(
  "relative flex h-[66.75px] w-full items-center justify-center overflow-hidden rounded-none border-0 p-0",
  "touch-manipulation select-none bg-transparent outline-none [-webkit-tap-highlight-color:transparent]",
)

type Ripple = {
  id: number
  x: number
  y: number
  size: number
}

function KeypadKey({
  children,
  onClick,
  "aria-label": ariaLabel,
}: {
  children: ReactNode
  onClick?: () => void
  "aria-label"?: string
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rippleIdRef = useRef(0)
  const [ripples, setRipples] = useState<Ripple[]>([])

  const createRipple = useCallback((event: PointerEvent<HTMLButtonElement>) => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const size =
      Math.max(
        Math.hypot(x, y),
        Math.hypot(rect.width - x, y),
        Math.hypot(x, rect.height - y),
        Math.hypot(rect.width - x, rect.height - y),
      ) * 2

    rippleIdRef.current += 1
    const id = rippleIdRef.current

    setRipples((prev) => [...prev, { id, x, y, size }])
  }, [])

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
  }, [])

  return (
    <button
      ref={buttonRef}
      type="button"
      className={KEYPAD_KEY_CLASS}
      aria-label={ariaLabel}
      onPointerDown={createRipple}
      onClick={onClick}
    >
      <span
        className="pointer-events-none absolute inset-0 z-0 bg-[#33333b]"
        aria-hidden
      />
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="bl-security-pin-keypad__ripple"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
          onAnimationEnd={() => removeRipple(ripple.id)}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export type SecurityPinKeypadProps = {
  code: string[]
  setCode: Dispatch<SetStateAction<string[]>>
  onFinish: (updatedCode: string) => void
  handleBack?: () => void
  onInput?: () => void
  className?: string
}

export function SecurityPinKeypad({
  code,
  setCode,
  onFinish,
  handleBack,
  onInput,
  className,
}: SecurityPinKeypadProps) {
  const [keys, setKeys] = useState(() => shuffleKeys(BASE_KEYS))

  const handleButton = useCallback(
    (val: string) => () => {
      if (val === "Flex") {
        setKeys((prev) => shuffleKeys(prev))
        return
      }

      const idx = code.indexOf("")
      if (idx === -1) return

      setCode((prev) => prev.map((item, index) => (index === idx ? val : item)))
      onInput?.()
      if (idx === code.length - 1) {
        onFinish(code.concat(val).join(""))
      }
    },
    [code, onFinish, onInput, setCode],
  )

  return (
    <div className={cn("w-full bg-[#33333b] py-4", className)}>
      <div className="grid w-full min-w-[375px] grid-cols-3 gap-1">
        {keys.map((item) =>
          item === "Flex" ? (
            <KeypadKey key={item} onClick={handleButton(item)}>
              <span className="text-xl font-extrabold text-white lg:text-2xl">
                {item}
              </span>
            </KeypadKey>
          ) : (
            <KeypadKey key={item} onClick={handleButton(item)}>
              <span className="text-3xl font-bold text-white lg:text-4xl">
                {item}
              </span>
            </KeypadKey>
          ),
        )}
        <KeypadKey onClick={handleBack} aria-label="Backspace">
          <ChevronLeft size={32} color="#99999D" aria-hidden />
        </KeypadKey>
      </div>
    </div>
  )
}
