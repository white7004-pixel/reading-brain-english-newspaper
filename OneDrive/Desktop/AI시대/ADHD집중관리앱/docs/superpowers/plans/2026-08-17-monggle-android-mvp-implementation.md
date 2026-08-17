# Monggle Android MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 성인 ADHD 사용자가 공유 메시지와 Google Calendar 일정을 투두로 만들고, 몽글이의 상기와 게임 보상을 받으며 홈·잠금 화면에서 즉시 집중 타이머를 실행하는 Android 앱을 만든다.

**Architecture:** 단일 Android 앱을 기능별 패키지로 분리하고 Room을 로컬 단일 진실 공급원으로 사용한다. Calendar Provider, 공유 인텐트, 알람, 위젯 같은 Android 경계는 인터페이스 뒤에 두며 Compose UI는 ViewModel의 불변 상태만 구독한다.

**Tech Stack:** Kotlin, Jetpack Compose, Material 3, Room, DataStore, Hilt, Coroutines/Flow, WorkManager, Glance App Widget, Android Calendar Provider, JUnit, Turbine, Robolectric, Compose UI Test

## Global Constraints

- Android 네이티브 앱이며 카카오톡·카카오워크 계정이나 채팅 읽기 권한을 요구하지 않는다.
- 공유 원문, 투두, 일정, 집중 기록은 기기에만 저장한다.
- `#할일` 캘린더 이벤트는 투두로 단방향 동기화한다.
- Monggle에서 만든 일반 일정만 Google Calendar에 생성·수정·삭제한다.
- 정기 상기는 기본 2시간 간격이며 방해 금지 시간은 23:00~07:00이다.
- 타이머 종료 즉시 한 번, 미응답이면 5분 뒤 한 번만 다시 알린다.
- 강한 게임형 UI를 사용하되 집중 화면에서는 움직임과 장식을 줄인다.
- 캐릭터와 배경은 각 7종이며 처음에는 각 2종만 열린다.
- 미완료를 이유로 경험치나 이미 획득한 보상을 차감하지 않는다.
- 모든 기능은 캘린더 권한 없이도 로컬 모드로 실행 가능해야 한다.

---

## File Map

- `app/src/main/java/com/monggle/app/MonggleApp.kt`: Hilt 애플리케이션 진입점
- `app/src/main/java/com/monggle/app/MainActivity.kt`: Compose 호스트와 공유 인텐트 진입점
- `app/src/main/java/com/monggle/app/navigation/MonggleNavHost.kt`: 화면 경로
- `app/src/main/java/com/monggle/app/core/model/`: 공용 도메인 모델과 값 타입
- `app/src/main/java/com/monggle/app/core/database/`: Room DB, DAO, 엔티티, 변환기
- `app/src/main/java/com/monggle/app/core/preferences/`: 알림·외형 설정
- `app/src/main/java/com/monggle/app/feature/tasks/`: 투두 목록·상세·편집
- `app/src/main/java/com/monggle/app/feature/sharing/`: 공유 수신과 투두 확인
- `app/src/main/java/com/monggle/app/feature/calendar/`: Calendar Provider 동기화와 일정 UI
- `app/src/main/java/com/monggle/app/feature/focus/`: 타이머 상태 머신과 포그라운드 서비스
- `app/src/main/java/com/monggle/app/feature/reminders/`: 정기 상기와 알람 예약
- `app/src/main/java/com/monggle/app/feature/widget/`: Glance 위젯
- `app/src/main/java/com/monggle/app/feature/gamification/`: 경험치·퀘스트·해금
- `app/src/main/java/com/monggle/app/feature/character/`: 캐릭터 상태·대사·애니메이션
- `app/src/main/java/com/monggle/app/feature/home/`: 게임형 홈 대시보드
- `app/src/test/`: 순수 JVM·Robolectric 테스트
- `app/src/androidTest/`: Room·Compose·실기기 경계 테스트

---

### Task 1: Android 프로젝트 기반과 품질 게이트

**Files:**
- Create: `settings.gradle.kts`
- Create: `build.gradle.kts`
- Create: `gradle/libs.versions.toml`
- Create: `app/build.gradle.kts`
- Create: `app/src/main/AndroidManifest.xml`
- Create: `app/src/main/java/com/monggle/app/MonggleApp.kt`
- Create: `app/src/main/java/com/monggle/app/MainActivity.kt`
- Create: `app/src/test/java/com/monggle/app/SmokeTest.kt`

