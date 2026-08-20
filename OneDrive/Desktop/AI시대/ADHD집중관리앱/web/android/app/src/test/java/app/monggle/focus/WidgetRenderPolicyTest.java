package app.monggle.focus;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.time.LocalDate;
import java.util.Arrays;
import org.junit.Test;

public class WidgetRenderPolicyTest {
    @Test
    public void smallWidgetShowsOneOpenTask() {
        WidgetRenderPolicy.Result result = WidgetRenderPolicy.render(
            new WidgetRenderPolicy.Snapshot(
                Arrays.asList(
                    new WidgetRenderPolicy.Task("1", "first"),
                    new WidgetRenderPolicy.Task("2", "second"),
                    new WidgetRenderPolicy.Task("3", "third"),
                    new WidgetRenderPolicy.Task("4", "fourth")
                ),
                "One at a time", null, null, null, null
            ),
            WidgetRenderPolicy.Size.SMALL
        );

        assertEquals("first", result.visibleTasks.get(0).title);
        assertEquals(3, result.remainingCount);
    }

    @Test
    public void mediumWidgetShowsAtMostThreeOpenTasks() {
        WidgetRenderPolicy.Result result = WidgetRenderPolicy.render(
            new WidgetRenderPolicy.Snapshot(
                Arrays.asList(
                    new WidgetRenderPolicy.Task("1", "first"),
                    new WidgetRenderPolicy.Task("2", "second"),
                    new WidgetRenderPolicy.Task("3", "third"),
                    new WidgetRenderPolicy.Task("4", "fourth")
                ),
                "One at a time", null, null, null, null
            ),
            WidgetRenderPolicy.Size.MEDIUM
        );

        assertEquals(Arrays.asList("first", "second", "third"), Arrays.asList(
            result.visibleTasks.get(0).title,
            result.visibleTasks.get(1).title,
            result.visibleTasks.get(2).title
        ));
        assertEquals(1, result.remainingCount);
    }

    @Test
    public void extendedSnapshotPromotesSelectedMissionAndAppliesWidgetPresentation() {
        WidgetRenderPolicy.Result result = WidgetRenderPolicy.render(
            new WidgetRenderPolicy.Snapshot(
                Arrays.asList(
                    new WidgetRenderPolicy.Task("optional", "수학 숙제"),
                    new WidgetRenderPolicy.Task("required", "독서")
                ),
                "몽글이와 한 가지씩 해봐요", "required", "2026-08-21", "책 펼치기", "widget"
            ),
            WidgetRenderPolicy.Size.MEDIUM
        );

        assertEquals("required", result.visibleTasks.get(0).id);
        assertEquals("오늘 연장 완료 모드 · 2026-08-21", result.titleLine);
        assertEquals("첫 행동 · 책 펼치기", result.firstActionLine);
        assertTrue(result.extended);
    }

    @Test
    public void legacySnapshotKeepsOriginalCopyOrderAndStyle() {
        WidgetRenderPolicy.Result result = WidgetRenderPolicy.render(
            new WidgetRenderPolicy.Snapshot(
                Arrays.asList(
                    new WidgetRenderPolicy.Task("optional", "수학 숙제"),
                    new WidgetRenderPolicy.Task("required", "독서")
                ),
                "몽글이와 한 가지씩 해봐요", null, null, null, null
            ),
            WidgetRenderPolicy.Size.MEDIUM
        );

        assertEquals("optional", result.visibleTasks.get(0).id);
        assertEquals("몽글이와 한 가지씩 해봐요", result.titleLine);
        assertEquals("", result.firstActionLine);
        assertFalse(result.extended);
    }

    @Test
    public void preMidnightSnapshotRendersExtendedAfterSeoulMidnightWithoutAppLaunch() {
        WidgetRenderPolicy.Snapshot preMidnightSnapshot = new WidgetRenderPolicy.Snapshot(
            Arrays.asList(new WidgetRenderPolicy.Task("required", "Read")),
            "One at a time", "required", "2026-08-21", "Open the book", "push"
        );

        WidgetRenderPolicy.Result result = WidgetRenderPolicy.render(
            preMidnightSnapshot,
            WidgetRenderPolicy.Size.SMALL,
            LocalDate.of(2026, 8, 22)
        );

        assertTrue(result.extended);
        assertTrue(result.titleLine.contains("2026-08-21"));
    }
}
