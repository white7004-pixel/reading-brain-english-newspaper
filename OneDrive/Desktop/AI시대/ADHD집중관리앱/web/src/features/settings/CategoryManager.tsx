import { useEffect, useRef, useState } from 'react'
import { CATEGORY_COLORS, type Category } from '../../core/model/category'
import { createCategoryRepository } from '../../core/storage/categoryRepository'
import { createDatabase } from '../../core/storage/database'

export interface CategoryManagerRepository {
  list(): Promise<Category[]>
  update(id: string, patch: { name?: string; color?: string }): Promise<Category>
  remove(id: string): Promise<void>
}

const storedCategories = createCategoryRepository(createDatabase())
const defaultRepository: CategoryManagerRepository = {
  list: async () => { await storedCategories.ensureDefaults(); return storedCategories.list() },
  update: storedCategories.update,
  remove: storedCategories.remove,
}

export async function loadCategories(repository: CategoryManagerRepository, isActive: () => boolean) {
  const categories = await repository.list()
  return isActive() ? categories.map((category) => ({ ...category })) : undefined
}

export function CategoryManager({ repository = defaultRepository }: { repository?: CategoryManagerRepository }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState('')
  const active = useRef(true)

  const refresh = async () => {
    const loaded = await loadCategories(repository, () => active.current)
    if (loaded) setCategories(loaded)
  }
  useEffect(() => {
    active.current = true
    void refresh()
    return () => { active.current = false }
  }, [repository])

  const save = async (category: Category) => {
    setError('')
    try {
      await repository.update(category.id, { name: category.name, color: category.color })
      await refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '분류를 저장하지 못했어요.')
    }
  }
  const remove = async (category: Category) => {
    if (!window.confirm(`${category.name} 분류를 삭제할까요? 연결된 할 일은 개인으로 이동해요.`)) return
    setError('')
    try {
      await repository.remove(category.id)
      await refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '분류를 삭제하지 못했어요.')
    }
  }

  return <section className="category-manager" aria-labelledby="category-manager-heading">
    <div><span>할 일 정리</span><h3 id="category-manager-heading">분류 관리</h3></div>
    <p>기본 분류는 유지되고, 직접 만든 분류를 삭제하면 연결된 할 일은 개인으로 이동해요.</p>
    {error && <p role="alert">{error}</p>}
    <div className="category-manager-list">{categories.map((category) => <div key={category.id}>
      {category.isDefault ? <><i style={{ backgroundColor: category.color }} /><strong>{category.name}</strong><small>기본</small></> : <>
        <label>{category.name} 이름<input value={category.name} onChange={(event) => setCategories((current) => current.map((item) => item.id === category.id ? { ...item, name: event.target.value } : item))} /></label>
        <select aria-label={`${category.name} 색상`} value={category.color} onChange={(event) => setCategories((current) => current.map((item) => item.id === category.id ? { ...item, color: event.target.value } : item))}>{CATEGORY_COLORS.map((color, index) => <option key={color} value={color}>색상 {index + 1}</option>)}</select>
        <button type="button" aria-label={`${category.name} 저장`} onClick={() => void save(category)}>저장</button>
        <button type="button" aria-label={`${category.name} 삭제`} onClick={() => void remove(category)}>삭제</button>
      </>}
    </div>)}</div>
  </section>
}
