"use client";

import type { ReactNode } from "react";

import { cn } from "../../lib/utils";
import { BANNER_TEXT_Y, bannerTextTransition } from "./banner-motion";
import { parseMainBannerTitleMarkup } from "./parseMainBannerTitleMarkup";
import { RotatingText } from "./RotatingText";
import type { MainBannerSlide } from "./types";

/**
 * Enter stagger after swipe (all lines instant-exit first, same clock).
 * Headlines start first; episode follows after they have begun.
 */
const HEADLINE_L1_DELAY = 0.04;
const HEADLINE_L2_DELAY = 0.1;
/** After headline enter has started */
const EPISODE_DELAY = 0.4;

function BannerRotatingLine({
  motionKey,
  delay = 0,
  children,
  className,
  containerClassName,
}: {
  motionKey: string;
  delay?: number;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <RotatingText
      motionKey={motionKey}
      y={BANNER_TEXT_Y}
      transition={bannerTextTransition(delay)}
      containerClassName={cn("block w-full min-w-0 py-0.5", containerClassName)}
      className="block w-full min-w-0 max-w-full"
    >
      <p
        className={cn("bl-swiper-main-banner__text-shadow truncate", className)}
      >
        {children}
      </p>
    </RotatingText>
  );
}

function headlineClass(
  weight: "bold" | "light" | "medium",
  size: "desktop" | "mobile",
) {
  const weightClass =
    weight === "bold"
      ? "font-bold"
      : weight === "light"
        ? "font-light"
        : "font-medium"; // font-md
  if (size === "desktop") {
    return cn("text-white", weightClass, "text-2xl/[1.4] lg:text-[30px]/[1.4]");
  }
  return cn("text-white", weightClass, "text-[24px]/[1.4]");
}

export function MainBannerSlideCopy({
  slide,
  activeIndex,
}: {
  slide: MainBannerSlide;
  activeIndex: number;
}) {
  const weight = slide.headlineWeight ?? "medium";
  const deskClass = headlineClass(weight, "desktop");
  const mobClass = headlineClass(weight, "mobile");
  const [desk1, desk2] = slide.headlines.desktop;
  const [mob1, mob2] = slide.headlines.mobile;
  const keyBase = `${slide.key}-${activeIndex}`;

  return (
    <div className="pointer-events-none flex w-full min-w-0 flex-col gap-2">
      <BannerRotatingLine
        motionKey={`${keyBase}-episode`}
        delay={EPISODE_DELAY}
        className="text-base font-extrabold text-white lg:text-xl"
      >
        {parseMainBannerTitleMarkup(slide.episode)}
      </BannerRotatingLine>

      <div className="hidden w-full min-w-0 flex-col gap-0 text-white lg:flex">
        <BannerRotatingLine
          motionKey={`${keyBase}-l1`}
          delay={HEADLINE_L1_DELAY}
          className={deskClass}
        >
          {parseMainBannerTitleMarkup(desk1)}
        </BannerRotatingLine>
        <BannerRotatingLine
          motionKey={`${keyBase}-l2`}
          delay={HEADLINE_L2_DELAY}
          className={deskClass}
        >
          {parseMainBannerTitleMarkup(desk2)}
        </BannerRotatingLine>
      </div>
      <div className="flex w-full min-w-0 flex-col gap-0 text-white lg:hidden">
        <BannerRotatingLine
          motionKey={`${keyBase}-mob-l1`}
          delay={HEADLINE_L1_DELAY}
          className={mobClass}
        >
          {parseMainBannerTitleMarkup(mob1)}
        </BannerRotatingLine>
        <BannerRotatingLine
          motionKey={`${keyBase}-mob-l2`}
          delay={HEADLINE_L2_DELAY}
          className={mobClass}
        >
          {parseMainBannerTitleMarkup(mob2)}
        </BannerRotatingLine>
      </div>
    </div>
  );
}
