# Monggle Persona Mastery Dashboard Design

## 1. Goal

Monggle becomes a calm but game-like operating dashboard for people who manage several professional roles alone, beginning with a Reading Brain academy director. The redesign keeps the 3D Monggle character, reward loop, room customization, and persistent coaching while replacing the elementary-looking typography and card treatment with a mature B-type visual system.

The product helps the user perform recurring responsibilities consistently, capture irregular work without losing it, review work by day and month, and accumulate role-specific expertise without punishment for missed days.

## 2. Primary User and Product Boundary

The initial primary user is a one-person business owner or freelancer who switches between several roles during the day. The reference persona is a Reading Brain academy director responsible for operations, counseling, education, marketing, and personal routines.

The first release is a single-user local-first experience. Personas are role lenses belonging to one user, not separate employee accounts. Multi-user assignment, shared team workspaces, and employee permissions remain a later expansion.

## 3. Experience Principles

1. **Monggle remains the protagonist.** The 3D character stays prominent on Today, reacts to completion, speaks through visible coaching bubbles, and grows through rewards.
2. **Game mechanics remain explicit.** XP, coins, food, hearts, rooms, item unlocks, quest rewards, and persona mastery are visible and meaningful.
3. **The dashboard looks mature.** Typography, density, and hierarchy resemble a polished productivity product rather than a children's learning dashboard.
4. **Coaching is persistent but non-punitive.** Monggle becomes more direct when work is repeatedly deferred but never removes XP, levels, affinity, or items.
5. **Recurring work is generated, not manually rebuilt.** Daily, weekly, and monthly templates create checkable instances at the correct time.
6. **External input is reviewed before commitment.** KakaoTalk and KakaoWork messages become reviewable quest candidates. Confirmed Google Calendar events appear automatically.
7. **One next action dominates.** The current persona and urgency determine one main quest and one concrete first action.

## 4. Visual Direction: Calm Game Dashboard

### 4.1 Typography

- Use Pretendard as the primary Korean and UI font.
- Headings use weights 650–700; body copy uses 400–500.
- Avoid oversized rounded headings, excessive bold text, and decorative uppercase labels.
- Use tabular numerals for times, counts, XP, and completion metrics.
- Keep labels concise and operational: `오늘의 메인 퀘스트`, `남은 업무`, `이번 달 운영 현황`.

### 4.2 Color and Surface

- Use neutral light surfaces, charcoal text, and low-saturation lavender accents.
- Reserve saturated lavender for the primary action, active persona, reward state, and Monggle-related emphasis.
- Use one dark main-quest card to create hierarchy.
- Avoid giving every card a separate pastel color.
- Reduce shadow strength and corner radius while retaining a soft, friendly character.

### 4.3 Character and Game Feedback

- Keep the approved 3D Monggle prominently visible in the home coach panel.
- Preserve celebration animation and the dismissible reward dialog.
- Show level, XP, coins, food, and hearts close to Monggle.
- Maintain pet room customization and item unlocks.
- Reduced-motion settings remove bounce, scaling, and confetti without removing reward information.

## 5. Navigation and Information Architecture

The primary navigation contains five destinations:

1. `오늘`: execution, recurring checks, new quests, and Monggle coaching
2. `월간`: calendar, operating metrics, missed work, and next-month preparation
3. `몽글`: pet growth, overall level, persona mastery, inventory, and room
4. `집중`: one-task focus session and elapsed-time feedback
5. `나`: persona management, integrations, coaching preferences, theme, and data controls

Legacy advanced routes may remain directly reachable during migration but are not primary tabs.

## 6. Persona System

### 6.1 Default Personas

- `원장·경영자`: schedules, enrollment status, teacher meetings, operations, and monthly review
- `상담 관리자`: Naver Place inquiries, parent counseling, student counseling, and follow-up
- `교육 기획자`: curriculum checks, learning status, teaching materials, and teacher communication
- `마케터`: blog, parent communities, Instagram, channel inquiries, and performance checks
- `개인`: reading, exercise, gatherings, appointments, and personal routines

### 6.2 Direct Selection

Today exposes persona chips directly below the header:

`전체 · 원장 · 상담 · 교육 · 마케팅 · 개인 · + 추가`

Changing the active persona filters recurring checks, quest candidates, main-quest recommendation, progress, and Monggle's coaching copy. `전체` shows the single most important action across roles.

### 6.3 Custom Personas

Users with additional occupations or responsibilities can create a persona with:

- name
- icon and color
- recurring task templates
- expertise-stage labels
- optional keywords used for classification

Examples include content creator, English instructor, consultant, writer, parent, and investor. A custom persona behaves exactly like a default persona and can be renamed, reordered, archived, and restored.

