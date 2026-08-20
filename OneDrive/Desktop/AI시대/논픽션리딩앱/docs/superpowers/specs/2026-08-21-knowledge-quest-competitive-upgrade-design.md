# Knowledge Quest Competitive Upgrade Design

**Date:** 2026-08-21  
**Status:** Approved  
**Product:** Nonfiction Lab

## 1. Objective

Upgrade the existing nonfiction reading app to a level that can credibly compete with polished consumer learning apps while preserving all existing content, review data, learner progress, and studio workflows.

The product promise is:

> Build English reading skill and real-world knowledge in one focused three-minute quest each day.

The visual and interaction direction combines the immediate clarity and habit support of a game-based learning app with the calm, editorial quality of a premium reading app. The target balance is 30 percent game feedback and 70 percent meaningful learning.

This milestone is a competitive-quality product build, not a Google Play submission. Account systems, subscriptions, Play Billing, and Android packaging remain outside this implementation cycle.

## 2. Competitive Position

The product will not compete by copying a mascot, virtual currency, leagues, or reward chests.

- Duolingo demonstrates the value of short lessons, streaks, challenges, and visible progress.
- ReadTheory demonstrates the value of an adaptive starting assessment, continuous reading-level adjustment, and learner-owned growth reporting.
- Newsela demonstrates the value of knowledge-rich nonfiction, differentiated reading levels, and text-dependent literacy activities.

Nonfiction Lab differentiates through the combination of:

1. Accelerator Reader level matching.
2. Knowledge-rich nonfiction across science, history, arts, philosophy, self-development, and world culture.
3. A three-minute reading loop with contextual vocabulary, key-word and key-sentence selection, and evidence-based questions.
4. A visual knowledge map that makes acquired knowledge more prominent than abstract points.
5. Real, attributed photography that creates curiosity without generative-image cost.

## 3. Product Navigation

The learner application has four primary destinations.

### Today

The Today screen presents one clear recommended Knowledge Quest, the learner's current AR level, streak, XP, and knowledge-map completion. The primary action is always to begin or resume the daily discovery. Secondary recommendations remain visually subordinate.

### Knowledge Map

The Knowledge Map visualizes completed, recommended, and locked quests across the existing content domains. Completing a quest opens a node and reveals a meaningful next connection. The map must explain what the learner now knows rather than merely display a larger score.

### Explore

Explore provides photography-led discovery across all existing content. It supports domain, AR level, reading time, collection, and readiness filters. Existing articles remain searchable and are not removed when the new experience launches.

### Me

The profile shows weekly reading days, minutes, quiz accuracy, key-finder accuracy, AR-level movement, domain coverage, collected knowledge cards, and streak history. It avoids public ranking and social pressure.

## 4. Core Learning Loop

Every Knowledge Quest follows the same five-stage structure.

1. **Curiosity:** a real photograph, a Korean curiosity question, and a short topic preview.
2. **Read:** three to four focused pages designed for approximately three minutes.
3. **Support:** contextual vocabulary and optional audio without blocking silent reading.
4. **Find:** selection of core words and the key sentence from the text.
5. **Challenge:** two comprehension questions, one inference question, and one vocabulary question, followed by a concise completion response.

The experience restores the current page and activity state after an interruption. Audio, image, or network failure must not block reading or assessment.

## 5. Growth and Reward System

The reward loop has three layers and avoids a chain of post-lesson screens.

### Immediate completion

Within one screen, the learner sees:

- the knowledge takeaway;
- earned XP;
- updated streak;
- quiz accuracy; and
- the newly collected knowledge card.

The primary follow-up action opens the updated Knowledge Map. Returning home remains available as a quiet secondary action.

### Knowledge-map growth

The completed node receives a brief motion treatment and reveals the next connected quest. Motion respects `prefers-reduced-motion` and never gates interaction.

### Weekly growth report

The report explains reading consistency, time, accuracy, key-finder improvement, AR-level movement, and domain coverage. It offers one specific next-week recommendation. It does not use leagues or public comparison.

## 6. Existing Content Preservation and Upgrade

The repository contains 100 AR 1 library seeds with existing passages, vocabulary, four-question assessment structure, sources, age review, and studio workflow data. All 100 remain part of the product.

Each seed is progressively upgraded to a Knowledge Quest contract containing:

- a Korean curiosity question;
- a concise Korean knowledge takeaway;
- a locally stored, freely licensed hero photograph;
- complete creator, source-page, and license attribution;
- a map domain, collection, and position;
- prerequisite and next-quest relationships where applicable; and
- an explicit content-readiness result.

Existing passages, vocabulary, quiz questions, sources, and review records remain authoritative. The upgrade adds presentation and relationship metadata rather than rewriting approved content without review.

### Release waves

1. **Representative collection — 15 quests:** use the completed batch-07 photography set to validate the redesigned experience.
2. **Core paths — 35 quests:** form coherent paths across all existing domains and fill missing photography and relationship metadata.
3. **Full library — 100 quests:** release remaining quests as they pass the same readiness checks.

All 100 remain visible to editors in Studio. Learner-facing release follows review status and readiness rather than the existence of a seed alone.

## 7. Content Readiness

Studio calculates and displays the following independent readiness checks:

1. Curiosity question present.
2. Knowledge takeaway present.
3. Photograph and Korean alternative text present.
4. Creator, source page, license name, and license URL valid.
5. Knowledge-map placement present.
6. Passage, vocabulary, and four-question assessment complete.
7. At least two supporting sources present.
8. Age suitability reviewed.
9. Mobile preview acknowledged.

The result is explanatory, not a single opaque percentage. A failed check links the editor to the relevant field. Existing editorial approval and publication rules remain in force; readiness supplements rather than bypasses them.

## 8. Photography Standard

Photography uses local files obtained from sources that permit reuse, initially Wikimedia Commons. AI image generation is not required.

Each photograph must have:

- a unique subject that directly supports the quest;
- a useful mobile crop without embedded watermarks;
- Korean alternative text describing the visible subject;
- original file or source page;
- creator name;
- exact license name and license URL; and
- an unmodified/modified declaration.

Home and Explore show the image without visual attribution clutter. Reader displays compact, complete attribution below the photograph. A loading failure falls back to the existing visual theme and hides unusable attribution.

## 9. Technical Architecture

The existing Next.js application, local learner store, content Studio, and publication flow remain the foundation. The learner UI is reorganized into focused modules:

- `TodayScreen`
- `QuestReader`
- `KeyFinder`
- `QuestResult`
- `KnowledgeMap`
- `GrowthReport`
- `ExploreLibrary`
- `ContentReadiness`

Shared domain logic owns recommendation, quest progress, map relationships, reward calculation, weekly aggregation, and readiness evaluation. Presentation components consume those results and do not duplicate the rules.

The content type gains optional quest metadata so existing published articles remain valid during migration. Once a quest is marked ready, all required fields become enforced by the readiness evaluator and Studio validation.

The learner-store schema is versioned. Migration preserves name, interests, entered and estimated AR level, XP, streak, completed article IDs, quiz history, and reading events. New progress fields default safely when opening older data.

## 10. Interaction and Visual System

The approved design direction uses:

- deep forest green for structure and trust;
- lime for a single primary action or newly opened knowledge;
- warm paper backgrounds for reading comfort;
- editorial serif typography for article titles and reading copy;
- clean sans-serif typography for controls and metrics;
- real photography as the dominant visual asset; and
- rounded, tactile controls with a minimum 44-pixel target.

Animation is limited to navigation transitions, progress fill, completion emphasis, and a newly opened map node. The product must remain fully understandable with all animation disabled.

## 11. Resilience, Accessibility, and Offline Behavior

- Resume an interrupted quest at its last saved page and phase.
- Allow reading and quizzes when audio is unavailable.
- Fall back to theme artwork when a photo fails.
- Recover malformed local data into a safe default while preserving any independently valid fields.
- Cache the application shell, published quest data, and local photographs required by the available library.
- Provide meaningful focus order, visible focus states, semantic headings, image alternatives, control labels, and status announcements.
- Maintain legibility at 320 CSS pixels and support phone, foldable, and tablet widths.
- Avoid color-only status communication.

## 12. Verification

### Data

- All 100 AR 1 seeds retain unique IDs and valid band membership.
- Existing passages, vocabulary, quizzes, and sources survive migration unchanged unless an editor explicitly revises them.
- Readiness reports every missing requirement with an actionable location.
- Map relationships reference existing quests and contain no accidental cycles in linear collections.

### Unit and component behavior

- Recommendation, resume, reward, weekly aggregation, and map-unlock rules have deterministic tests.
- Photography, fallback, attribution, reduced motion, and empty states have component tests.
- Learner-store migrations cover older, partial, and malformed states.

### End-to-end behavior

- Today to Read to Find to Quiz to Result to Knowledge Map.
- Interruption and reload resume.
- Existing Explore search and Studio publishing remain functional.
- Image failure and audio failure do not block completion.
- Offline reload works for already available quests.

### Release checks

- Full unit suite, type checking, production build, and Playwright suite pass.
- Mobile Android-sized and tablet visual checks cover the four navigation destinations and full quest loop.
- Performance checks confirm that local photography does not cause avoidable layout shift or unbounded initial downloads.

## 13. Delivery Boundaries

This design is delivered in implementation checkpoints that are independently testable and reversible:

1. Quest metadata, progress, readiness, and migration domain model.
2. Shared visual system and four-destination learner shell.
3. Today and Explore redesign using existing content.
4. Quest Reader, Key Finder integration, and resume behavior.
5. Quest Result and restrained reward calculation.
6. Knowledge Map relationships and unlock feedback.
7. Growth Report and weekly aggregation.
8. Studio readiness presentation.
9. Representative 15-quest verification and regression coverage.
10. Core-path and full-library content upgrades as separate content checkpoints.

Every checkpoint is committed only after its focused tests pass. Existing unrelated files and user changes are preserved.

## 14. Success Criteria

The competitive-quality build succeeds when:

- a first-time user understands the daily action without instruction;
- a learner can complete a quest in approximately three minutes without a dead end;
- completion communicates a fact learned, not only points earned;
- existing content is preserved and visible through the new navigation;
- the learner can see growth across time and knowledge domains;
- the representative 15 quests meet the full readiness standard;
- the remaining library has explicit, actionable readiness status; and
- automated and visual verification pass on the integrated build.