**Interfaces:**
- Produces: 실행 가능한 `:app`, `MonggleApp`, `MainActivity`, `testDebugUnitTest` 품질 게이트

- [ ] **Step 1: 실패하는 스모크 테스트 작성**

```kotlin
class SmokeTest {
    @Test fun package_name_is_stable() {
        assertEquals("com.monggle.app", BuildConfig.APPLICATION_ID)
    }
}
```

- [ ] **Step 2: 실패 확인**

Run: `./gradlew testDebugUnitTest --tests com.monggle.app.SmokeTest`
Expected: Gradle 프로젝트 또는 `BuildConfig`가 없어 FAIL

- [ ] **Step 3: Compose·Hilt·Room·DataStore·WorkManager·Glance 의존성과 앱 진입점 구성**

`MainActivity`는 `ComponentActivity`를 상속하고 `setContent { MonggleRoot() }`만 호출한다. Manifest에는 `MonggleApp`, 런처 액티비티, Android 13 알림 권한, 캘린더 읽기·쓰기 권한을 선언하되 런타임 요청은 뒤 작업에서 처리한다.

- [ ] **Step 4: 품질 명령 실행**

Run: `./gradlew testDebugUnitTest lintDebug assembleDebug`
Expected: 모든 작업 PASS, `app/build/outputs/apk/debug/app-debug.apk` 생성

- [ ] **Step 5: 커밋**

```bash
git add settings.gradle.kts build.gradle.kts gradle app
git commit -m "build: scaffold Monggle Android app"
```

### Task 2: 도메인 모델과 Room 저장소

**Files:**
- Create: `app/src/main/java/com/monggle/app/core/model/Task.kt`
- Create: `app/src/main/java/com/monggle/app/core/model/Schedule.kt`
- Create: `app/src/main/java/com/monggle/app/core/model/FocusSession.kt`
- Create: `app/src/main/java/com/monggle/app/core/database/MonggleDatabase.kt`
- Create: `app/src/main/java/com/monggle/app/core/database/TaskEntity.kt`
- Create: `app/src/main/java/com/monggle/app/core/database/ScheduleEntity.kt`
- Create: `app/src/main/java/com/monggle/app/core/database/FocusSessionEntity.kt`
- Create: `app/src/main/java/com/monggle/app/core/database/TaskDao.kt`
- Create: `app/src/main/java/com/monggle/app/core/database/TaskRepository.kt`
- Test: `app/src/androidTest/java/com/monggle/app/core/database/TaskRepositoryTest.kt`

**Interfaces:**
- Produces: `TaskRepository.observeToday(now: Instant): Flow<List<Task>>`, `upsert(task: Task)`, `complete(id: UUID, at: Instant)`, `findBySource(sourceKey: String): Task?`

- [ ] **Step 1: 저장·완료·중복 키 테스트 작성**

```kotlin
@Test fun source_key_is_unique_and_completion_is_persisted() = runTest {
    repository.upsert(task(sourceKey = "calendar:cal-1:event-7"))
    repository.upsert(task(sourceKey = "calendar:cal-1:event-7", title = "수정됨"))
    repository.complete(TASK_ID, NOW)
    assertEquals(listOf("수정됨"), dao.getAll().map { it.title })
    assertNotNull(dao.getAll().single().completedAt)
}
```

- [ ] **Step 2: 실패 확인**

Run: `./gradlew connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.monggle.app.core.database.TaskRepositoryTest`
Expected: 모델과 DB가 없어 FAIL

- [ ] **Step 3: 모델·엔티티·DAO·저장소 최소 구현**

`TaskStatus`, `ActivityCategory`, `TaskSource`, `ScheduleOwner`는 enum으로 정의한다. `sourceKey`에는 unique index를 두고 Room transaction 안에서 upsert한다.

- [ ] **Step 4: 테스트 확인**

