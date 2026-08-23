# Persona Mastery Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn Monggle into a calm, adult work dashboard where a solo academy director manages role-based recurring work, daily and monthly views, adaptive coaching, and cumulative expertise.

**Architecture:** Keep the existing React/Dexie local-first application and add persona, recurrence, candidate, and mastery domains as focused modules. `TodayScreen` becomes a thin composition root fed by a dashboard query service; completion remains transactional and idempotent across task, pet reward, recurring instance, and persona mastery projections. External services enter through reviewable `QuestCandidate` records, while confirmed Google events remain calendar events until the user explicitly converts them.

**Tech Stack:** React 19, TypeScript 5.9, React Router 7, Dexie 4/IndexedDB, Vitest + React Testing Library, Playwright, Vite PWA, Capacitor.

**Spec:** `docs/superpowers/specs/2026-08-23-monggle-persona-mastery-dashboard-design.md`

## Global Constraints

- Preserve the prominent 3D Monggle character and game rewards; never reduce the product to a plain checklist.
- Use Pretendard with headings at 650–700 and body copy at 400–500; use charcoal neutrals and low-saturation lavender, reserving saturated lavender for primary action and reward states.
- Primary navigation is exactly `오늘`, `월간`, `몽글`, `집중`, `나`.
- Keep single-user, local-first behavior. Personas are role lenses, not accounts, and a task may link to multiple personas.
- Completing one task grants overall Monggle reward once and grants mastery credit to every linked persona; retries must be idempotent and no progression is ever deducted.
- Missed recurring work is recorded as missed without stacking or punishment; carry-forward is explicit per template.
- KakaoTalk and KakaoWork items require review before becoming tasks. Confirmed Google Calendar events appear automatically but become quests only through explicit conversion.
- Coaching copy must never shame the user. Touch targets are at least 48 px, state is never conveyed by color alone, coach updates use a live region, the 3D asset has an accessible label, and reduced-motion preferences are honored.
- User-facing Korean text must be valid UTF-8; fix any mojibake in a file when that file is modified.
- Do not add a new state-management or UI-component dependency.

---

## File Map

**Core model and persistence**

- Create `web/src/core/model/persona.ts`: persona and persona-mastery contracts plus default Reading Brain personas.
- Create `web/src/core/model/recurrence.ts`: recurring-template and generated-instance contracts.
- Create `web/src/core/model/questCandidate.ts`: connector candidate and external calendar-event contracts.
- Modify `web/src/core/model/task.ts`: academy categories, persona links, recurrence identity, and source metadata.
- Modify `web/src/core/storage/database.ts`: Dexie v7 stores and migration.
- Create `web/src/core/storage/personaRepository.ts`, `recurringRepository.ts`, `questCandidateRepository.ts`, `personaMasteryRepository.ts`: narrow persistence APIs.
- Modify `web/src/core/storage/taskRepository.ts`: normalize migrated records and provide range/persona queries.

**Business policies**

- Create `web/src/features/personas/personaClassifier.ts`: keyword-based persona/category suggestions with saved corrections.
- Create `web/src/features/recurring/recurrencePolicy.ts`: idempotent daily/weekly/monthly generation, missed transitions, and carry-forward.
- Create `web/src/features/mastery/masteryPolicy.ts`: stage thresholds and persona credit events.
- Create `web/src/features/today/completeQuest.ts`: one completion transaction and recovery boundary.
- Modify `web/src/features/nudges/nudgePolicy.ts` and `taskCheckIn.ts`: three-stage adaptive coach decisions.
- Create `web/src/features/monthly/monthlySummary.ts`: calendar cells and operational totals.
- Create `web/src/features/inbox/candidatePolicy.ts`: connector normalization, duplicate suppression, accept/dismiss conversion.

**UI and routing**

