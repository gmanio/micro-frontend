import type { TimelineItemBase } from "react-calendar-timeline";

import {
  getInventoryBarBackground,
  getInventoryBlockBackground,
  getInventoryBlockType,
  getInventoryBlockTypeLabel,
  GROUP_ROW_HEIGHT,
  INVENTORY_HOLD_BAR_COLOR,
  STATUS_DOT_COLORS,
} from "./colors";
import { dayjs } from "./dayjs-setup";
import type {
  InventoryTimelineBlock,
  InventoryTimelineEntry,
  InventoryTimelineHold,
  InventoryTimelineRoom,
} from "./types";

export type TimelineGroup = {
  id: string;
  title: string;
  subtitle?: string;
  color?: string;
  height?: number;
};

export type TimelineItem = TimelineItemBase<number> & {
  color?: string;
  height?: number;
  roomId?: string;
  siteNm?: string;
  siteDongNm?: string;
  roomNo?: string;
  displayFl?: boolean;
  status?: string;
  period?: string;
  contractId?: string;
  contractPeriod?: string;
  holdStatus?: string;
  inventoryEntry?: InventoryTimelineEntry | null;
  holdEntry?: InventoryTimelineHold | null;
  blockEntry?: InventoryTimelineBlock | null;
};

function getInventoryBlockPeriod(block: InventoryTimelineBlock): {
  startDt: string;
  endDt: string;
} {
  return {
    startDt: block.fromDt?.trim() || block.startDt?.trim() || "",
    endDt: block.toDt?.trim() || block.endDt?.trim() || "",
  };
}

export function mapRoomsToTimeline(rooms: InventoryTimelineRoom[]): {
  groups: TimelineGroup[];
  items: TimelineItem[];
} {
  const groups: TimelineGroup[] = rooms.map((room) => ({
    id: room.roomId,
    title: `${room.roomNo} - ${room.siteDongNm}`,
    color: room.displayFl !== false ? STATUS_DOT_COLORS.ACTIVE : STATUS_DOT_COLORS.INACTIVE,
    height: GROUP_ROW_HEIGHT,
  }));

  const items: TimelineItem[] = [];
  let nextId = 1;

  for (const room of rooms) {
    const entries = room.inventoryList ?? [];
    const holds = room.holdList ?? [];
    const blocks = room.blockList ?? [];
    if (entries.length === 0 && holds.length === 0 && blocks.length === 0) {
      continue;
    }

    const base = {
      group: room.roomId,
      roomId: room.roomId,
      siteNm: room.siteNm,
      siteDongNm: room.siteDongNm,
      roomNo: room.roomNo,
      displayFl: room.displayFl,
      status: room.status,
    };

    for (const inv of entries) {
      const timelineStartDt = inv.fromDt?.trim() || inv.startDt;
      const timelineEndDt = inv.toDt?.trim() || inv.endDt;
      if (!timelineStartDt || !timelineEndDt) continue;
      const period = `${dayjs(timelineStartDt).format("YYYY.MM.DD")} ~ ${dayjs(timelineEndDt).format("YYYY.MM.DD")}`;
      items.push({
        ...base,
        id: nextId++,
        color: getInventoryBarBackground(inv.status, inv.moveOutExpectedDt),
        title: period,
        period,
        start_time: dayjs(timelineStartDt).startOf("day").valueOf(),
        end_time: dayjs(timelineEndDt).endOf("day").valueOf(),
        inventoryEntry: inv,
      });
    }

    for (const hold of holds) {
      const holdStartDt = hold.fromDt?.trim();
      const holdEndDt = hold.toDt?.trim();
      if (!holdStartDt || !holdEndDt) continue;
      const period = `${dayjs(holdStartDt).format("YYYY.MM.DD")} ~ ${dayjs(holdEndDt).format("YYYY.MM.DD")}`;
      const contractPeriod =
        hold.startDt && hold.endDt
          ? `${dayjs(hold.startDt).format("YYYY.MM.DD")} ~ ${dayjs(hold.endDt).format("YYYY.MM.DD")}`
          : undefined;
      items.push({
        ...base,
        id: nextId++,
        color: INVENTORY_HOLD_BAR_COLOR,
        title: "연장 홀드",
        contractId: hold.contractId,
        period,
        contractPeriod,
        holdStatus: hold.status,
        start_time: dayjs(holdStartDt).startOf("day").valueOf(),
        end_time: dayjs(holdEndDt).endOf("day").valueOf(),
        holdEntry: hold,
      });
    }

    for (const block of blocks) {
      const blockType = getInventoryBlockType(block);
      const blockLabel = getInventoryBlockTypeLabel(blockType);
      const { startDt, endDt } = getInventoryBlockPeriod(block);
      if (!startDt || !endDt) continue;
      const period = `${dayjs(startDt).format("YYYY.MM.DD")} ~ ${dayjs(endDt).format("YYYY.MM.DD")}`;
      items.push({
        ...base,
        id: nextId++,
        color: getInventoryBlockBackground(block),
        title: `${blockLabel}${block.memo?.trim() ? ` · ${block.memo.trim()}` : ""}`,
        period,
        start_time: dayjs(startDt).startOf("day").valueOf(),
        end_time: dayjs(endDt).endOf("day").valueOf(),
        blockEntry: block,
      });
    }
  }

  return { groups, items };
}
