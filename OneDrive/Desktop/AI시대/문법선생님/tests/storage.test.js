import test from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from '../js/storage.js';

const memory = () => {
  const data = new Map();
  return {
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: key => data.delete(key)
  };
};

test('recordResult keeps the best score and completion', () => {
  const store = createStore(memory(), 'grammar-ai');
  store.recordResult('b1-c1-u1', { score: 2, total: 3 });
  store.recordResult('b1-c1-u1', { score: 1, total: 3 });
  assert.deepEqual(store.load().records['b1-c1-u1'], { bestScore: 2, total: 3, completed: true });
});

test('settings and recent unit survive a reload', () => {
  const storage = memory();
  const first = createStore(storage, 'grammar-ai');
  first.updateSettings({ rate: 0.8, subtitles: false });
  first.setRecentUnit('b2-c1-u1');
  const restored = createStore(storage, 'grammar-ai').load();
  assert.equal(restored.settings.rate, 0.8);
  assert.equal(restored.settings.subtitles, false);
  assert.equal(restored.recentUnit, 'b2-c1-u1');
});

test('load recovers from corrupt JSON', () => {
  const storage = memory();
  storage.setItem('grammar-ai', '{bad');
  assert.deepEqual(createStore(storage, 'grammar-ai').load().records, {});
});
