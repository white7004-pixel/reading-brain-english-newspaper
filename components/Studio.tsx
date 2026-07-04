"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type {
  TabKey,
  HistoryEntry,
  NewspaperContent,
  BlogContent,
  InstaContent,
  NewsletterContent,
  SmsContent,
} from "@/lib/types";
import {
  NewspaperPreview,
  BlogPreview,
  InstaPreview,
  NewsletterPreview,
  SmsPreview,
} from "./Previews";

const TABS: {
  key: TabKey;
  icon: string;
  label: string;
  title: string;
  desc: string;
}[] = [
  {
    key: "newspaper",
    icon: "📰",
    label: "영자신문",
    title: "AI 영자신문 만들기",
    desc: "레벨에 맞는 수업용 영자신문을 기사·단어장·퀴즈까지 한 번에 생성합니다.",
  },
  {
    key: "nblog",
    icon: "✍️",
    label: "네이버 블로그",
    title: "네이버 블로그 포스트",
    desc: "학부모의 마음을 여는 정보성 블로그 글을 SEO 키워드와 함께 생성합니다.",
  },
  {
    key: "insta",
    icon: "📸",
    label: "인스타그램",
    title: "인스타그램 카드뉴스",
    desc: "카드뉴스 슬라이드 구성과 캡션, 해시태그를 한 번에 만듭니다.",
  },
  {
    key: "newsletter",
    icon: "💌",
    label: "학원 소식지",
    title: "학부모 소식지 · 가정통신문",
    desc: "이달의 학습 소식을 정중하고 따뜻한 문체로 정리해 드립니다.",
  },
  {
    key: "sms",
    icon: "💬",
    label: "상담 문자",
    title: "학부모 상담 문자",
    desc: "목적에 맞는 문자 시안 3종을 서로 다른 톤으로 생성합니다.",
  },
];

const LEVELS = [
  { key: "starter", label: "Starter · 유치/초1-2", detail: "CEFR Pre-A1, 아주 짧은 문장" },
  { key: "beginner", label: "Beginner · 초3-4", detail: "CEFR A1, 짧고 쉬운 문장" },
  { key: "inter", label: "Intermediate · 초5-6", detail: "CEFR A2-B1, 중급 어휘" },
  { key: "advanced", label: "Advanced · 중등+", detail: "CEFR B1-B2, 시사 어휘 포함" },
];

const SMS_PURPOSES = [
  "학생 칭찬/수업 소식 전달",
  "레벨테스트 결과 상담 안내",
  "신규 상담/레벨테스트 홍보",
  "결석 학생 안부 연락",
  "학원비/일정 안내",
];

type Result = { mode: "demo" | "ai"; type: TabKey; data: unknown } | null;

function loadLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function Studio() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlTab = searchParams.get("tab");
  const initialTab: TabKey = (TABS.find((t) => t.key === urlTab)?.key ??
    "newspaper") as TabKey;

  const [tab, setTab] = useState<TabKey>(initialTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [toast, setToast] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showAnswers, setShowAnswers] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // 설정
  const [academyName, setAcademyName] = useState("리딩브레인 영어학원");
  const [apiKey, setApiKey] = useState("");

  // 폼 상태
  const [npTopic, setNpTopic] = useState("");
  const [npLevel, setNpLevel] = useState("beginner");
  const [npCount, setNpCount] = useState("2");
  const [blogTopic, setBlogTopic] = useState("");
  const [blogKeywords, setBlogKeywords] = useState("");
  const [blogTone, setBlogTone] = useState("전문적이면서 따뜻한");
  const [instaTopic, setInstaTopic] = useState("");
  const [nlMonth, setNlMonth] = useState("");
  const [nlHighlights, setNlHighlights] = useState("");
  const [smsPurpose, setSmsPurpose] = useState(SMS_PURPOSES[0]);
  const [smsStudent, setSmsStudent] = useState("");

  useEffect(() => {
    setAcademyName(loadLS("rb-academy", "리딩브레인 영어학원"));
    setApiKey(loadLS("rb-apikey", ""));
    setHistory(loadLS<HistoryEntry[]>("rb-history", []));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const activeTab = useMemo(() => TABS.find((t) => t.key === tab)!, [tab]);

  const switchTab = useCallback(
    (key: TabKey) => {
      setTab(key);
      setError("");
      router.replace(`/?tab=${key}`, { scroll: false });
    },
    [router]
  );

  const saveSettings = () => {
    localStorage.setItem("rb-academy", JSON.stringify(academyName));
    localStorage.setItem("rb-apikey", JSON.stringify(apiKey));
    setShowSettings(false);
    setToast("설정이 저장되었습니다");
  };

  const pushHistory = (entry: HistoryEntry) => {
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, 20);
      localStorage.setItem("rb-history", JSON.stringify(next));
      return next;
    });
  };

  const resultTitle = (type: TabKey, data: unknown): string => {
    const d = data as Record<string, unknown>;
    switch (type) {
      case "newspaper":
        return (
          ((d.articles as { headline?: string }[])?.[0]?.headline as string) ||
          "영자신문"
        );
      case "nblog":
      case "newsletter":
        return (d.title as string) || "콘텐츠";
      case "insta":
        return (
          ((d.slides as { title?: string }[])?.[0]?.title as string) || "카드뉴스"
        );
      case "sms":
        return ((d.variants as string[])?.[0] || "상담 문자").slice(0, 30);
    }
  };

  const generate = async () => {
    setLoading(true);
    setError("");

    const params: Record<string, string> = { academyName };
    if (tab === "newspaper") {
      const lv = LEVELS.find((l) => l.key === npLevel)!;
      Object.assign(params, {
        topic: npTopic,
        level: npLevel,
        levelLabel: lv.label,
        levelDetail: lv.detail,
        articleCount: npCount,
      });
    } else if (tab === "nblog") {
      Object.assign(params, { topic: blogTopic, keywords: blogKeywords, tone: blogTone });
    } else if (tab === "insta") {
      Object.assign(params, { topic: instaTopic });
    } else if (tab === "newsletter") {
      Object.assign(params, { month: nlMonth, highlights: nlHighlights });
    } else if (tab === "sms") {
      Object.assign(params, { purpose: smsPurpose, studentName: smsStudent });
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-user-api-key": apiKey } : {}),
        },
        body: JSON.stringify({ type: tab, params }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "생성에 실패했습니다.");

      const r: Result = { mode: json.mode, type: tab, data: json.data };
      setResult(r);
      pushHistory({
        id: `${Date.now()}`,
        type: tab,
        title: resultTitle(tab, json.data),
        createdAt: new Date().toLocaleString("ko-KR", {
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: { type: tab, data: json.data } as HistoryEntry["content"],
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const restoreHistory = (h: HistoryEntry) => {
    setTab(h.type);
    setResult({ mode: "ai", type: h.type, data: h.content.data });
    setError("");
    router.replace(`/?tab=${h.type}`, { scroll: false });
  };

  const copyText = () => {
    if (!result) return;
    let text = "";
    const d = result.data as never;
    if (result.type === "newspaper") {
      const n = d as NewspaperContent;
      text = [
        `${n.masthead}\n${n.issueNo} | ${n.date} | ${n.levelLabel}`,
        ...n.articles.map(
          (a) => `\n${a.headline}\n${a.subhead}\n${a.byline}\n\n${a.body.join("\n\n")}`
        ),
        `\n[Word Bank]`,
        ...n.vocabulary.map((v) => `- ${v.word} (${v.pos}) ${v.meaningKo} — ${v.example}`),
        `\n[Reading Check]`,
        ...n.quiz.map(
          (q, i) =>
            `${i + 1}. ${q.question}\n${q.options
              .map((o, j) => `  ${String.fromCharCode(65 + j)}. ${o}`)
              .join("\n")}\n  정답: ${String.fromCharCode(65 + q.answer)} — ${q.explanation}`
        ),
      ].join("\n");
    } else if (result.type === "nblog") {
      const b = d as BlogContent;
      text = [
        b.title,
        ...b.sections.map((s) => `\n■ ${s.heading}\n${s.body}`),
        `\n${b.hashtags.join(" ")}`,
      ].join("\n");
    } else if (result.type === "insta") {
      const s = d as InstaContent;
      text = [
        ...s.slides.map((sl, i) => `[슬라이드 ${i + 1}] ${sl.title}\n${sl.body}`),
        `\n${s.caption}`,
        `\n${s.hashtags.join(" ")}`,
      ].join("\n\n");
    } else if (result.type === "newsletter") {
      const n = d as NewsletterContent;
      text = [
        n.title,
        `\n${n.greeting}`,
        ...n.sections.map((s) => `\n■ ${s.heading}\n${s.body}`),
        `\n${n.closing}`,
      ].join("\n");
    } else if (result.type === "sms") {
      const s = d as SmsContent;
      text = s.variants.map((v, i) => `[시안 ${i + 1}]\n${v}`).join("\n\n");
    }
    navigator.clipboard
      .writeText(text)
      .then(() => setToast("클립보드에 복사되었습니다"))
      .catch(() => setToast("복사에 실패했습니다"));
  };

  const tabHistory = history.filter((h) => h.type === tab);

  return (
    <div className="studio">
      {/* ---------- 사이드바 ---------- */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">🧠</div>
          <div className="logo-text">
            <b>리딩브레인</b>
            <span>콘텐츠 스튜디오</span>
          </div>
        </div>

        <div>
          <div className="nav-group-label">콘텐츠 만들기</div>
          <nav className="nav">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={t.key === tab ? "active" : ""}
                onClick={() => switchTab(t.key)}
              >
                <span className="icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        <div>
          <div className="nav-group-label">설정</div>
          <nav className="nav">
            <button onClick={() => setShowSettings(true)}>
              <span className="icon">⚙️</span>학원 정보 · API 키
            </button>
          </nav>
        </div>

        <div className="sidebar-footer">
          {academyName}
          <br />
          AI 기반 학원 콘텐츠 자동 생성
        </div>
      </aside>

      {/* ---------- 메인 ---------- */}
      <main className="main">
        <div className="topbar">
          <div>
            <h1>
              {activeTab.icon} {activeTab.title}
            </h1>
            <p>{activeTab.desc}</p>
          </div>
          <div className="topbar-actions">
            {result && result.type === tab && (
              <>
                <button className="btn btn-ghost" onClick={copyText}>
                  📋 텍스트 복사
                </button>
                {tab === "newspaper" && (
                  <>
                    <button
                      className="btn btn-ghost"
                      onClick={() => setShowAnswers((v) => !v)}
                    >
                      {showAnswers ? "🙈 정답 숨기기 (학생용)" : "👀 정답 보기 (교사용)"}
                    </button>
                    <button className="btn btn-ghost" onClick={() => window.print()}>
                      🖨️ 인쇄 / PDF
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className="workspace">
          {/* ----- 입력 폼 ----- */}
          <div className="form-col">
            <div className="card">
              <div className="card-head">
                <h2>생성 옵션</h2>
                <p>내용을 입력하지 않으면 추천 주제로 생성됩니다.</p>
              </div>
              <div className="card-body">
                {tab === "newspaper" && (
                  <>
                    <div className="field">
                      <label>주제</label>
                      <input
                        value={npTopic}
                        onChange={(e) => setNpTopic(e.target.value)}
                        placeholder="예: Space Travel, K-Food, Olympic Games"
                      />
                    </div>
                    <div className="field">
                      <label>학습자 레벨</label>
                      <div className="chips">
                        {LEVELS.map((l) => (
                          <button
                            key={l.key}
                            className={`chip${npLevel === l.key ? " on" : ""}`}
                            onClick={() => setNpLevel(l.key)}
                          >
                            {l.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="field">
                      <label>기사 수</label>
                      <select value={npCount} onChange={(e) => setNpCount(e.target.value)}>
                        <option value="1">1개 (메인 기사만)</option>
                        <option value="2">2개 (메인 + 서브)</option>
                        <option value="3">3개 (메인 + 서브 2)</option>
                      </select>
                    </div>
                  </>
                )}

                {tab === "nblog" && (
                  <>
                    <div className="field">
                      <label>포스트 주제</label>
                      <input
                        value={blogTopic}
                        onChange={(e) => setBlogTopic(e.target.value)}
                        placeholder="예: 초등 영어 리딩 습관 만드는 법"
                      />
                    </div>
                    <div className="field">
                      <label>SEO 키워드 (쉼표로 구분)</label>
                      <input
                        value={blogKeywords}
                        onChange={(e) => setBlogKeywords(e.target.value)}
                        placeholder="예: 초등영어학원, 영어리딩, 영자신문"
                      />
                    </div>
                    <div className="field">
                      <label>톤</label>
                      <select value={blogTone} onChange={(e) => setBlogTone(e.target.value)}>
                        <option>전문적이면서 따뜻한</option>
                        <option>친근하고 편안한</option>
                        <option>신뢰감 있는 전문가</option>
                      </select>
                    </div>
                  </>
                )}

                {tab === "insta" && (
                  <div className="field">
                    <label>주제</label>
                    <input
                      value={instaTopic}
                      onChange={(e) => setInstaTopic(e.target.value)}
                      placeholder="예: 이번 주 영자신문 수업 현장"
                    />
                  </div>
                )}

                {tab === "newsletter" && (
                  <>
                    <div className="field">
                      <label>대상 월</label>
                      <input
                        value={nlMonth}
                        onChange={(e) => setNlMonth(e.target.value)}
                        placeholder={`예: ${new Date().getMonth() + 1}월`}
                      />
                    </div>
                    <div className="field">
                      <label>이달의 소식 (자유롭게 메모)</label>
                      <textarea
                        value={nlHighlights}
                        onChange={(e) => setNlHighlights(e.target.value)}
                        placeholder="예: 영자신문 프로젝트 완료, 리딩 스타 시상, 다음 달 원어민 특강"
                      />
                    </div>
                  </>
                )}

                {tab === "sms" && (
                  <>
                    <div className="field">
                      <label>문자 목적</label>
                      <select
                        value={smsPurpose}
                        onChange={(e) => setSmsPurpose(e.target.value)}
                      >
                        {SMS_PURPOSES.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label>학생 이름</label>
                      <input
                        value={smsStudent}
                        onChange={(e) => setSmsStudent(e.target.value)}
                        placeholder="예: 김민준"
                      />
                    </div>
                  </>
                )}

                <button className="btn btn-primary" onClick={generate} disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner" /> 생성 중...
                    </>
                  ) : (
                    <>✨ AI로 생성하기</>
                  )}
                </button>

                {!apiKey && (
                  <p style={{ fontSize: 12, color: "var(--muted)" }}>
                    현재 <b>데모 모드</b>입니다. ⚙️ 설정에서 Anthropic API 키를 등록하면
                    입력한 주제로 실제 AI 콘텐츠가 생성됩니다.
                  </p>
                )}
              </div>
            </div>

            {tabHistory.length > 0 && (
              <div className="card" style={{ marginTop: 16 }}>
                <div className="card-head">
                  <h2>최근 생성 기록</h2>
                </div>
                <div className="card-body history-list">
                  {tabHistory.slice(0, 6).map((h) => (
                    <button key={h.id} className="history-item" onClick={() => restoreHistory(h)}>
                      <span className="h-icon">
                        {TABS.find((t) => t.key === h.type)?.icon}
                      </span>
                      <span className="h-title">{h.title}</span>
                      <span className="h-date">{h.createdAt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ----- 미리보기 ----- */}
          <div className="card preview-panel">
            <div className="preview-toolbar">
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>미리보기</span>
              {result && result.type === tab && (
                <span className={`mode-badge ${result.mode}`}>
                  {result.mode === "demo" ? "데모 샘플" : "AI 생성"}
                </span>
              )}
            </div>

            {error && <div className="error-box">⚠️ {error}</div>}

            {loading ? (
              <div className="loading-panel">
                <div>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{activeTab.icon}</div>
                  AI가 콘텐츠를 만들고 있어요<span className="dots" />
                </div>
              </div>
            ) : result && result.type === tab ? (
              <div className="preview-scroll">
                {result.type === "newspaper" && (
                  <NewspaperPreview
                    data={result.data as NewspaperContent}
                    showAnswers={showAnswers}
                  />
                )}
                {result.type === "nblog" && <BlogPreview data={result.data as BlogContent} />}
                {result.type === "insta" && <InstaPreview data={result.data as InstaContent} />}
                {result.type === "newsletter" && (
                  <NewsletterPreview data={result.data as NewsletterContent} />
                )}
                {result.type === "sms" && <SmsPreview data={result.data as SmsContent} />}
              </div>
            ) : (
              <div className="preview-empty">
                <div>
                  <div className="big">{activeTab.icon}</div>
                  왼쪽에서 옵션을 선택하고
                  <br />
                  <b>✨ AI로 생성하기</b> 버튼을 눌러보세요
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ---------- 설정 모달 ---------- */}
      {showSettings && (
        <div className="modal-backdrop" onClick={() => setShowSettings(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>⚙️ 학원 정보 · API 키</h2>
            <p className="hint">설정은 이 브라우저에만 저장됩니다.</p>
            <div className="card-body" style={{ padding: 0 }}>
              <div className="field">
                <label>학원 이름</label>
                <input
                  value={academyName}
                  onChange={(e) => setAcademyName(e.target.value)}
                  placeholder="리딩브레인 영어학원"
                />
              </div>
              <div className="field">
                <label>Anthropic API 키 (선택)</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-..."
                />
                <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 5 }}>
                  키가 없으면 데모 샘플이 표시됩니다. 서버에 ANTHROPIC_API_KEY 환경변수를
                  설정한 경우 비워두어도 AI 생성이 동작합니다.
                </p>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowSettings(false)}>
                취소
              </button>
              <button
                className="btn btn-primary"
                style={{ width: "auto", padding: "9px 18px" }}
                onClick={saveSettings}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
