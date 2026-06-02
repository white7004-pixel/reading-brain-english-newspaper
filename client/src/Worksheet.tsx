import { Fragment } from 'react';
import type { BookData, WorkbookData } from './types';

type Props = {
  data: WorkbookData;
  showAnswers: boolean;
  academyName?: string;
};

export default function Worksheet({ data, showAnswers, academyName = 'Reading Brain English Academy' }: Props) {
  return (
    <Edition data={data} showAnswers={showAnswers} academyName={academyName} />
  );
}

/** 학생용 + 교사용 두 부를 연속으로 렌더 (한 번의 인쇄로 통합 PDF 생성) */
export function CombinedWorksheet({
  data, academyName = 'Reading Brain English Academy'
}: { data: WorkbookData; academyName?: string }) {
  return (
    <>
      <Edition data={data} showAnswers={false} academyName={academyName} />
      <CoverPage edition="teacher" data={data} academyName={academyName} />
      <Edition data={data} showAnswers={true} academyName={academyName} />
    </>
  );
}

/** 8개 섹션을 한 권의 책으로 묶음 (학생용 또는 교사용) */
export function Book({
  data, showAnswers, academyName = 'Reading Brain English Academy'
}: { data: BookData; showAnswers: boolean; academyName?: string }) {
  return (
    <div className="print-container max-w-[820px] mx-auto bg-white text-slate-900">
      <BookCover data={data} showAnswers={showAnswers} academyName={academyName} />
      <TableOfContents data={data} showAnswers={showAnswers} academyName={academyName} />
      {data.sections.map((s, i) => (
        <Fragment key={i}>
          <SectionDivider index={i + 1} total={data.sections.length} section={s} academyName={academyName} />
          <Edition data={s} showAnswers={showAnswers} academyName={academyName} />
        </Fragment>
      ))}
      <BookBackCover academyName={academyName} data={data} showAnswers={showAnswers} />
    </div>
  );
}

/** 학생용 책 + 교사용 책 합본 */
export function CombinedBook({
  data, academyName = 'Reading Brain English Academy'
}: { data: BookData; academyName?: string }) {
  return (
    <>
      <Book data={data} showAnswers={false} academyName={academyName} />
      <Book data={data} showAnswers={true} academyName={academyName} />
    </>
  );
}

function BookCover({ data, showAnswers, academyName }: { data: BookData; showAnswers: boolean; academyName: string }) {
  const date = new Date(data.meta.generated_at);
  const monthLabel = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  const editionLabel = showAnswers ? 'Teacher Edition · 교사용' : 'Student Edition · 학생용';
  const editionColor = showAnswers ? 'border-rose-700 text-rose-700' : 'border-brand-700 text-brand-700';
  return (
    <section className="print-page p-12 flex flex-col items-center justify-between min-h-[1080px] bg-white text-center">
      <div>
        <div className="text-[11px] uppercase tracking-[0.4em] text-slate-500">{academyName}</div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1">Reading Is The Only Way!</div>
      </div>

      <div className="flex flex-col items-center">
        <img src="/reading-brain-logo.jpg" alt="Reading Brain" className="w-44 h-44 object-contain mb-6" />
        <div className="font-serif text-5xl font-black tracking-tight">The Reading Brain Times</div>
        <div className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-600">Monthly Newspaper Reader</div>
        <div className="mt-1 text-xs uppercase tracking-widest text-slate-400">{data.meta.issue_label}</div>

        <div className={`mt-10 px-10 py-3 border-4 ${editionColor} font-black text-2xl tracking-widest uppercase`}>
          {editionLabel}
        </div>
        <div className="mt-6 text-sm text-slate-600">
          AR {Number(data.meta.ar).toFixed(1)} · {data.meta.grade}
        </div>
        <div className="text-[12px] text-slate-500 mt-1">
          {data.sections.length} Sections · {data.sections.length * 5} Pages of Reading & Workbook
        </div>
      </div>

      <div className="text-[10px] text-slate-400">
        <div>{monthLabel} Edition</div>
        <div className="mt-1">Original content for classroom use only.</div>
      </div>
    </section>
  );
}