Run: `./gradlew connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.monggle.app.core.database.TaskRepositoryTest`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add app/src/main/java/com/monggle/app/core app/src/androidTest/java/com/monggle/app/core
git commit -m "feat: add local task and schedule storage"
```

### Task 3: 투두 규칙과 오늘 화면

**Files:**
- Create: `app/src/main/java/com/monggle/app/feature/tasks/TodayTaskSelector.kt`
- Create: `app/src/main/java/com/monggle/app/feature/tasks/TasksViewModel.kt`
- Create: `app/src/main/java/com/monggle/app/feature/tasks/TasksScreen.kt`
- Test: `app/src/test/java/com/monggle/app/feature/tasks/TodayTaskSelectorTest.kt`
- Test: `app/src/androidTest/java/com/monggle/app/feature/tasks/TasksScreenTest.kt`

**Interfaces:**
- Consumes: `TaskRepository.observeToday`
- Produces: `TodayTaskSelector.select(tasks, now): Task?`, `TasksUiState`

- [ ] **Step 1: 다음 행동 선택 테스트 작성**

```kotlin
@Test fun overdue_then_nearest_deadline_then_priority() {
    val selected = selector.select(listOf(lowTomorrow, highToday, overdue), NOW)
    assertEquals(overdue.id, selected?.id)
}
```

- [ ] **Step 2: 실패 확인**

Run: `./gradlew testDebugUnitTest --tests '*TodayTaskSelectorTest'`
Expected: `TodayTaskSelector`가 없어 FAIL

- [ ] **Step 3: 선택 규칙과 Compose 목록 구현**

정렬은 `진행 중 → 기한 초과 → 가까운 마감 → 높은 우선순위 → 짧은 예상시간` 순서다. 화면은 완료·미루기·집중 시작 콜백만 ViewModel에 전달한다.

- [ ] **Step 4: 단위·UI 테스트 실행**

Run: `./gradlew testDebugUnitTest connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.monggle.app.feature.tasks.TasksScreenTest`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add app/src/main/java/com/monggle/app/feature/tasks app/src/test/java/com/monggle/app/feature/tasks app/src/androidTest/java/com/monggle/app/feature/tasks
git commit -m "feat: add task list and next-action selection"
```

### Task 4: 카카오톡·카카오워크 공유 가져오기

**Files:**
- Modify: `app/src/main/AndroidManifest.xml`
- Modify: `app/src/main/java/com/monggle/app/MainActivity.kt`
- Create: `app/src/main/java/com/monggle/app/feature/sharing/SharedTextParser.kt`
- Create: `app/src/main/java/com/monggle/app/feature/sharing/ShareReviewViewModel.kt`
- Create: `app/src/main/java/com/monggle/app/feature/sharing/ShareReviewScreen.kt`
- Test: `app/src/test/java/com/monggle/app/feature/sharing/SharedTextParserTest.kt`
- Test: `app/src/androidTest/java/com/monggle/app/feature/sharing/ShareIntentTest.kt`

**Interfaces:**
- Produces: `SharedTextParser.parse(text: String, receivedAt: Instant): ParsedTaskDraft`, `ShareReviewViewModel.save()`
- Consumes: `TaskRepository.upsert`

- [ ] **Step 1: 한국어 날짜·예상시간 파싱 테스트 작성**

```kotlin
@Test fun parses_deadline_and_duration_without_silent_guess() {
    val result = parser.parse("금요일까지 학부모 상담 자료 정리 30분", MONDAY_10AM)
    assertEquals("학부모 상담 자료 정리", result.title)
    assertEquals(30.minutes, result.estimatedDuration)
    assertEquals(FRIDAY_END, result.deadline)
    assertFalse(result.requiresDateConfirmation)
}
```

- [ ] **Step 2: 실패 확인**

Run: `./gradlew testDebugUnitTest --tests '*SharedTextParserTest'`
Expected: parser가 없어 FAIL

- [ ] **Step 3: `ACTION_SEND text/plain` 필터와 확인 화면 구현**

`Intent.EXTRA_TEXT`가 비거나 10,000자를 넘으면 오류 상태를 보여준다. 상대 날짜는 수신 시각과 `Asia/Seoul`을 기준으로 계산하며 여러 해석이 가능하면 `requiresDateConfirmation=true`로 저장을 막는다. `Intent.EXTRA_REFERRER` 또는 calling package를 사용할 수 있을 때만 출처를 카카오톡·카카오워크로 표시하고 없으면 `공유`로 표시한다.

- [ ] **Step 4: 파서와 인텐트 테스트 실행**

