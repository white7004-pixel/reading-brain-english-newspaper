package app.monggle.focus;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeParseException;

final class WidgetRenderPolicy {
    enum Size { SMALL, MEDIUM }

    static final class Task {
        final String id;
        final String title;

        Task(String id, String title) {
            this.id = id;
            this.title = title;
        }
    }

    static final class Snapshot {
        final List<Task> tasks;
        final String nudgeLine;
        final String currentMissionId;
        final String commitmentDay;
        final String firstAction;
        final String escalationLevel;

        Snapshot(List<Task> tasks, String nudgeLine, String currentMissionId, String commitmentDay, String firstAction, String escalationLevel) {
            this.tasks = tasks;
            this.nudgeLine = nudgeLine;
            this.currentMissionId = currentMissionId;
            this.commitmentDay = commitmentDay;
            this.firstAction = firstAction;
            this.escalationLevel = escalationLevel;
        }
    }

    static final class Result {
        final List<Task> visibleTasks;
        final int remainingCount;
        final String titleLine;
        final String firstActionLine;
        final boolean extended;

        Result(List<Task> visibleTasks, int remainingCount, String titleLine, String firstActionLine, boolean extended) {
            this.visibleTasks = visibleTasks;
            this.remainingCount = remainingCount;
            this.titleLine = titleLine;
            this.firstActionLine = firstActionLine;
            this.extended = extended;
        }
    }

    static Result render(Snapshot snapshot, Size size) {
        return render(snapshot, size, LocalDate.now(ZoneId.of("Asia/Seoul")));
    }

    static Result render(Snapshot snapshot, Size size, LocalDate currentSeoulDay) {
        List<Task> ordered = new ArrayList<>(snapshot.tasks);
        if (snapshot.currentMissionId != null && !snapshot.currentMissionId.isEmpty()) {
            for (int index = 0; index < ordered.size(); index++) {
                if (snapshot.currentMissionId.equals(ordered.get(index).id)) {
                    Task selected = ordered.remove(index);
                    ordered.add(0, selected);
                    break;
                }
            }
        }
        int limit = size == Size.SMALL ? 1 : 3;
        int visibleCount = Math.min(limit, ordered.size());
        List<Task> visible = new ArrayList<>(ordered.subList(0, visibleCount));
        boolean extended = isExtended(snapshot, currentSeoulDay);
        String fallbackTitle = snapshot.nudgeLine == null || snapshot.nudgeLine.isEmpty() ? "몽글이와 한 가지씩 해봐요" : snapshot.nudgeLine;
        String titleLine = extended
            ? "오늘 연장 완료 모드" + (snapshot.commitmentDay == null || snapshot.commitmentDay.isEmpty() ? "" : " · " + snapshot.commitmentDay)
            : fallbackTitle;
        String firstActionLine = snapshot.firstAction == null || snapshot.firstAction.trim().isEmpty() ? "" : "첫 행동 · " + snapshot.firstAction.trim();
        return new Result(Collections.unmodifiableList(visible), ordered.size() - visibleCount, titleLine, firstActionLine, extended);
    }

    private static boolean isExtended(Snapshot snapshot, LocalDate currentSeoulDay) {
        if (snapshot.commitmentDay != null && !snapshot.commitmentDay.isEmpty()) {
            try {
                if (LocalDate.parse(snapshot.commitmentDay).isBefore(currentSeoulDay)) return true;
            } catch (DateTimeParseException ignored) {
                // Fall through to the legacy snapshot flag.
            }
        }
        return "widget".equals(snapshot.escalationLevel);
    }

    private WidgetRenderPolicy() {}
}
