import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import dayjs from "dayjs";
import {
  InventoryTimeline,
  getInventoryTimelineDefaultDateEnd,
  getInventoryTimelineDefaultDateStart,
  type InventoryTimelineRoom,
} from "@dndproperty/betterliving-ui/components/InventoryTimeline";
import "@dndproperty/betterliving-ui/inventory-timeline.css";

import {
  creatorTownSeogyoRoomsEmpty,
  withDemoOccupancy,
} from "./fixtures/creator-town-seogyo-rooms";

function TimelineDemo({
  rooms,
  label,
}: {
  rooms: InventoryTimelineRoom[];
  label: string;
}) {
  const defaultRange = useMemo(
    () => ({
      start: dayjs(getInventoryTimelineDefaultDateStart()).valueOf(),
      end: dayjs(getInventoryTimelineDefaultDateEnd()).valueOf(),
    }),
    [],
  );
  const [visible, setVisible] = useState(defaultRange);
  const [lastSelect, setLastSelect] = useState<string>("(none)");
  const [lastRoomClick, setLastRoomClick] = useState<string>("(none)");
  const [lastRoomDbl, setLastRoomDbl] = useState<string>("(none)");

  return (
    <div className="box-border flex min-h-screen w-full max-w-none flex-col gap-3 p-4">
      <div className="flex w-full flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
        <span>
          {label} · <strong className="text-slate-900">{rooms.length}</strong> rooms
        </span>
        <span className="flex flex-col items-end gap-0.5 font-mono text-xs">
          <span>select: {lastSelect}</span>
          <span>roomClick: {lastRoomClick}</span>
          <span>roomDbl: {lastRoomDbl}</span>
        </span>
      </div>
      <div className="min-h-0 w-full flex-1 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <InventoryTimeline
          rooms={rooms}
          visibleTimeStart={visible.start}
          visibleTimeEnd={visible.end}
          onVisibleTimeChange={setVisible}
          onItemSelect={(payload) => {
            setLastSelect(
              `${payload.kind}:${payload.roomId}:${
                payload.inventoryEntry?.contractId ??
                payload.holdEntry?.contractId ??
                payload.blockEntry?.blockId ??
                ""
              }`,
            );
          }}
          onRoomClick={(roomId) => {
            setLastRoomClick(roomId);
          }}
          onRoomDoubleClick={(roomId) => {
            setLastRoomDbl(roomId);
          }}
        />
      </div>
    </div>
  );
}

const meta = {
  title: "BetterLiving/InventoryTimeline",
  component: InventoryTimeline,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof InventoryTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TimelineDemo
      rooms={withDemoOccupancy(creatorTownSeogyoRoomsEmpty)}
      label="Creator Town Seogyo (demo occupancy)"
    />
  ),
};

export const EmptyBars: Story = {
  render: () => (
    <TimelineDemo
      rooms={creatorTownSeogyoRoomsEmpty}
      label="Creator Town Seogyo (API empty lists)"
    />
  ),
};

export const Loading: Story = {
  render: () => {
    const rooms = withDemoOccupancy(creatorTownSeogyoRoomsEmpty);
    const start = dayjs(getInventoryTimelineDefaultDateStart()).valueOf();
    const end = dayjs(getInventoryTimelineDefaultDateEnd()).valueOf();
    return (
      <div className="box-border min-h-screen w-full max-w-none p-4">
        <div className="w-full rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <InventoryTimeline rooms={rooms} visibleTimeStart={start} visibleTimeEnd={end} loading />
        </div>
      </div>
    );
  },
};
