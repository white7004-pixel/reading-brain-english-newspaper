package app.monggle.focus;

import java.time.LocalDateTime;
import java.time.LocalTime;

final class NudgeSchedulePolicy {
    static LocalDateTime nextRun(LocalDateTime now, String quietStart, String quietEnd, int intervalMinutes) {
        LocalDateTime candidate = now.plusMinutes(intervalMinutes);
        LocalTime start = LocalTime.parse(quietStart);
        LocalTime end = LocalTime.parse(quietEnd);
        if (!isQuiet(candidate.toLocalTime(), start, end)) return candidate;

        LocalDateTime endOfQuiet = candidate.toLocalDate().atTime(end);
        if (!end.isAfter(start) && !candidate.toLocalTime().isBefore(start)) {
            endOfQuiet = endOfQuiet.plusDays(1);
        }
        return endOfQuiet.plusMinutes(intervalMinutes);
    }

    static boolean isQuiet(LocalTime value, LocalTime start, LocalTime end) {
        if (start.equals(end)) return false;
        if (end.isAfter(start)) return !value.isBefore(start) && value.isBefore(end);
        return !value.isBefore(start) || value.isBefore(end);
    }

    private NudgeSchedulePolicy() {}
}
