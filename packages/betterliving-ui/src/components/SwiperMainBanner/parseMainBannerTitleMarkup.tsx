import type { ReactNode } from "react"
import { createElement, Fragment } from "react"

const BOLD_TOKEN = /\[bold\]([\s\S]*?)\[\/bold\]/gi

/**
 * Render Main Banner title markup (`[bold]…[/bold]`) as React nodes.
 * Unknown tags are left as plain text.
 */
export function parseMainBannerTitleMarkup(text: string): ReactNode {
  if (!text) return null
  if (!text.includes("[bold]") && !text.includes("[BOLD]")) {
    return text
  }

  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  const re = new RegExp(BOLD_TOKEN.source, BOLD_TOKEN.flags)

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    nodes.push(
      createElement(
        "span",
        { key: `bold-${match.index}`, className: "font-bold" },
        match[1]
      )
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return createElement(Fragment, null, ...nodes)
}