- Modify `web/src/core/theme/tokens.css` and `global.css`: mature B-type design tokens and responsive components.
- Modify `web/src/app/App.tsx` and `BottomNav.tsx`: five routes/tabs.
- Create `web/src/features/personas/PersonaTabs.tsx` and `PersonaManager.tsx`.
- Create `web/src/features/recurring/RecurringChecklist.tsx` and `RecurringTemplateManager.tsx`.
- Create `web/src/features/today/MonggleCoachPanel.tsx` and `TodayDashboard.tsx`; reduce `TodayScreen.tsx` to data orchestration.
- Create `web/src/features/monthly/MonthlyScreen.tsx` and `MonthlyCalendar.tsx`.
- Create `web/src/features/inbox/CandidateInbox.tsx` and `ConnectorSettings.tsx`.
- Modify `web/src/features/settings/SettingsScreen.tsx` to host persona, recurrence, and connector settings.

**Verification**

- Add focused `*.test.ts(x)` files beside every module.
- Create `web/e2e/persona-dashboard.spec.ts`, `recurring-mastery.spec.ts`, and `monthly-inbox.spec.ts`.

### Task 1: Domain contracts and Dexie v7 migration

**Files:**
- Create: `web/src/core/model/persona.ts`
- Create: `web/src/core/model/recurrence.ts`
- Create: `web/src/core/model/questCandidate.ts`
- Modify: `web/src/core/model/task.ts`
- Modify: `web/src/core/storage/database.ts`
- Modify: `web/src/core/storage/taskRepository.ts`
- Test: `web/src/core/storage/personaDashboardMigration.test.ts`

**Interfaces:**
- Produces: `Persona`, `PersonaMastery`, `RecurringTaskTemplate`, `RecurringTaskInstance`, `QuestCandidate`, `ExternalCalendarEvent`, `Task.personaIds`, `Task.recurringInstanceId`, and `Task.sourceRef`.

- [ ] **Step 1: Write the failing migration test**

```ts
it('normalizes a v6 task into the persona-aware v7 shape', async () => {
  const database = createDatabase('persona-migration-test')
  await database.tasks.put(legacyTask as Task)
  const [task] = await createTaskRepository(database).listForDay('2026-08-23')
  expect(task.personaIds).toEqual([])
  expect(task.source).toBe('manual')
})
```

- [ ] **Step 2: Run the test and confirm the missing fields fail**

Run: `npm test -- --run src/core/storage/personaDashboardMigration.test.ts`

Expected: FAIL because `personaIds` and the v7 stores do not exist.

- [ ] **Step 3: Add exact domain contracts**

```ts
export type PersonaKind = 'default' | 'custom'
export type PersonaStatus = 'active' | 'archived'
export interface Persona { id: string; name: string; icon: string; color: string; kind: PersonaKind; status: PersonaStatus; order: number; classificationKeywords: string[]; masteryLabels?: string[] }
export interface PersonaMastery { personaId: string; completions: number; stage: number; weeklyCompleted: number; monthlyConsistencyDays: number; creditedEventIds: string[] }
export type QuestCategory = 'counseling' | 'operations' | 'curriculum' | 'marketing' | 'reading' | 'exercise' | 'gathering_personal' | 'other'
export type RecurrenceCadence = { kind: 'daily' } | { kind: 'weekly'; weekdays: number[] } | { kind: 'monthly'; timing: 'first_business_day' | 'mid_month' | 'last_business_day' }
export interface RecurringTaskTemplate { id: string; title: string; personaIds: string[]; category: QuestCategory; cadence: RecurrenceCadence; targetCount: number; estimateMinutes: number; firstAction?: string; carryForward: boolean; active: boolean }
export interface RecurringTaskInstance { id: string; templateId: string; periodKey: string; scheduledDay: string; status: 'open' | 'completed' | 'missed' | 'canceled'; completedAt?: string }
export interface QuestCandidate { id: string; source: 'kakaotalk' | 'kakaowork' | 'google_calendar'; sourceRef: string; title: string; personaIds: string[]; category: QuestCategory; dueAt?: string; estimateMinutes: number; firstAction?: string; status: 'pending_review' | 'accepted' | 'dismissed' }
export interface ExternalCalendarEvent { id: string; sourceRef: string; title: string; startsAt: string; endsAt: string; status: 'confirmed' | 'canceled' }
```

- [ ] **Step 4: Add Dexie v7 tables and normalization**

