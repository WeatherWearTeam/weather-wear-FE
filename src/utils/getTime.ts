import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

/**
 * 몇 년 전, 몇 개월 전, 몇 일 전, 몇 시간 전, 몇 분전, 몇 초전 으로 표시
 * @param createdAt
 * @returns
 */
export function getTimesAgo(createdAt: Date | string) {
  return dayjs(createdAt).fromNow();
}

/**
 * 2024년 7월 31일
 * 이런 식으로 표시
 * @param createdAt
 * @returns
 */
export function getCreatedTime(createdAt: Date | string) {
  return dayjs(createdAt).format("LL");
}
