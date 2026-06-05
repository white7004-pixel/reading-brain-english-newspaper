import { useEffect, useMemo, useState } from 'react';
import type { BookData, Category, CategoryTopics, TopicSuggestion, WorkbookData } from './types';
import Worksheet, { Book, CombinedBook, CombinedWorksheet } from './Worksheet';

type Mode = 'single' | 'book';
type Step = 'config' | 'category' | 'topics' | 'preview' | 'book-topics' | 'book-preview';
type PrintMode = 'idle' | 'single' | 'combined';

/** 동시 호출 청크 크기 — Tier 1 OpenAI/신규 Anthropic 키의 RPM 보호 */
const BOOK_CONCURRENCY = 3;

/** unknown 에러를 안전한 메시지로 변환 (TS strict 호환) */
function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === 'string') return e;
  try { return JSON.stringify(e); } catch { return String(e); }
}

/** 청크 단위 동시 실행 — 동시성 limit 적용 */
async function runChunked<T, R>(items: T[], size: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    const results = await Promise.all(chunk.map((item, j) => fn(item, i + j)));
    results.forEach((r, j) => { out[i + j] = r; });
  }
  return out;
}

export default function App() {
  const [mode, setMode] = useState<Mode>('book');
  const [step, setStep] = useState<Step>('config');
  const [ar, setAr] = useState<number>(5.0);
  const [grade, setGrade] = useState<string>('Grade 7');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');

  const [categories, setCategories] = useState<Category[]>([]);

  // 단일 모드 상태
  const [category, setCategory] = useState<Category | null>(null);
  const [topics, setTopics] = useState<TopicSuggestion[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<TopicSuggestion | null>(null);
  const [data, setData] = useState<WorkbookData | null>(null);

  // 책 모드 상태
  const [bookTopics, setBookTopics] = useState<CategoryTopics[]>([]);
  const [bookSelections, setBookSelections] = useState<Record<string, TopicSuggestion | null>>({});
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [bookProgress, setBookProgress] = useState<{ done: number; total: number }>({ done: 0, total: 0 });

  const [loading, setLoading] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [printMode, setPrintMode] = useState<PrintMode>('idle');
  const [failedSections, setFailedSections] = useState<string[]>([]);

  useEffect(() => {
    const onAfter = () => setPrintMode('idle');
    window.addEventListener('afterprint', onAfter);
    return () => window.removeEventListener('afterprint', onAfter);
  }, []);

  // 인쇄 트리거: 상태 변경 후 React 커밋 → 브라우저 페인트 완료를 보장(rAF 2회)
  useEffect(() => {
    if (printMode === 'idle') return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => window.print())
    );
    return () => cancelAnimationFrame(id);
  }, [printMode]);

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(d => setCategories(d.categories || [])).catch(() => {});
  }, []);

  function printSingle() { setPrintMode('single'); }
  function printCombined() { setPrintMode('combined'); }

  // ─────── 단일 모드 ───────
  async function fetchTopics(cat: Category) {
    setLoading('주제 후보 생성 중…');
    setError('');
    try {
      const r = await fetch('/api/topics', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: cat.id, ar, grade })
      });
      if (!r.ok) throw new Error(await r.text());
      const d = await r.json();
      setTopics(d.topics || []);
      setStep('topics');
    } catch (e: unknown) {
      setError(`주제 생성 실패: ${errMsg(e)}`);
    } finally { setLoading(''); }
  }

  async function generateSingle(t: TopicSuggestion) {
    setLoading('영자신문 본문과 워크북 생성 중… (15~30초)');
    setError('');
    setSelectedTopic(t);
    try {
      const r = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: t.title, angle: t.angle, category: category?.id, ar, grade, length })
      });
      if (!r.ok) throw new Error(await r.text());
      const d = await r.json();
      setData(d);
      setStep('preview');
    } catch (e: unknown) {
      setError(`교재 생성 실패: ${errMsg(e)}`);
    } finally { setLoading(''); }
  }

  // ─────── 책 모드 ───────
  async function fetchBookTopics() {
    setLoading('8개 분야의 주제 후보를 동시에 생성 중… (10~25초)');
    setError('');
    try {
      const r = await fetch('/api/topics/all', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ar, grade, perCategory: 3 })
      });
      if (!r.ok) throw new Error(await r.text());
      const d = await r.json();
      const results: CategoryTopics[] = d.results || [];
      setBookTopics(results);
      // 기본 선택: 각 분야의 첫 번째 주제
      const sel: Record<string, TopicSuggestion | null> = {};
      results.forEach(r => { sel[r.categoryId] = r.topics[0] || null; });
      setBookSelections(sel);
      setStep('book-topics');
    } catch (e: unknown) {
      setError(`주제 생성 실패: ${errMsg(e)}`);
    } finally { setLoading(''); }
  }

  async function refreshOneCategory(categoryId: string) {
    setError('');
    try {
      const r = await fetch('/api/topics', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: categoryId, ar, grade, count: 3 })
      });
      if (!r.ok) throw new Error(await r.text());
      const d = await r.json();
      const newTopics: TopicSuggestion[] = d.topics || [];
      setBookTopics(prev => prev.map(p => p.categoryId === categoryId ? { ...p, topics: newTopics } : p));
      setBookSelections(prev => ({ ...prev, [categoryId]: newTopics[0] || null }));
    } catch (e: unknown) {
      setError(`주제 새로고침 실패: ${errMsg(e)}`);
    }
  }

  async function generateBook() {
    setError('');
    setFailedSections([]);
    const selected = bookTopics
      .map(ct => ({ ct, t: bookSelections[ct.categoryId] }))
      .filter((x): x is { ct: CategoryTopics; t: TopicSuggestion } => !!x.t);
    if (selected.length === 0) { setError('선택된 주제가 없습니다.'); return; }

    setBookProgress({ done: 0, total: selected.length });
    setLoading(`교재 책 생성 중… (0/${selected.length} 섹션)`);

    // 외부 카운터로 부수 효과를 state updater 밖에 둠
    let doneCount = 0;
    const total = selected.length;
    const failures: string[] = [];

    type SectionResult = { ok: true; data: WorkbookData } | { ok: false; categoryLabel: string };

    // 청크(BOOK_CONCURRENCY) 단위 동시 호출 + 개별 catch로 부분 성공 허용
    const results = await runChunked<typeof selected[number], SectionResult>(
      selected, BOOK_CONCURRENCY,
      async ({ ct, t }) => {
        try {
          const r = await fetch('/api/generate', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic: t.title, angle: t.angle, category: ct.categoryId, ar, grade, length })
          });
          if (!r.ok) throw new Error(await r.text());
          const data: WorkbookData = await r.json();
          doneCount++;
          setBookProgress({ done: doneCount, total });
          setLoading(`교재 책 생성 중… (${doneCount}/${total} 섹션)`);
          return { ok: true, data };
        } catch (e: unknown) {
          console.error(`[book] ${ct.categoryLabel} 실패:`, e);
          failures.push(ct.categoryLabel);
          doneCount++;
          setBookProgress({ done: doneCount, total });
          setLoading(`교재 책 생성 중… (${doneCount}/${total} 섹션, 실패 ${failures.length})`);
          return { ok: false, categoryLabel: ct.categoryLabel };
        }
      }
    );

    const sections = results.flatMap(r => r.ok ? [r.data] : []);
    setLoading('');
    setBookProgress({ done: 0, total: 0 });

    if (sections.length === 0) {
      setError(`모든 섹션 생성에 실패했습니다. 키/네트워크/요청 한도를 확인하세요. (실패: ${failures.join(', ')})`);
      return;
    }

    if (failures.length > 0) {
      setFailedSections(failures);
    }

    const now = new Date();
    const issueLabel = `Vol. ${now.getFullYear()} · ${now.toLocaleString('en-US', { month: 'short' }).toUpperCase()} Edition`;
    const book: BookData = {
      sections,
      meta: { ar, grade, length, generated_at: now.toISOString(), issue_label: issueLabel }
    };
    setBookData(book);
    setStep('book-preview');
  }

  function reset() {
    setData(null); setSelectedTopic(null); setTopics([]); setCategory(null);
    setBookData(null); setBookTopics([]); setBookSelections({});
    setShowAnswers(false);
    setFailedSections([]);
    setStep('config');
  }

  return (
    <div className="min-h-screen">
      <TopBar />
      {loading && (
        <div className="no-print fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl px-6 py-5 flex items-center gap-3 max-w-sm">
            <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin shrink-0" />
            <div>
              <div className="text-sm">{loading}</div>
              {bookProgress.total > 0 && (
                <div className="mt-2 w-56 bg-slate-200 rounded-full h-1.5">
                  <div className="bg-brand-600 h-1.5 rounded-full transition-all"
                    style={{ width: `${(bookProgress.done / bookProgress.total) * 100}%` }} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto p-6 no-print">
        <Stepper mode={mode} step={step} />
        {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded">{error}</div>}

        {step === 'config' && (
          <ConfigStep
            mode={mode} setMode={setMode}
            ar={ar} setAr={setAr}
            grade={grade} setGrade={setGrade}
            length={length} setLength={setLength}
            onNext={() => mode === 'single' ? setStep('category') : fetchBookTopics()}
          />
        )}

        {step === 'category' && (
          <CategoryStep
            categories={categories}
            ar={ar} grade={grade}
            onBack={() => setStep('config')}
            onPick={cat => { setCategory(cat); fetchTopics(cat); }}
          />
        )}

        {step === 'topics' && category && (
          <TopicsStep
            category={category} topics={topics}
            onBack={() => setStep('category')}
            onPick={t => generateSingle(t)}
            onRefresh={() => fetchTopics(category)}
          />
        )}

        {step === 'book-topics' && (
          <BookTopicsStep
            ar={ar} grade={grade}
            bookTopics={bookTopics}
            selections={bookSelections}
            setSelection={(cid, t) => setBookSelections(prev => ({ ...prev, [cid]: t }))}
            onRefreshCategory={refreshOneCategory}
            onBack={() => setStep('config')}
            onGenerate={generateBook}
          />
        )}

        {step === 'preview' && data && (
          <PreviewControls
            mode="single"
            showAnswers={showAnswers} setShowAnswers={setShowAnswers}
            onReset={reset}
            onPrintSingle={printSingle} onPrintCombined={printCombined}
            label={selectedTopic?.title}
          />
        )}

        {step === 'book-preview' && bookData && (
          <>
            {failedSections.length > 0 && (
              <div className="mb-3 bg-amber-50 border border-amber-300 text-amber-900 text-sm p-3 rounded">
                <b>일부 섹션 생성에 실패했습니다.</b> 아래 분야는 책에서 제외되었습니다 — 잠시 후 "처음부터" 또는 다시 시도해 주세요.
                <div className="mt-1 text-xs">실패 분야: {failedSections.join(', ')}</div>
              </div>
            )}
            <PreviewControls
              mode="book"
              showAnswers={showAnswers} setShowAnswers={setShowAnswers}
              onReset={reset}
              onPrintSingle={printSingle} onPrintCombined={printCombined}
              label={`${bookData.sections.length}-Section Monthly Book · ${bookData.meta.issue_label}`}
            />
          </>
        )}
      </main>

      {step === 'preview' && data && (
        <div className="pb-12">
          {printMode === 'combined'
            ? <CombinedWorksheet data={data} />
            : <Worksheet data={data} showAnswers={showAnswers} />
          }
        </div>
      )}

      {step === 'book-preview' && bookData && (
        <div className="pb-12">
          {printMode === 'combined'
            ? <CombinedBook data={bookData} />
            : <Book data={bookData} showAnswers={showAnswers} />
          }
        </div>
      )}
    </div>
  );
}

function TopBar() {
  return (
    <header className="no-print bg-brand-900 text-white shadow">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/reading-brain-logo.jpg" alt="Reading Brain" className="w-11 h-11 rounded bg-white object-contain p-0.5" />
          <div>
            <div className="font-bold leading-tight">리딩브레인영어학원</div>
            <div className="text-[11px] opacity-80 leading-tight">Reading Is The Only Way! · English Newspaper Builder</div>
          </div>
        </div>
        <div className="text-[11px] opacity-80">AI 기반 AR 맞춤 영자신문 교재</div>
      </div>
    </header>
  );
}

function Stepper({ mode, step }: { mode: Mode; step: Step }) {
  const single: { id: Step; label: string }[] = [
    { id: 'config', label: '레벨·모드' },
    { id: 'category', label: '분야' },
    { id: 'topics', label: '주제' },
    { id: 'preview', label: '미리보기' }
  ];
  const book: { id: Step; label: string }[] = [
    { id: 'config', label: '레벨·모드' },
    { id: 'book-topics', label: '8개 주제 큐레이션' },
    { id: 'book-preview', label: '책 미리보기' }
  ];
  const steps = mode === 'single' ? single : book;
  const idx = steps.findIndex(s => s.id === step);
  return (
    <ol className="flex items-center gap-2 text-xs mb-6 flex-wrap">
      {steps.map((s, i) => (
        <li key={s.id} className={`flex items-center gap-2 ${i <= idx ? 'text-brand-700' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${i <= idx ? 'bg-brand-600 text-white' : 'bg-slate-200'}`}>{i + 1}</span>
          <span>{s.label}</span>
          {i < steps.length - 1 && <span className="mx-1 text-slate-300">›</span>}
        </li>
      ))}
    </ol>
  );
}

function ConfigStep(props: {
  mode: Mode; setMode: (m: Mode) => void;
  ar: number; setAr: (v: number) => void;
  grade: string; setGrade: (v: string) => void;
  length: 'short' | 'medium' | 'long'; setLength: (v: 'short' | 'medium' | 'long') => void;
  onNext: () => void;
}) {
  const arLabel = useMemo(() => {
    const a = props.ar;
    if (a < 2) return '왕초급 (Pre-Beginner)';
    if (a < 3) return '초급 (Beginner)';
    if (a < 5) return '초중급 (Pre-Intermediate)';
    if (a < 7) return '중급 (Intermediate)';
    if (a < 9) return '중상급 (Upper-Intermediate)';
    return '상급 (Advanced)';
  }, [props.ar]);

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-lg font-bold mb-1">제작 모드 & 레벨 설정</h2>
      <p className="text-xs text-slate-500 mb-5">단일 회차 한 부 또는 8개 분야를 묶은 월간 합본(책)을 선택하세요.</p>

      <div className="grid md:grid-cols-2 gap-3 mb-6">
        <button onClick={() => props.setMode('single')}
          className={`text-left border rounded-lg p-4 transition ${props.mode === 'single' ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:bg-slate-50'}`}>
          <div className="font-semibold flex items-center gap-2">
            <span className={`inline-block w-3 h-3 rounded-full ${props.mode === 'single' ? 'bg-brand-600' : 'border border-slate-300'}`} />
            단일 회차 (1 분야 · 1 기사)
          </div>
          <div className="text-xs text-slate-600 mt-1">한 분야에서 주제 1개를 골라 5쪽짜리 교재 한 부를 빠르게 제작합니다.</div>
        </button>
        <button onClick={() => props.setMode('book')}
          className={`text-left border rounded-lg p-4 transition ${props.mode === 'book' ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:bg-slate-50'}`}>
          <div className="font-semibold flex items-center gap-2">
            <span className={`inline-block w-3 h-3 rounded-full ${props.mode === 'book' ? 'bg-brand-600' : 'border border-slate-300'}`} />
            월간 합본 책 (8 분야 모두)
          </div>
          <div className="text-xs text-slate-600 mt-1">표지 + 목차 + 8개 분야 × (기사+워크북 5쪽)으로 구성된 한 권의 책을 한 번에 제작합니다.</div>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-1">AR (ATOS) 지수</label>
          <div className="flex items-center gap-3">
            <input type="range" min={1} max={12} step={0.1} value={props.ar}
              onChange={e => props.setAr(Number(e.target.value))} className="flex-1 accent-brand-600" />
            <input type="number" min={1} max={12} step={0.1} value={props.ar}
              onChange={e => props.setAr(Number(e.target.value))}
              className="w-20 border border-slate-300 rounded px-2 py-1 text-sm" />
          </div>
          <div className="text-xs text-slate-500 mt-1">현재: <b>AR {props.ar.toFixed(1)}</b> · {arLabel}</div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">학년</label>
          <select value={props.grade} onChange={e => props.setGrade(e.target.value)}
            className="w-full border border-slate-300 rounded px-3 py-2 text-sm">
            {['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'].map(g =>
              <option key={g} value={g}>{g}</option>
            )}
          </select>
          <div className="text-xs text-slate-500 mt-1">초1 = Grade 1, 초3 = Grade 3, 중1 = Grade 7, 고1 = Grade 10</div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-1">본문 분량 (각 기사)</label>
          <div className="grid grid-cols-3 gap-2">
            {(['short','medium','long'] as const).map(v => (
              <button key={v}
                onClick={() => props.setLength(v)}
                className={`border rounded px-3 py-2 text-sm ${props.length === v ? 'border-brand-600 bg-brand-50 text-brand-700 font-semibold' : 'border-slate-300 hover:bg-slate-50'}`}>
                {v === 'short' ? 'Short · 약 250 단어' : v === 'medium' ? 'Medium · 약 400 단어' : 'Long · 약 570 단어'}
              </button>
            ))}
          </div>
          {props.length === 'long' && (
            <div className="mt-1 text-xs text-amber-700">
              ⚠ Long 옵션은 신문 1면 본문이 자동 축소되며, 분량에 따라 페이지가 늘어날 수 있습니다.
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={props.onNext}
          className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2 rounded shadow-sm">
          {props.mode === 'single' ? '다음: 분야 선택 →' : '다음: 8개 분야 주제 추천 받기 →'}
        </button>
      </div>
    </section>
  );
}

function CategoryStep(props: {
  categories: Category[]; ar: number; grade: string;
  onBack: () => void; onPick: (c: Category) => void;
}) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-lg font-bold">분야 선택</h2>
        <div className="text-xs text-slate-500">설정: AR {props.ar.toFixed(1)} · {props.grade}</div>
      </div>
      <p className="text-xs text-slate-500 mb-4">선택 즉시 AI가 6개 주제 후보를 생성합니다.</p>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
        {props.categories.map(c => (
          <button key={c.id} onClick={() => props.onPick(c)}
            className="border border-slate-200 hover:border-brand-500 hover:bg-brand-50 rounded-lg p-4 text-left transition">
            <div className="font-semibold">{c.label}</div>
            <div className="text-xs text-slate-500">{c.ko}</div>
          </button>
        ))}
      </div>
      <div className="mt-5"><button onClick={props.onBack} className="text-sm text-slate-600 hover:underline">← 이전</button></div>
    </section>
  );
}

function TopicsStep(props: {
  category: Category; topics: TopicSuggestion[];
  onBack: () => void; onPick: (t: TopicSuggestion) => void; onRefresh: () => void;
}) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-lg font-bold">주제 선택 — {props.category.label}</h2>
        <button onClick={props.onRefresh} className="text-sm text-brand-700 hover:underline">↻ 다른 후보 다시 받기</button>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {props.topics.map((t, i) => (
          <button key={i} onClick={() => props.onPick(t)}
            className="border border-slate-200 hover:border-brand-500 hover:bg-brand-50 rounded-lg p-4 text-left transition">
            <div className="font-semibold">{t.title}</div>
            <div className="text-xs text-slate-600 mt-1">{t.angle}</div>
            <div className="text-xs text-slate-500 mt-1">· {t.ko}</div>
          </button>
        ))}
      </div>
      <div className="mt-5"><button onClick={props.onBack} className="text-sm text-slate-600 hover:underline">← 분야 다시 선택</button></div>
    </section>
  );
}

function BookTopicsStep(props: {
  ar: number; grade: string;
  bookTopics: CategoryTopics[];
  selections: Record<string, TopicSuggestion | null>;
  setSelection: (categoryId: string, t: TopicSuggestion) => void;
  onRefreshCategory: (categoryId: string) => void;
  onBack: () => void;
  onGenerate: () => void;
}) {
  const allChosen = props.bookTopics.every(ct => props.selections[ct.categoryId]);
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-lg font-bold">8개 분야 주제 큐레이션</h2>
        <div className="text-xs text-slate-500">AR {props.ar.toFixed(1)} · {props.grade}</div>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        각 분야마다 3개의 후보 중 하나를 고르세요. 마음에 들지 않으면 ↻ 다른 후보 받기로 새로 추천받을 수 있습니다.
      </p>

      <div className="grid lg:grid-cols-2 gap-3">
        {props.bookTopics.map(ct => {
          const chosen = props.selections[ct.categoryId];
          return (
            <div key={ct.categoryId} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-semibold text-sm">{ct.categoryLabel}</div>
                  <div className="text-[11px] text-slate-500">{ct.categoryKo}</div>
                </div>
                <button onClick={() => props.onRefreshCategory(ct.categoryId)}
                  className="text-xs text-brand-700 hover:underline">↻ 다른 후보</button>
              </div>
              {ct.topics.length === 0 && (
                <div className="text-xs text-red-600">주제 추천 실패. 새로고침을 눌러주세요.</div>
              )}
              <div className="space-y-2">
                {ct.topics.map((t, i) => {
                  const isPicked = chosen?.title === t.title;
                  return (
                    <button key={i} onClick={() => props.setSelection(ct.categoryId, t)}
                      className={`w-full text-left border rounded p-2 transition ${isPicked ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                      <div className="flex items-start gap-2">
                        <span className={`mt-1 w-3 h-3 rounded-full shrink-0 ${isPicked ? 'bg-brand-600' : 'border border-slate-300'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium leading-tight">{t.title}</div>
                          <div className="text-[11px] text-slate-600 mt-0.5">{t.angle}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">· {t.ko}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={props.onBack} className="text-sm text-slate-600 hover:underline">← 이전</button>
        <button onClick={props.onGenerate} disabled={!allChosen}
          className="bg-brand-600 hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold px-5 py-2 rounded shadow-sm">
          {allChosen ? '교재 책 만들기 (8 섹션 일괄 생성) →' : '모든 분야에서 주제를 선택하세요'}
        </button>
      </div>
    </section>
  );
}

function PreviewControls(props: {
  mode: Mode;
  showAnswers: boolean; setShowAnswers: (b: boolean) => void;
  onReset: () => void;
  onPrintSingle: () => void;
  onPrintCombined: () => void;
  label?: string;
}) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="text-sm">
          <span className="font-bold">미리보기 · {props.mode === 'book' ? '월간 합본 책' : '단일 회차'}</span>
          {props.label && <span className="text-slate-500"> · {props.label}</span>}
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded border border-slate-300 overflow-hidden text-sm">
            <button onClick={() => props.setShowAnswers(false)}
              className={`px-3 py-1.5 ${!props.showAnswers ? 'bg-brand-600 text-white' : 'bg-white hover:bg-slate-50'}`}>학생용 보기</button>
            <button onClick={() => props.setShowAnswers(true)}
              className={`px-3 py-1.5 border-l border-slate-300 ${props.showAnswers ? 'bg-rose-700 text-white' : 'bg-white hover:bg-slate-50'}`}>교사용 보기</button>
          </div>
          <button onClick={props.onReset}
            className="text-sm border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded">처음부터</button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3">
        <span className="text-xs font-semibold text-slate-600 mr-1">PDF 저장:</span>
        <button onClick={props.onPrintSingle}
          className="text-sm border border-brand-600 text-brand-700 hover:bg-brand-50 font-semibold px-3 py-1.5 rounded">
          현재 보기만 ({props.showAnswers ? '교사용' : '학생용'})
        </button>
        <button onClick={props.onPrintCombined}
          className="text-sm bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-1.5 rounded shadow-sm">
          학생용 + 교사용 한 번에 PDF
        </button>
        <span className="text-[11px] text-slate-500 ml-auto">
          인쇄 대화상자에서 <b>대상 → "PDF로 저장"</b>을 선택하세요.
          {props.mode === 'book' && <> 합본 PDF는 약 90~100쪽으로 길 수 있습니다.</>}
        </span>
      </div>
    </section>
  );
}
