import { CATEGORY_COLORS, DEFAULT_CATEGORIES, type Category } from '../model/category'
import type { MonggleDatabase } from './database'

function normalizedName(value: string) {
  return value.trim().toLocaleLowerCase('ko-KR')
}

function validateColor(color: string) {
  if (!(CATEGORY_COLORS as readonly string[]).includes(color)) throw new Error('선택할 수 없는 분류 색상이에요.')
}

export function createCategoryRepository(database: MonggleDatabase) {
  const ensureUniqueName = async (name: string, exceptId?: string) => {
    const normalized = normalizedName(name)
    if (!normalized) throw new Error('분류 이름을 입력해주세요.')
    const duplicate = (await database.categories.toArray()).some(
      (category) => category.id !== exceptId && normalizedName(category.name) === normalized,
    )
    if (duplicate) throw new Error('이미 있는 분류예요.')
    return name.trim()
  }

  return {
    async ensureDefaults() {
      await database.categories.bulkPut(DEFAULT_CATEGORIES)
    },
    async list() {
      const categories = await database.categories.toArray()
      const defaultOrder = new Map(DEFAULT_CATEGORIES.map((category, index) => [category.id, index]))
      return categories.sort((a, b) => {
        const aOrder = defaultOrder.get(a.id)
        const bOrder = defaultOrder.get(b.id)
        if (aOrder !== undefined || bOrder !== undefined) return (aOrder ?? 999) - (bOrder ?? 999)
        return a.createdAt.localeCompare(b.createdAt)
      })
    },
    async add(input: { name: string; color: string }) {
      const name = await ensureUniqueName(input.name)
      validateColor(input.color)
      const now = new Date().toISOString()
      const category: Category = {
        id: crypto.randomUUID(), name, color: input.color, isDefault: false, createdAt: now, updatedAt: now,
      }
      await database.categories.add(category)
      return category
    },
    async update(id: string, patch: { name?: string; color?: string }) {
      const current = await database.categories.get(id)
      if (!current) throw new Error('분류를 찾을 수 없어요.')
      const name = patch.name === undefined ? current.name : await ensureUniqueName(patch.name, id)
      const color = patch.color ?? current.color
      validateColor(color)
      const next = { ...current, name, color, updatedAt: new Date().toISOString() }
      await database.categories.put(next)
      return next
    },
    async remove(id: string) {
      const category = await database.categories.get(id)
      if (!category) return
      if (category.isDefault) throw new Error('기본 분류는 삭제할 수 없어요.')
      await database.transaction('rw', database.categories, database.tasks, async () => {
        const linked = await database.tasks.where('categoryId').equals(id).toArray()
        if (linked.length) {
          await database.tasks.bulkPut(linked.map((task) => ({ ...task, categoryId: 'personal', updatedAt: new Date().toISOString() })))
        }
        await database.categories.delete(id)
      })
    },
  }
}
