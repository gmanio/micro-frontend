import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");
dayjs.locale("ko");

export { dayjs };

/** Default viewport: calendar year so RCT `getMinUnit` picks month columns. */
export function getInventoryTimelineDefaultDateStart(): string {
  return dayjs().startOf("year").format("YYYY-MM-DD");
}

export function getInventoryTimelineDefaultDateEnd(): string {
  return dayjs().endOf("year").format("YYYY-MM-DD");
}

export function verticalLineClassNamesForToday(startMs: number, endMs: number): string[] {
  const todayStart = dayjs().startOf("day").valueOf();
  const todayEnd = dayjs().endOf("day").valueOf();
  if (endMs < todayStart || startMs > todayEnd) return [];
  return ["rct-vl-today"];
}
