"use client";

import { useState } from "react";
import { applyArticleEdit } from "@/lib/studio-workflow";
import type { ArticleEditPatch, MediaEmbed, StudioArticle } from "@/lib/studio-types";
import type { QuizQuestion, SourceRef, VocabularyItem } from "@/lib/types";

type ArticleEditorProps = {
  article: StudioArticle;
  onArticleChange: (article: StudioArticle) => void;
  now?: () => string;
};

export function ArticleEditor({ article, onArticleChange, now = () => new Date().toISOString() }: ArticleEditorProps) {
  const [saveState, setSaveState] = useState<"idle" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState("");

  const commit = (patch: ArticleEditPatch) => {
    try {
      onArticleChange(applyArticleEdit(article, patch, now()));
      setSaveState("saved");
      setSaveError("");
    } catch (error) {
      setSaveState("error");
      setSaveError(error instanceof Error ? error.message : "변경 내용을 저장하지 못했습니다.");
    }
  };

  return (
    <form className="studio-editor" aria-label="콘텐츠 편집기" onSubmit={(event) => event.preventDefault()}>
      <div className="studio-editor__save" role="status" aria-live="polite">
        <span>작업 버전 {article.workingVersion}</span>
        <strong>{saveState === "saved" ? "저장됨" : saveState === "error" ? "저장 실패" : "변경 대기"}</strong>
      </div>
      {saveError && <p className="studio-field-error">{saveError}</p>}

      <EditorSection id="basic-info" title="기본 정보">
        <Field label="영문 제목"><input value={article.title} onChange={(event) => commit({ title: event.target.value })} /></Field>
        <Field label="한글 제목"><input value={article.titleKo} onChange={(event) => commit({ titleKo: event.target.value })} /></Field>
        <Field label="한글 요약" wide><textarea value={article.summaryKo} onChange={(event) => commit({ summaryKo: event.target.value })} /></Field>
        <Field label="분야">
          <select value={article.domain} onChange={(event) => commit({ domain: event.target.value as StudioArticle["domain"] })}>
            <option value="science">과학</option><option value="history">역사</option><option value="arts">예술</option><option value="philosophy">철학</option><option value="self-development">자기계발</option><option value="world-culture">세계 문화</option>
          </select>
        </Field>
        <Field label="연결 콘텐츠 ID"><input value={article.connectedArticleId} onChange={(event) => commit({ connectedArticleId: event.target.value })} /></Field>
        <Field label="비주얼 테마"><input value={article.visualTheme} onChange={(event) => commit({ visualTheme: event.target.value })} /></Field>
      </EditorSection>

      <EditorSection id="difficulty-age" title="난이도·연령">
        <Field label="논픽션랩 추정 AR"><input type="number" min="0" value={article.difficulty.value} onChange={(event) => commit({ difficulty: { ...article.difficulty, value: Number(event.target.value) || 0 } })} /></Field>
        <Field label="난이도 산정 방식">
          <select value={article.difficulty.method} onChange={(event) => commit({ difficulty: { ...article.difficulty, method: event.target.value as StudioArticle["difficulty"]["method"] } })}>
            <option value="nonfiction-lab-estimate">논픽션랩 추정</option><option value="external-user-entry">외부 입력</option>
          </select>
        </Field>
        <Field label="난이도 설명"><input value={article.difficulty.label} onChange={(event) => commit({ difficulty: { ...article.difficulty, label: event.target.value } })} /></Field>
        <Field label="권장 독자">
          <select value={article.interestBand} onChange={(event) => commit({ interestBand: event.target.value as StudioArticle["interestBand"] })}>
            <option value="lower-elementary">초등 저학년</option><option value="upper-elementary">초등 고학년</option><option value="teen">청소년</option><option value="adult">성인</option><option value="all-ages">전 연령</option>
          </select>
        </Field>
        <Field label="권장 연령"><input value={article.ageRange} onChange={(event) => commit({ ageRange: event.target.value })} /></Field>
        <Field label="단어 수"><input type="number" min="0" value={article.wordCount} onChange={(event) => commit({ wordCount: Number(event.target.value) || 0 })} /></Field>
      </EditorSection>

      <EditorSection id="learning-content" title="학습 내용">
        <Field label="학습 목표" wide><textarea value={article.learningGoal} onChange={(event) => commit({ learningGoal: event.target.value })} /></Field>
        <Field label="핵심 문장" wide><textarea value={article.keySentence} onChange={(event) => commit({ keySentence: event.target.value })} /></Field>
        <Field label="핵심 개념"><input value={article.keyConcept} onChange={(event) => commit({ keyConcept: event.target.value })} /></Field>
        <ArrayEditor
          label="본문 페이지"
          items={article.pages}
          addLabel="본문 페이지 추가"
          onAdd={() => commit({ pages: [...article.pages, ""] })}
          onRemove={(index) => commit({ pages: article.pages.filter((_, itemIndex) => itemIndex !== index) })}
          renderItem={(page, index) => <textarea aria-label={`본문 페이지 ${index + 1}`} value={page} onChange={(event) => commit({ pages: replaceAt(article.pages, index, event.target.value) })} />}
        />
      </EditorSection>

      <EditorSection id="vocabulary" title="어휘">
        <ArrayEditor
          label="어휘"
          items={article.vocabulary}
          addLabel="어휘 추가"
          onAdd={() => commit({ vocabulary: [...article.vocabulary, emptyVocabulary()] })}
          onRemove={(index) => commit({ vocabulary: article.vocabulary.filter((_, itemIndex) => itemIndex !== index) })}
          renderItem={(item, index) => <VocabularyFields item={item} index={index} onChange={(next) => commit({ vocabulary: replaceAt(article.vocabulary, index, next) })} />}
        />
      </EditorSection>

      <EditorSection id="quiz" title="퀴즈">
        <ArrayEditor
          label="퀴즈"
          items={article.quiz}
          addLabel="퀴즈 추가"
          onAdd={() => commit({ quiz: [...article.quiz, emptyQuiz(article.quiz.length)] })}
          onRemove={(index) => commit({ quiz: article.quiz.filter((_, itemIndex) => itemIndex !== index) })}
          renderItem={(item, index) => <QuizFields item={item} index={index} onChange={(next) => commit({ quiz: replaceAt(article.quiz, index, next) })} />}
        />
      </EditorSection>

      <EditorSection id="sources-media" title="출처·미디어">
        <Field label="출처 메모" wide><textarea value={article.sourceNotes} onChange={(event) => commit({ sourceNotes: event.target.value })} /></Field>
        <Field label="오디오 URL" wide><input type="url" value={article.audioUrl ?? ""} onChange={(event) => commit({ audioUrl: event.target.value })} /></Field>
        <ArrayEditor
          label="출처"
          items={article.sources}
          addLabel="출처 추가"
          onAdd={() => commit({ sources: [...article.sources, emptySource()] })}
          onRemove={(index) => commit({ sources: article.sources.filter((_, itemIndex) => itemIndex !== index) })}
          renderItem={(item, index) => <SourceFields item={item} index={index} onChange={(next) => commit({ sources: replaceAt(article.sources, index, next) })} />}
        />
        <ArrayEditor
          label="미디어"
          items={article.media}
          addLabel="미디어 추가"
          onAdd={() => commit({ media: [...article.media, emptyMedia()] })}
          onRemove={(index) => commit({ media: article.media.filter((_, itemIndex) => itemIndex !== index) })}
          renderItem={(item, index) => <MediaFields item={item} index={index} onChange={(next) => commit({ media: replaceAt(article.media, index, next) })} />}
        />
      </EditorSection>

      <EditorSection id="operations" title="운영 기록">
        <dl className="studio-operation-log">
          <div><dt>담당 편집자</dt><dd>{article.editor}</dd></div>
          <div><dt>최근 저장</dt><dd>{formatTimestamp(article.updatedAt)}</dd></div>
          <div><dt>작업 버전</dt><dd>{article.workingVersion}</dd></div>
          <div><dt>변경 기록</dt><dd>{article.changeLog.length}건</dd></div>
        </dl>
      </EditorSection>
    </form>
  );
}

function EditorSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const headingId = `${id}-heading`;
  return <section className="studio-editor-section" id={id} aria-labelledby={headingId}><h2 id={headingId}>{title}</h2><div className="studio-field-grid">{children}</div></section>;
}

function Field({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactElement }) {
  return <label className={`studio-field ${wide ? "studio-field--wide" : ""}`}><span>{label}</span>{children}</label>;
}

function ArrayEditor<T>({ label, items, addLabel, onAdd, onRemove, renderItem }: { label: string; items: T[]; addLabel: string; onAdd: () => void; onRemove: (index: number) => void; renderItem: (item: T, index: number) => React.ReactNode }) {
  return (
    <div className="studio-array studio-field--wide">
      <div className="studio-array__heading"><h3>{label}</h3><button type="button" className="button button--ghost" onClick={onAdd}>{addLabel}</button></div>
      {items.length === 0 ? <p className="studio-array__empty">등록된 {label} 항목이 없습니다.</p> : items.map((item, index) => (
        <fieldset className="studio-array__item" key={index}>
          <legend>{label} {index + 1}</legend>
          {renderItem(item, index)}
          <button type="button" className="studio-remove" aria-label={`${label} ${index + 1} 제거`} onClick={() => onRemove(index)}>제거</button>
        </fieldset>
      ))}
    </div>
  );
}

