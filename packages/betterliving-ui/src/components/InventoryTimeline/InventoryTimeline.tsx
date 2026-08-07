"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import ReactCalendarTimeline, {
  DateHeader,
  TimelineHeaders,
} from "react-calendar-timeline";
import type { Dayjs } from "dayjs";
import "react-calendar-timeline/style.css";

import {
  getInventoryBarBackground,
  getInventoryBarContentStyle,
  getInventoryBlockBackground,
  getInventoryBlockType,
  getInventoryBlockTypeLabel,
  getInventoryContractStatusLabel,
  GROUP_ROW_HEIGHT,
  INVENTORY_HOLD_BAR_COLOR,
  ITEM_DEFAULT_HEIGHT,
} from "./colors";
import {
  dayjs,
  getInventoryTimelineDefaultDateEnd,
  getInventoryTimelineDefaultDateStart,
  verticalLineClassNamesForToday,
} from "./dayjs-setup";
import {
  mapRoomsToTimeline,
  type TimelineGroup,
  type TimelineItem,
} from "./mapRoomsToTimeline";
import type {
  InventoryTimelineRoom,
  InventoryTimelineSelectPayload,
  InventoryTimelineVisibleRange,
} from "./types";

import "../../styles/inventory-timeline.css";

export type InventoryTimelineProps = {
  rooms: InventoryTimelineRoom[];
  visibleTimeStart?: number;
  visibleTimeEnd?: number;
  onVisibleTimeChange?: (range: InventoryTimelineVisibleRange) => void;
  onItemSelect?: (payload: InventoryTimelineSelectPayload) => void;
  onItemDoubleClick?: (payload: InventoryTimelineSelectPayload) => void;
  /** Sidebar 동호수(그룹) 클릭 — `roomId` 전달 */
  onRoomClick?: (roomId: string) => void;
  /** Sidebar 동호수(그룹) 더블클릭 — `roomId` 전달 */
  onRoomDoubleClick?: (roomId: string) => void;
  loading?: boolean;
  className?: string;
  sidebarWidth?: number;
};

type TooltipState = {
  item: TimelineItem;
  x: number;
  y: number;
} | null;

const subscribeNever = () => () => {};
const getClientTrue = () => true;
const getServerFalse = () => false;

function buildSelectPayload(
  item: TimelineItem,
  roomsById: Map<string, InventoryTimelineRoom>,
): InventoryTimelineSelectPayload {
  const roomId = String(item.roomId ?? item.group);
  if (item.blockEntry) {
    return {
      kind: "block",
      roomId,
      room: roomsById.get(roomId) ?? null,
      blockEntry: item.blockEntry,
    };
  }
  if (item.holdEntry) {
    return {
      kind: "hold",
      roomId,
      room: roomsById.get(roomId) ?? null,
      holdEntry: item.holdEntry,
    };
  }
  return {
    kind: "contract",
    roomId,
    room: roomsById.get(roomId) ?? null,
    inventoryEntry: item.inventoryEntry ?? null,
  };
}

/** Secondary header labels by RCT unit (day when zoomed in, month by default). */
function formatTimelineDayLabel([start]: [Dayjs, Dayjs], unit: string): string {
  if (unit === "day") {
    return start.format("DD(ddd)");
  }
  if (unit === "month") return start.format("M월");
  if (unit === "year") return start.format("YYYY");
  return start.format("DD(ddd)");
}

/**
 * Shift bar label into the currently visible scroll window (canvas px).
 * Prefer getLeftOffsetFromDate when available — matches item.dimensions.left space.
 */
function getBarVisibleSlicePx(
  itemLeft: number,
  itemWidth: number,
  viewportLeft: number,
  viewportRight: number,
): { offsetPx: number; maxWidthPx: number } {
  if (itemWidth <= 0) {
    return { offsetPx: 0, maxWidthPx: 0 };
  }
  const visibleLeft = Math.max(itemLeft, viewportLeft);
  const visibleRight = Math.min(itemLeft + itemWidth, viewportRight);
  if (visibleRight <= visibleLeft) {
    return { offsetPx: 0, maxWidthPx: itemWidth };
  }
  return {
    offsetPx: visibleLeft - itemLeft,
    maxWidthPx: visibleRight - visibleLeft,
  };
}

