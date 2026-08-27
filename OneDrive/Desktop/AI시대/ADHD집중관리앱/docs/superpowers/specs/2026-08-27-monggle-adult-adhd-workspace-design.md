# Monggle Adult ADHD Work Workspace Design

## 1. Goal

Monggle becomes an execution-first work system for adults with ADHD who manage several professional roles, especially solo business owners and freelancers. The redesign helps users capture work, remember non-negotiable commitments, choose one next action, see time, and recover from overload without shame or reward loss.

The product remains a productivity aid. It does not diagnose ADHD, assess symptoms, recommend treatment, or replace professional care.

## 2. Primary User

The primary user is a solo operator who switches among several roles during the day. An academy director remains the default template, while freelancers and other solo professionals can create or rename role personas.

The first release focuses on work execution. Sleep, meals, exercise, medication tracking, personal finance, CRM, and revenue analytics are outside this redesign.

## 3. Experience Principles

1. One next action dominates the screen.
2. Capture requires only a title; organization can happen later.
3. Time is shown spatially through blocks, gaps, and transitions.
4. Commitments are intentionally limited instead of becoming another long list.
5. Waiting on other people remains visible without consuming working memory.
6. Overload produces a recovery choice, never a penalty.
7. Monggle suggests and reacts but does not make irreversible decisions.
8. The interface feels adult, tactile, and distinctive rather than generically AI-styled.

## 4. Visual Direction

### 4.1 Warm Clay and Editorial

The interface combines a restrained editorial productivity layout with selected 3D clay elements. Monggle and essential status objects use dimensional lighting and tactile materials. Task lists, navigation, forms, and metrics remain clean and mostly flat.

The palette uses warm cream, charcoal, muted sage, clay orange, and restrained neutral surfaces. Purple glow, dark glass panels, excessive gradients, and repeated floating cards are avoided.

Typography is mature and compact, with clear Korean hierarchy and tabular numerals for time and counts. Shadows communicate physical layers instead of decorating every component.

### 4.2 3D Boundaries

- The 3D Monggle coach appears in the primary `Now` card and completion feedback.
- Status objects may use small clay tokens or recessed progress indicators.
- Navigation, dense lists, and text controls do not use 3D effects.
- Motion uses slow, purposeful reactions and respects reduced-motion settings.
- Monggle does not wander over controls or obscure content.

## 5. Navigation and Home Hierarchy

Primary navigation contains:

1. `지금`: one next action, commitments, and today's flow
2. `계획`: calendar, weekly planning, waiting work, and Rescue
3. `인박스`: frictionless capture and later organization
4. `집중`: one-task timer and completion
5. `나`: personas, preferences, integrations, appearance, and data controls

The `지금` screen renders in this order:

1. date and short greeting
2. primary Now card with Monggle, one task, one first action, and a three-minute start
3. `오늘 약속`
4. `이번 주 약속`
5. today timeline with calendar blocks, focus blocks, transition buffers, and free time
6. compact access to planning and overload recovery

## 6. Commitment Naming and Rules

### 6.1 Today Commitments

`오늘 약속` contains work the user intends to finish today and must not forget. It has a default maximum of three active items. Adding a fourth requires moving, replacing, or canceling an existing commitment.

Each item may contain:

- linked task
- optional due time
- estimate
- concrete first action
- linked personas
- completion state

### 6.2 Week Commitments

`이번 주 약속` contains work the user intends to finish by the end of the current week. It has a default maximum of five active items.

When a weekly commitment becomes due today, the same item appears in the Today section. The app does not duplicate its task, reward, or completion event.

### 6.3 Incomplete Commitments

Incomplete work is not automatically labeled failure. At the boundary of a day or week, the user chooses one of:

- move to today
- place later in the current week
- schedule for a specific date
- return to inbox
- cancel

No choice removes XP, affinity, streaks, items, or other earned progress.

## 7. ADHD-Oriented Work Support

The redesign supports common work difficulties involving organization, time management, task completion, memory load, and stress through the following product areas:

- one visible next action
- a three-minute start option
- small, editable first steps
- visual time blocks and transition buffers
- a single capture inbox
- visible waiting and follow-up work
- limited daily and weekly commitments
- overload recovery with explicit user confirmation

These features are productivity supports, not clinical interventions.

## 8. Inbox and Waiting Work

### 8.1 Inbox

Quick capture requires only a title. Optional details can be added immediately, but the app never blocks capture for missing date, estimate, persona, category, or first action.

An inbox item can later become:

- a Today commitment
- a Week commitment
- a dated task
- a Waiting item
- a canceled item

### 8.2 Waiting

`대기 중` stores work the user cannot currently complete because another person, approval, or resource is required. It records:

- linked task
- person or organization
- optional expected response date
- next review date
- note

On the review date, the existing item reappears for review. The app does not create a duplicate task. The user may follow up, choose a new review date, return it to active work, or close it.

