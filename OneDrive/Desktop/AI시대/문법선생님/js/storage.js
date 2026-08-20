const defaultState = () => ({
  version: 1,
  records: {},
  settings: { rate: 1, fontScale: 1, subtitles: true },
  recentUnit: null
});

export function createStore(storage, key = 'grammar-ai-teacher') {
  const load = () => {
    try {
      const parsed = JSON.parse(storage.getItem(key) || '{}');
      if (!parsed || typeof parsed !== 'object') return defaultState();
      const base = defaultState();
      return {
        ...base,
        ...parsed,
        version: 1,
        records: parsed.records && typeof parsed.records === 'object' ? parsed.records : {},
        settings: { ...base.settings, ...(parsed.settings || {}) }
      };
    } catch {
      return defaultState();
    }
  };
  const save = state => storage.setItem(key, JSON.stringify({ ...state, version: 1 }));
  return {
    load,
    save,
    reset: () => storage.removeItem(key),
    recordResult(unitId, { score, total }) {
      const state = load();
      const previous = state.records[unitId] || { bestScore: 0, total };
      state.records[unitId] = { bestScore: Math.max(previous.bestScore, score), total, completed: true };
      save(state);
      return state;
    },
    updateSettings(patch) {
      const state = load();
      state.settings = { ...state.settings, ...patch };
      save(state);
      return state;
    },
    setRecentUnit(unitId) {
      const state = load();
      state.recentUnit = unitId;
      save(state);
      return state;
    }
  };
}
