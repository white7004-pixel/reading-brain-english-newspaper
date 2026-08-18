/**
 * 5필드 cron 파서 (분 시 일 월 요일).
 *
 * 지원: 별표, 증분(슬래시), 범위(하이픈), 목록(콤마), 숫자, 요일/월 이름(SUN, JAN ...)
 * 요일은 0=일요일 ~ 6=토요일이며 7도 일요일로 받아준다.
 */

import { partsInZone, minuteKey } from './time.js';

const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DOW_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const FIELDS = [
  { key: 'minute', min: 0, max: 59 },
  { key: 'hour', min: 0, max: 23 },
  { key: 'dom', min: 1, max: 31 },
  { key: 'month', min: 1, max: 12, names: MONTH_NAMES, nameOffset: 1 },
  { key: 'dow', min: 0, max: 6, names: DOW_NAMES, nameOffset: 0 },
];

/** cron 문자열을 파싱해 { minute:Set, hour:Set, ... , domRestricted, dowRestricted } 로 만든다. */
export function parseCron(expression) {
  const tokens = String(expression).trim().split(/\s+/);
  if (tokens.length !== 5) {
    throw new Error(`cron은 5개 필드여야 합니다 (분 시 일 월 요일): "${expression}"`);
  }
  const parsed = {};
  tokens.forEach((token, i) => {
    const field = FIELDS[i];
    parsed[field.key] = parseField(token, field);
  });
  parsed.domRestricted = tokens[2] !== '*';
  parsed.dowRestricted = tokens[4] !== '*';
  parsed.expression = tokens.join(' ');
  return parsed;
}

function parseField(token, field) {
  const values = new Set();
  for (const chunk of token.split(',')) {
    const [rangePart, stepPart] = chunk.split('/');
    const step = stepPart === undefined ? 1 : Number(stepPart);
    if (!Number.isInteger(step) || step < 1) {
      throw new Error(`증분 값이 올바르지 않습니다: "${chunk}"`);
    }

    let start;
    let end;
    if (rangePart === '*' || rangePart === '?') {
      start = field.min;
      end = field.max;
    } else if (rangePart.includes('-')) {
      const [a, b] = rangePart.split('-');
      start = toNumber(a, field);
      end = toNumber(b, field);
    } else {
      start = toNumber(rangePart, field);
      end = stepPart === undefined ? start : field.max;
    }

    if (start > end) throw new Error(`범위가 뒤집혔습니다: "${chunk}"`);
    for (let v = start; v <= end; v += step) values.add(v);
  }
  if (values.size === 0) throw new Error(`값이 비어 있습니다: "${token}"`);
  return values;
}

function toNumber(raw, field) {
  const text = String(raw).trim().toUpperCase();
  if (field.names) {
    const idx = field.names.indexOf(text);
    if (idx >= 0) return idx + field.nameOffset;
  }
  let n = Number(text);
  if (field.key === 'dow' && n === 7) n = 0;
  if (!Number.isInteger(n) || n < field.min || n > field.max) {
    throw new Error(`${field.key} 값이 범위(${field.min}-${field.max})를 벗어났습니다: "${raw}"`);
  }
  return n;
}

/** 주어진 시각이 cron에 해당하는지. dom/dow가 모두 지정되면 cron 표준대로 OR 판정. */
export function cronMatches(parsed, ms, timeZone) {
  const p = partsInZone(ms, timeZone);
  if (!parsed.minute.has(p.minute)) return false;
  if (!parsed.hour.has(p.hour)) return false;
  if (!parsed.month.has(p.month)) return false;

  const domHit = parsed.dom.has(p.day);
  const dowHit = parsed.dow.has(p.weekday);
  if (parsed.domRestricted && parsed.dowRestricted) return domHit || dowHit;
  if (parsed.domRestricted) return domHit;
  if (parsed.dowRestricted) return dowHit;
  return true;
}

/** fromMs 이후 처음으로 조건에 맞는 시각(ms). 최대 2년까지 탐색한다. */
export function nextRunAfter(parsed, fromMs, timeZone) {
  const MINUTE = 60_000;
  let cursor = Math.floor(fromMs / MINUTE) * MINUTE + MINUTE;
  const limit = cursor + 366 * 2 * 24 * 60 * MINUTE;
  while (cursor < limit) {
    if (cronMatches(parsed, cursor, timeZone)) return cursor;
    cursor += MINUTE;
  }
  return null;
}

/**
 * fromMs(제외) ~ toMs(포함) 사이에 놓친 실행 시각들을 찾는다.
 * 서버가 잠깐 꺼져 있었을 때 밀린 예약을 복구하는 데 쓴다.
 */
export function matchesBetween(parsed, fromMs, toMs, timeZone, maxHits = 20) {
  const MINUTE = 60_000;
  const hits = [];
  let cursor = Math.floor(fromMs / MINUTE) * MINUTE + MINUTE;
  const end = Math.floor(toMs / MINUTE) * MINUTE;
  while (cursor <= end && hits.length < maxHits) {
    if (cronMatches(parsed, cursor, timeZone)) hits.push(cursor);
    cursor += MINUTE;
  }
  return hits;
}

/** 간편 설정(매일/매주/매월/평일)을 cron 문자열로 변환. */
export function buildCron({ repeat, hour, minute, weekdays = [], day = 1 }) {
  const h = Number(hour);
  const m = Number(minute);
  if (!Number.isInteger(h) || h < 0 || h > 23) throw new Error('시(hour)는 0~23이어야 합니다.');
  if (!Number.isInteger(m) || m < 0 || m > 59) throw new Error('분(minute)은 0~59여야 합니다.');

  switch (repeat) {
    case 'daily':
      return `${m} ${h} * * *`;
    case 'weekday':
      return `${m} ${h} * * 1-5`;
    case 'weekly': {
      if (!weekdays.length) throw new Error('요일을 하나 이상 선택하세요.');
      const list = [...new Set(weekdays.map(Number))].sort((a, b) => a - b).join(',');
      return `${m} ${h} * * ${list}`;
    }
    case 'monthly': {
      const d = Number(day);
      if (!Number.isInteger(d) || d < 1 || d > 31) throw new Error('일(day)은 1~31이어야 합니다.');
      return `${m} ${h} ${d} * *`;
    }
    case 'hourly':
      return `${m} * * * *`;
    default:
      throw new Error(`알 수 없는 반복 유형: ${repeat}`);
  }
}

/** cron 문자열을 한국어 설명으로. UI 확인용이라 대표적인 형태만 문장으로 풀어준다. */
export function describeCron(expression) {
  const parsed = parseCron(expression);
  const tokens = expression.trim().split(/\s+/);
  const [min, hour, dom, month, dow] = tokens;
  const time = () => `${pad(min)}분`;

  if (month === '*' && dom === '*' && dow === '*' && hour === '*') {
    return `매시 ${time()}마다`;
  }
  const at = `${[...parsed.hour].map(pad).join(', ')}시 ${[...parsed.minute].map(pad).join(', ')}분`;
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  if (dom === '*' && dow === '*') return `매일 ${at}`;
  if (dom === '*') {
    if (dow === '1-5') return `평일(월~금) ${at}`;
    return `매주 ${[...parsed.dow].map((d) => dayNames[d]).join('·')}요일 ${at}`;
  }
  if (dow === '*') return `매월 ${[...parsed.dom].join(', ')}일 ${at}`;
  return `${expression} (cron)`;
}

function pad(n) {
  return String(n).padStart(2, '0');
}

export { minuteKey };
