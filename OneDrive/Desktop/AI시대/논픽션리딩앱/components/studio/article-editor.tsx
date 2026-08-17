"use client";

import { useEffect, useState } from "react";
import { applyArticleEdit } from "@/lib/studio-workflow";
import { studioControlId, studioIssueId } from "@/lib/studio-validation-ui";
import type { ArticleEditPatch, ArticlePersistenceResult, MediaEmbed, StudioArticle, StudioQuizQuestion, StudioSourceRef, StudioVocabularyItem, ValidationIssue } from "@/lib/studio-types";

type Props = {
  article: StudioArticle;
  onArticleChange: (article: StudioArticle) => ArticlePersistenceResult | Promise<ArticlePersistenceResult> | void;
  displayedIssues?: ValidationIssue[];
  now?: () => string;
};
type Attrs = (field: string) => { id: string; "aria-invalid": true | undefined; "aria-describedby": string | undefined };

export function ArticleEditor({ article: incoming, onArticleChange, displayedIssues = [], now = () => new Date().toISOString() }: Props) {
  const [article, setArticle] = useState(incoming);
  const [reason, setReason] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState("");
  const [retryArticle, setRetryArticle] = useState<StudioArticle | null>(null);
  const attrs: Attrs = (field) => {
    const matching = displayedIssues.filter((issue) => issue.field === field);
    return { id: studioControlId(field), "aria-invalid": matching.length ? true : undefined, "aria-describedby": matching.length ? matching.map(studioIssueId).join(" ") : undefined };
  };

  useEffect(() => setArticle(incoming), [incoming]);

  const persist = async (next: StudioArticle) => {
    setSaveState("saving");
    try {
      const result = await onArticleChange(next);
      if (result && !result.ok) {
        setSaveState("error"); setSaveError(result.error); return;
      }
      setRetryArticle(null); setSaveState("saved"); setSaveError("");
    } catch (error) {
      setSaveState("error"); setSaveError(error instanceof Error ? error.message : "변경 내용을 저장하지 못했습니다.");
    }
  };
  const commit = (patch: ArticleEditPatch) => {
    try {
      const next = applyArticleEdit(article, patch, now(), reason.trim());
      setArticle(next); setRetryArticle(next); void persist(next);
    } catch (error) {
      setSaveState("error"); setSaveError(error instanceof Error ? error.message : "변경 내용을 저장하지 못했습니다.");
    }
  };

  return <form className="studio-editor" aria-label="콘텐츠 편집기" onSubmit={(event) => event.preventDefault()}>
    <div className="studio-editor__save" role="status" aria-live="polite">
      <span>작업 버전 {article.workingVersion}</span>
      <strong>{saveState === "saved" ? "저장됨" : saveState === "saving" ? "저장 중" : saveState === "error" ? "저장 실패" : "변경 대기"}</strong>
    </div>
    {saveError && <div className="studio-field-error"><span>{saveError}</span>{retryArticle && <button type="button" onClick={() => void persist(retryArticle)}>저장 재시도</button>}</div>}

    <Section id="basic-info" title="기본 정보">
      <Field label="영문 제목"><input {...attrs("title")} value={article.title} onChange={(e) => commit({ title: e.target.value })} /></Field>
      <Field label="한글 제목"><input {...attrs("titleKo")} value={article.titleKo} onChange={(e) => commit({ titleKo: e.target.value })} /></Field>
      <Field label="영문 요약" wide><textarea {...attrs("summaryEn")} value={article.summaryEn} onChange={(e) => commit({ summaryEn: e.target.value })} /></Field>
      <Field label="한글 요약" wide><textarea {...attrs("summaryKo")} value={article.summaryKo} onChange={(e) => commit({ summaryKo: e.target.value })} /></Field>
      <Field label="분야"><select value={article.domain} onChange={(e) => commit({ domain: e.target.value as StudioArticle["domain"] })}><option value="science">과학</option><option value="history">역사</option><option value="arts">예술</option><option value="philosophy">철학</option><option value="self-development">자기계발</option><option value="world-culture">세계 문화</option></select></Field>
      <Field label="세부 주제"><input {...attrs("subtopic")} value={article.subtopic} onChange={(e) => commit({ subtopic: e.target.value })} /></Field>
      <Field label="연결 콘텐츠 ID"><input value={article.connectedArticleId} onChange={(e) => commit({ connectedArticleId: e.target.value })} /></Field>
      <Field label="비주얼 테마"><input value={article.visualTheme} onChange={(e) => commit({ visualTheme: e.target.value })} /></Field>
    </Section>

    <Section id="difficulty-age" title="난이도·연령">
      <Field label="액셀러레이터 추정 AR"><input {...attrs("difficulty.value")} type="number" min="0" value={article.difficulty.value} onChange={(e) => commit({ difficulty: { ...article.difficulty, value: Number(e.target.value) || 0 } })} /></Field>
      <Field label="난이도 산정 방식"><select value={article.difficulty.method} onChange={(e) => commit({ difficulty: { ...article.difficulty, method: e.target.value as StudioArticle["difficulty"]["method"] } })}><option value="nonfiction-lab-estimate">액셀러레이터 추정</option><option value="external-user-entry">외부 입력</option></select></Field>
      <Field label="난이도 설명"><input {...attrs("difficulty.label")} value={article.difficulty.label} onChange={(e) => commit({ difficulty: { ...article.difficulty, label: e.target.value } })} /></Field>
      <Field label="권장 독자"><select value={article.interestBand} onChange={(e) => commit({ interestBand: e.target.value as StudioArticle["interestBand"] })}><option value="lower-elementary">초등 저학년</option><option value="upper-elementary">초등 고학년</option><option value="teen">청소년</option><option value="adult">성인</option><option value="all-ages">전 연령</option></select></Field>
      <Field label="권장 최소 연령"><input {...attrs("minAge")} type="number" min="1" value={article.minAge} onChange={(e) => { const minAge = Number(e.target.value) || 0; commit({ minAge, ageRange: `${minAge}-${article.maxAge}` }); }} /></Field>
      <Field label="권장 최대 연령"><input {...attrs("maxAge")} type="number" min="1" value={article.maxAge} onChange={(e) => { const maxAge = Number(e.target.value) || 0; commit({ maxAge, ageRange: `${article.minAge}-${maxAge}` }); }} /></Field>
      <Field label="예상 읽기 시간(초)"><input {...attrs("estimatedReadingSeconds")} type="number" min="1" max="180" value={article.estimatedReadingSeconds} onChange={(e) => commit({ estimatedReadingSeconds: Number(e.target.value) || 0 })} /></Field>
      <Field label="단어 수"><input {...attrs("wordCount")} type="number" min="0" value={article.wordCount} onChange={(e) => commit({ wordCount: Number(e.target.value) || 0 })} /></Field>
      <label className="studio-field studio-field--checkbox"><input {...attrs("safetyReviewed")} type="checkbox" checked={article.safetyReviewed} onChange={(e) => commit({ safetyReviewed: e.target.checked })} /><span>아동 주의 요소 검토 완료</span></label>
      <ArrayEditor field="safetyFlags" invalid={attrs("safetyFlags")} label="아동 주의 요소" items={article.safetyFlags} addLabel="주의 요소 추가" onAdd={() => commit({ safetyFlags: [...article.safetyFlags, ""] })} onRemove={(i) => commit({ safetyFlags: article.safetyFlags.filter((_, j) => j !== i) })} renderItem={(flag, i) => <input {...attrs(`safetyFlags.${i}`)} aria-label={`주의 요소 ${i + 1}`} value={flag} onChange={(e) => commit({ safetyFlags: replaceAt(article.safetyFlags, i, e.target.value) })} />} />
    </Section>

    <Section id="learning-content" title="학습 내용">
      <Field label="학습 목표" wide><textarea {...attrs("learningGoal")} value={article.learningGoal} onChange={(e) => commit({ learningGoal: e.target.value })} /></Field>
      <Field label="핵심 문장" wide><textarea {...attrs("keySentence")} value={article.keySentence} onChange={(e) => commit({ keySentence: e.target.value })} /></Field>
      <Field label="핵심 개념"><input {...attrs("keyConcept")} value={article.keyConcept} onChange={(e) => commit({ keyConcept: e.target.value })} /></Field>
      <ArrayEditor field="pages" invalid={attrs("pages")} label="본문 페이지" items={article.pages} addLabel="본문 페이지 추가" onAdd={() => commit({ pages: [...article.pages, ""] })} onRemove={(i) => commit({ pages: article.pages.filter((_, j) => j !== i) })} renderItem={(page, i) => <textarea {...attrs(`pages.${i}`)} aria-label={`본문 페이지 ${i + 1}`} value={page} onChange={(e) => commit({ pages: replaceAt(article.pages, i, e.target.value) })} />} />
    </Section>

    <Section id="vocabulary" title="어휘">
      <ArrayEditor field="vocabulary" invalid={attrs("vocabulary")} label="어휘" items={article.vocabulary} addLabel="어휘 추가" onAdd={() => commit({ vocabulary: [...article.vocabulary, emptyVocabulary()] })} onRemove={(i) => commit({ vocabulary: article.vocabulary.filter((_, j) => j !== i) })} renderItem={(item, i) => <VocabularyFields item={item} index={i} attrs={attrs} onChange={(next) => commit({ vocabulary: replaceAt(article.vocabulary, i, next) })} />} />
    </Section>

    <Section id="quiz" title="퀴즈">
      <ArrayEditor field="quiz" invalid={attrs("quiz")} label="퀴즈" items={article.quiz} addLabel="퀴즈 추가" onAdd={() => commit({ quiz: [...article.quiz, emptyQuiz(article.quiz.length)] })} onRemove={(i) => commit({ quiz: article.quiz.filter((_, j) => j !== i) })} renderItem={(item, i) => <QuizFields item={item} index={i} attrs={attrs} onChange={(next) => commit({ quiz: replaceAt(article.quiz, i, next) })} />} />
    </Section>

    <Section id="sources-media" title="출처·미디어">
      <Field label="출처 메모" wide><textarea {...attrs("sourceNotes")} value={article.sourceNotes} onChange={(e) => commit({ sourceNotes: e.target.value })} /></Field>
      <label className="studio-field studio-field--checkbox"><input {...attrs("reconstructionConfirmed")} type="checkbox" checked={article.reconstructionConfirmed} onChange={(e) => commit({ reconstructionConfirmed: e.target.checked })} /><span>독립적 재구성 확인</span></label>
      <Field label="사용 조건 확인 메모" wide><textarea {...attrs("rightsNotes")} value={article.rightsNotes} onChange={(e) => commit({ rightsNotes: e.target.value })} /></Field>
      <Field label="오디오 URL" wide><input type="url" value={article.audioUrl ?? ""} onChange={(e) => commit({ audioUrl: e.target.value })} /></Field>
      <ArrayEditor field="sources" invalid={attrs("sources")} label="출처" items={article.sources} addLabel="출처 추가" onAdd={() => commit({ sources: [...article.sources, emptySource()] })} onRemove={(i) => commit({ sources: article.sources.filter((_, j) => j !== i) })} renderItem={(item, i) => <SourceFields item={item} index={i} attrs={attrs} onChange={(next) => commit({ sources: replaceAt(article.sources, i, next) })} />} />
      <ArrayEditor field="media" invalid={attrs("media")} label="미디어" items={article.media} addLabel="미디어 추가" onAdd={() => commit({ media: [...article.media, emptyMedia()] })} onRemove={(i) => commit({ media: article.media.filter((_, j) => j !== i) })} renderItem={(item, i) => <MediaFields item={item} index={i} attrs={attrs} onChange={(next) => commit({ media: replaceAt(article.media, i, next) })} />} />
    </Section>

    <Section id="operations" title="운영 기록">
      <Field label="수정 사유" wide><input value={reason} onChange={(e) => setReason(e.target.value)} /></Field>
      <dl className="studio-operation-log"><div><dt>담당 편집자</dt><dd>{article.editor}</dd></div><div><dt>최근 저장</dt><dd>{formatTimestamp(article.updatedAt)}</dd></div><div><dt>작업 버전</dt><dd>{article.workingVersion}</dd></div><div><dt>변경 기록</dt><dd>{article.changeLog.length}건</dd></div></dl>
      <ul className="studio-change-log" aria-label="수정 이력">{[...article.changeLog].reverse().map((entry, i) => <li key={`${entry.changedAt}-${i}`}><strong>{entry.reason || "사유 미입력"}</strong><span>{entry.fields.join(", ")}</span><time dateTime={entry.changedAt}>{formatTimestamp(entry.changedAt)}</time></li>)}</ul>
    </Section>
  </form>;
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) { const headingId = `${id}-heading`; return <section className="studio-editor-section" id={id} aria-labelledby={headingId}><h2 id={headingId}>{title}</h2><div className="studio-field-grid">{children}</div></section>; }
function Field({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactElement }) { return <label className={`studio-field ${wide ? "studio-field--wide" : ""}`}><span>{label}</span>{children}</label>; }
function ArrayEditor<T>({ field, invalid, label, items, addLabel, onAdd, onRemove, renderItem }: { field: string; invalid: ReturnType<Attrs>; label: string; items: T[]; addLabel: string; onAdd: () => void; onRemove: (i: number) => void; renderItem: (item: T, i: number) => React.ReactNode }) { return <div className="studio-array studio-field--wide"><div className="studio-array__heading"><h3>{label}</h3><button {...invalid} id={studioControlId(field)} type="button" className="button button--ghost" onClick={onAdd}>{addLabel}</button></div>{items.length === 0 ? <p className="studio-array__empty">등록된 {label} 항목이 없습니다.</p> : items.map((item, i) => <fieldset className="studio-array__item" key={i}><legend>{label} {i + 1}</legend>{renderItem(item, i)}<button type="button" className="studio-remove" aria-label={`${label} ${i + 1} 제거`} onClick={() => onRemove(i)}>제거</button></fieldset>)}</div>; }

