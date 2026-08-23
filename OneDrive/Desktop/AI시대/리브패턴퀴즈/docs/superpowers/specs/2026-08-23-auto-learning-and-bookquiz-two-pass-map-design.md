# Automatic Learning Flow and Bookquiz Two-Pass Map Design

Date: 2026-08-23

## Goal

Make card-based learning continue without redundant controls and turn Bookquiz into a clearly ordered two-pass learning map. Pattern English must move automatically from cards to quiz to interpretation. Bookquiz must move automatically through core-word cards, core-word quiz, question-pattern cards, and question-pattern quiz, then repeat that route once for a second and final pass.

## Scope

### Included

- Remove pronunciation-listening buttons from Pattern English and Bookquiz card-learning surfaces.
- Play the current card pronunciation automatically once when a new card appears.
- Move Pattern English automatically through `card study → quiz → interpretation`.
- Add a Bookquiz learning map with four ordered nodes.
- Lock future Bookquiz nodes until the preceding node is complete.
- Run the Bookquiz map exactly twice.
- Preserve the current pass, stage, item, completion state, mistakes, points, and rewards through reload.
- Allow free review of completed Bookquiz nodes after pass two without creating a third pass.
- Maintain offline-safe behavior: automatic audio is skipped when offline and learning continues.

### Excluded

- A third or unlimited Bookquiz pass.
- Automatic pronunciation in quiz and interpretation screens unless those screens already play audio as part of their existing behavior.
- Curriculum changes or new Bookquiz content.
- Replacing the existing Pattern English map.
- Uploading or persisting audio.

## Shared Automatic Pronunciation

Card learning uses one shared pronunciation controller. It receives a stable token containing section, content type, item ID, and pass where applicable. It plays only when the token differs from the last successfully scheduled token.

Examples:

- `pattern:study:17`
- `bookquiz:word-study:8003:round-1`
- `bookquiz:pattern-study:9007:round-2`

The controller must:

- Play once when a new card becomes visible.
- Play again when the student deliberately returns to a different card and later revisits it.
- Cancel or ignore stale playback when the view, stage, or card changes quickly.
- Skip playback without showing a blocking dialog when `navigator.onLine === false`.
- Continue to use the existing online speech and audio source selection.
- Never advance course state, award points, or mark a card complete merely because audio ended or failed.

Pronunciation buttons are removed only from card-learning surfaces. Accessibility text must state that pronunciation plays automatically. Existing quiz or interpretation audio controls remain unchanged unless they duplicate a removed card control.

## Pattern English Flow

### Stages

The primary Pattern English route is:

1. Card study
2. Pattern quiz
3. Interpretation test
4. Existing review and reward stages when the active daily course requires them

The separate listen and speaking-practice stages are not inserted between cards and quiz for this streamlined route. Existing recording practice remains available from its dedicated entry point and is not deleted.

### Transitions

- Showing a study card triggers one automatic pronunciation.
- Completing the last required study card advances to the Pattern quiz once.
- Completing the configured quiz target advances to the interpretation test once.
- Correct and incorrect feedback remains visible for the existing feedback delay before the transition.
- The shared single-advance guard prevents double clicks, timer overlap, or repeated renders from scheduling two transitions.
- Reload restores the exact card, quiz count, or interpretation item without replaying a completed transition.

## Bookquiz Map

### Map Nodes

The Bookquiz map has four ordered nodes:

1. `word-study` — 핵심단어 카드학습
2. `word-quiz` — 핵심단어 퀴즈
3. `pattern-study` — 질문패턴 카드학습
4. `pattern-quiz` — 질문패턴 퀴즈

The map displays:

- Current pass: `1회독` or `2회독`.
- A completed check for finished nodes.
- A strong current-node treatment.
- A lock and disabled state for future nodes.
- A review treatment for nodes that are complete and may be reopened.
- A compact progress summary such as `2 / 4 단계 완료`.

The layout follows the existing mobile-first map language: vertically connected nodes on narrow screens and a centered path on tablet and desktop. Every active or reviewable node has a minimum 48px target and keyboard focus treatment.

### Pass State

Extend Bookquiz course state with:

```js
{
  round: 1,
  maxRounds: 2,
  completedStageIds: [],
  roundCompleted: false,
  allRoundsCompleted: false
}
```

Rules:

- `round` is clamped to `1` or `2`.
- `maxRounds` is always `2` for this feature.
- `completedStageIds` contains only valid node IDs and has no duplicates.
- Completing `pattern-quiz` during round one sets `roundCompleted: true` and shows the first-pass completion screen.
- Selecting `2회독 시작` resets the current node to `word-study`, clears per-round node completion and per-round item position, sets `round: 2`, and retains cumulative points, stars, badges, mastery, and review history.
- Round two reshuffles card order and quiz choices. It must still use only existing Bookquiz content IDs.
- Completing `pattern-quiz` during round two sets `allRoundsCompleted: true` and applies the final reward exactly once.
- No state transition may set `round` above `2`.

### Node Transitions

- The last core-word card opens the core-word quiz.
- Completing the core-word quiz opens question-pattern cards.
- The last question-pattern card opens the question-pattern quiz.
- Completing the question-pattern quiz ends the current pass.
- Each transition is persisted before the new view renders.
- A transition token includes round, stage, item, and count so the single-advance guard can reject duplicates.

### Review After Pass Two

After the second pass:

