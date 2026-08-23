export function PremiumPreview({ features }: { features: string[] }) {
  return <div className="premium-preview" aria-label="몽글 플러스 미리보기">
    <div>
      <strong>출시 준비 중</strong>
      <p>완성도를 더 높인 뒤 선보일 예정이에요. 지금은 결제되지 않아요.</p>
    </div>
    <ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
  </div>
}
