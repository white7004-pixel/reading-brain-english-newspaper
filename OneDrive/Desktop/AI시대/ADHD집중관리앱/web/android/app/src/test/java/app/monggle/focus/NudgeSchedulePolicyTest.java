package app.monggle.focus;

import static org.junit.Assert.assertEquals;

import java.time.LocalDateTime;
import org.junit.Test;

public class NudgeSchedulePolicyTest {
    @Test
    public void quietHoursSkipWithoutCatchUp() {
        LocalDateTime now = LocalDateTime.of(2026, 8, 20, 23, 30);

        LocalDateTime next = NudgeSchedulePolicy.nextRun(now, "23:00", "07:00", 60);

        assertEquals(LocalDateTime.of(2026, 8, 21, 8, 0), next);
    }

    @Test
    public void normalHoursAdvanceByInterval() {
        LocalDateTime now = LocalDateTime.of(2026, 8, 20, 12, 15);

        LocalDateTime next = NudgeSchedulePolicy.nextRun(now, "23:00", "07:00", 30);

        assertEquals(LocalDateTime.of(2026, 8, 20, 12, 45), next);
    }
}
