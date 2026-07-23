import { Badge } from "../badge"
import { Skeleton } from "../skeleton"
import { cn } from "../../lib/utils"
import type { UnitCardProps } from "./unit-card-data"

export function UnitCard({ className, data, ...props }: UnitCardProps) {
  const imageUrl = data.imgs[0]
  const labels = data.unitLabels?.slice(0, 2) ?? []

  return (
    <a
      href={data.href ?? `/units/${data.id}`}
      className={cn("group flex flex-col", className)}
      {...props}
    >
      <div className="relative isolate aspect-[16/10] overflow-hidden rounded-lg bg-muted">
        {imageUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url(${imageUrl})` }}
            role="img"
            aria-label={data.title}
          />
        ) : null}

        {data.soldOut ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-foreground/40">
            <Badge variant="secondary" className="rounded-md px-3 py-1 text-sm">
              Sold Out
            </Badge>
          </div>
        ) : null}

        {labels.length > 0 ? (
          <div className="absolute top-3 left-3 z-20 flex gap-2">
            {labels.map((label, index) => (
              <Badge
                key={label}
                variant={index > 0 ? "secondary" : "default"}
                className={cn(
                  "rounded-md px-3 py-1",
                  index === 0 && "bg-foreground/40 text-background"
                )}
              >
                {label}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col pb-4">
        <div className="mt-4 px-1">
          <p className="text-lg font-semibold tracking-tight text-foreground">
            {data.title}
          </p>
        </div>

        {data.options ? (
          <div className="mt-1 px-1">
            <p className="text-sm font-medium break-all text-muted-foreground">
              {data.options}
            </p>
          </div>
        ) : null}

        {data.description ? (
          <div className="mt-4 ml-1 flex w-fit max-w-[calc(100%-16px)] items-center gap-2 rounded-xl border border-border bg-background p-2 shadow-sm">
            <p className="text-sm font-medium break-normal text-foreground">
              {data.description}
            </p>
          </div>
        ) : null}

        <div className="mt-3 flex items-baseline gap-0.5 px-1">
          <p className="text-lg font-semibold tracking-tight text-foreground">
            {data.totalAmount}
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            {data.month}
          </p>
        </div>
      </div>
    </a>
  )
}

export function UnitCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-[270px] flex-col pb-4", className)}>
      <Skeleton className="aspect-video w-full rounded-lg" />
      <Skeleton className="mt-4 h-4 w-4/5 rounded-sm" />
      <Skeleton className="mt-3 h-4 w-3/5 rounded-sm" />
      <Skeleton className="mt-3 h-4 w-2/5 rounded-sm" />
    </div>
  )
}
