package app.monggle.focus;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import org.junit.Test;

public class WidgetRenderPolicyTest {
    @Test
    public void smallWidgetShowsOneOpenTask() {
        WidgetRenderPolicy.Result result = WidgetRenderPolicy.render(
            Arrays.asList("first", "second", "third", "fourth"),
            WidgetRenderPolicy.Size.SMALL
        );

        assertEquals(Arrays.asList("first"), result.visibleTasks);
        assertEquals(3, result.remainingCount);
    }

    @Test
    public void mediumWidgetShowsAtMostThreeOpenTasks() {
        WidgetRenderPolicy.Result result = WidgetRenderPolicy.render(
            Arrays.asList("first", "second", "third", "fourth"),
            WidgetRenderPolicy.Size.MEDIUM
        );

        assertEquals(Arrays.asList("first", "second", "third"), result.visibleTasks);
        assertEquals(1, result.remainingCount);
    }
}