Run: `./gradlew testDebugUnitTest --tests '*SharedTextParserTest' connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.monggle.app.feature.sharing.ShareIntentTest`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add app/src/main/AndroidManifest.xml app/src/main/java/com/monggle/app/MainActivity.kt app/src/main/java/com/monggle/app/feature/sharing app/src/test/java/com/monggle/app/feature/sharing app/src/androidTest/java/com/monggle/app/feature/sharing
git commit -m "feat: import tasks from Android share sheet"
```

### Task 5: Google Calendar 동기화와 일정 충돌

**Files:**
- Create: `app/src/main/java/com/monggle/app/feature/calendar/CalendarGateway.kt`
- Create: `app/src/main/java/com/monggle/app/feature/calendar/AndroidCalendarGateway.kt`
- Create: `app/src/main/java/com/monggle/app/feature/calendar/CalendarTaskMapper.kt`
- Create: `app/src/main/java/com/monggle/app/feature/calendar/CalendarSyncWorker.kt`
- Create: `app/src/main/java/com/monggle/app/feature/calendar/ScheduleConflictDetector.kt`
- Create: `app/src/main/java/com/monggle/app/feature/calendar/ScheduleScreen.kt`
- Test: `app/src/test/java/com/monggle/app/feature/calendar/CalendarTaskMapperTest.kt`
- Test: `app/src/test/java/com/monggle/app/feature/calendar/ScheduleConflictDetectorTest.kt`
- Test: `app/src/test/java/com/monggle/app/feature/calendar/CalendarSyncWorkerTest.kt`

**Interfaces:**
- Produces: `CalendarGateway.read(range): List<CalendarEvent>`, `create(schedule): CalendarRef`, `update(ref, schedule)`, `delete(ref)`, `CalendarTaskMapper.toTask(event): Task?`
- Consumes: `TaskRepository`, `ScheduleRepository`

- [ ] **Step 1: `#할일`과 소유권 경계 테스트 작성**

```kotlin
@Test fun only_tagged_events_become_tasks() {
    assertEquals("보고서 작성", mapper.toTask(event("#할일 보고서 작성"))?.title)
    assertNull(mapper.toTask(event("팀 미팅")))
}

@Test fun external_schedule_is_read_only() {
    assertFailsWith<ReadOnlyScheduleException> { service.update(externalSchedule) }
}
```

- [ ] **Step 2: 실패 확인**

Run: `./gradlew testDebugUnitTest --tests '*CalendarTaskMapperTest' --tests '*ScheduleConflictDetectorTest' --tests '*CalendarSyncWorkerTest'`
Expected: calendar 타입이 없어 FAIL

- [ ] **Step 3: Calendar Provider 경계와 증분 동기화 구현**

조회 범위는 과거 7일부터 미래 90일까지로 제한한다. source key는 `calendar:<calendarId>:<eventId>`다. 삭제된 `#할일` 원본은 연결 투두를 `SOURCE_DELETED`로 보관한다. Monggle 소유 일정에만 create/update/delete를 허용한다. 반복 일정은 occurrence ID와 시작 시각을 함께 식별자로 사용한다.

- [ ] **Step 4: 테스트 실행**

Run: `./gradlew testDebugUnitTest --tests '*Calendar*' --tests '*ScheduleConflictDetectorTest'`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add app/src/main/java/com/monggle/app/feature/calendar app/src/test/java/com/monggle/app/feature/calendar
git commit -m "feat: sync Google Calendar tasks and schedules"
```

### Task 6: 복원 가능한 단일 집중 타이머

**Files:**
- Create: `app/src/main/java/com/monggle/app/feature/focus/FocusTimerState.kt`
- Create: `app/src/main/java/com/monggle/app/feature/focus/FocusTimerController.kt`
- Create: `app/src/main/java/com/monggle/app/feature/focus/FocusTimerService.kt`
- Create: `app/src/main/java/com/monggle/app/feature/focus/FocusScreen.kt`
- Create: `app/src/main/java/com/monggle/app/feature/focus/BootReceiver.kt`
- Test: `app/src/test/java/com/monggle/app/feature/focus/FocusTimerControllerTest.kt`
- Test: `app/src/test/java/com/monggle/app/feature/focus/FocusTimerRestoreTest.kt`

**Interfaces:**
- Produces: `FocusTimerController.start(taskId, duration, now)`, `extend(5.minutes)`, `complete(now)`, `restore(now): FocusTimerState`
- Consumes: `TaskRepository`, `FocusSessionRepository`

- [ ] **Step 1: 상태 전이와 재부팅 복원 테스트 작성**

```kotlin
@Test fun restores_from_absolute_end_time() {
    store.save(Running(taskId, startedAt = T0, endsAt = T0 + 15.minutes))
    assertEquals(10.minutes, controller.restore(T0 + 5.minutes).remaining)
}