### 6.4 Multi-Persona Quests

A quest may belong to multiple personas, such as `교육 + 마케팅`. Completing it grants overall quest rewards once while adding mastery credit to every linked persona. The UI explains this distinction so a multi-tagged quest never appears to duplicate coins or overall XP.

## 7. Recurring Work

### 7.1 Daily Fixed Checks

The default academy-director template generates these daily instances:

1. Check new KakaoTalk, KakaoWork, and Google Calendar items
2. Check Naver Place counseling inquiries
3. Complete one parent counseling contact
4. Complete one student counseling contact
5. Check new and withdrawn student status
6. Check marketing-channel inquiries and reactions
7. Review today's schedule and appointments
8. Review unresolved work before ending the day

Users can add, edit, pause, reorder, or remove any template.

### 7.2 Weekly Distribution

The initial template proposes:

- Monday: monthly schedule and weekly priorities
- Tuesday: curriculum checks
- Wednesday: first teacher meeting
- Thursday: blog publication
- Friday: second teacher meeting and marketing review
- Saturday: counseling follow-up and enrollment-status cleanup
- Sunday: next-week preview, reading, and recovery

The proposal is editable. A weekly requirement may specify a count, such as `teacher meeting: at least 2 per week`, without forcing exact days.

### 7.3 Monthly Checks

- First business day: monthly schedule, campaigns, targets, and key events
- Mid-month: enrollment, withdrawal, counseling, and curriculum status
- Last business day: performance review, incomplete-work decisions, and next-month preparation

### 7.4 Missed Instances

Daily recurring instances reset on the next day and remain in history as missed. They do not pile up as duplicate overdue quests and do not reduce any level or owned reward. Templates can opt into carry-forward when the work is genuinely mandatory.

## 8. Quest Capture and Classification

### 8.1 Input Sources

- Direct one-line entry
- KakaoTalk share or paste flow
- KakaoWork connected-message flow
- Google Calendar confirmed events
- Recurring-task generation

### 8.2 Review Policy

KakaoTalk and KakaoWork inputs become candidates containing source, proposed title, deadline, estimate, first action, category, and persona tags. The user confirms or edits candidates before they enter the committed quest list.

Confirmed Google Calendar events appear automatically in the daily and monthly timelines. They are calendar commitments rather than completion quests unless the user converts them to a quest.

### 8.3 Classification

The classifier proposes one or more personas and one category from:

- counseling
- academy operations
- curriculum
- marketing
- reading
- exercise
- gathering/appointment
- personal
- other

User corrections are retained locally as future classification preferences. Classification never blocks manual creation.

### 8.4 Connector Safety

- KakaoTalk automation is limited to supported share, paste, or approved API capabilities; the product does not automate the consumer chat UI.
- KakaoWork and Google integrations expose connection and permission state clearly.
- External imports preserve source references and avoid duplicate candidates.
- The user can disconnect a source without deleting already confirmed quests.

## 9. Today Screen

The Today screen renders in this order:

1. date, overall completion, and energy selector
2. directly selectable persona chips
3. prominent 3D Monggle coach panel with current coaching message and game totals
4. dark main-quest card with first action, estimate, reward preview, and `3분 집중 시작`
5. daily recurring-work checklist
6. new and remaining quests grouped by active persona
7. reviewed external candidates requiring confirmation
8. collapsed planning and rescue tools

Quick add remains visible in one line. Completing a check or quest persists the work before reward settlement and immediately updates overall XP, persona mastery, monthly metrics, and Monggle feedback.

## 10. Adaptive Coaching

Monggle's coaching state is tracked per active quest and escalates through three stages:

1. **Gentle start:** offers a three-minute first action.
2. **Clear recall:** states that the task is still unstarted and asks for immediate action.
3. **Action decision:** requires one of `start now`, `remind in five minutes`, `reschedule`, or `cancel today`.

Escalation considers response history, current focus state, quiet hours, calendar conflicts, and the user's determined-coaching preference. It never uses insults, shame, illness imagery, loss of rewards, or an accumulating notification stack.

Completion resets escalation immediately and switches Monggle to celebration mode. A missed day keeps all progress and prompts a restart on the next relevant day.

## 11. Daily and Monthly Views

### 11.1 Daily

Daily view answers:

- What must I do now?
- Which fixed checks remain?
- What arrived from messages or the calendar?
- Which persona needs attention?
- What can be completed in three minutes?

### 11.2 Monthly

Monthly uses a hybrid calendar and operating dashboard:

- unified Google Calendar and appointment grid
- date-level completed and missed quest markers
- persona filters
- parent and student counseling counts
- teacher-meeting count against the minimum target
- new and withdrawn student status
- blog, parent-community, and Instagram publication status
- curriculum checklist state
- reading and exercise days
- carry-forward decisions for unfinished non-daily work
- month-level Monggle and mastery rewards