Add stores keyed as `personas: '&id,status,order'`, `personaMastery: '&personaId'`, `recurringTemplates: '&id,active'`, `recurringInstances: '&id,templateId,periodKey,scheduledDay,status'`, `questCandidates: '&id,&sourceRef,status'`, and `externalCalendarEvents: '&id,&sourceRef,startsAt,status'`. Normalize legacy tasks with `personaIds: task.personaIds ?? []` without rewriting user data during reads.

- [ ] **Step 5: Run storage tests and commit**

Run: `npm test -- --run src/core/storage/personaDashboardMigration.test.ts src/core/storage/repositories.test.ts`

Expected: PASS.

```bash
git add web/src/core/model web/src/core/storage
git commit -m "feat: add persona dashboard domain model"
```

### Task 2: Persona repository, defaults, and direct management

**Files:**
- Create: `web/src/core/storage/personaRepository.ts`
- Create: `web/src/features/personas/PersonaTabs.tsx`
- Create: `web/src/features/personas/PersonaManager.tsx`
- Test: `web/src/core/storage/personaRepository.test.ts`
- Test: `web/src/features/personas/PersonaTabs.test.tsx`
- Test: `web/src/features/personas/PersonaManager.test.tsx`

**Interfaces:**
- Consumes: `Persona` from Task 1.
- Produces: `ensureDefaults(): Promise<Persona[]>`, `listActive(): Promise<Persona[]>`, `save(persona): Promise<void>`, `archive(id): Promise<void>`, `restore(id): Promise<void>`, `reorder(ids): Promise<void>`.

- [ ] **Step 1: Test idempotent Reading Brain defaults**

```ts
expect((await repository.ensureDefaults()).map(({ name }) => name)).toEqual(['원장·경영자', '상담 관리자', '교육 기획자', '마케터', '개인'])
await repository.ensureDefaults()
expect(await database.personas.count()).toBe(5)
```

- [ ] **Step 2: Run the repository test and verify failure**

Run: `npm test -- --run src/core/storage/personaRepository.test.ts`

Expected: FAIL because the repository is missing.

- [ ] **Step 3: Implement the repository and management UI**

Use stable IDs `director`, `counseling`, `education`, `marketing`, `personal`. `PersonaTabs` renders `전체`, the five active persona buttons, and `+ 추가`; each button uses `aria-pressed`, icon plus name, and a non-color selected marker. `PersonaManager` validates non-empty unique names and supports rename, icon/color edit, reorder, archive, and restore.

- [ ] **Step 4: Test direct selection and custom persona creation**

```tsx
await user.click(screen.getByRole('button', { name: '마케팅' }))
expect(onChange).toHaveBeenCalledWith('marketing')
await user.click(screen.getByRole('button', { name: '페르소나 추가' }))
expect(onAdd).toHaveBeenCalledOnce()
```

- [ ] **Step 5: Run tests and commit**

Run: `npm test -- --run src/core/storage/personaRepository.test.ts src/features/personas`

Expected: PASS.

```bash
git add web/src/core/storage/personaRepository.ts web/src/features/personas
git commit -m "feat: manage work personas"
```

### Task 3: Recurring academy work generation

**Files:**
- Create: `web/src/core/storage/recurringRepository.ts`
- Create: `web/src/features/recurring/defaultTemplates.ts`
- Create: `web/src/features/recurring/recurrencePolicy.ts`
- Test: `web/src/features/recurring/recurrencePolicy.test.ts`
- Test: `web/src/core/storage/recurringRepository.test.ts`

**Interfaces:**
- Consumes: `RecurringTaskTemplate`, `RecurringTaskInstance`.
- Produces: `generateInstances(templates, existing, day): RecurringTaskInstance[]`, `closePastInstances(instances, today): RecurringTaskInstance[]`, `materializeCarryForward(instance, template, today)`.

- [ ] **Step 1: Test daily, count-based weekly, and monthly boundaries**

