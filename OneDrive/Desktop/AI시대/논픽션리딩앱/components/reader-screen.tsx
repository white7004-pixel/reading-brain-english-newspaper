"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ProgressBar } from "./ui/progress-bar";
import type { Article, VocabularyItem } from "@/lib/types";
import { isSafePublicMedia } from "@/lib/public-article-schema";
import { ArticleHeroPhoto } from "./article-hero-photo";

export type ReaderEvent = { type: "page_view" | "word_open" | "audio_play" | "reader_complete"; articleId: string; at: string; detail?: string };

export function ReaderScreen({ article, onFinish, onBack, onEvent }: { article: Article; onFinish: () => void; onBack: () => void; onEvent: (event: ReaderEvent) => void }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [word, setWord] = useState<VocabularyItem | null>(null);
  const [audioError, setAudioError] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [selectedSentence, setSelectedSentence] = useState<string | null>(null);
  const [finderChecked, setFinderChecked] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const safePageIndex = Math.min(pageIndex, Math.max(article.pages.length - 1, 0));
  const page = article.pages[safePageIndex] ?? "";
  const lastPage = safePageIndex === article.pages.length - 1;
  const safeMedia = (article.media ?? []).filter(isSafePublicMedia);
  const sentences = (page.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [page]).map((sentence) => sentence.trim()).filter(Boolean);
  const keySentenceCorrect = selectedSentence?.trim() === article.keySentence.trim();

  useEffect(() => {
    setPageIndex((current) => Math.min(current, Math.max(article.pages.length - 1, 0)));
  }, [article.pages.length]);

  const emit = (type: ReaderEvent["type"], detail?: string) => onEvent({ type, articleId: article.id, at: new Date().toISOString(), detail });
  const openWord = (item: VocabularyItem, button: HTMLButtonElement) => { triggerRef.current = button; setWord(item); emit("word_open", item.word); };
  const closeWord = () => { setWord(null); requestAnimationFrame(() => triggerRef.current?.focus()); };
  const toggleSelectedWord = (selectedWord: string) => {
    setFinderChecked(false);
    setSelectedWords((current) => current.includes(selectedWord) ? current.filter((item) => item !== selectedWord) : [...current, selectedWord]);
  };
  const resetFinder = () => { setSelectedWords([]); setSelectedSentence(null); setFinderChecked(false); };
  const playAudio = () => {
    emit("audio_play");
    if (!article.audioUrl) { setAudioError(true); return; }
    const audio = new Audio(article.audioUrl);
    audio.play().catch(() => setAudioError(true));
  };

  const renderText = () => {
    const vocabulary = article.vocabulary
      .map((item) => ({ ...item, word: item.word.trim() }))
      .filter((item) => item.word.length > 0);
    if (vocabulary.length === 0) return page;

    const pattern = new RegExp(`(${vocabulary.map((item) => item.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
    return page.split(pattern).map((part, index) => {
      const item = vocabulary.find((entry) => entry.word.toLowerCase() === part.toLowerCase());
      if (!item) return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
      if (finderOpen) return <button key={`${part}-${index}`} type="button" className={`word-button key-finder__word${selectedWords.includes(item.word) ? " is-selected" : ""}`} aria-pressed={selectedWords.includes(item.word)} aria-label={`${item.word} 핵심단어로 선택`} onClick={() => toggleSelectedWord(item.word)}>{part}</button>;
      return <button key={`${part}-${index}`} type="button" className="word-button" aria-label={`${item.word} 뜻 보기`} onClick={(event) => openWord(item, event.currentTarget)}>{part}</button>;
    });
  };

  return (
    <section className="reader-screen">
      <header className="reader-top"><button type="button" className="icon-button" aria-label="읽기 종료" onClick={onBack}>←</button><span>{safePageIndex + 1} / {article.pages.length}</span><button type="button" className="icon-button" aria-label="글 저장">♡</button></header>
      <ProgressBar value={safePageIndex + 1} max={article.pages.length} label="읽기 진행률" />
      <ArticleHeroPhoto heroImage={article.heroImage} visualTheme={article.visualTheme} variant="reader"><span>{article.domain.toUpperCase()} · 오늘의 질문</span></ArticleHeroPhoto>
      {safeMedia.length > 0 && <div className="reader-media">
        {safeMedia.map((item) => item.kind === "image"
          ? <img key={`image-${item.url}`} className="reader-media__asset" src={item.url} alt={item.alt} loading="lazy" referrerPolicy="no-referrer" />
          : <iframe key={`video-${item.embedUrl}`} className="reader-media__asset" src={item.embedUrl} title={item.alt} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />)}
      </div>}
      <p className="eyebrow">{article.titleKo}</p><h1>{article.title}</h1>
      <button type="button" className="audio-button" onClick={playAudio}><span aria-hidden="true">▶</span><strong>원어민 오디오로 듣기</strong></button>
      {audioError && <p className="inline-notice">오디오는 지금 사용할 수 없어요</p>}
      <button type="button" className="key-finder__toggle" aria-expanded={finderOpen} onClick={() => { setFinderOpen((current) => !current); resetFinder(); }}>핵심 찾기</button>
      <p className="article-copy">{renderText()}</p>
      {finderOpen && <section className="key-finder" aria-labelledby="key-finder-heading">
        <h2 id="key-finder-heading">핵심단어와 핵심문장 찾기</h2>
        <p>본문의 강조 단어와 아래 문장 중 핵심이라고 생각하는 것을 직접 골라 보세요.</p>
        <div className="key-finder__sentences">
          {sentences.map((sentence, index) => <button key={`${sentence}-${index}`} type="button" className={`key-finder__sentence${selectedSentence === sentence ? " is-selected" : ""}`} aria-pressed={selectedSentence === sentence} aria-label={`${sentence} 핵심문장으로 선택`} onClick={() => { setSelectedSentence(sentence); setFinderChecked(false); }}>{sentence}</button>)}
        </div>
        <div className="key-finder__toolbar">
          <button type="button" disabled={!selectedWords.length || !selectedSentence} onClick={() => setFinderChecked(true)}>정답 확인</button>
          {(selectedWords.length > 0 || selectedSentence) && <button type="button" onClick={resetFinder}>다시 찾기</button>}
        </div>
        {finderChecked && <div className={`key-finder__result${keySentenceCorrect ? " is-correct" : ""}`} role="status">
          <strong>{keySentenceCorrect ? "핵심문장을 찾았어요!" : "핵심문장을 다시 살펴보세요."}</strong>
          <p>핵심단어 정답: {article.vocabulary.map((item) => item.word).join(", ")}</p>
          <p>핵심문장 정답: {article.keySentence}</p>
        </div>}
      </section>}
      {lastPage && <details className="source-drawer"><summary>출처와 검수 정보</summary><ul>{article.sources.map((item) => <li key={item.url}><a href={item.url} target="_blank" rel="noreferrer">{item.publisher}: {item.title}</a></li>)}</ul><p>{article.review.approvedBy} · {article.review.approvedAt} 승인</p></details>}
      <div className="reader-action"><Button fullWidth onClick={() => {
        if (lastPage) { emit("reader_complete"); onFinish(); }
        else { const next = safePageIndex + 1; setPageIndex(next); setFinderOpen(false); resetFinder(); emit("page_view", String(next)); }
      }}>{lastPage ? "이해 퀴즈 시작" : "다음 페이지"}</Button></div>
      {word && <div className="dialog-backdrop" onMouseDown={closeWord}><div role="dialog" aria-modal="true" aria-label={word.word} className="word-dialog" onMouseDown={(event) => event.stopPropagation()}><button type="button" className="icon-button word-dialog__close" aria-label="단어 설명 닫기" onClick={closeWord}>×</button><h2>{word.word}</h2><p className="pronunciation">{word.pronunciation}</p><p>{word.definitionEn}</p><strong>{word.meaningKo}</strong></div></div>}
    </section>
  );
}
