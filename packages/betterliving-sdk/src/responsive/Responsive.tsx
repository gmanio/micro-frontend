"use client";

import type { ReactNode } from "react";
import { useLayout } from "./provider.js";

export type ResponsiveProps = {
  mobile: ReactNode;
  desktop: ReactNode;
};

/** Renders the slot matching the resolved layout from BetterLivingSdkProvider. */
export function Responsive({ mobile, desktop }: ResponsiveProps) {
  const layout = useLayout();
  return <>{layout === "desktop" ? desktop : mobile}</>;
}
