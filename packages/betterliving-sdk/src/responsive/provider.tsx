"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_DESKTOP_MIN_WIDTH_PX,
  type LayoutMode,
  type ResolvedLayout,
} from "./types.js";

type SdkContextValue = {
  mode: LayoutMode;
  layout: ResolvedLayout;
  desktopMinWidthPx: number;
};

const SdkContext = createContext<SdkContextValue | null>(null);

export type BetterLivingSdkProviderProps = {
  children: ReactNode;
  /** `auto` follows viewport; `mobile` / `desktop` force the layout. */
  layout?: LayoutMode;
  /** Used when `layout="auto"`. Default 768. */
  desktopMinWidthPx?: number;
};

function useMediaDesktop(minWidthPx: number): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidthPx}px)`);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [minWidthPx]);

  return matches;
}

export function BetterLivingSdkProvider({
  children,
  layout: mode = "auto",
  desktopMinWidthPx = DEFAULT_DESKTOP_MIN_WIDTH_PX,
}: BetterLivingSdkProviderProps) {
  const isDesktopMq = useMediaDesktop(desktopMinWidthPx);
  const layout: ResolvedLayout =
    mode === "auto" ? (isDesktopMq ? "desktop" : "mobile") : mode;

  return (
    <SdkContext.Provider value={{ mode, layout, desktopMinWidthPx }}>
      {children}
    </SdkContext.Provider>
  );
}

export function useLayout(): ResolvedLayout {
  const ctx = useContext(SdkContext);
  if (!ctx) {
    throw new Error(
      "useLayout must be used within BetterLivingSdkProvider",
    );
  }
  return ctx.layout;
}

export function useSdkContext(): SdkContextValue {
  const ctx = useContext(SdkContext);
  if (!ctx) {
    throw new Error(
      "useSdkContext must be used within BetterLivingSdkProvider",
    );
  }
  return ctx;
}
