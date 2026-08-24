"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ProgressBar } from "./ui/progress-bar";
import type { Article, VocabularyItem } from "@/lib/types";
import { isSafePublicMedia } from "@/lib/public-article-schema";
import { ArticleHeroPhoto } from "./article-hero-photo";
import { getNativeAudioUrl } from "@/lib/native-audio";
import { getKoreanPreview } from "@/lib/korean-preview";

export type ReaderEvent = { type: "page_view" | "word_open" | "audio_play" | "reader_complete" | "key_finder_check"; articleId: string; at: string; detail?: string; keyFinderSelections?: string[] };
type WordTiming = { startMs: number; endMs: number; charIndex: number; length: number };

function spokenWordRange(text: string, charIndex: number): { start: number; end: number } | null {
  const words = text.matchAll(/[A-Za-z]+(?:['’-][A-Za-z]+)*/g);
  for (const word of words) {
    const start = word.index;
    const end = start + word[0].length;
    if ((charIndex >= start && charIndex < end) || start >= charIndex) return { start, end };
  }
  return null;
}

function selectNativeEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en-"));
  const score = (voice: SpeechSynthesisVoice) => {
    const lang = voice.lang.toLowerCase();
    const name = voice.name.toLowerCase();
    return (lang === "en-us" ? 100 : lang === "en-gb" ? 80 : 60)
      + (/natural|neural|premium|enhanced/.test(name) ? 100 : 0)
      + (/online/.test(name) ? 20 : 0);
  };
  return englishVoices.sort((left, right) => score(right) - score(left))[0] ?? null;
}

export function ReaderScreen({ article, initialPageIndex = 0, onFinish, onBack, onEvent, onPageChange }: { article: Article; initialPageIndex?: number; onFinish: () => void; onBack: () => void; onEvent: (event: ReaderEvent) => void; onPageChange?: (pageIndex: number) => void }) {
  const [pageIndex, setPageIndex] = useState(() => Math.max(0, Math.min(initialPageIndex, Math.max(article.pages.length - 1, 0))));
  const readerArticleIdRef = useRef(article.id);
  const [word, setWord] = useState<VocabularyItem | null>(null);
  const [audioError, setAudioError] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [spokenRange, setSpokenRange] = useState<{ start: number; end: number } | null>(null);
  const [finderOpen, setFinderOpen] = useState(false);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [selectedSentence, setSelectedSentence] = useState<string | null>(null);
  const [finderChecked, setFinderChecked] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const safePageIndex = Math.min(pageIndex, Math.max(article.pages.length - 1, 0));
  const page = article.pages[safePageIndex] ?? "";
  const lastPage = safePageIndex === article.pages.length - 1;
  const safeMedia = (article.media ?? []).filter(isSafePublicMedia);
  const sentences = (page.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [page]).map((sentence) => sentence.trim()).filter(Boolean);
  const keySentenceCorrect = selectedSentence?.trim() === article.keySentence.trim();
  const koreanPreview = getKoreanPreview(article.id, article.summaryKo);

  useEffect(() => {
    const maximum = Math.max(article.pages.length - 1, 0);
    setPageIndex((current) => {
      if (readerArticleIdRef.current !== article.id) {
        readerArticleIdRef.current = article.id;
        return Math.max(0, Math.min(initialPageIndex, maximum));
      }
      return Math.max(0, Math.min(current, maximum));
    });
  }, [article.id, article.pages.length, initialPageIndex]);

  const emit = (type: ReaderEvent["type"], detail?: string, keyFinderSelections?: string[]) => onEvent({
    type,
    articleId: article.id,
    at: new Date().toISOString(),
    detail,
    ...(keyFinderSelections ? { keyFinderSelections: [...keyFinderSelections] } : {}),
  });
  useEffect(() => {
    if (finderChecked) emit("key_finder_check", keySentenceCorrect ? "correct" : "incorrect", selectedWords);
  }, [finderChecked]);
  const openWord = (item: VocabularyItem, button: HTMLButtonElement) => { triggerRef.current = button; setWord(item); emit("word_open", item.word); };
  const closeWord = () => { setWord(null); requestAnimationFrame(() => triggerRef.current?.focus()); };
  const toggleSelectedWord = (selectedWord: string) => {
    setFinderChecked(false);
    setSelectedWords((current) => current.includes(selectedWord) ? current.filter((item) => item !== selectedWord) : [...current, selectedWord]);
  };
  const resetFinder = () => { setSelectedWords([]); setSelectedSentence(null); setFinderChecked(false); };
  const stopNarration = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsAudioPlaying(false);
    setSpokenRange(null);
  };
  const playAudio = () => {
    emit("audio_play");
    setAudioError(false);
    stopNarration();
    const nativeAudioUrl = getNativeAudioUrl(article.id, safePageIndex);
    const recordedAudioUrl = article.audioUrl ?? nativeAudioUrl;
    if (recordedAudioUrl) {
      const audio = new Audio(recordedAudioUrl);
      let wordTimings: WordTiming[] = [];
      if (nativeAudioUrl) {
        void fetch(nativeAudioUrl.replace(/\.mp3$/, ".json"))
          .then((response) => response.ok ? response.json() as Promise<WordTiming[]> : [])
          .then((timings) => { wordTimings = timings; })
          .catch(() => {});
      }
      audioRef.current = audio;
      audio.addEventListener("timeupdate", () => {
        if (wordTimings.length > 0) {
          const currentMs = audio.currentTime * 1000;
          const timing = wordTimings.find((item) => currentMs >= item.startMs && currentMs < item.endMs);
          setSpokenRange(timing ? { start: timing.charIndex, end: timing.charIndex + timing.length } : null);
          return;
        }
        if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
        const charIndex = Math.min(page.length - 1, Math.floor((audio.currentTime / audio.duration) * page.length));
        setSpokenRange(spokenWordRange(page, charIndex));
      });
      audio.addEventListener("ended", () => { audioRef.current = null; setIsAudioPlaying(false); setSpokenRange(null); });
      setIsAudioPlaying(true);
      audio.play().catch(() => { audioRef.current = null; setIsAudioPlaying(false); setAudioError(true); });
      return;
    }
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setAudioError(true);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(page);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.voice = selectNativeEnglishVoice(window.speechSynthesis.getVoices());
    utterance.onboundary = (event) => {
      if (event.name && event.name !== "word") return;
      setSpokenRange(spokenWordRange(page, event.charIndex));
    };
    utterance.onend = () => { setIsAudioPlaying(false); setSpokenRange(null); };
    utterance.onerror = () => { setIsAudioPlaying(false); setSpokenRange(null); setAudioError(true); };
    setIsAudioPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const renderText = () => {
    const vocabulary = article.vocabulary
      .map((item) => ({ ...item, word: item.word.trim() }))
      .filter((item) => item.word.length > 0);
    const pattern = vocabulary.length > 0
      ? new RegExp(`(${vocabulary.map((item) => item.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi")
      : null;
    let offset = 0;
    return (pattern ? page.split(pattern) : [page]).map((part, index) => {
      const start = offset;
      const end = start + part.length;
      offset = end;
      const item = vocabulary.find((entry) => entry.word.toLowerCase() === part.toLowerCase());
      if (!item) {
        const highlightStart = spokenRange ? Math.max(start, spokenRange.start) : end;
        const highlightEnd = spokenRange ? Math.min(end, spokenRange.end) : start;
        if (highlightStart >= highlightEnd) return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
        return <Fragment key={`${part}-${index}`}>
          {part.slice(0, highlightStart - start)}
          <mark className="audio-follow-highlight">{part.slice(highlightStart - start, highlightEnd - start)}</mark>
          {part.slice(highlightEnd - start)}
        </Fragment>;
      }
      if (finderOpen) return <button key={`${part}-${index}`} type="button" className={`word-button key-finder__word${selectedWords.includes(item.word) ? " is-selected" : ""}`} aria-pressed={selectedWords.includes(item.word)} aria-label={`${item.word} 핵심단어로 선택`} onClick={() => toggleSelectedWord(item.word)}>{part}</button>;
      const active = Boolean(spokenRange && start < spokenRange.end && end > spokenRange.start);
      return <button key={`${part}-${index}`} type="button" className={`word-button${active ? " is-audio-current" : ""}`} aria-label={`${item.word} 뜻 보기`} onClick={(event) => openWord(item, event.currentTarget)}>{part}</button>;
    });
  };

  return (
    <section className="reader-screen">
      <header className="reader-top"><button type="button" className="icon-button" aria-label="읽기 종료" onClick={() => { stopNarration(); onBack(); }}>←</button><span>{safePageIndex + 1} / {article.pages.length}</span><button type="button" className="icon-button" aria-label="글 저장">♡</button></header>
      <ProgressBar value={safePageIndex + 1} max={article.pages.length} label="읽기 진행률" />
      <ArticleHeroPhoto heroImage={article.heroImage} visualTheme={article.visualTheme} variant="reader"><span>{article.domain.toUpperCase()} · 오늘의 질문</span></ArticleHeroPhoto>
      {safeMedia.length > 0 && <div className="reader-media">
        {safeMedia.map((item) => item.kind === "image"
          ? <img key={`image-${item.url}`} className="reader-media__asset" src={item.url} alt={item.alt} loading="lazy" referrerPolicy="no-referrer" />
          : <iframe key={`video-${item.embedUrl}`} className="reader-media__asset" src={item.embedUrl} title={item.alt} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />)}
      </div>}
      <p className="eyebrow">{article.titleKo}</p><h1>{article.title}</h1>
      <section className="korean-preview" aria-labelledby="korean-preview-heading"><p className="eyebrow">KOREAN PREVIEW</p><h2 id="korean-preview-heading">한글로 먼저 이해하기</h2><ol>{koreanPreview.map((line) => <li key={line}>{line}</li>)}</ol></section>
      <button type="button" className={`audio-button${isAudioPlaying ? " is-playing" : ""}`} onClick={isAudioPlaying ? stopNarration : playAudio}><span aria-hidden="true">{isAudioPlaying ? "■" : "▶"}</span><strong>{isAudioPlaying ? "오디오 정지" : "원어민 오디오로 듣기"}</strong></button>
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
        else { const next = safePageIndex + 1; stopNarration(); setPageIndex(next); onPageChange?.(next); setFinderOpen(false); resetFinder(); emit("page_view", String(next)); }
      }}>{lastPage ? "이해 퀴즈 시작" : "다음 페이지"}</Button></div>
      {word && <div className="dialog-backdrop" onMouseDown={closeWord}><div role="dialog" aria-modal="true" aria-label={word.word} className="word-dialog" onMouseDown={(event) => event.stopPropagation()}><button type="button" className="icon-button word-dialog__close" aria-label="단어 설명 닫기" onClick={closeWord}>×</button><h2>{word.word}</h2><p className="pronunciation">{word.pronunciation}</p><p>{word.definitionEn}</p><strong>{word.meaningKo}</strong></div></div>}
    </section>
  );
}