function VocabularyFields({ item, index, onChange, attrs }: { item: StudioVocabularyItem; index: number; onChange: (item: StudioVocabularyItem) => void; attrs: Attrs }) {
  const f = (part: string) => `vocabulary.${index}.${part}`;
  return <div className="studio-array-fields"><label><span>단어</span><input {...attrs(f("word"))} aria-label={`어휘 ${index + 1} 단어`} value={item.word} onChange={(e) => onChange({ ...item, word: e.target.value })} /></label><label><span>발음</span><input {...attrs(f("pronunciation"))} aria-label={`어휘 ${index + 1} 발음`} value={item.pronunciation} onChange={(e) => onChange({ ...item, pronunciation: e.target.value })} /></label><label><span>한글 뜻</span><input {...attrs(f("meaningKo"))} aria-label={`어휘 ${index + 1} 한글 뜻`} value={item.meaningKo} onChange={(e) => onChange({ ...item, meaningKo: e.target.value })} /></label><label><span>영문 정의</span><input {...attrs(f("definitionEn"))} aria-label={`어휘 ${index + 1} 영문 정의`} value={item.definitionEn} onChange={(e) => onChange({ ...item, definitionEn: e.target.value })} /></label><label className="studio-field--wide"><span>예문</span><input {...attrs(f("exampleSentence"))} aria-label={`어휘 ${index + 1} 예문`} value={item.exampleSentence} onChange={(e) => onChange({ ...item, exampleSentence: e.target.value })} /></label></div>;
}
function QuizFields({ item, index, onChange, attrs }: { item: StudioQuizQuestion; index: number; onChange: (item: StudioQuizQuestion) => void; attrs: Attrs }) {
  const f = (part: string) => `quiz.${index}.${part}`;
  const updateOption = (optionIndex: number, value: string) => onChange({ ...item, options: replaceAt(item.options, optionIndex, value) });
  const optionsAttrs = attrs(f("options"));
  return <div className="studio-array-fields">
    <label><span>문제 유형</span><select {...attrs(f("type"))} aria-label={`퀴즈 ${index + 1} 문제 유형`} value={item.type} onChange={(e) => onChange({ ...item, type: e.target.value as StudioQuizQuestion["type"] })}><option value="comprehension">내용 이해</option><option value="inference">추론</option><option value="vocabulary">어휘</option></select></label>
    <label className="studio-field--wide"><span>질문</span><input {...attrs(f("prompt"))} aria-label={`퀴즈 ${index + 1} 질문`} value={item.prompt} onChange={(e) => onChange({ ...item, prompt: e.target.value })} /></label>
    {item.options.map((value, optionIndex) => <label key={optionIndex}><span>선택지 {optionIndex + 1}</span><input {...optionsAttrs} id={optionIndex === 0 ? optionsAttrs.id : `${optionsAttrs.id}-${optionIndex + 1}`} aria-label={`퀴즈 ${index + 1} 선택지 ${optionIndex + 1}`} value={value} onChange={(e) => updateOption(optionIndex, e.target.value)} /></label>)}
    <label><span>정답 번호</span><input {...attrs(f("correctIndex"))} aria-label={`퀴즈 ${index + 1} 정답 번호`} type="number" min="1" max={item.options.length} value={item.correctIndex + 1} onChange={(e) => onChange({ ...item, correctIndex: Number(e.target.value) - 1 })} /></label>
    <label><span>해설</span><input {...attrs(f("explanation"))} aria-label={`퀴즈 ${index + 1} 해설`} value={item.explanation} onChange={(e) => onChange({ ...item, explanation: e.target.value })} /></label>
    <label className="studio-field--wide"><span>본문 근거</span><input {...attrs(f("evidence"))} aria-label={`퀴즈 ${index + 1} 본문 근거`} value={item.evidence} onChange={(e) => onChange({ ...item, evidence: e.target.value })} /></label>
    <div className="studio-array-buttons"><button type="button" onClick={() => onChange({ ...item, options: [...item.options, ""] })}>선택지 추가</button>{item.options.length > 1 && <button type="button" onClick={() => onChange({ ...item, options: item.options.slice(0, -1), correctIndex: Math.min(item.correctIndex, item.options.length - 2) })}>마지막 선택지 제거</button>}</div>
  </div>;
}
function SourceFields({ item, index, onChange, attrs }: { item: StudioSourceRef; index: number; onChange: (item: StudioSourceRef) => void; attrs: Attrs }) {
  const f = (part: string) => `sources.${index}.${part}`;
  return <div className="studio-array-fields"><label><span>자료 유형</span><select {...attrs(f("materialType"))} aria-label={`출처 ${index + 1} 자료 유형`} value={item.materialType} onChange={(e) => onChange({ ...item, materialType: e.target.value as StudioSourceRef["materialType"] })}><option value="article">기사</option><option value="paper">논문</option><option value="news">뉴스</option><option value="magazine">잡지</option><option value="exam">시험 자료</option><option value="video">영상</option></select></label><label><span>제목</span><input {...attrs(f("title"))} aria-label={`출처 ${index + 1} 제목`} value={item.title} onChange={(e) => onChange({ ...item, title: e.target.value })} /></label><label><span>발행처</span><input {...attrs(f("publisher"))} aria-label={`출처 ${index + 1} 발행처`} value={item.publisher} onChange={(e) => onChange({ ...item, publisher: e.target.value })} /></label><label className="studio-field--wide"><span>URL</span><input {...attrs(f("url"))} aria-label={`출처 ${index + 1} URL`} type="url" value={item.url} onChange={(e) => onChange({ ...item, url: e.target.value })} /></label><label><span>발행일</span><input {...attrs(f("publishedAt"))} aria-label={`출처 ${index + 1} 발행일`} type="date" value={item.publishedAt ?? ""} onChange={(e) => onChange({ ...item, publishedAt: e.target.value })} /></label><label className="studio-field--wide"><span>뒷받침 사실</span><input {...attrs(f("supportedFact"))} aria-label={`출처 ${index + 1} 뒷받침 사실`} value={item.supportedFact} onChange={(e) => onChange({ ...item, supportedFact: e.target.value })} /></label></div>;
}
function MediaFields({ item, index, onChange, attrs }: { item: MediaEmbed; index: number; onChange: (item: MediaEmbed) => void; attrs: Attrs }) {
  const f = (part: string) => `media.${index}.${part}`;
  return <div className="studio-array-fields"><label><span>제공처</span><select {...attrs(f("provider"))} aria-label={`미디어 ${index + 1} 제공처`} value={item.provider} onChange={(e) => onChange({ ...item, provider: e.target.value as MediaEmbed["provider"] })}><option value="youtube">YouTube</option><option value="ted">TED</option><option value="cnn">CNN</option></select></label><label><span>대체 텍스트</span><input {...attrs(f("alt"))} aria-label={`미디어 ${index + 1} 대체 텍스트`} value={item.alt} onChange={(e) => onChange({ ...item, alt: e.target.value })} /></label><label className="studio-field--wide"><span>공식 임베드 URL</span><input {...attrs(f("embedUrl"))} aria-label={`미디어 ${index + 1} 공식 임베드 URL`} type="url" value={item.embedUrl} onChange={(e) => onChange({ ...item, embedUrl: e.target.value })} /></label><label className="studio-field--checkbox"><input {...attrs(f("usageConfirmed"))} aria-label={`미디어 ${index + 1} 사용 조건 확인`} type="checkbox" checked={item.usageConfirmed} onChange={(e) => onChange({ ...item, usageConfirmed: e.target.checked })} /><span>사용 조건 확인</span></label></div>;
}
function replaceAt<T>(items: T[], index: number, value: T): T[] { return items.map((item, i) => i === index ? value : item); }
function emptyVocabulary(): StudioVocabularyItem { return { word: "", pronunciation: "", meaningKo: "", definitionEn: "", exampleSentence: "" }; }
function emptyQuiz(index: number): StudioQuizQuestion { return { id: `q${index + 1}`, type: "comprehension", prompt: "", options: ["", ""], correctIndex: 0, explanation: "", evidence: "" }; }
function emptySource(): StudioSourceRef { return { title: "", publisher: "", url: "", publishedAt: "", materialType: "article", supportedFact: "" }; }
function emptyMedia(): MediaEmbed { return { provider: "youtube", embedUrl: "", alt: "", usageConfirmed: false }; }
function formatTimestamp(value: string): string { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(date); }
