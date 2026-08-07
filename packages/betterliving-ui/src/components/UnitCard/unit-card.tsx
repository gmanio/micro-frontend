"use client";

import * as React from "react";
import { createElement } from "react";

import { Skeleton } from "../skeleton";
import { useInViewOnce } from "../../hooks/use-in-view-once";
import { cn } from "../../lib/utils";
import type { UnitCardProps } from "./unit-card-data";

import "../../styles/unit-card.css";

export function UnitCard({
  className,
  data,
  href,
  as,
  textTheme = "dark",
  price,
  isPriceLoading = false,
  lazyRootMargin = "200px",
  ...props
}: UnitCardProps) {
  const themeClass = textTheme === "light" ? "text-white" : "text-foreground";
  const mutedClass =
    textTheme === "light" ? "text-white/40" : "text-muted-foreground";
  const resolvedHref = href ?? data.href;
  const Wrapper = (
    resolvedHref ? (as ?? "a") : React.Fragment
  ) as React.ElementType;
  const wrapperProps = resolvedHref
    ? { href: resolvedHref, className: "group" }
    : {};
  const { ref, isActive } = useInViewOnce({ rootMargin: lazyRootMargin });
  const labels = data.unitLabels?.slice(0, 2) ?? [];

  const card = (
    <div
      ref={ref}
      className={cn("relative flex cursor-pointer flex-col", className)}
      {...props}
    >
      <div className="relative isolate aspect-16/10 overflow-hidden bg-muted">
        {isActive && data.imgs[0] ? (
          <div
            className="absolute inset-0 bg-cover bg-center lg:transition-transform lg:duration-500 lg:ease-out lg:group-hover:scale-105"
            style={{ backgroundImage: `url(${data.imgs[0]})` }}
            role="img"
            aria-label={data.title}
          />
        ) : null}

        {data.soldOut ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-foreground/40">
            <span className="rounded-md bg-background/90 px-3 py-1 text-sm font-semibold text-foreground">
              Sold Out
            </span>
          </div>
        ) : null}

        {labels.length > 0 ? (
          <div className="absolute top-3 left-3 z-10 flex transform-gpu gap-x-2 backface-hidden">
            {labels.map((label, index) => (
              <div
                key={label}
                className={cn(
                  "px-3 py-1 text-xs font-bold",
                  index > 0
                    ? "bg-white/60 text-foreground"
                    : "bg-black/40 text-white",
                )}
              >
                {label}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mb-2 flex flex-col pb-4">
        <div className="mt-4 px-1">
          <p
            className={cn(
              "text-base font-bold tracking-tight lg:text-lg",
              themeClass,
            )}
          >
            {data.title}
          </p>
        </div>

        {data.options.length > 0 ? (
          <div className="mt-1 px-1">
            <p
              className={cn(
                "text-sm font-semibold break-all lg:text-base",
                mutedClass,
              )}
            >
              {data.options}
            </p>
          </div>
        ) : null}

        {data.description ? (
          <div
            className={cn(
              "bl-unit-card__shadow-box mt-4 ml-1 flex w-fit max-w-[calc(100%-16px)] items-center gap-x-2 rounded-[8px] p-2 px-4",
              textTheme === "light" ? "bg-white/10" : "bg-muted/60",
            )}
          >
            <p
              className={cn(
                "text-sm font-semibold break-normal lg:text-base",
                themeClass,
              )}
            >
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
              <span
                className={cn(
                  "text-xl font-bold tracking-tight lg:text-2xl",
                  themeClass,
                )}
              >
                {data.totalAmount}
              </span>
              <span className={cn("text-base font-bold", mutedClass)}>
                &nbsp;{data.month}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (!resolvedHref) return card;

  return createElement(Wrapper, wrapperProps, card);
}

export function UnitCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("w-[270px] flex-col pb-4", className)}>
      <Skeleton className="h-[200px] w-full rounded-none" />
      <Skeleton className="mt-4 h-4 w-4/5 rounded-none" />
      <Skeleton className="mt-4 h-4 w-3/5 rounded-none" />
      <Skeleton className="mt-4 h-4 w-2/5 rounded-none" />
    </div>
  );
}
