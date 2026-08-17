"use client";

import { Fragment, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ProgressBar } from "./ui/progress-bar";
import type { Article, VocabularyItem } from "@/lib/types";

export type ReaderEvent = { type: "page_view" | "word_open" | "audio_play" | "reader_complete"; articleId: string; at: string; detail?: string };

export function ReaderScreen({ article, onFinish, onBack, onEvent }: { article: Article; onFinish: () => void; onBack: () => void; onEvent: (event: ReaderEvent) => void }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [word, setWord] = useState<VocabularyItem | null>(null);
  const [audioError, setAudioError] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const page = article.pages[pageIndex];
  const lastPage = pageIndex === article.pages.length - 1;

  const emit = (type: ReaderEvent["type"], detail?: string) => onEvent({ type, articleId: article.id, at: new Date().toISOString(), detail });
  const openWord = (item: VocabularyItem, button: HTMLButtonElement) => { triggerRef.current = button; setWord(item); emit("word_open", item.word); };
  const closeWord = () => { setWord(null); requestAnimationFrame(() => triggerRef.current?.focus()); };
  const playAudio = () => {
    emit("audio_play");
    if (!article.audioUrl) { setAudioError(true); return; }
    const audio = new Audio(article.audioUrl);
    audio.play().catch(() => setAudioError(true));
  };

  const renderText = () => {
    const pattern = new RegExp(`(${article.vocabulary.map((item) => item.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
    return page.split(pattern).map((part, index) => {
      const item = article.vocabulary.find((entry) => entry.word.toLowerCase() === part.toLowerCase());
      return item ? <button key={`${part}-${index}`} type="button" className="word-button" aria-label={`${item.word} 뜻 보기`} onClick={(event) => openWord(item, event.currentTarget)}>{part}</button> : <Fragment key={`${part}-${index}`}>{part}</Fragment>;
    });
  };

  return (
    <section className="reader-screen">
      <header className="reader-top"><button type="button" className="icon-button" aria-label="읽기 종료" onClick={onBack}>←</button><span>{pageIndex + 1} / {article.pages.length}</span><button type="button" className="icon-button" aria-label="글 저장">♡</button></header>
      <ProgressBar value={pageIndex + 1} max={article.pages.length} label="읽기 진행률" />
      <div className={`article-visual article-visual--${article.visualTheme}`}><span>{article.domain.toUpperCase()} · 오늘의 질문</span></div>
      <p className="eyebrow">{article.titleKo}</p><h1>{article.title}</h1>
      <button type="button" className="audio-button" onClick={playAudio}><span aria-hidden="true">▶</span><strong>원어민 오디오로 듣기</strong></button>
      {audioError && <p className="inline-notice">오디오는 지금 사용할 수 없어요</p>}
      <p className="article-copy">{renderText()}</p>
      {lastPage && <details className="source-drawer"><summary>출처와 검수 정보</summary><ul>{article.sources.map((item) => <li key={item.url}><a href={item.url} target="_blank" rel="noreferrer">{item.publisher}: {item.title}</a></li>)}</ul><p>{article.review.approvedBy} · {article.review.approvedAt} 승인</p></details>}
      <div className="reader-action"><Button fullWidth onClick={() => {
        if (lastPage) { emit("reader_complete"); onFinish(); }
        else { const next = pageIndex + 1; setPageIndex(next); emit("page_view", String(next)); }
      }}>{lastPage ? "이해 퀴즈 시작" : "다음 페이지"}</Button></div>
      {word && <div className="dialog-backdrop" onMouseDown={closeWord}><div role="dialog" aria-modal="true" aria-label={word.word} className="word-dialog" onMouseDown={(event) => event.stopPropagation()}><button type="button" className="icon-button word-dialog__close" aria-label="단어 설명 닫기" onClick={closeWord}>×</button><h2>{word.word}</h2><p className="pronunciation">{word.pronunciation}</p><p>{word.definitionEn}</p><strong>{word.meaningKo}</strong></div></div>}
    </section>
  );
}