function TableOfContents({
  data, showAnswers, academyName
}: { data: BookData; showAnswers: boolean; academyName: string }) {
  // 표지(1) + 목차(1) → 첫 섹션은 3페이지부터, 섹션당 5페이지(article+vocab+comp+summary+grammar) + 섹션 표지(1) = 6페이지
  let pageCursor = 3;
  return (
    <section className="print-page p-10 min-h-[1080px] bg-white">
      <div className="flex items-center gap-3 border-b-4 border-double border-slate-900 pb-3 mb-6">
        <img src="/reading-brain-logo.jpg" alt="" className="w-12 h-12 object-contain" />
        <div className="flex-1">
          <div className="font-serif text-3xl font-black">Table of Contents</div>
          <div className="text-[10px] uppercase tracking-widest text-slate-500">{academyName} · {data.meta.issue_label}</div>
        </div>
        <div className="text-[10px] text-slate-500 text-right">
          AR {Number(data.meta.ar).toFixed(1)}<br />Grade {data.meta.grade}
        </div>
      </div>

      <ol className="space-y-2">
        {data.sections.map((s, i) => {
          const startPage = pageCursor;
          pageCursor += 6; // 섹션 표지 1 + 본문/워크북 5
          return (
            <li key={i} className="flex items-baseline gap-3 border-b border-dotted border-slate-300 pb-2">
              <span className="bg-brand-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-brand-600">{s.meta.category}</div>
                <div className="font-serif text-base font-bold leading-tight truncate">{s.article.headline}</div>
                <div className="text-[11px] text-slate-500 truncate">{s.article.subheadline}</div>
              </div>
              <span className="text-xs text-slate-500 shrink-0">p. {startPage}</span>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 grid grid-cols-2 gap-4 text-[11px]">
        <div className="border border-slate-200 rounded p-3">
          <div className="font-bold text-sm mb-1">How to use this book · 책 사용법</div>
          <ol className="list-decimal pl-4 space-y-1 text-slate-700">
            <li>Read the newspaper article first.</li>
            <li>Solve the workbook tasks on the following pages.</li>
            <li>Use the Discussion section in class together.</li>
            <li>Review with the Grammar Focus.</li>
          </ol>
        </div>
        <div className="border border-slate-200 rounded p-3">
          <div className="font-bold text-sm mb-1">Each section contains · 각 섹션 구성</div>
          <ul className="list-disc pl-4 space-y-1 text-slate-700">
            <li>Newspaper Article (1 page)</li>
            <li>Vocabulary Builder</li>
            <li>Reading Comprehension</li>
            <li>Summary · Discussion · Writing</li>
            <li>Grammar Focus</li>
          </ul>
        </div>
      </div>

      <div className="mt-auto pt-6 text-[10px] text-slate-400 text-center">
        {showAnswers ? 'Teacher Edition · 교사용' : 'Student Edition · 학생용'} · {academyName}
      </div>
    </section>
  );
}

function SectionDivider({
  index, total, section, academyName
}: { index: number; total: number; section: WorkbookData; academyName: string }) {
  return (
    <section className="print-page p-12 flex flex-col items-center justify-center min-h-[1080px] bg-slate-50 text-center">
      <div className="text-[11px] uppercase tracking-[0.4em] text-slate-500 mb-2">{academyName}</div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-10">Reading Is The Only Way!</div>
      <div className="text-[11px] uppercase tracking-widest text-brand-600 mb-2">
        Section {String(index).padStart(2, '0')} of {String(total).padStart(2, '0')}
      </div>
      <div className="text-2xl font-black uppercase tracking-widest text-slate-700 mb-6">
        {section.meta.category}
      </div>
      <div className="font-serif text-3xl font-bold leading-snug max-w-2xl">
        {section.article.headline}
      </div>
      {section.article.subheadline && (
        <div className="font-serif italic text-slate-600 mt-3 max-w-xl">
          {section.article.subheadline}
        </div>
      )}
      <div className="mt-10 text-[12px] text-slate-500">
        AR {Number(section.meta.ar).toFixed(1)} · Grade {section.meta.grade} · {section.meta.category_ko}
      </div>
    </section>
  );
}

function BookBackCover({ academyName, data, showAnswers }: { academyName: string; data: BookData; showAnswers: boolean }) {
  return (
    <section className="print-page p-12 flex flex-col items-center justify-center min-h-[1080px] bg-brand-900 text-white text-center">
      <img src="/reading-brain-logo.jpg" alt="Reading Brain" className="w-32 h-32 object-contain mb-6 bg-white rounded p-2" />
      <div className="font-serif text-4xl font-black">The Reading Brain Times</div>
      <div className="mt-2 text-sm uppercase tracking-[0.4em] opacity-80">Reading Is The Only Way!</div>
      <div className="mt-10 text-sm opacity-90">{academyName}</div>
      <div className="mt-1 text-[11px] opacity-70">{data.meta.issue_label} · {showAnswers ? 'Teacher Edition' : 'Student Edition'}</div>
      <div className="mt-12 max-w-md text-[12px] opacity-80">
        Read smart. Think sharp. Speak the world.<br />
        © {new Date(data.meta.generated_at).getFullYear()} {academyName}. For classroom use only.
      </div>
    </section>
  );
}

function CoverPage({
  edition, data, academyName
}: { edition: 'student' | 'teacher'; data: WorkbookData; academyName: string }) {
  const isTeacher = edition === 'teacher';
  return (
    <section className="print-page p-10 flex flex-col items-center justify-center min-h-[1000px] bg-white text-center">
      <img src="/reading-brain-logo.jpg" alt="Reading Brain" className="w-40 h-40 object-contain mb-6" />
      <div className="text-[11px] uppercase tracking-[0.4em] text-slate-500">{academyName}</div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mt-1">Reading Is The Only Way!</div>
      <div className={`mt-10 px-8 py-3 border-4 ${isTeacher ? 'border-rose-700 text-rose-700' : 'border-brand-700 text-brand-700'} font-black text-3xl tracking-widest uppercase`}>
        {isTeacher ? 'Teacher Edition' : 'Student Edition'}
      </div>
      <div className="mt-3 text-sm text-slate-600">{isTeacher ? '교사용 (정답·해설 포함)' : '학생용'}</div>
      <div className="mt-12 max-w-md">
        <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Today's Article</div>
        <div className="font-serif text-xl font-bold leading-snug">{data.article.headline}</div>
        <div className="text-[12px] text-slate-500 mt-2">
          {data.meta.category} · AR {Number(data.meta.ar).toFixed(1)} · Grade {data.meta.grade}
        </div>
      </div>
    </section>
  );
}

function Edition({ data, showAnswers, academyName }: { data: WorkbookData; showAnswers: boolean; academyName: string }) {
  const today = new Date(data.meta.generated_at);
  const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const issueLabel = `Vol. ${today.getFullYear()} · Issue ${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

  return (
    <div className="print-container max-w-[820px] mx-auto bg-white text-slate-900">
      {/* ===== Page 1: Newspaper Article ===== */}
      <section className="print-page p-10">
        {/* Masthead */}
        <header className="border-b-4 border-double border-slate-900 pb-3 mb-5">
          <div className="flex items-center justify-between text-[11px] tracking-widest uppercase text-slate-600">
            <span>{academyName}</span>
            <span>The Reading Brain Times</span>
            <span>{dateStr}</span>
          </div>
          <div className="flex items-end justify-between mt-2 gap-4">
            <img src="/reading-brain-logo.jpg" alt="Reading Brain" className="w-20 h-20 object-contain shrink-0" />
            <div className="flex-1 text-center">
              <h1 className="font-serif text-5xl font-black tracking-tight leading-none">The Reading Brain Times</h1>
              <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-slate-600">
                Reading Is The Only Way!
              </div>
            </div>
            <div className="text-[10px] text-slate-500 text-right leading-tight shrink-0">
              <div>{issueLabel}</div>
              <div>AR {Number(data.meta.ar).toFixed(1)} · Grade {data.meta.grade}</div>
              <div>{data.meta.category}</div>
              <div className={`inline-block mt-1 px-1.5 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded ${showAnswers ? 'bg-rose-700 text-white' : 'bg-brand-700 text-white'}`}>
                {showAnswers ? 'Teacher Ed.' : 'Student Ed.'}
              </div>
            </div>
          </div>
        </header>

        {/* Headline */}
        <article className="article-body">
          <div className="uppercase text-[10px] tracking-widest text-brand-600 mb-1">{data.meta.category}</div>
          <h2 className="font-serif text-3xl font-bold leading-tight mb-2">{data.article.headline}</h2>
          {data.article.subheadline && (
            <p className="font-serif italic text-slate-700 mb-3">{data.article.subheadline}</p>
          )}
          <div className="text-[11px] text-slate-500 mb-4">
            {data.article.byline} · {dateStr}
          </div>

          <div className="font-serif columns-2 gap-6 text-[14px] leading-relaxed text-justify">
            {data.article.body_paragraphs.map((p, i) => (
              <p key={i} className="mb-3">
                {i === 0 && data.article.dateline && (
                  <span className="font-bold uppercase tracking-wider">{data.article.dateline}</span>
                )}
                {p}
              </p>
            ))}
          </div>

          <div className="mt-4 text-[10px] text-slate-500 text-right">
            Words: {data.article.word_count} · Original content for classroom use only.
          </div>
        </article>
      </section>

      {/* ===== Page 2: Vocabulary ===== */}
      <section className="print-page p-10">
        <WorkbookHeader academyName={academyName} meta={data.meta} headline={data.article.headline} showAnswers={showAnswers} />
        <SectionTitle no={1} en="Vocabulary Builder" ko="핵심 어휘" />
        <p className="text-[12px] text-slate-600 mb-3">
          Match each word with its meaning. Then write your own sentence using each word.
        </p>
        <table className="w-full text-[12px] border border-slate-300">
          <thead className="bg-slate-100">
            <tr>
              <th className="border border-slate-300 px-2 py-1 w-8">#</th>
              <th className="border border-slate-300 px-2 py-1 w-40">Word</th>
              <th className="border border-slate-300 px-2 py-1 w-16">P.O.S</th>
              <th className="border border-slate-300 px-2 py-1">Definition</th>
              <th className="border border-slate-300 px-2 py-1 w-32">한국어 뜻</th>
            </tr>
          </thead>
          <tbody>
            {data.vocabulary.map((v, i) => (
              <tr key={i} className="align-top">
                <td className="border border-slate-300 px-2 py-1 text-center">{i + 1}</td>
                <td className="border border-slate-300 px-2 py-1 font-bold">{v.word}</td>
                <td className="border border-slate-300 px-2 py-1 italic">{v.pos}</td>
                <td className="border border-slate-300 px-2 py-1">{v.definition}</td>
                <td className="border border-slate-300 px-2 py-1">{v.ko}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="font-bold mt-5 mb-2 text-sm">Example sentences from the article</h3>
        <ol className="list-decimal pl-5 text-[12px] space-y-1">
          {data.vocabulary.map((v, i) => (
            <li key={i}>
              <span className="font-semibold">{v.word}</span> — {v.example}
            </li>
          ))}
        </ol>

        <h3 className="font-bold mt-5 mb-2 text-sm">Your turn — write your own sentence</h3>
        <ol className="list-decimal pl-5 text-[12px] space-y-3">
          {data.vocabulary.slice(0, 5).map((v, i) => (
            <li key={i}>
              <span className="font-semibold">{v.word}:</span>
              <span className="inline-block border-b border-slate-400 ml-2" style={{ width: '80%' }}>&nbsp;</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ===== Page 3: Reading Comprehension ===== */}
      <section className="print-page p-10">
        <WorkbookHeader academyName={academyName} meta={data.meta} headline={data.article.headline} showAnswers={showAnswers} />
        <SectionTitle no={2} en="Reading Comprehension" ko="독해 문제" />

        <h3 className="font-bold text-sm mt-2 mb-2">Part A. Multiple Choice</h3>
        <ol className="list-decimal pl-5 text-[12px] space-y-3">
          {data.comprehension_mc.map((q, i) => (
            <li key={i}>
              <div className="mb-1">{q.q}</div>
              <ul className="pl-2 space-y-0.5">
                {q.choices.map((c, j) => (
                  <li key={j}>
                    <span className="font-semibold mr-2">{String.fromCharCode(65 + j)}.</span>
                    {c}
                  </li>
                ))}
              </ul>
              {showAnswers && (
                <div className="text-[11px] text-emerald-700 mt-1">
                  ✔ Answer: <b>{q.answer}</b>{q.explanation ? ` — ${q.explanation}` : ''}
                </div>
              )}
            </li>
          ))}
        </ol>

        <h3 className="font-bold text-sm mt-5 mb-2">Part B. Short Answer</h3>
        <ol className="list-decimal pl-5 text-[12px] space-y-3">
          {data.comprehension_short.map((q, i) => (
            <li key={i}>
              <div>{q.q}</div>
              {showAnswers ? (
                <div className="text-[11px] text-emerald-700 mt-1">✔ {q.answer}</div>
              ) : (
                <>
                  <div className="border-b border-slate-400 mt-2 h-4" />
                  <div className="border-b border-slate-400 mt-2 h-4" />
                </>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* ===== Page 4: Summary + Discussion + Writing ===== */}
      <section className="print-page p-10">
        <WorkbookHeader academyName={academyName} meta={data.meta} headline={data.article.headline} showAnswers={showAnswers} />
        <SectionTitle no={3} en="Main Idea & Summary" ko="요지·요약" />
        <p className="text-[12px] mb-2">{data.summary_task.instruction}</p>
        <div className="text-[11px] text-slate-500 mb-2">Hint: {data.summary_task.main_idea_hint}</div>
        {showAnswers ? (
          <div className="border border-emerald-300 bg-emerald-50 p-3 text-[12px] rounded">
            <b>Model summary.</b> {data.summary_task.model_summary}
          </div>
        ) : (
          <div className="border border-slate-300 rounded p-3 space-y-3">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="border-b border-slate-300 h-5" />)}
          </div>
        )}

        <SectionTitle no={4} en="Discussion Questions" ko="토론 질문" className="mt-6" />
        <ol className="list-decimal pl-5 text-[12px] space-y-2">
          {data.discussion.map((q, i) => <li key={i}>{q}</li>)}
        </ol>

        <SectionTitle no={5} en="Writing Prompt" ko="작문 과제" className="mt-6" />
        <p className="text-[12px] mb-1">{data.writing_prompt.prompt}</p>
        <ul className="text-[11px] text-slate-600 list-disc pl-5 mb-3">
          {data.writing_prompt.checklist.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
        {!showAnswers && (
          <div className="border border-slate-300 rounded p-3 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="border-b border-slate-300 h-5" />)}
          </div>
        )}
      </section>

      {/* ===== Page 5: Grammar Focus ===== */}
      <section className="print-page p-10">
        <WorkbookHeader academyName={academyName} meta={data.meta} headline={data.article.headline} showAnswers={showAnswers} />
        <SectionTitle no={6} en="Grammar Focus" ko="문법 포인트" />
        <div className="bg-brand-50 border border-brand-100 rounded p-3 mb-3 text-[12px]">
          <div className="font-bold text-brand-700 mb-1">{data.grammar_focus.point}</div>
          <div>{data.grammar_focus.explanation}</div>
        </div>

        <h3 className="font-bold text-sm mb-1">From the article</h3>
        <ul className="list-disc pl-5 text-[12px] space-y-1 mb-4">
          {data.grammar_focus.examples_from_article.map((s, i) => <li key={i}><i>{s}</i></li>)}
        </ul>

        <h3 className="font-bold text-sm mb-1">Practice</h3>
        <ol className="list-decimal pl-5 text-[12px] space-y-2">
          {data.grammar_focus.practice.map((p, i) => (
            <li key={i}>
              <div>{p.q}</div>
              {showAnswers ? (
                <div className="text-[11px] text-emerald-700">✔ {p.answer}</div>
              ) : (
                <div className="border-b border-slate-400 mt-1 h-4" />
              )}
            </li>
          ))}
        </ol>

        <footer className="mt-10 pt-3 border-t border-slate-300 text-[10px] text-slate-500 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/reading-brain-logo.jpg" alt="" className="w-6 h-6 object-contain" />
            <span>{academyName} · Reading Is The Only Way!</span>
          </div>
          <span>
            AR {Number(data.meta.ar).toFixed(1)} · Grade {data.meta.grade} ·{' '}
            <span className={`px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded ${showAnswers ? 'bg-rose-700 text-white' : 'bg-brand-700 text-white'}`}>
              {showAnswers ? 'Teacher Edition' : 'Student Edition'}
            </span>
          </span>
        </footer>
      </section>
    </div>
  );
}

function SectionTitle({ no, en, ko, className = '' }: { no: number; en: string; ko: string; className?: string }) {
  return (
    <div className={`flex items-baseline gap-3 mb-2 ${className}`}>
      <span className="bg-brand-600 text-white text-[11px] font-bold px-2 py-0.5 rounded">{String(no).padStart(2, '0')}</span>
      <h2 className="font-serif text-xl font-bold">{en}</h2>
      <span className="text-[12px] text-slate-500">· {ko}</span>
    </div>
  );
}

function WorkbookHeader({
  academyName, meta, headline, showAnswers
}: {
  academyName: string;
  meta: WorkbookData['meta'];
  headline: string;
  showAnswers: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-4">
      <div className="flex items-center gap-2">
        <img src="/reading-brain-logo.jpg" alt="" className="w-9 h-9 object-contain" />
        <div className="leading-tight">
          <div className="text-[11px] font-bold text-brand-900">{academyName}</div>
          <div className="text-[9px] uppercase tracking-widest text-slate-500">Reading Is The Only Way!</div>
        </div>
      </div>
      <div className="text-[10px] text-slate-500 text-right leading-tight">
        <div className="font-semibold text-slate-700 truncate max-w-[280px]">{headline}</div>
        <div className="flex items-center justify-end gap-1.5">
          <span>AR {Number(meta.ar).toFixed(1)} · Grade {meta.grade} · {meta.category}</span>
          <span className={`px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded ${showAnswers ? 'bg-rose-700 text-white' : 'bg-brand-700 text-white'}`}>
            {showAnswers ? 'Teacher' : 'Student'}
          </span>
        </div>
      </div>
    </div>
  );
}
