import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it } from 'vitest'
import { createDatabase, type MonggleDatabase } from './database'
import { createPersonaRepository } from './personaRepository'

let database: MonggleDatabase | undefined

afterEach(async () => {
  await database?.delete()
  database = undefined
})

function setup() {
  database = createDatabase(`persona-repository-${crypto.randomUUID()}`)
  return createPersonaRepository(database)
}

describe('persona repository', () => {
  it('seeds the five stable defaults once and does not overwrite an edited default', async () => {
    const personas = setup()

    expect((await personas.ensureDefaults()).map((persona) => persona.name)).toEqual([
      '원장·경영자', '상담 관리자', '교육 기획자', '마케터', '개인',
    ])
    await personas.save({
      id: 'director', name: '운영 책임자', icon: '🧭', color: '#6B7280', kind: 'default', status: 'active', order: 0,
      classificationKeywords: ['운영'], masteryLabels: ['시작'],
    })

    await personas.ensureDefaults()

    expect(await database!.personas.count()).toBe(5)
    await expect(database!.personas.get('director')).resolves.toMatchObject({ name: '운영 책임자', icon: '🧭' })
  })

  it('lists active personas in order and retains records while archiving, restoring, and reordering', async () => {
    const personas = setup()
    await personas.ensureDefaults()

    await personas.archive('counseling')
    expect((await personas.listActive()).map((persona) => persona.id)).toEqual(['director', 'education', 'marketing', 'personal'])
    await expect(database!.personas.get('counseling')).resolves.toMatchObject({ status: 'archived' })

    await personas.restore('counseling')
    await personas.reorder(['marketing', 'director'])

    expect((await personas.listActive()).map((persona) => persona.id)).toEqual([
      'marketing', 'director', 'counseling', 'education', 'personal',
    ])
  })

  it('places archived personas after reordered active personas when they are restored', async () => {
    const personas = setup()
    await personas.ensureDefaults()

    await personas.archive('director')
    await personas.reorder(['education', 'marketing', 'counseling', 'personal'])
    await personas.restore('director')

    expect((await personas.listActive()).map((persona) => persona.id)).toEqual([
      'education', 'marketing', 'counseling', 'personal', 'director',
    ])
  })

  it('uses the ID tie-breaker after restoring an archived persona with an equal order', async () => {
    const personas = setup()
    await personas.ensureDefaults()
    const director = await database!.personas.get('director')
    expect(director).toBeDefined()

    await personas.archive('director')
    await personas.save({ ...director!, status: 'archived', order: 1 })
    await personas.restore('director')

    expect((await personas.listActive()).map((persona) => persona.id)).toEqual([
      'counseling', 'director', 'education', 'marketing', 'personal',
    ])
  })
})