@Test fun rejects_second_timer() {
    controller.start(taskA, 15.minutes, T0)
    assertFailsWith<TimerAlreadyRunning> { controller.start(taskB, 10.minutes, T0) }
}
```

- [ ] **Step 2: 실패 확인**

Run: `./gradlew testDebugUnitTest --tests '*FocusTimer*'`
Expected: controller가 없어 FAIL

- [ ] **Step 3: 절대 종료 시각 기반 상태 머신·서비스·복원 구현**

프리셋은 5·10·15·25·45분이며 사용자 입력은 1~180분으로 제한한다. 서비스는 진행 중 알림을 유지하고 `완료`, `5분 연장`, `중지` 액션을 처리한다. `BOOT_COMPLETED`에서 실행 중 상태만 복구한다.

- [ ] **Step 4: 테스트 실행**

Run: `./gradlew testDebugUnitTest --tests '*FocusTimer*'`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add app/src/main/java/com/monggle/app/feature/focus app/src/test/java/com/monggle/app/feature/focus app/src/main/AndroidManifest.xml
git commit -m "feat: add resilient focus timer"
```

### Task 7: 타이머 알람과 2시간 몽글이 상기

**Files:**
- Create: `app/src/main/java/com/monggle/app/feature/reminders/ReminderPolicy.kt`
- Create: `app/src/main/java/com/monggle/app/feature/reminders/ReminderScheduler.kt`
- Create: `app/src/main/java/com/monggle/app/feature/reminders/ReminderReceiver.kt`
- Create: `app/src/main/java/com/monggle/app/core/preferences/ReminderPreferences.kt`
- Test: `app/src/test/java/com/monggle/app/feature/reminders/ReminderPolicyTest.kt`
- Test: `app/src/test/java/com/monggle/app/feature/reminders/ReminderSchedulerTest.kt`

**Interfaces:**
- Produces: `ReminderPolicy.nextRegular(now, settings, tasks, timer): Instant?`, `nextDeadline(task, now): Instant?`, `ReminderScheduler.rescheduleAll()`
- Consumes: `TaskRepository`, `FocusTimerController`, `ReminderPreferences`

- [ ] **Step 1: 방해 금지·재알림·완료 취소 테스트 작성**

```kotlin
@Test fun quiet_hours_shift_reminder_to_7am() {
    assertEquals(TOMORROW_7AM, policy.nextRegular(TODAY_10_30PM, defaults, openTasks, idle))
}

@Test fun timer_timeout_repeats_once_after_five_minutes() {
    assertEquals(T0 + 5.minutes, policy.followUp(T0, responseReceived = false, followUpCount = 0))
    assertNull(policy.followUp(T0, responseReceived = false, followUpCount = 1))
}
```

- [ ] **Step 2: 실패 확인**

Run: `./gradlew testDebugUnitTest --tests '*Reminder*'`
Expected: reminder 타입이 없어 FAIL

- [ ] **Step 3: AlarmManager·WorkManager 보조 경로와 알림 액션 구현**

기본 간격 2시간, 선택값 1·2·3·4시간, 기본 방해 금지 23:00~07:00을 DataStore에 저장한다. 오늘 완료 또는 `오늘은 그만`이면 당일 정기 알람을 취소한다. 타이머 종료 알람과 정기 상기는 서로 다른 request code를 사용한다.

- [ ] **Step 4: 테스트 실행**

Run: `./gradlew testDebugUnitTest --tests '*Reminder*'`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add app/src/main/java/com/monggle/app/feature/reminders app/src/main/java/com/monggle/app/core/preferences app/src/test/java/com/monggle/app/feature/reminders
git commit -m "feat: add Monggle reminder policy"
```

### Task 8: 경험치·일일 퀘스트·7종 해금

**Files:**
- Create: `app/src/main/java/com/monggle/app/feature/gamification/ProgressionEngine.kt`
- Create: `app/src/main/java/com/monggle/app/feature/gamification/DailyQuestEngine.kt`
- Create: `app/src/main/java/com/monggle/app/feature/gamification/UnlockCatalog.kt`
- Create: `app/src/main/java/com/monggle/app/feature/gamification/ProgressRepository.kt`
- Test: `app/src/test/java/com/monggle/app/feature/gamification/ProgressionEngineTest.kt`
- Test: `app/src/test/java/com/monggle/app/feature/gamification/UnlockCatalogTest.kt`

**Interfaces:**
- Produces: `ProgressionEngine.onTaskCompleted(task, session): ProgressDelta`, `DailyQuestEngine.questsFor(date, profile): List<DailyQuest>`, `UnlockCatalog.available(progress): UnlockState`
- Consumes: 완료된 `Task`, `FocusSession`

- [ ] **Step 1: 비차감·해금 조건 테스트 작성**

```kotlin
@Test fun incomplete_task_never_removes_xp() {
    assertEquals(0, engine.onTaskDeferred(task).xpChange)
}