function VocabularyFields({ item, index, onChange }: { item: VocabularyItem; index: number; onChange: (item: VocabularyItem) => void }) {
  return <div className="studio-array-fields"><label><span>단어</span><input aria-label={`어휘 ${index + 1} 단어`} value={item.word} onChange={(event) => onChange({ ...item, word: event.target.value })} /></label><label><span>발음</span><input aria-label={`어휘 ${index + 1} 발음`} value={item.pronunciation} onChange={(event) => onChange({ ...item, pronunciation: event.target.value })} /></label><label><span>한글 뜻</span><input aria-label={`어휘 ${index + 1} 한글 뜻`} value={item.meaningKo} onChange={(event) => onChange({ ...item, meaningKo: event.target.value })} /></label><label><span>영문 정의</span><input aria-label={`어휘 ${index + 1} 영문 정의`} value={item.definitionEn} onChange={(event) => onChange({ ...item, definitionEn: event.target.value })} /></label></div>;
}

function QuizFields({ item, index, onChange }: { item: QuizQuestion; index: number; onChange: (item: QuizQuestion) => void }) {
  const updateOption = (optionIndex: number, value: string) => onChange({ ...item, options: replaceAt(item.options, optionIndex, value) });
  return <div className="studio-array-fields"><label className="studio-field--wide"><span>질문</span><input aria-label={`퀴즈 ${index + 1} 질문`} value={item.prompt} onChange={(event) => onChange({ ...item, prompt: event.target.value })} /></label>{item.options.map((option, optionIndex) => <label key={optionIndex}><span>선택지 {optionIndex + 1}</span><input aria-label={`퀴즈 ${index + 1} 선택지 ${optionIndex + 1}`} value={option} onChange={(event) => updateOption(optionIndex, event.target.value)} /></label>)}<label><span>정답 번호</span><input aria-label={`퀴즈 ${index + 1} 정답 번호`} type="number" min="1" max={item.options.length} value={item.correctIndex + 1} onChange={(event) => onChange({ ...item, correctIndex: Math.max(0, Number(event.target.value) - 1) })} /></label><label><span>해설</span><input aria-label={`퀴즈 ${index + 1} 해설`} value={item.explanation} onChange={(event) => onChange({ ...item, explanation: event.target.value })} /></label><div className="studio-array-buttons"><button type="button" onClick={() => onChange({ ...item, options: [...item.options, ""] })}>선택지 추가</button>{item.options.length > 1 && <button type="button" onClick={() => onChange({ ...item, options: item.options.slice(0, -1), correctIndex: Math.min(item.correctIndex, item.options.length - 2) })}>마지막 선택지 제거</button>}</div></div>;
}

function SourceFields({ item, index, onChange }: { item: SourceRef; index: number; onChange: (item: SourceRef) => void }) {
  return <div className="studio-array-fields"><label><span>제목</span><input aria-label={`출처 ${index + 1} 제목`} value={item.title} onChange={(event) => onChange({ ...item, title: event.target.value })} /></label><label><span>발행처</span><input aria-label={`출처 ${index + 1} 발행처`} value={item.publisher} onChange={(event) => onChange({ ...item, publisher: event.target.value })} /></label><label className="studio-field--wide"><span>URL</span><input aria-label={`출처 ${index + 1} URL`} type="url" value={item.url} onChange={(event) => onChange({ ...item, url: event.target.value })} /></label><label><span>발행일</span><input aria-label={`출처 ${index + 1} 발행일`} type="date" value={item.publishedAt ?? ""} onChange={(event) => onChange({ ...item, publishedAt: event.target.value })} /></label></div>;
}

function MediaFields({ item, index, onChange }: { item: MediaEmbed; index: number; onChange: (item: MediaEmbed) => void }) {
  return <div className="studio-array-fields"><label><span>제공처</span><select aria-label={`미디어 ${index + 1} 제공처`} value={item.provider} onChange={(event) => onChange({ ...item, provider: event.target.value as MediaEmbed["provider"] })}><option value="youtube">YouTube</option><option value="ted">TED</option><option value="cnn">CNN</option></select></label><label><span>대체 텍스트</span><input aria-label={`미디어 ${index + 1} 대체 텍스트`} value={item.alt} onChange={(event) => onChange({ ...item, alt: event.target.value })} /></label><label className="studio-field--wide"><span>공식 임베드 URL</span><input aria-label={`미디어 ${index + 1} 공식 임베드 URL`} type="url" defaultValue={item.embedUrl} onBlur={(event) => onChange({ ...item, embedUrl: event.target.value })} /></label></div>;
}

function replaceAt<T>(items: T[], index: number, value: T): T[] {
  return items.map((item, itemIndex) => itemIndex === index ? value : item);
}

function emptyVocabulary(): VocabularyItem { return { word: "", pronunciation: "", meaningKo: "", definitionEn: "" }; }
function emptyQuiz(index: number): QuizQuestion { return { id: `q${index + 1}`, prompt: "", options: ["", ""], correctIndex: 0, explanation: "" }; }
function emptySource(): SourceRef { return { title: "", publisher: "", url: "" }; }
function emptyMedia(): MediaEmbed { return { provider: "youtube", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", alt: "" }; }

function formatTimestamp(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(date);
}