function buildBarLabel(item: TimelineItem): string {
  const inv = item.inventoryEntry;
  const hold = item.holdEntry;
  const block = item.blockEntry;
  const parts: string[] = [];

  if (inv) {
    const statusLabel = getInventoryContractStatusLabel(inv.status);
    if (statusLabel) parts.push(statusLabel);
    if (item.period) parts.push(item.period);
    return parts.join(" · ") || String(item.title ?? "");
  }

  if (hold) {
    parts.push("연장 홀드");
    const statusLabel = getInventoryContractStatusLabel(hold.status);
    if (statusLabel) parts.push(statusLabel);
    if (item.period) parts.push(item.period);
    return parts.join(" · ");
  }

  if (block) {
    const blockLabel = getInventoryBlockTypeLabel(getInventoryBlockType(block));
    parts.push(blockLabel);
    if (block.memo?.trim()) parts.push(block.memo.trim());
    if (item.period) parts.push(item.period);
    return parts.join(" · ");
  }

  return String(item.title ?? "");
}

export function InventoryTimeline({
  rooms,
  visibleTimeStart,
  visibleTimeEnd,
  onVisibleTimeChange,
  onItemSelect,
  onItemDoubleClick,
  onRoomClick,
  onRoomDoubleClick,
  loading = false,
  className,
  sidebarWidth = 180,
}: InventoryTimelineProps) {
  const defaultRange = useMemo(
    () => ({
      start: dayjs(getInventoryTimelineDefaultDateStart()).valueOf(),
      end: dayjs(getInventoryTimelineDefaultDateEnd()).valueOf(),
    }),
    [],
  );

  // Local live range updates synchronously so the canvas pans immediately.
  const [liveRange, setLiveRange] = useState(() => ({
    start: visibleTimeStart ?? defaultRange.start,
    end: visibleTimeEnd ?? defaultRange.end,
  }));
  const liveRangeRef = useRef(liveRange);
  useLayoutEffect(() => {
    liveRangeRef.current = liveRange;
  });

  // Label layout commits on pointer-up after a drag pan (not while moving).
  const [labelRange, setLabelRange] = useState(() => ({
    start: visibleTimeStart ?? defaultRange.start,
    end: visibleTimeEnd ?? defaultRange.end,
  }));
  const isPointerDraggingRef = useRef(false);

  useEffect(() => {
    if (visibleTimeStart == null || visibleTimeEnd == null) return;
    if (
      visibleTimeStart === liveRangeRef.current.start &&
      visibleTimeEnd === liveRangeRef.current.end
    ) {
      return;
    }
    const next = { start: visibleTimeStart, end: visibleTimeEnd };
    liveRangeRef.current = next;
    setLiveRange(next);
    setLabelRange(next);
  }, [visibleTimeStart, visibleTimeEnd]);

  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const portalReady = useSyncExternalStore(
    subscribeNever,
    getClientTrue,
    getServerFalse,
  );
  const hideTimerRef = useRef<number | null>(null);
  const verticalScrollRef = useRef<HTMLDivElement | null>(null);
  const verticalScrollTopRef = useRef(0);
  const roomsById = useMemo(() => {
    const map = new Map<string, InventoryTimelineRoom>();
    for (const room of rooms) map.set(room.roomId, room);
    return map;
  }, [rooms]);

  const { groups, items } = useMemo(() => mapRoomsToTimeline(rooms), [rooms]);

  // Keep vertical scroll when rooms/items refresh after horizontal pan.
  useLayoutEffect(() => {
    const el = verticalScrollRef.current;
    if (!el) return;
    const top = verticalScrollTopRef.current;
    el.scrollTop = top;
    // RCT may relayout after paint — restore again on the next frame.
    const raf = window.requestAnimationFrame(() => {
      const node = verticalScrollRef.current;
      if (node && node.scrollTop !== top) {
        node.scrollTop = top;
      }
    });
    return () => window.cancelAnimationFrame(raf);
  }, [rooms, groups, items, loading]);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current != null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const hideTooltipSoon = useCallback(() => {
    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => setTooltip(null), 120);
  }, [clearHideTimer]);

  const commitLabelRangeFromLive = useCallback(() => {
    const { start, end } = liveRangeRef.current;
    setLabelRange({ start, end });
  }, []);

  useEffect(() => {
    const onPointerUp = () => {
      if (!isPointerDraggingRef.current) return;
      isPointerDraggingRef.current = false;
      commitLabelRangeFromLive();
    };
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      clearHideTimer();
    };
  }, [clearHideTimer, commitLabelRangeFromLive]);

  const handleTimeChange = useCallback(
    (
      start: number,
      end: number,
      updateScrollCanvas: (start: number, end: number) => void,
    ) => {
      const next = { start, end };
      liveRangeRef.current = next;
      setLiveRange(next);
      onVisibleTimeChange?.(next);
      updateScrollCanvas(start, end);
      // While dragging, keep previous label positions; commit on pointerup.
      if (!isPointerDraggingRef.current) {
        setLabelRange(next);
      }
    },
    [onVisibleTimeChange],
  );

  const handleVerticalScroll = useCallback(() => {
    const el = verticalScrollRef.current;
    if (!el) return;
    verticalScrollTopRef.current = el.scrollTop;
  }, []);

  const rootClassName = ["inventory-timeline-scroll relative", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={verticalScrollRef}
      className={rootClassName}
      onScroll={handleVerticalScroll}
    >
      <div
        className="inventory-timeline relative"
        style={
          {
            "--inv-timeline-sticky-top": "0px",
            "--inv-tl-sidebar-width": `${sidebarWidth}px`,
          } as CSSProperties
        }
        onPointerDown={() => {
          isPointerDraggingRef.current = true;
        }}
      >
        <ReactCalendarTimeline
          groups={groups}
          items={items}
          sidebarWidth={sidebarWidth}
          visibleTimeStart={liveRange.start}
          visibleTimeEnd={liveRange.end}
          onTimeChange={handleTimeChange}
          lineHeight={GROUP_ROW_HEIGHT}
          itemHeightRatio={ITEM_DEFAULT_HEIGHT / GROUP_ROW_HEIGHT}
          canMove={false}
          canResize={false}
          canSelect={false}
          canChangeGroup={false}
          traditionalZoom={false}
          minZoom={60 * 1000 * 60 * 24 * 24}
          verticalLineClassNamesForTime={verticalLineClassNamesForToday}
          groupRenderer={({ group }) => {
            const g = group as TimelineGroup;
            const roomId = String(g.id);
            const roomInteractive = Boolean(onRoomClick || onRoomDoubleClick);
            return (
              <div
                className={`flex h-full items-center gap-2 px-3${
                  roomInteractive
                    ? " inventory-timeline__room-row--interactive"
                    : ""
                }`}
                onClick={(e) => {
                  if (!onRoomClick) return;
                  e.preventDefault();
                  e.stopPropagation();
                  onRoomClick(roomId);
                }}
                onDoubleClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onRoomDoubleClick?.(roomId);
                }}
              >
                <div
                  className="inline-flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full shadow-sm ring-2 ring-white"
                  style={{ background: g.color ?? "#94a3b8" }}
                  aria-hidden
                />
                <span
                  className="min-w-0 truncate text-[13px] font-bold leading-none tracking-tight text-slate-800"
                  title={g.title}
                >
                  {g.title}
                </span>
              </div>
            );
          }}
          itemRenderer={({
            item,
            itemContext,
            getItemProps,
            timelineContext,
          }) => {
            const custom = item as TimelineItem;
            const itemHeight =
              itemContext.dimensions.height ?? ITEM_DEFAULT_HEIGHT;
            const inv = custom.inventoryEntry;
            const hold = custom.holdEntry;
            const block = custom.blockEntry;
            const contractId = inv?.contractId ?? hold?.contractId;
            const barBg = inv
              ? getInventoryBarBackground(inv.status, inv.moveOutExpectedDt)
              : hold
                ? INVENTORY_HOLD_BAR_COLOR
                : block
                  ? getInventoryBlockBackground(block)
                  : (custom.color ?? "#F4B183");
            const contentStyle = getInventoryBarContentStyle(barBg);
            const { key, ...itemProps } = getItemProps({
              style: {
                background: barBg,
                border: "1px solid rgba(15, 23, 42, 0.2)",
                borderRadius: 0,
                boxShadow:
                  "0 1px 2px rgb(15 23 42 / 0.2), 0 3px 10px -3px rgb(15 23 42 / 0.18), inset 0 1px 0 rgb(255 255 255 / 0.22)",
              },
            });
            const clickable = Boolean(block || contractId?.trim());
            const barLabel = buildBarLabel(custom);

            const { left: itemLeft, width: itemWidth } = itemContext.dimensions;
            const viewportLeft = timelineContext.getLeftOffsetFromDate(
              labelRange.start,
            );
            const viewportRight = timelineContext.getLeftOffsetFromDate(
              labelRange.end,
            );
            const { offsetPx, maxWidthPx } = getBarVisibleSlicePx(
              itemLeft,
              itemWidth,
              viewportLeft,
              viewportRight,
            );

            return (
              <div
                key={key}
                {...itemProps}
                className={`overflow-hidden ${clickable ? "cursor-pointer" : ""}`}
                onMouseEnter={(e) => {
                  clearHideTimer();
                  setTooltip({ item: custom, x: e.clientX, y: e.clientY });
                }}
                onMouseMove={(e) =>
                  setTooltip((prev) =>
                    prev ? { ...prev, x: e.clientX, y: e.clientY } : null,
                  )
                }
                onMouseLeave={hideTooltipSoon}
                onClick={() => {
                  setTooltip(null);
                  onItemSelect?.(buildSelectPayload(custom, roomsById));
                }}
                onDoubleClick={() => {
                  setTooltip(null);
                  onItemDoubleClick?.(buildSelectPayload(custom, roomsById));
                }}
              >
                <div
                  className="rct-item-content inline-flex h-full items-center overflow-hidden px-1.5 text-xs font-semibold leading-none"
                  style={{
                    ...contentStyle,
                    height: itemHeight,
                    borderRadius: 0,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    maxWidth: Math.max(0, maxWidthPx),
                    transform: `translate3d(${offsetPx}px,0,0)`,
                    boxSizing: "border-box",
                  }}
                >
                  <span className="truncate whitespace-nowrap" title={barLabel}>
                    {barLabel}
                  </span>
                </div>
              </div>
            );
          }}
        >
          <TimelineHeaders>
            <DateHeader unit="primaryHeader" />
            <DateHeader labelFormat={formatTimelineDayLabel} />
          </TimelineHeaders>
        </ReactCalendarTimeline>

        {loading ? (
          <div
            className="pointer-events-none absolute inset-0 z-[60] flex flex-col items-center justify-center gap-2 rounded-[inherit] bg-white/40"
            aria-busy
            aria-live="polite"
          >
            <span className="text-sm font-semibold tracking-tight text-slate-600">
              불러오는 중…
            </span>
          </div>
        ) : null}

        {portalReady && tooltip
          ? createPortal(
              <div
                className="pointer-events-none fixed max-w-xs rounded-md border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg"
                style={{
                  left: tooltip.x + 12,
                  top: tooltip.y + 12,
                  zIndex: 2147483000,
                }}
                role="tooltip"
              >
                <div className="font-semibold text-slate-800">
                  {tooltip.item.siteDongNm} {tooltip.item.roomNo}
                </div>
                <div className="mt-0.5 text-slate-600">
                  {tooltip.item.inventoryEntry
                    ? `계약 · ${tooltip.item.inventoryEntry.contractId}`
                    : tooltip.item.holdEntry
                      ? `연장 홀드 · ${tooltip.item.holdEntry.contractId}`
                      : tooltip.item.blockEntry
                        ? String(tooltip.item.title ?? "이슈")
                        : String(tooltip.item.title ?? "")}
                </div>
                {tooltip.item.period ? (
                  <div className="mt-0.5 text-slate-500">
                    {tooltip.item.period}
                  </div>
                ) : null}
              </div>,
              document.body,
            )
          : null}
      </div>
    </div>
  );
}