@Test fun level_three_unlocks_ppyak_and_mint_forest() {
    val state = catalog.available(progress(level = 3))
    assertTrue(state.characters.contains("ppyak"))
    assertTrue(state.worlds.contains("mint_forest"))
}
```

- [ ] **Step 2: 실패 확인**

Run: `./gradlew testDebugUnitTest --tests '*gamification*'`
Expected: engine과 catalog가 없어 FAIL

- [ ] **Step 3: 결정론적 경험치와 명세의 해금표 구현**

완료 기본 경험치는 20 XP, 집중 세션 완료는 추가 10 XP, 일일 퀘스트 완료는 30 XP로 한다. 레벨 요구치는 `100 + (level - 1) * 50` 누적 증가식으로 계산한다. 하루 퀘스트는 `투두 1개 완료`, `집중 15분`, 활동 분류 중 하나를 순환해 총 3개를 만든다.

- [ ] **Step 4: 테스트 실행**

Run: `./gradlew testDebugUnitTest --tests '*gamification*'`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add app/src/main/java/com/monggle/app/feature/gamification app/src/test/java/com/monggle/app/feature/gamification
git commit -m "feat: add quests progression and unlocks"
```

### Task 9: 몽글이 7종·배경 7종과 게임형 홈

**Files:**
- Create: `app/src/main/java/com/monggle/app/feature/character/CharacterCatalog.kt`
- Create: `app/src/main/java/com/monggle/app/feature/character/CharacterMotion.kt`
- Create: `app/src/main/java/com/monggle/app/feature/character/MonggleCharacter.kt`
- Create: `app/src/main/java/com/monggle/app/feature/character/WorldCatalog.kt`
- Create: `app/src/main/java/com/monggle/app/feature/character/AppearanceScreen.kt`
- Create: `app/src/main/java/com/monggle/app/feature/home/HomeViewModel.kt`
- Create: `app/src/main/java/com/monggle/app/feature/home/HomeScreen.kt`
- Test: `app/src/test/java/com/monggle/app/feature/character/CharacterMotionTest.kt`
- Test: `app/src/androidTest/java/com/monggle/app/feature/home/HomeScreenTest.kt`

**Interfaces:**
- Produces: `CharacterCatalog.characters`, `WorldCatalog.worlds`, `CharacterMotion.next(bounds, obstacles, reducedMotion)`, `HomeUiState`
- Consumes: `TodayTaskSelector`, 진행도, 일정, 타이머와 알림 설정

- [ ] **Step 1: 장애물 회피와 reduced motion 테스트 작성**

```kotlin
@Test fun character_path_does_not_intersect_action_card() {
    val next = motion.next(screenBounds, obstacles = listOf(startButton), reducedMotion = false)
    assertFalse(next.bounds.overlaps(startButton))
}

@Test fun reduced_motion_keeps_position() {
    assertEquals(current.position, motion.next(screenBounds, emptyList(), true).position)
}
```

- [ ] **Step 2: 실패 확인**

Run: `./gradlew testDebugUnitTest --tests '*CharacterMotionTest'`
Expected: motion 타입이 없어 FAIL

- [ ] **Step 3: 카탈로그·Compose 애니메이션·B형 홈 구현**

캐릭터 ID는 `ppo`, `nyang`, `ppyak`, `mung`, `toto`, `kong`, `duri`로 고정한다. 배경 ID는 `space_station`, `sunset_city`, `mint_forest`, `butter_cafe`, `peach_room`, `night_library`, `lime_game_room`으로 고정한다. 홈은 레벨, XP, 퀘스트, 몽글이 말풍선, 다음 행동, 다음 일정 순으로 배치한다. 집중 상태이면 이동 애니메이션을 중지한다.

