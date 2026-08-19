import { useEffect, useState } from 'react'

export function AppearancePreview({ blob }: { blob: Blob | null }) {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!blob || !URL.createObjectURL) { setUrl(null); return }
    const next = URL.createObjectURL(blob)
    setUrl(next)
    return () => URL.revokeObjectURL(next)
  }, [blob])
  return (
    <div className="appearance-preview">
      <img src={url ?? '/assets/mascot/monggle-3d-approved-v1.png'} alt={url ? '선택한 사진 미리보기' : '기본 몽글이'} />
      {!url && <span>선택하지 않으면 기본 몽글이가 계속 함께해요.</span>}
    </div>
  )
}