```ts
it('does not duplicate a daily instance for the same period', () => {
  const once = generateInstances([dailyTemplate], [], '2026-08-24')
  expect(generateInstances([dailyTemplate], once, '2026-08-24')).toEqual(once)
})
it('marks yesterday missed without stacking it into today', () => {
  expect(closePastInstances([yesterdayOpen], '2026-08-24')[0].status).toBe('missed')
})
```

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm test -- --run src/features/recurring/recurrencePolicy.test.ts`

Expected: FAIL because the policy is missing.

- [ ] **Step 3: Implement stable IDs and the organized default set**

Generate instance IDs as `${template.id}@${periodKey}`. Seed daily templates for integrated inbox/calendar review, Naver Place inquiry, one parent counseling, one student counseling, new/withdrawn student check, marketing reactions, today's schedule, and end-of-day unresolved review. Seed weekly templates for two teacher meetings plus distributed curriculum and channel checks. Seed monthly first-business-day planning, mid-month review, and last-business-day closing templates.

- [ ] **Step 4: Persist generation atomically**

`ensureForDay(day)` loads active templates and existing period instances, applies `closePastInstances`, bulk-upserts only changed rows, and returns the selected day's instances. A unique instance ID makes reruns and crash recovery idempotent.

- [ ] **Step 5: Run tests and commit**

Run: `npm test -- --run src/features/recurring src/core/storage/recurringRepository.test.ts`

Expected: PASS.

```bash
git add web/src/core/storage/recurringRepository.ts web/src/features/recurring
git commit -m "feat: generate academy recurring work"
```

### Task 4: Mature visual system and five-tab shell

**Files:**
- Modify: `web/src/core/theme/tokens.css`
- Modify: `web/src/core/theme/global.css`
- Modify: `web/src/app/App.tsx`
- Modify: `web/src/app/BottomNav.tsx`
- Create: `web/src/features/monthly/MonthlyScreen.tsx`
- Test: `web/src/app/App.test.tsx`
- Test: `web/src/core/theme/studioTheme.test.ts`

**Interfaces:**
- Produces: routes `/`, `/monthly`, `/pet`, `/focus`, `/me` and shared mature dashboard CSS tokens.

- [ ] **Step 1: Update tests to require the five labels and monthly route**

```tsx
expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual(['오늘', '월간', '몽글', '집중', '나'])
```

- [ ] **Step 2: Run tests and verify they fail against the four-tab shell**

Run: `npm test -- --run src/app/App.test.tsx src/core/theme/studioTheme.test.ts`

Expected: FAIL on the missing 월간 tab and route.

- [ ] **Step 3: Apply the B-type design tokens and shell**

Set body weight to 450, headings to 680, page background `#F4F3F1`, primary text `#242329`, surface `#FFFFFF`, subdued lavender `#E9E4F3`, action lavender `#6E5AA8`, and dark quest `#292735`. Standard cards use 16 px radii, 1 px neutral borders, and at most one subtle shadow. Keep `.pet-hero` visual depth and enforce `min-height: 48px` for interactive controls.

- [ ] **Step 4: Implement routes and UTF-8 Korean navigation labels**

Remove `/messages` and `/routines` from primary navigation but retain redirect-compatible routes if existing deep links require them. The placeholder `MonthlyScreen` must render a real heading, month navigation controls, and an empty calendar region so the route is independently usable.

- [ ] **Step 5: Run tests, build, and commit**

Run: `npm test -- --run src/app src/core/theme/studioTheme.test.ts && npm run build`

Expected: PASS with no TypeScript errors.

```bash
git add web/src/core/theme web/src/app web/src/features/monthly/MonthlyScreen.tsx
git commit -m "feat: apply mature five-tab dashboard shell"
```

### Task 5: Persona-aware capture and review candidates

**Files:**
- Create: `web/src/features/personas/personaClassifier.ts`
- Create: `web/src/core/storage/questCandidateRepository.ts`
- Create: `web/src/features/inbox/candidatePolicy.ts`
- Create: `web/src/features/inbox/CandidateInbox.tsx`
- Modify: `web/src/features/today/taskDraft.ts`
- Modify: `web/src/features/today/TaskDraftReview.tsx`
- Test: `web/src/features/personas/personaClassifier.test.ts`
- Test: `web/src/features/inbox/candidatePolicy.test.ts`
- Test: `web/src/features/inbox/CandidateInbox.test.tsx`

