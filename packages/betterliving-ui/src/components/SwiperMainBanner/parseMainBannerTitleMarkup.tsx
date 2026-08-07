import type { ReactNode } from "react"
import { createElement, Fragment } from "react"

type MarkupStyle = "bold" | "italic" | "underline"

/**
 * Bracket tokens map to HTML tags:
 * [bold] → <strong>, [italic] → <i>, [underline] → <em>
 * Both forms are accepted as input.
 */
const MARKUP_TOKEN =
  /\[bold\]([\s\S]*?)\[\/bold\]|<strong>([\s\S]*?)<\/strong>|\[italic\]([\s\S]*?)\[\/italic\]|<i>([\s\S]*?)<\/i>|\[underline\]([\s\S]*?)\[\/underline\]|<em>([\s\S]*?)<\/em>/gi

const STYLE_CLASS: Record<MarkupStyle, string> = {
  bold: "bl-swiper-main-banner__mark-bold",
  italic: "bl-swiper-main-banner__mark-italic",
  underline: "bl-swiper-main-banner__mark-underline",
}

function hasTitleMarkup(text: string): boolean {
  return (
    /\[bold\]|\[italic\]|\[underline\]/i.test(text) ||
    /<(strong|i|em)[\s>]/i.test(text)
  )
}

function matchStyle(match: RegExpExecArray): {
  style: MarkupStyle
  inner: string
} | null {
  // Groups: 1 bold-bracket, 2 strong, 3 italic-bracket, 4 i, 5 underline-bracket, 6 em
  if (match[1] != null) return { style: "bold", inner: match[1] }
  if (match[2] != null) return { style: "bold", inner: match[2] }
  if (match[3] != null) return { style: "italic", inner: match[3] }
  if (match[4] != null) return { style: "italic", inner: match[4] }
  if (match[5] != null) return { style: "underline", inner: match[5] }
  if (match[6] != null) return { style: "underline", inner: match[6] }
  return null
}

/**
 * Render Main Banner title markup as React nodes.
 *
 * | Token / HTML     | Style      |
 * |------------------|------------|
 * | `[bold]` / `<strong>` | font-bold |
 * | `[italic]` / `<i>`    | italic    |
 * | `[underline]` / `<em>`| underline |
 *
 * Other tags are left as plain text.
 */
export function parseMainBannerTitleMarkup(text: string): ReactNode {
  if (!text) return null
  if (!hasTitleMarkup(text)) {
    return text
  }

  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  const re = new RegExp(MARKUP_TOKEN.source, MARKUP_TOKEN.flags)

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const parsed = matchStyle(match)
    if (parsed) {
      nodes.push(
        createElement(
          "span",
          {
            key: `${parsed.style}-${match.index}`,
            className: STYLE_CLASS[parsed.style],
          },
          parsed.inner,
        ),
      )
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return createElement(Fragment, null, ...nodes)
}
