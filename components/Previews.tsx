"use client";

import type {
  NewspaperContent,
  BlogContent,
  InstaContent,
  NewsletterContent,
  SmsContent,
} from "@/lib/types";
import { LogoMark } from "./Logo";

export function NewspaperPreview({
  data,
  showAnswers,
}: {
  data: NewspaperContent;
  showAnswers: boolean;
}) {
  return (
    <div className="newspaper" id="newspaper-print">
      <header className="np-masthead">
        <div className="np-emblem">
          <LogoMark size={66} />
        </div>
        <div className="np-title">{data.masthead}</div>
        <div className="np-tagline">Reading Is The Only Way!</div>
        <div className="np-meta">
          <span>{data.issueNo}</span>
          <span>{data.date}</span>
          <span>{data.levelLabel}</span>
        </div>
      </header>

      {data.articles.map((a, i) => (
        <article className="np-article" key={i}>
          <h2 className="np-headline">{a.headline}</h2>
          {a.subhead && <p className="np-subhead">{a.subhead}</p>}
          <p className="np-byline">{a.byline}</p>
          <div className="np-body">
            {a.body.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </div>
          {a.imageCaption && <p className="np-caption">📷 {a.imageCaption}</p>}
        </article>
      ))}

      {data.vocabulary?.length > 0 && (
        <section className="np-vocab">
          <span className="np-section-title">Word Bank · 단어장</span>
          <table>
            <tbody>
              {data.vocabulary.map((v, i) => (
                <tr key={i}>
                  <td className="w">{v.word}</td>
                  <td className="pos">{v.pos}</td>
                  <td>{v.meaningKo}</td>
                  <td className="ex">{v.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {data.quiz?.length > 0 && (
        <section className={`np-quiz${showAnswers ? "" : " hide-answers"}`}>
          <span className="np-section-title">Reading Check · 이해도 퀴즈</span>
          <ol>
            {data.quiz.map((q, i) => (
              <li key={i}>
                {q.question}
                <ul className="opts">
                  {q.options.map((o, j) => (
                    <li key={j} className={j === q.answer ? "correct" : ""}>
                      {String.fromCharCode(65 + j)}. {o}
                    </li>
                  ))}
                </ul>
                <p className="expl">💡 {q.explanation}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {data.teacherTip && <div className="np-tip">🍎 {data.teacherTip}</div>}
    </div>
  );
}

export function BlogPreview({ data }: { data: BlogContent }) {
  return (
    <div className="doc">
      <h2 className="doc-title">{data.title}</h2>
      {data.sections.map((s, i) => (
        <div className="doc-section" key={i}>
          <h3>{s.heading}</h3>
          <p>{s.body}</p>
        </div>
      ))}
      <div className="tag-row">
        {data.hashtags.map((t, i) => (
          <span className="tag" key={i}>
            {t.startsWith("#") ? t : `#${t}`}
          </span>
        ))}
      </div>
      {data.seoKeywords?.length > 0 && (
        <p style={{ marginTop: 12, fontSize: 12.5, color: "var(--muted)" }}>
          SEO 키워드: {data.seoKeywords.join(", ")}
        </p>
      )}
    </div>
  );
}

export function InstaPreview({ data }: { data: InstaContent }) {
  return (
    <div className="doc">
      <div className="slide-grid">
        {data.slides.map((s, i) => (
          <div className="slide-card" data-n={`${i + 1}/${data.slides.length}`} key={i}>
            <b>{s.title}</b>
            <span>{s.body}</span>
          </div>
        ))}
      </div>
      <div className="doc-section">
        <h3>캡션</h3>
        <p>{data.caption}</p>
      </div>
      <div className="tag-row">
        {data.hashtags.map((t, i) => (
          <span className="tag" key={i}>
            {t.startsWith("#") ? t : `#${t}`}
          </span>
        ))}
      </div>
    </div>
  );
}

export function NewsletterPreview({ data }: { data: NewsletterContent }) {
  return (
    <div className="doc">
      <h2 className="doc-title">{data.title}</h2>
      <div className="doc-section">
        <p>{data.greeting}</p>
      </div>
      {data.sections.map((s, i) => (
        <div className="doc-section" key={i}>
          <h3>{s.heading}</h3>
          <p>{s.body}</p>
        </div>
      ))}
      <div className="doc-section">
        <p>{data.closing}</p>
      </div>
    </div>
  );
}

export function SmsPreview({ data }: { data: SmsContent }) {
  const labels = ["시안 A · 따뜻한 톤", "시안 B · 정중한 톤", "시안 C · 간결한 톤"];
  return (
    <div className="doc">
      {data.variants.map((v, i) => (
        <div className="sms-card" key={i}>
          <div className="sms-label">{labels[i] || `시안 ${i + 1}`}</div>
          <span className="char-count">{v.length}자</span>
          {v}
        </div>
      ))}
    </div>
  );
}
