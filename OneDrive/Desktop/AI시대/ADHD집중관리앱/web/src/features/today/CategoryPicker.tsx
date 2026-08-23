import { useState } from 'react'
import { CATEGORY_COLORS, type Category } from '../../core/model/category'

export function CategoryPicker({ categories, value, onSelect, onCreate }: {
  categories: Category[]
  value: string
  onSelect: (categoryId: string) => void
  onCreate: (input: { name: string; color: string }) => Promise<Category>
}) {
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')
  const [color, setColor] = useState<string>(CATEGORY_COLORS[0])
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const create = async () => {
    const trimmed = name.trim()
    if (!trimmed) {
      setError('분류 이름을 입력해주세요.')
      return
    }
    setPending(true)
    setError('')
    try {
      const category = await onCreate({ name: trimmed, color })
      onSelect(category.id)
      setName('')
      setAdding(false)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '분류를 저장하지 못했어요.')
    } finally {
      setPending(false)
    }
  }

  return <div className="category-picker">
    <label>분류<select value={value} onChange={(event) => onSelect(event.target.value)}>
      {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
    </select></label>
    <button type="button" className="category-add-toggle" onClick={() => setAdding((current) => !current)}>분류 추가</button>
    {adding && <div className="category-create-panel">
      <label>새 분류 이름<input value={name} onChange={(event) => setName(event.target.value)} /></label>
      <div className="category-palette" aria-label="분류 색상">{CATEGORY_COLORS.map((option, index) => <button
        type="button" key={option} aria-label={`색상 ${index + 1}`} aria-pressed={color === option}
        style={{ backgroundColor: option }} onClick={() => setColor(option)}
      />)}</div>
      {error && <p role="alert">{error}</p>}
      <button type="button" disabled={pending} onClick={() => void create()}>새 분류 저장</button>
    </div>}
  </div>
}
