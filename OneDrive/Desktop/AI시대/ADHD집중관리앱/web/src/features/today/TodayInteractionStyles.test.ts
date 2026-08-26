import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'

const globalStyles = readFileSync('src/core/theme/global.css', 'utf8')

function rule(selector: string) {
  return globalStyles.split(selector)[1]?.split('}')[0] ?? ''
}

it('keeps primary Today interactions at least 48 pixels tall', () => {
  expect(rule('.featured-quest button')).toMatch(/min-height:\s*48px/)
  expect(rule('.inline-quick-add input')).toMatch(/min-height:\s*48px/)
  expect(rule('.inline-quick-add button')).toMatch(/min-height:\s*48px/)
  expect(rule('.task-check')).toMatch(/width:\s*48px/)
  expect(rule('.task-check')).toMatch(/min-height:\s*48px/)
  expect(rule('.task-start')).toMatch(/min-height:\s*48px/)
})

it('keeps recurring checkboxes visually compact inside an accessible tap target', () => {
  expect(rule('.recurring-checklist__check-target')).toMatch(/width:\s*48px/)
  expect(rule('.recurring-checklist__check-target')).toMatch(/min-height:\s*48px/)
  expect(rule('.recurring-checklist__check-target > input')).toMatch(/width:\s*22px/)
  expect(rule('.recurring-checklist__check-target > input')).toMatch(/height:\s*22px/)
})