**Interfaces:**
- Produces: `classifyQuest(title, personas, corrections): { personaIds: string[]; category: QuestCategory }`, `normalizeCandidate(input): QuestCandidate`, `acceptCandidate(candidate, now): Task`, and `dismissCandidate(id)`.

- [ ] **Step 1: Test academy classification and duplicate suppression**

```ts
expect(classifyQuest('신입생 상담 일정 잡기', personas, [])).toEqual({ personaIds: ['counseling'], category: 'counseling' })
expect(dedupeCandidates([sameKakaoMessage, sameKakaoMessage])).toHaveLength(1)
```

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm test -- --run src/features/personas/personaClassifier.test.ts src/features/inbox`

Expected: FAIL because classifier and candidate policy are missing.

- [ ] **Step 3: Implement deterministic suggestions and local corrections**

Match normalized Korean text against active persona keywords, break ties by persona order, default to `personal`/`other`, and store a correction `{ normalizedPhrase, personaIds, category }` after user edits an accepted candidate. Candidate identity is `${source}:${sourceRef}`; repository `put` returns the existing record for duplicates.

- [ ] **Step 4: Build the review inbox**

Each row exposes editable title, deadline, estimate, first action, category, and multi-persona selection, then `수락` and `닫기`. Accepting creates a task with source metadata; dismissing never deletes the source reference, so the same external item is not re-imported.

- [ ] **Step 5: Run tests and commit**

Run: `npm test -- --run src/features/personas src/features/inbox src/features/today/TaskDraftReview.test.tsx`

Expected: PASS.

```bash
git add web/src/features/personas/personaClassifier.ts web/src/core/storage/questCandidateRepository.ts web/src/features/inbox web/src/features/today
git commit -m "feat: review and classify incoming work"
```

### Task 6: Today dashboard composition

**Files:**
- Create: `web/src/features/recurring/RecurringChecklist.tsx`
- Create: `web/src/features/today/MonggleCoachPanel.tsx`
- Create: `web/src/features/today/TodayDashboard.tsx`
- Modify: `web/src/features/today/TodayScreen.tsx`
- Modify: `web/src/features/today/FeaturedQuest.tsx`
- Modify: `web/src/features/pet/PetHero.tsx`
- Test: `web/src/features/today/TodayDashboard.test.tsx`
- Test: `web/src/features/recurring/RecurringChecklist.test.tsx`

**Interfaces:**
- Consumes: active personas, selected persona ID, tasks, recurring instances/templates, candidates, pet state, and coach decision.
- Produces: `TodayDashboard` callbacks `onSelectPersona`, `onCompleteRecurring`, `onStartQuest`, `onCompleteQuest`, `onAcceptCandidate`, and `onAddTask`.

- [ ] **Step 1: Test the approved information order**

```tsx
const regions = screen.getAllByRole('region').map((node) => node.getAttribute('aria-label'))
expect(regions).toEqual(['오늘 요약', '페르소나 선택', '몽글 코치', '메인 퀘스트', '매일 반복업무', '남은 퀘스트', '외부에서 가져온 할 일'])
```

- [ ] **Step 2: Run the component tests and verify failure**

Run: `npm test -- --run src/features/today/TodayDashboard.test.tsx src/features/recurring/RecurringChecklist.test.tsx`

Expected: FAIL because the composition does not exist.

- [ ] **Step 3: Build the ordered dashboard with a prominent 3D coach**

Render date/overall progress/energy, direct persona chips, the existing `PetHero` at a minimum visual height of 200 px with `aria-label="3D 몽글 코치"`, one dark featured quest, recurring checks, remaining quests, pending candidates, then collapsed planning tools. Persona filtering includes tasks linked to the selected persona while `전체` shows all.

- [ ] **Step 4: Move data orchestration out of presentation**

Keep Dexie/reward recovery in `TodayScreen`; pass serializable view state and callbacks to `TodayDashboard`. Preserve focus start, widget updates, draft review, and reward burst behavior. Replace mojibake encountered in modified files with the intended Korean strings.

- [ ] **Step 5: Run Today tests and commit**

Run: `npm test -- --run src/features/today src/features/recurring/RecurringChecklist.test.tsx src/features/pet/PetHero.test.tsx`

Expected: PASS.

```bash
git add web/src/features/today web/src/features/recurring/RecurringChecklist.tsx web/src/features/pet/PetHero.tsx
git commit -m "feat: compose persona-aware today dashboard"
```

### Task 7: Adaptive persistent Monggle coaching

**Files:**
- Modify: `web/src/features/nudges/taskMastery.ts`
- Modify: `web/src/features/nudges/taskCheckIn.ts`
- Modify: `web/src/features/nudges/nudgePolicy.ts`
- Modify: `web/src/features/nudges/PersistentNowTask.tsx`
- Modify: `web/src/features/today/MonggleCoachPanel.tsx`
- Test: `web/src/features/nudges/nudgePolicy.test.ts`
- Test: `web/src/features/nudges/PersistentNowTask.test.tsx`

**Interfaces:**
- Produces: `CoachStage = 'gentle' | 'direct' | 'decision'`, `CoachContext`, `buildCoachDecision(context): { stage; line; actions; nextPromptAt }`, actions `start | remind_5 | reschedule | cancel | done`.

- [ ] **Step 1: Test escalation, quiet hours, and reset**

```ts
expect(buildCoachDecision({ ...base, unansweredPrompts: 0 }).stage).toBe('gentle')
expect(buildCoachDecision({ ...base, unansweredPrompts: 2 }).actions).toEqual(['start', 'remind_5', 'reschedule', 'cancel'])
expect(buildCoachDecision({ ...base, quiet: true })).toMatchObject({ nextPromptAt: null })
expect(applyMasteryEvent(escalated, { type: 'done', at: now })).toMatchObject({ misses: 0 })
```

- [ ] **Step 2: Run tests and confirm policy mismatch**

Run: `npm test -- --run src/features/nudges`

Expected: FAIL because the current tones/actions do not match the three-stage policy.

- [ ] **Step 3: Implement contextual, non-punitive coaching**

Rank current mission first, then persona-filtered open work. Suppress prompts during quiet hours and conflicting calendar blocks; determined mode shortens the interval but never changes copy to insulting or angry. Stage 1 offers a small first action, stage 2 explicitly recalls the agreed task, and stage 3 requires start/remind five minutes/reschedule/cancel.

- [ ] **Step 4: Make the coach accessible and persistent**

Use `role="status" aria-live="polite"` for changed lines, retain 48 px actions, and persist only response history and reminder timestamps. Completion clears the task's escalation state.

- [ ] **Step 5: Run tests and commit**

Run: `npm test -- --run src/features/nudges src/features/today/MonggleCoachPanel.test.tsx`

Expected: PASS.

```bash
git add web/src/features/nudges web/src/features/today/MonggleCoachPanel.tsx
git commit -m "feat: add adaptive persistent coaching"
```

### Task 8: Idempotent persona mastery and reward completion

**Files:**
- Create: `web/src/core/storage/personaMasteryRepository.ts`
- Create: `web/src/features/mastery/masteryPolicy.ts`
- Create: `web/src/features/today/completeQuest.ts`
- Modify: `web/src/features/today/TodayScreen.tsx`
- Test: `web/src/features/mastery/masteryPolicy.test.ts`
- Test: `web/src/features/today/completeQuest.test.ts`

**Interfaces:**
- Produces: `stageFor(completions): 1 | 2 | 3 | 4 | 5 | 6`, `creditPersonas(eventId, personaIds): Promise<PersonaMastery[]>`, `completeQuestTransaction(input): Promise<CompletionResult>`.

- [ ] **Step 1: Test thresholds and multi-persona idempotency**

```ts
expect([1, 5, 15, 30, 60, 100].map(stageFor)).toEqual([1, 2, 3, 4, 5, 6])
await service.complete(taskLinkedToDirectorAndMarketing)
await service.complete(taskLinkedToDirectorAndMarketing)
expect(await petRewards.count()).toBe(1)
expect((await mastery.get('director'))?.completions).toBe(1)
expect((await mastery.get('marketing'))?.completions).toBe(1)
```

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm test -- --run src/features/mastery src/features/today/completeQuest.test.ts`