- [ ] **Step 4: 단위·Compose 테스트 실행**

Run: `./gradlew testDebugUnitTest --tests '*CharacterMotionTest' connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.monggle.app.feature.home.HomeScreenTest`
Expected: PASS, 큰 글꼴에서도 시작 버튼이 보이고 캐릭터가 버튼 영역을 가리지 않음

- [ ] **Step 5: 커밋**

```bash
git add app/src/main/java/com/monggle/app/feature/character app/src/main/java/com/monggle/app/feature/home app/src/test/java/com/monggle/app/feature/character app/src/androidTest/java/com/monggle/app/feature/home
git commit -m "feat: add animated Monggle worlds and game dashboard"
```

### Task 10: 홈 위젯과 잠금 화면 즉시 행동

**Files:**
- Create: `app/src/main/java/com/monggle/app/feature/widget/QuickFocusWidget.kt`
- Create: `app/src/main/java/com/monggle/app/feature/widget/ScheduleGapWidget.kt`
- Create: `app/src/main/java/com/monggle/app/feature/widget/WidgetActionReceiver.kt`
- Create: `app/src/main/res/xml/quick_focus_widget_info.xml`
- Create: `app/src/main/res/xml/schedule_gap_widget_info.xml`
- Test: `app/src/test/java/com/monggle/app/feature/widget/WidgetStateMapperTest.kt`
- Test: `app/src/androidTest/java/com/monggle/app/feature/widget/WidgetActionTest.kt`

**Interfaces:**
- Produces: `QuickFocusWidget`, `ScheduleGapWidget`, `WidgetActionReceiver`
- Consumes: 다음 행동, 다음 일정, `FocusTimerController`, `TaskRepository.complete`

- [ ] **Step 1: 다음 행동·빈 시간 추천 매핑 테스트 작성**

```kotlin
@Test fun recommends_task_that_fits_before_next_event() {
    val state = mapper.map(tasks = listOf(task15, task45), nextEventIn = 25.minutes)
    assertEquals(task15.id, state.recommendedTaskId)
}
```

- [ ] **Step 2: 실패 확인**

Run: `./gradlew testDebugUnitTest --tests '*WidgetStateMapperTest'`
Expected: mapper가 없어 FAIL

- [ ] **Step 3: 두 Glance 위젯과 알림 행동 딥링크 구현**

빠른 집중 위젯은 한 투두와 `15분 시작`, `완료`를 제공한다. 일정 연결 위젯은 다음 일정까지 남은 시간보다 예상시간이 짧은 미완료 투두만 추천한다. 잠금 화면 알림은 민감한 내용 숨김 설정이 켜지면 제목 대신 `Monggle 할 일이 남아 있어요`를 표시한다.

- [ ] **Step 4: 테스트 실행**

Run: `./gradlew testDebugUnitTest --tests '*Widget*' connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.monggle.app.feature.widget.WidgetActionTest`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add app/src/main/java/com/monggle/app/feature/widget app/src/main/res/xml app/src/test/java/com/monggle/app/feature/widget app/src/androidTest/java/com/monggle/app/feature/widget
git commit -m "feat: add quick-action home widgets"
```

### Task 11: 설정·권한·가져오기 기록

**Files:**
- Create: `app/src/main/java/com/monggle/app/feature/settings/SettingsScreen.kt`
- Create: `app/src/main/java/com/monggle/app/feature/settings/SettingsViewModel.kt`
- Create: `app/src/main/java/com/monggle/app/feature/settings/PermissionCoordinator.kt`
- Create: `app/src/main/java/com/monggle/app/feature/sharing/ImportHistoryScreen.kt`
- Test: `app/src/test/java/com/monggle/app/feature/settings/PermissionCoordinatorTest.kt`
- Test: `app/src/androidTest/java/com/monggle/app/feature/settings/SettingsScreenTest.kt`

**Interfaces:**
- Produces: 캘린더·알림·정확한 알람의 단계별 요청, 상기·외형 설정 UI
- Consumes: `ReminderPreferences`, 캘린더 상태, import 기록

- [ ] **Step 1: 기능 시점 권한 요청 테스트 작성**

```kotlin
@Test fun calendar_permission_is_not_requested_on_first_launch() {
    assertEquals(emptyList<Permission>(), coordinator.requestsFor(AppLaunch))
    assertEquals(listOf(READ_CALENDAR, WRITE_CALENDAR), coordinator.requestsFor(EnableCalendar))
}
```

- [ ] **Step 2: 실패 확인**

Run: `./gradlew testDebugUnitTest --tests '*PermissionCoordinatorTest'`
Expected: coordinator가 없어 FAIL

- [ ] **Step 3: 설정 화면과 권한 상태별 안내 구현**

권한 거부 시 앱을 막지 않고 기능별 설명과 시스템 설정 링크를 표시한다. 설정에는 1·2·3·4시간 상기, 23:00·07:00 기본 방해 금지, 알림 소리·진동, 민감한 제목 숨김, 애니메이션 줄이기, 캐릭터·배경 선택을 포함한다.

- [ ] **Step 4: 테스트 실행**

Run: `./gradlew testDebugUnitTest --tests '*PermissionCoordinatorTest' connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.monggle.app.feature.settings.SettingsScreenTest`
Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add app/src/main/java/com/monggle/app/feature/settings app/src/main/java/com/monggle/app/feature/sharing/ImportHistoryScreen.kt app/src/test/java/com/monggle/app/feature/settings app/src/androidTest/java/com/monggle/app/feature/settings
git commit -m "feat: add settings permissions and import history"
```

