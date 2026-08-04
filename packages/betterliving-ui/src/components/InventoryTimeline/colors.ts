import type { InventoryBlockType, InventoryContractStatus } from "./types";

export const ITEM_DEFAULT_HEIGHT = 24;
export const ITEM_BAR_TEXT_COLOR = "#1a3314";
/** #FFFFFF 막대용 짙은 글자색 */
export const ITEM_BAR_TEXT_COLOR_ON_LIGHT_BG = "#1e293b";
export const GROUP_ROW_HEIGHT = 30;
export const INVENTORY_HOLD_BAR_COLOR = "#C4B5FD";
/** 거주중 + 퇴거예정일 등록 — 홀드(보라)와 구분되는 틸 */
export const MOVED_WITH_EXPECTED_DATE_BAR_COLOR = "#6BCBBE";

export const STATUS_DOT_COLORS = {
  ACTIVE: "#4caf50",
  INACTIVE: "#9e9e9e",
} as const;

export const INVENTORY_ENTRY_STATUS_BAR_COLORS: Record<string, string> = {
  ADMINSTART: "#F4B183",
  START: "#F4B183",
  BOOKED: "#F4B183",
  READIED: "#F4B183",
  CONTRACTED: "#F4B183",
  GUARANTEED: "#F4B183",
  MOVED: "#A9D18E",
  END: "#FFFFFF",
  DEPRECATED: "#FFFFFF",
};

export const INVENTORY_BLOCK_TYPE_BAR_COLORS: Record<string, string> = {
  HOLDING: "#FACC15",
  REPAIR: "#F87171",
  CLEANING: "#60A5FA",
};

export const INVENTORY_BLOCK_TYPE_LABELS: Record<string, string> = {
  HOLDING: "홀딩",
  REPAIR: "수리",
  CLEANING: "청소",
};

export const INVENTORY_CONTRACT_STATUS_LABELS: Record<string, string> = {
  ADMINSTART: "예약중(미결제)",
  START: "예약대기",
  BOOKED: "예약중",
  READIED: "예약완료",
  CONTRACTED: "계약완료(계약서)",
  GUARANTEED: "계약완료(보증금)",
  MOVED: "거주중",
  END: "퇴거",
  DEPRECATED: "취소",
};

export function getInventoryContractStatusLabel(status: string | null | undefined): string {
  if (!status?.trim()) return "";
  return INVENTORY_CONTRACT_STATUS_LABELS[status] ?? status;
}

export function getInventoryBlockType(block: {
  blockTyp?: InventoryBlockType | null;
  blockType?: InventoryBlockType | null;
}): InventoryBlockType | undefined {
  return block.blockTyp || block.blockType || undefined;
}

export function getInventoryBlockBarBackground(blockType: string | null | undefined): string {
  if (!blockType) return "#94A3B8";
  return INVENTORY_BLOCK_TYPE_BAR_COLORS[blockType] ?? "#94A3B8";
}

export function getInventoryBlockBackground(block: {
  status?: string | null;
  blockTyp?: InventoryBlockType | null;
  blockType?: InventoryBlockType | null;
}): string {
  if (block.status === "INACTIVE") return "#9E9E9E";
  return getInventoryBlockBarBackground(getInventoryBlockType(block));
}

export function getInventoryBlockTypeLabel(blockType: string | null | undefined): string {
  if (!blockType) return "이슈";
  return INVENTORY_BLOCK_TYPE_LABELS[blockType] ?? blockType;
}

export function getInventoryBarBackground(
  status: InventoryContractStatus | string | undefined,
  moveOutExpectedDt?: string | null,
): string {
  if (status === "MOVED" && moveOutExpectedDt?.trim()) {
    return MOVED_WITH_EXPECTED_DATE_BAR_COLOR;
  }
  if (status == null || status === "") {
    return INVENTORY_ENTRY_STATUS_BAR_COLORS.BOOKED;
  }
  return INVENTORY_ENTRY_STATUS_BAR_COLORS[status] ?? INVENTORY_ENTRY_STATUS_BAR_COLORS.BOOKED;
}

export function getInventoryBarContentStyle(background?: string): {
  color: string;
  textShadow?: string;
} {
  const hex = (background ?? "#94A3B8").trim().replace("#", "").toLowerCase();
  const isWhite = hex === "ffffff" || hex === "fff";
  if (isWhite) {
    return { color: ITEM_BAR_TEXT_COLOR_ON_LIGHT_BG };
  }
  return {
    color: ITEM_BAR_TEXT_COLOR,
    textShadow: "0 1px 0 rgba(255, 255, 255, 0.35)",
  };
}
