export function ProgressBar({ value, max = 100, label = "학습 진행률" }: { value: number; max?: number; label?: string }) {
  const safeValue = Math.min(Math.max(value, 0), max);
  const percent = max > 0 ? (safeValue / max) * 100 : 0;

  return (
    <div className="progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={safeValue}>
      <span className="progress__fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
