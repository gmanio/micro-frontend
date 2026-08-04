export type InventoryContractStatus =
  | "ADMINSTART"
  | "START"
  | "BOOKED"
  | "CONTRACTED"
  | "GUARANTEED"
  | "READIED"
  | "MOVED"
  | "DEPRECATED"
  | "END"
  | (string & {});

export type InventoryBlockType = "HOLDING" | "REPAIR" | "CLEANING" | (string & {});

export type InventoryTimelineEntry = {
  contractId: string;
  status: InventoryContractStatus;
  fromDt?: string | null;
  toDt?: string | null;
  startDt?: string | null;
  endDt?: string | null;
  moveOutExpectedDt?: string | null;
};

export type InventoryTimelineHold = {
  contractId: string;
  status: InventoryContractStatus;
  fromDt?: string | null;
  toDt?: string | null;
  startDt?: string | null;
  endDt?: string | null;
  moveOutExpectedDt?: string | null;
};

export type InventoryTimelineBlock = {
  blockId: number;
  blockTyp?: InventoryBlockType | null;
  blockType?: InventoryBlockType | null;
  status?: string | null;
  fromDt?: string | null;
  toDt?: string | null;
  startDt?: string | null;
  endDt?: string | null;
  memo?: string | null;
};

export type InventoryTimelineRoom = {
  roomId: string;
  displayFl?: boolean;
  siteId?: string;
  siteNm: string;
  siteTypeId?: string;
  siteTypeNm?: string;
  siteDongId?: string;
  siteDongNm: string;
  roomNm?: string;
  roomNo: string;
  rentAmtStandard?: number;
  rentAmt1?: number;
  rentAmt3?: number;
  rentAmt6?: number;
  rentAmt12?: number;
  status?: string;
  unitList?: unknown[];
  inventoryList?: InventoryTimelineEntry[];
  holdList?: InventoryTimelineHold[];
  blockList?: InventoryTimelineBlock[];
};

export type InventoryTimelineItemKind = "contract" | "hold" | "block";

export type InventoryTimelineSelectPayload = {
  kind: InventoryTimelineItemKind;
  room: InventoryTimelineRoom | null;
  roomId: string;
  inventoryEntry?: InventoryTimelineEntry | null;
  holdEntry?: InventoryTimelineHold | null;
  blockEntry?: InventoryTimelineBlock | null;
};

export type InventoryTimelineVisibleRange = {
  start: number;
  end: number;
};