### Task 12: 전체 흐름 검증과 릴리스 빌드

**Files:**
- Create: `app/src/androidTest/java/com/monggle/app/e2e/MonggleCoreJourneyTest.kt`
- Create: `app/src/androidTest/java/com/monggle/app/e2e/CalendarJourneyTest.kt`
- Create: `docs/testing/android-device-matrix.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: 앞선 모든 공개 인터페이스
- Produces: 재현 가능한 검증 명령과 설치 가능한 debug APK

- [ ] **Step 1: 핵심 사용자 여정 테스트 작성**

```kotlin
@Test fun shared_task_can_be_started_completed_and_rewarded() {
    launchShare("오늘 보고서 첫 문단 쓰기 15분")
    reviewAndSave()
    startTimer(minutes = 15)
    completeFromNotification()
    assertHomeShowsQuestProgress("1 / 3")
}
```

- [ ] **Step 2: 실패 확인**

Run: `./gradlew connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.monggle.app.e2e.MonggleCoreJourneyTest`
Expected: 통합 연결이 끝나기 전 FAIL

- [ ] **Step 3: 내비게이션·딥링크·상태 갱신 연결 및 문서 작성**

README에 빌드, 테스트, 캘린더 권한, 공유 테스트 방법을 기록한다. 기기 매트릭스에는 Google Pixel 계열 1대와 Samsung Galaxy 계열 1대, Android 13 이상에서 화면 꺼짐·재부팅·절전 모드 검증 항목을 기록한다.

- [ ] **Step 4: 전체 검증 실행**

Run: `./gradlew clean testDebugUnitTest lintDebug assembleDebug connectedDebugAndroidTest`
Expected: 모든 작업 PASS, lint error 0, debug APK 생성

- [ ] **Step 5: 실제 기기 수동 확인**

카카오톡과 카카오워크에서 각각 텍스트 공유 → 저장 → 15분 시작 → 알림 완료를 수행한다. Google Calendar에서 `#할일` 생성·수정·삭제, Monggle 일정 생성·수정·삭제, 23:00~07:00 정기 상기 억제를 확인하고 결과를 `docs/testing/android-device-matrix.md`에 기록한다.

- [ ] **Step 6: 커밋**

```bash
git add app/src/androidTest/java/com/monggle/app/e2e docs/testing README.md
git commit -m "test: verify Monggle Android MVP journeys"
```

## Completion Checklist

- [ ] `./gradlew clean testDebugUnitTest lintDebug assembleDebug connectedDebugAndroidTest` 통과
- [ ] 카카오톡·카카오워크 공유 대상에 Monggle 표시
- [ ] `#할일` 일정 중복·수정·삭제 규칙 확인
- [ ] 타이머 종료 알림과 5분 뒤 단일 재알림 확인
- [ ] 정기 상기 2시간과 23:00~07:00 억제 확인
- [ ] 위젯·잠금 화면에서 시작·완료 확인
- [ ] 캐릭터 7종과 배경 7종 해금표 확인
- [ ] 큰 글꼴·애니메이션 줄이기·민감한 알림 숨김 확인
