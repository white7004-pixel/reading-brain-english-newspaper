/**
 * JSON 파일 기반 저장소.
 *
 * 예약 수십~수백 건 규모를 상정한 앱이라 별도 DB 없이 파일 하나로 관리한다.
 * 쓰기는 임시 파일 + rename 으로 처리해 중간에 죽어도 파일이 깨지지 않게 한다.
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const MAX_LOGS = 2000;

const EMPTY = {
  version: 1,
  settings: {
    timeZone: 'Asia/Seoul',
    channels: {},
  },
  jobs: [],
  logs: [],
  retries: [],
};

export class Store {
  constructor(dataDir) {
    this.dataDir = dataDir;
    this.file = path.join(dataDir, 'db.json');
    this.tmpFile = path.join(dataDir, 'db.json.tmp');
    this.data = structuredClone(EMPTY);
    this.writing = null;
    this.dirty = false;
  }

  load() {
    fs.mkdirSync(this.dataDir, { recursive: true });
    if (!fs.existsSync(this.file)) {
      this.data = structuredClone(EMPTY);
      this.saveSync();
      return this.data;
    }
    try {
      const parsed = JSON.parse(fs.readFileSync(this.file, 'utf8'));
      this.data = { ...structuredClone(EMPTY), ...parsed };
      this.data.settings = { ...EMPTY.settings, ...(parsed.settings || {}) };
      this.data.settings.channels = { ...(parsed.settings?.channels || {}) };
      this.data.jobs ||= [];
      this.data.logs ||= [];
      this.data.retries ||= [];
    } catch (err) {
      const backup = `${this.file}.corrupt-${Date.now()}`;
      fs.copyFileSync(this.file, backup);
      console.error(`[store] db.json 을 읽지 못해 새로 시작합니다. 원본 백업: ${backup}`, err.message);
      this.data = structuredClone(EMPTY);
      this.saveSync();
    }
    return this.data;
  }

  saveSync() {
    fs.mkdirSync(this.dataDir, { recursive: true });
    fs.writeFileSync(this.tmpFile, JSON.stringify(this.data, null, 2));
    fs.renameSync(this.tmpFile, this.file);
    this.dirty = false;
  }

  /** 연속 변경을 한 번의 디스크 쓰기로 합친다. */
  save() {
    this.dirty = true;
    if (this.writing) return this.writing;
    this.writing = (async () => {
      await new Promise((r) => setTimeout(r, 25));
      while (this.dirty) {
        this.dirty = false;
        const payload = JSON.stringify(this.data, null, 2);
        await fsp.writeFile(this.tmpFile, payload);
        await fsp.rename(this.tmpFile, this.file);
      }
      this.writing = null;
    })().catch((err) => {
      this.writing = null;
      console.error('[store] 저장 실패:', err.message);
    });
    return this.writing;
  }

  // ---- 설정 ----

  get settings() {
    return this.data.settings;
  }

  updateSettings(patch) {
    if (patch.timeZone) this.data.settings.timeZone = patch.timeZone;
    if (patch.channels) {
      for (const [key, value] of Object.entries(patch.channels)) {
        const current = this.data.settings.channels[key] || {};
        const merged = { ...current };
        for (const [field, fieldValue] of Object.entries(value)) {
          // 빈 문자열은 "변경 없음"으로 본다. 비밀값을 UI에서 마스킹해 보내기 때문.
          if (fieldValue === '' || fieldValue === undefined) continue;
          merged[field] = fieldValue;
        }
        this.data.settings.channels[key] = merged;
      }
    }
    this.save();
    return this.data.settings;
  }

  getChannelConfig(key) {
    return this.data.settings.channels[key] || {};
  }

  setChannelConfig(key, config) {
    this.data.settings.channels[key] = { ...(this.data.settings.channels[key] || {}), ...config };
    this.save();
  }

  // ---- 예약 ----

  get jobs() {
    return this.data.jobs;
  }

  getJob(id) {
    return this.data.jobs.find((j) => j.id === id) || null;
  }

  addJob(job) {
    const record = { id: newId('job'), createdAt: Date.now(), ...job };
    this.data.jobs.push(record);
    this.save();
    return record;
  }

  updateJob(id, patch) {
    const job = this.getJob(id);
    if (!job) return null;
    Object.assign(job, patch, { id: job.id, createdAt: job.createdAt });
    this.save();
    return job;
  }

  removeJob(id) {
    const before = this.data.jobs.length;
    this.data.jobs = this.data.jobs.filter((j) => j.id !== id);
    this.data.retries = this.data.retries.filter((r) => r.jobId !== id);
    const removed = this.data.jobs.length !== before;
    if (removed) this.save();
    return removed;
  }

  // ---- 로그 ----

  addLog(entry) {
    const record = { id: newId('log'), at: Date.now(), ...entry };
    this.data.logs.unshift(record);
    if (this.data.logs.length > MAX_LOGS) this.data.logs.length = MAX_LOGS;
    this.save();
    return record;
  }

  listLogs({ jobId, limit = 200 } = {}) {
    const rows = jobId ? this.data.logs.filter((l) => l.jobId === jobId) : this.data.logs;
    return rows.slice(0, limit);
  }

  clearLogs() {
    this.data.logs = [];
    this.save();
  }

  // ---- 재시도 큐 ----

  get retries() {
    return this.data.retries;
  }

  addRetry(entry) {
    this.data.retries.push({ id: newId('retry'), ...entry });
    this.save();
  }

  removeRetry(id) {
    this.data.retries = this.data.retries.filter((r) => r.id !== id);
    this.save();
  }
}

export function newId(prefix) {
  return `${prefix}_${crypto.randomBytes(6).toString('hex')}`;
}
