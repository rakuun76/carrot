import {
  DAY_IN_MS,
  WEEK_IN_MS,
  MONTH_IN_MS,
  YEAR_IN_MS,
} from "@/lib/constants";

function getDatePart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatToTimeAgo(createdAt: Date) {
  const now = new Date();

  const createdAtDate = getDatePart(createdAt);
  const nowDate = getDatePart(now);

  const createdAtMS = createdAtDate.getTime();
  const nowMS = nowDate.getTime();

  const diff = createdAtMS - nowMS;

  let rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });
  if (diff / YEAR_IN_MS <= -1) {
    return rtf.format(Math.ceil(diff / YEAR_IN_MS), "year");
  } else if (diff / MONTH_IN_MS <= -1) {
    return rtf.format(Math.ceil(diff / MONTH_IN_MS), "month");
  } else if (diff / WEEK_IN_MS <= -1) {
    return rtf.format(Math.ceil(diff / WEEK_IN_MS), "week");
  } else {
    return rtf.format(Math.ceil(diff / DAY_IN_MS), "day");
  }
}

export function formatToWon(price: number) {
  return new Intl.NumberFormat("ko", {
    style: "currency",
    currency: "KRW",
  }).format(price);
}
