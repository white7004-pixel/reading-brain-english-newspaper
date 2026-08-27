"use client";

import { useState } from "react";
import { AR_CATALOG_BANDS, AR_CATALOG_BAND_IDS, catalogBandForAr, type ArCatalogBandId } from "@/lib/ar-catalog";
import { DOMAIN_LABELS } from "@/lib/sample-content";
import type { Article } from "@/lib/types";

export function ArLibrary({ articles, currentAr, onOpen }: {
  articles: Article[];
  currentAr?: number | null;
  onOpen: (article: Article) => void;
}) {
  const highlighted = currentAr == null ? null : catalogBandForAr(currentAr);
  const [selected, setSelected] = useState<ArCatalogBandId | null>(highlighted);
  const matches = selected ? articles.filter((article) => article.status === "published" && catalogBandForAr(article.difficulty.value) === selected) : [];

  return <section className="ar-library" aria-labelledby="ar-library-heading">
    <p className="eyebrow">AR LIBRARY</p>
    <h2 id="ar-library-heading">AR별 도서 바로 학습</h2>
    <p>학년과 관계없이 내 읽기 수준에 맞는 도서를 바로 선택할 수 있어요.</p>
    <div className="ar-library__bands" aria-label="AR 구간 선택">
      {AR_CATALOG_BAND_IDS.map((id) => <button key={id} type="button" className={`${selected === id ? "is-selected" : ""}${highlighted === id ? " is-current" : ""}`.trim()} aria-pressed={selected === id} onClick={() => setSelected(id)}>{AR_CATALOG_BANDS[id].label}</button>)}
    </div>
    {selected && matches.length > 0 && <div className="ar-library__books">
      {matches.map((article) => <button key={article.id} type="button" aria-label={article.title} onClick={() => onOpen(article)}><span>{DOMAIN_LABELS[article.domain]} · AR {article.difficulty.value.toFixed(1)}</span><strong>{article.title}</strong><small>{article.titleKo}</small></button>)}
    </div>}
    {selected && matches.length === 0 && <div className="empty-state"><strong>{AR_CATALOG_BANDS[selected].label} 콘텐츠 준비 중</strong><p>콘텐츠가 추가되면 이곳에서 바로 학습할 수 있어요.</p></div>}
  </section>;
}
