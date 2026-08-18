# Student Learning Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a student-first dashboard that shows progress, review priority, and a clear daily learning routine.

**Architecture:** Keep the existing single-page app structure. Add one small pure model module for dashboard calculations, then render the dashboard from `app.js` using existing state and mode navigation.

**Tech Stack:** Plain HTML, CSS, browser JavaScript, Node built-in assertions for the pure model test.

---

### Task 1: Dashboard Model

**Files:**
- Create: `learning-dashboard-model.js`
- Test: `tests/learning-dashboard-model.test.js`

- [x] **Step 1: Write the failing test**

Run: `node tests/learning-dashboard-model.test.js`
Expected: FAIL with missing `learning-dashboard-model.js`.

- [x] **Step 2: Implement the model**

Add `calculateLearningSnapshot()` and `getRoutineSteps()` as a UMD-style module so Node tests and the browser can share it.

- [x] **Step 3: Run test to verify it passes**

Run: `node tests/learning-dashboard-model.test.js`
Expected: PASS with `learning-dashboard-model tests passed`.

### Task 2: Dashboard UI

**Files:**
- Modify: `index.html`
- Modify: `app.js`
- Modify: `styles.css`

- [ ] **Step 1: Add dashboard markup**

Insert a `studentDashboard` section below the topbar with progress, focus, routine, and learning map regions.

- [ ] **Step 2: Wire rendering**

Add dashboard element references, render snapshot values from existing app state, and connect routine buttons to `setMode()`.

- [ ] **Step 3: Style responsive layout**

Add dashboard CSS that works on desktop and mobile without overlapping or oversized hero styling.

- [ ] **Step 4: Verify in browser**

Use the existing server at `http://localhost:4174`, log in with `test01 / 1234`, and capture/inspect the student screen.
