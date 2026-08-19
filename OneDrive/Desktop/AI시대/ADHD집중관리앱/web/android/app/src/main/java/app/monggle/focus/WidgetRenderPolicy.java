package app.monggle.focus;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

final class WidgetRenderPolicy {
    enum Size { SMALL, MEDIUM }

    static final class Result {
        final List<String> visibleTasks;
        final int remainingCount;

        Result(List<String> visibleTasks, int remainingCount) {
            this.visibleTasks = visibleTasks;
            this.remainingCount = remainingCount;
        }
    }

    static Result render(List<String> openTasks, Size size) {
        int limit = size == Size.SMALL ? 1 : 3;
        int visibleCount = Math.min(limit, openTasks.size());
        List<String> visible = new ArrayList<>(openTasks.subList(0, visibleCount));
        return new Result(Collections.unmodifiableList(visible), openTasks.size() - visibleCount);
    }

    private WidgetRenderPolicy() {}
}
