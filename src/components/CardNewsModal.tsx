import { useEffect, useState } from 'react'
import type { Exam } from '../types'
import { renderCardNews, downloadCanvas, cardFileName } from '../cardnews'

interface Props {
  exam: Exam
  onClose: () => void
}

export function CardNewsModal({ exam, onClose }: Props) {
  const [slides, setSlides] = useState<{ title: string; canvas: HTMLCanvasElement; url: string }[]>([])

  useEffect(() => {
    const rendered = renderCardNews(exam).map((s) => ({ ...s, url: s.canvas.toDataURL('image/png') }))
    setSlides(rendered)
  }, [exam])

  const downloadAll = () => {
    slides.forEach((s, i) => setTimeout(() => downloadCanvas(s.canvas, cardFileName(exam, i)), i * 350))
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>인스타 카드뉴스 (1080×1080)</h2>
          <div className="toolbar-spacer" />
          <button className="btn-primary" onClick={downloadAll} disabled={slides.length === 0}>
            전체 다운로드 ({slides.length}장)
          </button>
          <button className="btn-secondary" onClick={onClose}>
            닫기
          </button>
        </div>
        <p className="empty-note">정사각형 PNG로 저장됩니다. 인스타그램에 순서대로 올리면 캐러셀 게시물이 됩니다.</p>
        <div className="slide-grid">
          {slides.map((s, i) => (
            <figure key={i} className="slide-item">
              <img src={s.url} alt={`카드뉴스 ${i + 1}: ${s.title}`} />
              <figcaption>
                <span>
                  {i + 1}. {s.title}
                </span>
                <button className="btn-secondary btn-sm" onClick={() => downloadCanvas(s.canvas, cardFileName(exam, i))}>
                  다운로드
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
