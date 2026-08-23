import type { TimelineItem } from './buildTimeline'

export function Timeline({ items }: { items: TimelineItem[] }) {
  return <section className="timeline"><h2>오늘의 흐름</h2>{items.length ? items.map((item) => <article key={item.id}><time>{new Date(item.at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</time><div><small>{item.statusLabel}</small><strong>{item.title}</strong></div></article>) : <p>정해진 시간이 있는 항목은 여기에 모여요.</p>}</section>
}