Clicking a date opens the daily detail without losing the selected persona.

## 12. Progression and Mastery

### 12.1 Overall Monggle Level

Every eligible completion grants overall XP once. Overall levels unlock character reactions, room items, accessories, and backgrounds.

### 12.2 Persona Mastery

Every completion grants one mastery credit to each linked persona. Default stages are:

1. Start: 1 completion
2. Habit forming: 5 completions
3. Stable operation: 15 completions
4. Skilled: 30 completions
5. Expert: 60 completions
6. Master: 100 completions

The product also reports weekly target completion and monthly consistency, but missed work never subtracts accumulated mastery.

### 12.3 Reward Integrity

- One completion event produces overall XP, coins, food, and hearts at most once.
- Multi-persona mastery is expected and is not treated as duplicate overall reward.
- Recurring instances use unique IDs derived from template and scheduled period.
- Recovery after storage interruption preserves completed work and settles pending rewards later.

## 13. Core Data Model

```ts
interface Persona {
  id: string
  name: string
  icon: string
  color: string
  kind: 'default' | 'custom'
  status: 'active' | 'archived'
  order: number
  classificationKeywords: string[]
  masteryLabels?: string[]
}

interface RecurringTaskTemplate {
  id: string
  title: string
  personaIds: string[]
  category: string
  cadence: DailyCadence | WeeklyCadence | MonthlyCadence
  targetCount: number
  estimateMinutes: number
  firstAction?: string
  carryForward: boolean
  active: boolean
}

interface RecurringTaskInstance {
  id: string
  templateId: string
  periodKey: string
  scheduledDay: string
  status: 'open' | 'completed' | 'missed' | 'canceled'
  completedAt?: string
}

interface PersonaMastery {
  personaId: string
  completions: number
  stage: number
  weeklyCompleted: number
  monthlyConsistencyDays: number
}

interface QuestCandidate {
  id: string
  source: 'kakaotalk' | 'kakaowork' | 'google_calendar'
  sourceRef: string
  title: string
  personaIds: string[]
  category: string
  dueAt?: string
  estimateMinutes: number
  firstAction?: string
  status: 'pending_review' | 'accepted' | 'dismissed'
}
```

Existing tasks gain `personaIds`, optional `recurringInstanceId`, and source metadata through a backward-compatible database migration.

## 14. Failure and Recovery Behavior

- If recurring generation fails, Today shows the last known checklist and a retry status.
- If classification fails, the original text remains editable and can be saved manually.
- If a connector is unavailable, other input paths continue to work.
- If task completion succeeds but reward settlement fails, completion remains persisted and the reward outbox retries later.
- If monthly aggregation fails, daily operation remains available and the dashboard labels metrics as temporarily unavailable.

## 15. Accessibility and Responsive Behavior

- Every primary control is at least 48px high.
- Persona selection is a labeled tab/list control with visible keyboard focus.
- Color is never the only persona or status indicator.
- Coaching updates use polite live-region announcements without repeated notification spam.
- The 3D character is described semantically but its decorative details remain hidden from assistive technology.
- At narrow widths the main quest metadata stacks above a full-width action.
- Reduced motion preserves state changes and rewards without animation.

## 16. Verification

The implementation must verify:

- persona creation, editing, ordering, archive, and restoration
- multi-persona tasks granting one overall reward and multiple mastery credits
- deterministic daily, weekly-count, and monthly instance generation
- no duplicate recurring instances after reload or timezone change
- missed daily instances resetting without progress loss
- adaptive coaching escalation, quiet hours, completion reset, and action choices
- candidate import, duplicate suppression, review, acceptance, and manual fallback
- daily filtering and monthly aggregation by persona
- counseling, teacher-meeting, marketing, curriculum, reading, and exercise metrics
- existing pet reward idempotency and recovery
- keyboard, touch target, contrast, reduced motion, narrow mobile, and desktop layouts
- offline operation for local tasks, personas, recurrence, coaching, and mastery

## 17. Delivery Sequence

1. Mature B-type visual tokens and dashboard shell
2. Persona domain, direct selector, and custom-persona management
3. Recurring templates, daily generation, and academy-director defaults
4. Multi-persona task classification and direct input
5. Adaptive coaching tied to persona and recurring work
6. Persona mastery and overall reward integration
7. Monthly calendar and operating metrics
8. KakaoTalk/KakaoWork candidate ingestion and Google Calendar projection
9. Accessibility, responsive, offline, migration, and release verification

This sequence keeps direct input and local recurring work useful before any external connector is required.
