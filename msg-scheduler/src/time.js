/**
 * 타임존 유틸.
 *
 * 예약 발송에서 가장 흔한 사고는 "서버는 UTC인데 사용자는 KST로 입력"이다.
 * 이 모듈은 모든 계산을 사용자가 지정한 타임존(기본 Asia/Seoul) 기준으로 맞춘다.
 */

const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const formatterCache = new Map();

function formatterFor(timeZone) {
  let fmt = formatterCache.get(timeZone);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      weekday: 'short',
    });
    formatterCache.set(timeZone, fmt);
  }
  return fmt;
}

/** 해당 타임존에서 본 날짜/시각 구성요소를 돌려준다. */
export function partsInZone(ms, timeZone) {
  const parts = formatterFor(timeZone).formatToParts(new Date(ms));
  const out = {};
  for (const { type, value } of parts) out[type] = value;
  return {
    year: Number(out.year),
    month: Number(out.month),
    day: Number(out.day),
    hour: Number(out.hour),
    minute: Number(out.minute),
    second: Number(out.second),
    weekday: WEEKDAY_INDEX[out.weekday],
  };
}

/** UTC 기준 시각과 해당 타임존 벽시계 사이의 차이(ms). 서머타임도 반영된다. */
function zoneOffsetMs(ms, timeZone) {
  const p = partsInZone(ms, timeZone);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUtc - ms;
}

/**
 * 특정 타임존의 벽시계 시각(2026-08-20 09:30 KST 같은)을 UTC epoch ms로 변환.
 * 오프셋이 시각에 의존하므로 두 번 수렴시킨다.
 */
export function zonedTimeToMs({ year, month, day, hour = 0, minute = 0, second = 0 }, timeZone) {
  const wall = Date.UTC(year, month - 1, day, hour, minute, second);
  let ms = wall - zoneOffsetMs(wall, timeZone);
  ms = wall - zoneOffsetMs(ms, timeZone);
  return ms;
}

/** "2026-08-20T09:30" 형태의 datetime-local 문자열을 해당 타임존 기준 epoch ms로. */
export function parseLocalDateTime(value, timeZone) {
  const m = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?$/.exec(String(value).trim());
  if (!m) throw new Error(`날짜 형식이 올바르지 않습니다: ${value} (예: 2026-08-20T09:30)`);
  return zonedTimeToMs(
    {
      year: Number(m[1]),
      month: Number(m[2]),
      day: Number(m[3]),
      hour: Number(m[4]),
      minute: Number(m[5]),
      second: Number(m[6] || 0),
    },
    timeZone,
  );
}

/** 분 단위 고유 키. 같은 예약이 같은 분에 두 번 나가는 것을 막는 용도. */
export function minuteKey(ms, timeZone) {
  const p = partsInZone(ms, timeZone);
  return `${p.year}-${pad(p.month)}-${pad(p.day)}T${pad(p.hour)}:${pad(p.minute)}`;
}

/** 사람이 읽는 표기: 2026-08-20 09:30 (KST) */
export function formatInZone(ms, timeZone) {
  const p = partsInZone(ms, timeZone);
  return `${p.year}-${pad(p.month)}-${pad(p.day)} ${pad(p.hour)}:${pad(p.minute)}`;
}

export function isValidTimeZone(timeZone) {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone });
    return true;
  } catch {
    return false;
  }
}

function pad(n) {
  return String(n).padStart(2, '0');
}