- All four nodes remain visibly complete.
- The student may open any node for free review.
- Free review does not alter `round`, clear final completion, or award the final reward again.
- The map provides no `3회독`, `다음 회독`, or reset action.
- Starting a completely new two-pass course requires the existing explicit new-course action rather than an accidental map click.

## Persistence and Recovery

The existing `rb-learning-profile-v1` record remains the source of truth. Bookquiz round fields live inside `activeCourse` while a course is active and inside the saved Bookquiz completion summary after final completion.

Recovery must validate:

- Course version and section.
- Round in the allowed range.
- Stage ID and stage index agreement.
- Content IDs against the current Bookquiz catalog.
- Item index clamped to the surviving content list.
- Completed nodes limited to valid nodes.
- Final reward marker retained after completion.

If saved state is damaged, recovery falls back to the latest valid node in the same round. If no valid Bookquiz content remains, the course is discarded safely and the map returns to the first node without changing cumulative rewards.

## Data Flow

### Card Render

1. Resolve current course and card.
2. Render text, image, progress, map state, and accessibility description.
3. Build the stable pronunciation token.
4. Ask the shared pronunciation controller to play once.
5. Ignore audio failure without changing learning state.

### Answer Completion

1. Disable answer controls.
2. Grade the answer.
3. Update score, streak, and review state.
4. Persist the accepted answer and active course.
5. Show feedback.
6. Schedule exactly one next-item or next-stage transition.
7. Persist the transition before rendering the destination.

### First-Pass Completion

1. Mark `pattern-quiz` complete.
2. Set `roundCompleted: true`.
3. Persist state.
4. Render the completed round-one map and `2회독 시작` action.
5. Do not grant the final two-pass reward.

### Second-Pass Completion

1. Mark all four round-two nodes complete.
2. Set `allRoundsCompleted: true`.
3. Apply the final reward once.
4. Persist completion and cumulative results.
5. Render the fully completed map with review access only.

## Error Handling

- Offline audio is skipped and must not delay card navigation.
- Audio rejection or missing media uses the existing non-blocking feedback path.
- A missing card ID is filtered during recovery; the item index is clamped.
- An empty stage advances only when the course model explicitly validates the next stage.
- Duplicate transition tokens are ignored.
- A malformed round value becomes round one unless valid round-two completion evidence exists.
- A repeated final-completion call returns the existing reward result without adding points or stars.

## Accessibility

- The map uses an ordered list with a descriptive label.
- Current node uses `aria-current="step"`.
- Locked nodes are disabled and explain that the previous step must be completed.
- Completed nodes expose their completed state in text, not color alone.
- Pass-completion and automatic stage transitions announce through a polite live region.
- Removing audio buttons must not remove the only visible card action; card navigation remains keyboard operable.
- Reduced-motion mode removes node celebration movement but preserves status changes.

## Responsive Design

- At 480px and below, Bookquiz nodes form one vertical connected path.
- Map labels wrap without horizontal overflow.
- At tablet widths, the path remains centered and uses at most two columns only if reading order stays unambiguous.
- Completion actions stay within thumb reach and use a 48px minimum height.
- Existing 360×800, 412×915, and 768×1024 release sizes remain mandatory.

## Testing

### Model Tests

- Create a round-one Bookquiz map state.
- Reject round three during creation and recovery.
- Complete each node in order.
- Prevent opening a locked future node.
- Complete round one without applying the final reward.
- Start round two with cleared per-round nodes and retained cumulative state.
- Complete round two and apply the final reward once.
- Reopen completed nodes for review without changing final state.
- Recover malformed round, node, item, and content IDs safely.

### Automatic Pronunciation Tests

- A new Pattern card schedules one pronunciation.
- Re-rendering the same card does not duplicate playback.
- Moving to another card schedules that card once.
- Bookquiz tokens include content type and round.
- Offline state schedules no playback.
- Audio completion and failure do not change course state.
- Card-learning pronunciation buttons are absent while quiz and interpretation controls remain intact.

### Flow Tests

- Pattern last card moves to quiz once.
- Pattern quiz target moves to interpretation once.
- Bookquiz last word card moves to word quiz.
- Word quiz completion moves to pattern cards.
- Last pattern card moves to pattern quiz.
- First pattern-quiz completion opens the second-pass action.
- Second pattern-quiz completion opens final completion and reward.
- Reload restores exact round, node, and item.

### Browser Verification

At 360×800, 412×915, and 768×1024:

- Observe automatic audio on new card display.
- Confirm there is no card pronunciation button.
- Complete the Pattern card → quiz → interpretation route.
- Complete all four Bookquiz nodes for round one.
- Start round two and confirm reshuffled content order or options.
- Complete round two and confirm review-only map access.
- Reload in the middle of each pass and confirm exact restoration.
- Confirm no horizontal overflow or inaccessible locked controls.

## Success Criteria

- Pattern English continues automatically from cards to quiz to interpretation exactly once per boundary.
- Bookquiz presents one ordered four-node map and completes exactly two passes.
- The second pass starts only through the explicit `2회독 시작` action.
- No third-pass action or state exists.
- New study cards play pronunciation automatically once without a card-level pronunciation button.
- Offline audio never blocks or advances learning.
- Reload restores exact progress in either pass.
- Final rewards are idempotent.
- Existing PWA, offline synchronization, mobile, and learning tests remain green.
