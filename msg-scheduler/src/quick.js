/**
 * 빠른 예약: "새벽에 생각난 걸 지금 적어두고 아침에 보내기".
 *
 * 시각을 직접 입력하는 대신 [내일 오전 9시] 같은 버튼 하나로 끝내기 위한 계산기다.
 * 모든 계산은 사용자 타임존의 벽시계 기준이고, 이미 지나간 후보는 목록에서 빠진다.
 */

import { partsInZone, zonedTimeToMs, formatInZone } from './time.js';

const HOUR_MS = 60 * 60 * 1000;
const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

export const DEFAULT_DAY_HOURS = { morning: 9, lunch: 13, evening: 19 };
/** 이 시간대에 발송 예정이면 "상대를 깨울 수 있다"고 경고한다. */
export const DEFAULT_QUIET_HOURS = { start: 22, end: 7 };

/** 오전 9시 → "오전 9시", 13시 → "오후 1시" */
export function hourLabel(hour) {
  if (hour === 0) return '자정';
  if (hour === 12) return '낮 12시';
  return hour < 12 ? `오전 ${hour}시` : `오후 ${hour - 12}시`;
}

/** 8월 19일 화요일 → "8/19(화)" */
export function dayLabel(ms, timeZone) {
  const p = partsInZone(ms, timeZone);
  return `${p.month}/${p.day}(${WEEKDAY_LABELS[p.weekday]})`;
}

/** 지정한 타임존에서 오늘 기준 offsetDays 뒤의 hour시 정각. */
function dayAt(nowMs, timeZone, offsetDays, hour) {
  const p = partsInZone(nowMs, timeZone);
  return zonedTimeToMs({ year: p.year, month: p.month, day: p.day + offsetDays, hour, minute: 0 }, timeZone);
}

/** 다음 특정 요일(0=일)까지의 일수. 오늘이면 7일 뒤로 넘긴다. */
function daysUntilWeekday(nowMs, timeZone, weekday) {
  const today = partsInZone(nowMs, timeZone).weekday;
  const diff = (weekday - today + 7) % 7;
  return diff === 0 ? 7 : diff;
}

/** 분 단위를 올림 정렬해서 "3시간 뒤 14:37" 같은 어중간한 시각을 피한다. */
function roundUpMinutes(ms, step = 5) {
  const unit = step * 60_000;
  return Math.ceil(ms / unit) * unit;
}

export function isQuietTime(ms, timeZone, quietHours = DEFAULT_QUIET_HOURS) {
  const { hour } = partsInZone(ms, timeZone);
  const { start, end } = quietHours;
  // 22시~7시처럼 자정을 넘는 구간과, 1시~5시처럼 넘지 않는 구간을 모두 처리한다.
  return start > end ? hour >= start || hour < end : hour >= start && hour < end;
}

/**
 * 지금 고를 수 있는 발송 시각 후보들.
 * 이미 지난 시각은 제외하고, 각 항목에 사람이 읽을 라벨과 심야 여부를 붙여 돌려준다.
 */
export function quickPresets(nowMs, timeZone, options = {}) {
  const dayHours = { ...DEFAULT_DAY_HOURS, ...(options.dayHours || {}) };
  const quietHours = { ...DEFAULT_QUIET_HOURS, ...(options.quietHours || {}) };

  const candidates = [
    { key: 'in-1h', label: '1시간 뒤', atMs: roundUpMinutes(nowMs + HOUR_MS), showTime: true },
    { key: 'in-3h', label: '3시간 뒤', atMs: roundUpMinutes(nowMs + 3 * HOUR_MS), showTime: true },
    { key: 'today-morning', label: `오늘 ${hourLabel(dayHours.morning)}`, atMs: dayAt(nowMs, timeZone, 0, dayHours.morning) },
    { key: 'today-lunch', label: `오늘 ${hourLabel(dayHours.lunch)}`, atMs: dayAt(nowMs, timeZone, 0, dayHours.lunch) },
    { key: 'today-evening', label: `오늘 ${hourLabel(dayHours.evening)}`, atMs: dayAt(nowMs, timeZone, 0, dayHours.evening) },
    { key: 'tomorrow-morning', label: `내일 ${hourLabel(dayHours.morning)}`, atMs: dayAt(nowMs, timeZone, 1, dayHours.morning) },
    { key: 'tomorrow-lunch', label: `내일 ${hourLabel(dayHours.lunch)}`, atMs: dayAt(nowMs, timeZone, 1, dayHours.lunch) },
    { key: 'tomorrow-evening', label: `내일 ${hourLabel(dayHours.evening)}`, atMs: dayAt(nowMs, timeZone, 1, dayHours.evening) },
    {
      key: 'monday-morning',
      label: `다음 월요일 ${hourLabel(dayHours.morning)}`,
      atMs: dayAt(nowMs, timeZone, daysUntilWeekday(nowMs, timeZone, 1), dayHours.morning),
    },
  ];

  const seen = new Set();
  return candidates
    .filter((item) => item.atMs > nowMs)
    .filter((item) => {
      // "3시간 뒤"와 "오늘 오후 7시"가 같은 시각이 되는 경우를 하나로 줄인다.
      if (seen.has(item.atMs)) return false;
      seen.add(item.atMs);
      return true;
    })
    .map((item) => decorate(item, timeZone, quietHours));
}

function decorate(item, timeZone, quietHours) {
  const at = formatInZone(item.atMs, timeZone);
  const day = dayLabel(item.atMs, timeZone);
  const clock = at.slice(11);
  return {
    key: item.key,
    label: item.label,
    atMs: item.atMs,
    at,
    // 버튼(칩) 아래 보조 표기: 라벨에 이미 시각이 있으면 날짜만 붙인다.
    when: item.showTime ? `${day} ${clock}` : day,
    // 확인 버튼처럼 시각이 반드시 보여야 하는 자리에 쓴다.
    whenFull: `${day} ${clock}`,
    quiet: isQuietTime(item.atMs, timeZone, quietHours),
  };
}

/** 프리셋 키 하나를 실제 발송 시각으로. 목록에 없는(이미 지난) 키면 null. */
export function resolveQuickPreset(key, nowMs, timeZone, options = {}) {
  return quickPresets(nowMs, timeZone, options).find((p) => p.key === key) || null;
}

/** 심야 시각을 다음 아침으로 미룬 시각. 경고와 함께 대안으로 제시한다. */
export function nextMorning(ms, timeZone, options = {}) {
  const dayHours = { ...DEFAULT_DAY_HOURS, ...(options.dayHours || {}) };
  const p = partsInZone(ms, timeZone);
  // 새벽(아침 시각 이전)이면 오늘 아침, 밤이면 내일 아침.
  const offset = p.hour < dayHours.morning ? 0 : 1;
  return dayAt(ms, timeZone, offset, dayHours.morning);
}

/** 메시지 첫 줄에서 예약 이름을 만든다. 새벽에 이름까지 짓게 하지 않으려는 것. */
export function titleFromMessage(message, max = 24) {
  const firstLine = String(message).trim().split('\n')[0].trim();
  if (!firstLine) return '메모';
  return firstLine.length <= max ? firstLine : `${firstLine.slice(0, max)}…`;
}