Expected: FAIL because mastery credit and the unified completion service are missing.

- [ ] **Step 3: Implement a recoverable completion event**

Use event ID `${task.id}@${completedAt}`. In one Dexie transaction mark the task complete, mark its recurring instance complete when present, write the existing pet reward event, and add the event ID to each persona mastery record only if absent. Pet settlement may occur after the transaction and remains recoverable via the existing reward outbox.

- [ ] **Step 4: Display stage labels without deductions**

Default labels are `입문`, `실무`, `숙련`, `전문`, `리더`, `마스터`; custom persona labels override by index. Weekly and monthly counters are projections from completed events and missed/canceled work never decrements totals.

- [ ] **Step 5: Run tests and commit**

Run: `npm test -- --run src/features/mastery src/features/today src/features/pet`

Expected: PASS.

```bash
git add web/src/core/storage/personaMasteryRepository.ts web/src/features/mastery web/src/features/today
git commit -m "feat: credit persona mastery idempotently"
```

### Task 9: Daily drill-down and monthly operating view

**Files:**
- Create: `web/src/features/monthly/monthlySummary.ts`
- Create: `web/src/features/monthly/MonthlyCalendar.tsx`
- Modify: `web/src/features/monthly/MonthlyScreen.tsx`
- Modify: `web/src/core/storage/taskRepository.ts`
- Test: `web/src/features/monthly/monthlySummary.test.ts`
- Test: `web/src/features/monthly/MonthlyScreen.test.tsx`