## 9. Rescue Flow

`구조대` is available when the user feels overloaded or the system detects a crowded day from remaining time and active commitments.

The flow is:

1. User selects remaining available time and current work energy.
2. The app proposes a plan that preserves, reduces, or reschedules commitments.
3. The proposal shows every affected item and destination.
4. Nothing changes until the user confirms.
5. After confirmation, the proposal is applied atomically where possible.

The Rescue flow does not assess mental health, infer medication state, or remove rewards. It always offers manual editing and cancelation.

## 10. Monggle Coach Behavior

Monggle occupies the primary Now card and responds to work events. It can:

- suggest a concrete first action
- offer a three-minute start
- acknowledge a commitment choice
- celebrate completion
- offer Rescue when the day is crowded

Monggle cannot silently move, cancel, or reprioritize work. Coaching language remains concise, adult, direct, and non-punitive.

## 11. Domain Model

```ts
interface Commitment {
  id: string
  taskId: string
  period: 'today' | 'week'
  periodKey: string
  position: number
  firstAction?: string
  estimateMinutes?: number
  dueAt?: string
  status: 'active' | 'completed' | 'canceled'
  createdAt: string
  updatedAt: string
}

interface InboxItem {
  id: string
  title: string
  note?: string
  status: 'unprocessed' | 'organized' | 'canceled'
  createdAt: string
  organizedAt?: string
}

interface WaitingItem {
  id: string
  taskId: string
  waitingOn?: string
  expectedAt?: string
  reviewAt: string
  note?: string
  status: 'waiting' | 'ready' | 'closed'
  updatedAt: string
}

interface RescuePlan {
  id: string
  availableMinutes: number
  energy: 'low' | 'medium' | 'high'
  changes: RescueChange[]
  status: 'proposed' | 'applied' | 'discarded'
  createdAt: string
}

interface WorkloadSignal {
  availableMinutes: number
  committedMinutes: number
  activeCommitmentCount: number
  level: 'comfortable' | 'tight' | 'overloaded'
}
```

Commitments link to existing tasks rather than replacing them. Existing personas, recurring instances, rewards, pet growth, calendar projection, and completion settlement remain authoritative.

## 12. Data Flow

The primary flow is:

`quick capture -> inbox -> commitment / schedule / waiting -> one next action -> focus -> completion`

Completion persists the existing task first, then settles rewards through the existing outbox behavior. Completing one task completes all views of the linked commitment without duplicate rewards.

The Now recommendation considers active Today commitments first, then due Week commitments, calendar conflicts, estimate, energy, and persona context. The recommendation remains explainable and editable.

## 13. Storage and Migration

New IndexedDB repositories store commitments, inbox items, waiting items, and Rescue plans. Existing task records remain compatible.

Migration does not automatically promote legacy tasks into commitments. Existing due-today tasks remain visible during transition and can be promoted explicitly. Stable IDs combine the source task and period where deterministic uniqueness is required.

## 14. Failure and Recovery

- Quick capture saves locally before secondary organization.
- Failed organization leaves the inbox item intact.
- A failed Rescue application leaves the original schedule unchanged and keeps the proposal available for retry.
- Reopening the app or crossing a Seoul day boundary does not duplicate commitments.
- A due weekly commitment shown in Today remains one entity.
- If reward settlement fails after completion, completion remains persisted and the existing reward outbox retries.
- Calendar or connector failure does not block commitments, inbox, waiting work, or focus.

## 15. Accessibility and Responsive Behavior

- Primary controls are at least 48 pixels high.
- Commitment period and status are conveyed with text, not color alone.
- Keyboard focus is visible on every action.
- Reduced motion removes bobbing, scale reactions, and celebratory particles.
- At narrow widths, the Now card, commitments, and timeline form one column.
- At wide widths, the Now card remains dominant while commitments and timeline may use an adjacent column.
- Screen-reader announcements are reserved for saved changes, timer state, and completion, not decorative mascot movement.

## 16. Verification

Automated verification covers:

- capture with title only
- inbox organization without data loss
- Today maximum of three and Week maximum of five
- replacement flow when a commitment limit is reached
- weekly commitment projection into Today without duplication
- day and Seoul timezone transitions
- waiting review reappearance without duplicate tasks
- Rescue proposal causing no mutation before confirmation
- atomic or recoverable Rescue application
- linked completion producing one completion and one overall reward
- existing persona, recurring, calendar, focus, and reward compatibility
- keyboard, touch-target, reduced-motion, mobile, and desktop behavior

Browser verification covers the complete flow from capture through commitment, focus, completion, and reward feedback.

## 17. Delivery Boundary

This redesign includes the work-focused navigation, visual system, commitments, inbox, waiting work, Rescue, timeline presentation, and Monggle integration.

It excludes medical advice, symptom scoring, medication reminders, lifestyle tracking, team collaboration, CRM, billing, and financial dashboards.
