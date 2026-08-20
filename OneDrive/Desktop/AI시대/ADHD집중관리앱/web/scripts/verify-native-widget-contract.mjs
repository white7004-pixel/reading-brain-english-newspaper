import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const read = (path) => readFile(new URL(path, `file:///${root.replaceAll('\\', '/')}/`), 'utf8')

const [androidProvider, androidPolicy, smallLayout, mediumLayout, extendedBackground, iosWidget] = await Promise.all([
  read('android/app/src/main/java/app/monggle/focus/MonggleWidgetProvider.java'),
  read('android/app/src/main/java/app/monggle/focus/WidgetRenderPolicy.java'),
  read('android/app/src/main/res/layout/monggle_widget_small.xml'),
  read('android/app/src/main/res/layout/monggle_widget_medium.xml'),
  read('android/app/src/main/res/drawable/monggle_widget_extended_background.xml'),
  read('ios/MonggleWidget/MonggleWidget.swift'),
])

for (const field of ['currentMissionId', 'commitmentDay', 'firstAction', 'escalationLevel']) {
  assert.match(androidProvider, new RegExp(`optString\\("${field}"`), `Android provider must read ${field}`)
  assert.match(iosWidget, new RegExp(`dictionary\\["${field}"\\]`), `iOS widget must read ${field}`)
}

assert.match(androidPolicy, /ordered\.add\(0, selected\)/, 'Android must promote the selected mission')
assert.match(androidPolicy, /"widget"\.equals\(snapshot\.escalationLevel\)/, 'Android must detect widget escalation')
assert.match(androidProvider, /monggle_widget_extended_background/, 'Android must apply an extended background')
assert.match(androidProvider, /widget_first_action/, 'Android must render first action copy')
assert.match(smallLayout, /widget_first_action/, 'Android small layout must expose first action')
assert.match(mediumLayout, /widget_first_action/, 'Android medium layout must expose first action')
assert.match(extendedBackground, /<stroke[^>]+#FFE08A/, 'Android extended background must be visibly outlined')

assert.match(iosWidget, /ordered\.insert\(selected, at: 0\)/, 'iOS must promote the selected mission')
assert.match(iosWidget, /escalationLevel == "widget"/, 'iOS must detect widget escalation')
assert.match(iosWidget, /Text\(firstActionLine\)/, 'iOS must render first action copy')
assert.match(iosWidget, /RoundedRectangle\(cornerRadius: 20\)\.stroke/, 'iOS extended mode must be visibly outlined')
assert.match(iosWidget, /guard isExtended else \{ return nudgeLine \}/, 'iOS must preserve legacy nudge copy')

console.log('Native widget source contracts passed (Android + iOS)')