**Interfaces:**
- Produces: `listBetween(startDay, endDay)`, `buildMonthlySummary(tasks, instances, templates, month): MonthlySummary`, and date selection linking to `/?day=YYYY-MM-DD`.

- [ ] **Step 1: Test exact academy metrics**

```ts
expect(summary.metrics).toMatchObject({ parentCounseling: 3, studentCounseling: 2, teacherMeetings: 2, newStudents: 1, withdrawnStudents: 0, marketingPosts: 4, curriculumChecks: 2, reading: 5, exercise: 3, carriedForward: 1 })
```

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm test -- --run src/features/monthly`

Expected: FAIL because summary aggregation and calendar UI are missing.

- [ ] **Step 3: Implement timezone-safe monthly aggregation**

Build calendar days from `YYYY-MM` strings in Asia/Seoul, group completion counts by category/template semantic ID, and show open/missed/completed counts. Apply the same persona filter semantics as Today. Clicking a date navigates to Today with that day selected.

- [ ] **Step 4: Build the hybrid calendar and scorecard**

Place month controls and persona chips above a seven-column calendar; put the compact operational metric grid below it. Each date button includes a text completion fraction so status does not depend on color.

- [ ] **Step 5: Run tests and commit**

Run: `npm test -- --run src/features/monthly src/core/storage/repositories.test.ts`

Expected: PASS.

```bash
git add web/src/features/monthly web/src/core/storage/taskRepository.ts
git commit -m "feat: add monthly academy operating view"
```

### Task 10: Connector adapters and settings

**Files:**
- Modify: `web/src/features/calendar/calendarClient.ts`
- Create: `web/src/features/inbox/connectorAdapters.ts`
- Create: `web/src/features/inbox/ConnectorSettings.tsx`
- Modify: `web/src/features/settings/SettingsScreen.tsx`
- Test: `web/src/features/inbox/connectorAdapters.test.ts`
- Test: `web/src/features/inbox/ConnectorSettings.test.tsx`
- Test: `web/src/features/settings/SettingsScreen.test.tsx`

**Interfaces:**
- Produces: `importKakaoShare(text, sourceRef)`, `importKakaoWork(items)`, `syncGoogleEvents(range)`, and connection states `disconnected | connecting | connected | stale | error`.

- [ ] **Step 1: Test connector boundaries**

```ts
expect(importKakaoShare('내일 학부모 상담 확인', 'share-1')[0].status).toBe('pending_review')
expect(syncGoogleEventsResponse(confirmedEvent)[0]).toMatchObject({ status: 'confirmed' })
expect(syncGoogleEventsResponse(confirmedEvent)[0]).not.toHaveProperty('taskId')
```

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm test -- --run src/features/inbox/connectorAdapters.test.ts`

