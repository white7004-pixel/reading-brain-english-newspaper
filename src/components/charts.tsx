import { useState } from 'react'
import type { CountRow } from '../analysis'

// 수평 막대 차트 — 단일 계열(문항 수)이므로 한 가지 색상만 사용.
// 색상은 CSS 변수(role)로 지정해 라이트/다크가 한 곳에서 전환된다.

interface Tip {
  x: number
  y: number
  text: string
}

interface BarChartProps {
  rows: CountRow[]
  color?: string // CSS 변수명 (기본: 계열 1)
  unit?: string
  /** 하→상 등 순서형이면 행별 색을 지정 */
  rowColors?: string[]
  /** 반폭 카드용 — viewBox를 줄여 글자가 실제 크기로 보이게 함 */
  compact?: boolean
}

export function HBarChart({ rows, color = 'var(--series-1)', unit = '문항', rowColors, compact = false }: BarChartProps) {
  const [tip, setTip] = useState<Tip | null>(null)
  if (rows.length === 0) return <p className="empty-note">데이터가 없습니다.</p>

  const max = Math.max(...rows.map((r) => r.count))
  const total = rows.reduce((s, r) => s + r.count, 0)
  const labelW = compact ? 66 : 118
  const valueW = 100
  const rowH = 26
  const gap = 8
  const chartW = compact ? 380 : 560
  const barMax = chartW - labelW - valueW
  const height = rows.length * (rowH + gap) - gap

  return (
    <div className="chart-wrap" onMouseLeave={() => setTip(null)}>
      <svg
        viewBox={`0 0 ${chartW} ${height}`}
        width="100%"
        role="img"
        aria-label={rows.map((r) => `${r.label} ${r.count}${unit}`).join(', ')}
      >
        {rows.map((r, i) => {
          const y = i * (rowH + gap)
          const w = max > 0 ? Math.max((r.count / max) * barMax, 2) : 2
          const fill = rowColors ? rowColors[i] : color
          const pct = total ? Math.round((r.count / total) * 100) : 0
          return (
            <g
              key={r.label}
              onMouseMove={(e) => {
                const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect()
                setTip({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                  text: `${r.label} · ${r.count}${unit} (${pct}%) · ${r.points}점`,
                })
              }}
            >
              {/* 히트 타깃: 행 전체 */}
              <rect x={0} y={y} width={chartW} height={rowH} fill="transparent" />
              <text x={labelW - 10} y={y + rowH / 2} textAnchor="end" dominantBaseline="central" className="bar-label">
                {r.label}
              </text>
              <rect x={labelW} y={y + 4} width={w} height={rowH - 8} rx={4} fill={fill} />
              <text x={labelW + w + 8} y={y + rowH / 2} dominantBaseline="central" className="bar-value">
                {r.count}
                {unit} · {pct}%
              </text>
            </g>
          )
        })}
        {/* 기준선 */}
        <line x1={labelW} y1={0} x2={labelW} y2={height} stroke="var(--axis)" strokeWidth={1} />
      </svg>
      {tip && (
        <div className="tooltip" style={{ left: tip.x + 12, top: tip.y - 8 }}>
          {tip.text}
        </div>
      )}
    </div>
  )
}

interface Segment {
  label: string
  value: number
  color: string
}

/** 배점 구성 등 부분-전체 비교용 단일 스택 막대 (세그먼트 사이 2px 표면 간격) */
export function StackedBar({ segments, unit = '점' }: { segments: Segment[]; unit?: string }) {
  const [tip, setTip] = useState<Tip | null>(null)
  const total = segments.reduce((s, x) => s + x.value, 0)
  if (total === 0) return <p className="empty-note">데이터가 없습니다.</p>
  const W = 560
  const H = 34
  let x = 0
  return (
    <div className="chart-wrap" onMouseLeave={() => setTip(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={segments.map((s) => `${s.label} ${s.value}${unit}`).join(', ')}>
        {segments.map((s, i) => {
          const w = (s.value / total) * W
          const seg = (
            <rect
              key={s.label}
              x={x + (i > 0 ? 2 : 0)}
              y={4}
              width={Math.max(w - (i > 0 ? 2 : 0), 0)}
              height={H - 8}
              rx={4}
              fill={s.color}
              onMouseMove={(e) => {
                const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect()
                setTip({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                  text: `${s.label} · ${s.value}${unit} (${Math.round((s.value / total) * 100)}%)`,
                })
              }}
            />
          )
          x += w
          return seg
        })}
      </svg>
      <div className="legend">
        {segments.map((s) => (
          <span key={s.label} className="legend-item">
            <span className="legend-swatch" style={{ background: s.color }} />
            {s.label} {s.value}
            {unit} ({Math.round((s.value / total) * 100)}%)
          </span>
        ))}
      </div>
      {tip && (
        <div className="tooltip" style={{ left: tip.x + 12, top: tip.y - 8 }}>
          {tip.text}
        </div>
      )}
    </div>
  )
}

export function StatTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="stat-tile">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  )
}