Expected: FAIL because adapter contracts are missing.

- [ ] **Step 3: Implement adapters without overclaiming platform access**

KakaoTalk uses OS share/paste payloads. KakaoWork accepts connector results only when a configured endpoint returns stable source IDs; otherwise its settings card explains that direct paste remains available. Extend `CalendarClient` with `events({ timeMin, timeMax, timeZone })`; store confirmed events separately and upsert by source reference.

- [ ] **Step 4: Add safe connection UX and recovery**

Show last successful sync, account, disconnect action, retry action, and privacy copy. Network failure leaves cached events/candidates visible with a stale label. Revoked access changes only connection state. Candidate acceptance/dismissal remains local and duplicate-safe.

- [ ] **Step 5: Run tests and commit**

Run: `npm test -- --run src/features/inbox src/features/calendar src/features/settings`

Expected: PASS.

```bash
git add web/src/features/inbox web/src/features/calendar/calendarClient.ts web/src/features/settings/SettingsScreen.tsx
git commit -m "feat: connect reviewed work sources"
```

### Task 11: End-to-end behavior, accessibility, and regression verification

**Files:**
- Create: `web/e2e/persona-dashboard.spec.ts`
- Create: `web/e2e/recurring-mastery.spec.ts`
- Create: `web/e2e/monthly-inbox.spec.ts`
- Modify: affected components only when a failing scenario identifies a concrete defect.

**Interfaces:**
- Consumes: all public UI and policies from Tasks 1–10.
- Produces: release evidence for the approved design.

- [ ] **Step 1: Write three user-journey specs**

```ts
test('director filters work and completes one recurring quest', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '원장' }).click()
  await page.getByRole('checkbox', { name: /네이버 플레이스 상담 확인/ }).check()
  await expect(page.getByText(/전문성/)).toBeVisible()
})
```

Add journeys for creating/archiving/restoring a custom persona, retry-safe dual-persona reward, month-to-day navigation, Kakao candidate accept/dismiss, Google event conversion, quiet-hour coaching, and keyboard-only completion.

- [ ] **Step 2: Run focused E2E and record the first failing assertion**

Run: `npx playwright test e2e/persona-dashboard.spec.ts e2e/recurring-mastery.spec.ts e2e/monthly-inbox.spec.ts`

Expected: FAIL only where integration wiring or accessible names are incomplete.

- [ ] **Step 3: Fix each observed integration defect with a focused regression assertion**

For every failure, add or tighten the nearest unit/component assertion before changing implementation. Keep external network calls mocked at the client boundary and use a fixed Asia/Seoul clock.

- [ ] **Step 4: Run the complete verification suite**

Run: `npm test -- --run`

Expected: all Vitest suites pass.

Run: `npm run build`

Expected: TypeScript and Vite build pass.

Run: `npx playwright test`

Expected: all Playwright suites pass on desktop and the configured mobile viewport.

- [ ] **Step 5: Manually verify visual and recovery constraints**

At 320 px, 390 px, 768 px, and desktop widths verify no horizontal overflow, the 3D Monggle remains prominent, only one dark quest card appears, all controls are at least 48 px, persona state has a textual marker, reduced motion disables decoration, reload does not duplicate recurrence or rewards, and offline reload preserves cached work.

- [ ] **Step 6: Commit verification**

```bash
git add web/e2e web/src
git commit -m "test: verify persona mastery dashboard journeys"
```

## Completion Criteria

- A Reading Brain director can see and check all approved daily recurring work, add new work, and filter it directly by default or custom persona.
- The same work can be reviewed by day and month, including counseling, meetings, enrollment movement, curriculum, marketing, reading, exercise, and carry-forward metrics.
- Monggle remains a prominent 3D game character, coaches persistently through three humane stages, and overall/persona progression survives retries without double credit.
- Kakao inputs are review candidates, Google confirmed events remain events until conversion, and connector outages preserve cached data.
- Unit, component, build, and Playwright verification all pass with accessible Korean UI copy.
