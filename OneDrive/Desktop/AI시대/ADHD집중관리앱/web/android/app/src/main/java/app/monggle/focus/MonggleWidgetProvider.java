package app.monggle.focus;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.RemoteViews;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;

public class MonggleWidgetProvider extends AppWidgetProvider {
    static final String ACTION_CHECK_IN = "app.monggle.focus.ACTION_CHECK_IN";
    static final String EXTRA_RESPONSE = "response";

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
        for (int id : appWidgetIds) render(context, manager, id);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if (ACTION_CHECK_IN.equals(intent.getAction())) {
            appendEvent(context, intent.getStringExtra(EXTRA_RESPONSE), intent.getStringExtra("taskId"));
            refreshAll(context);
        }
    }

    static void refreshAll(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        int[] ids = manager.getAppWidgetIds(new ComponentName(context, MonggleWidgetProvider.class));
        for (int id : ids) render(context, manager, id);
    }

    private static void render(Context context, AppWidgetManager manager, int id) {
        Bundle options = manager.getAppWidgetOptions(id);
        boolean medium = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH, 0) >= 220;
        RemoteViews views = new RemoteViews(context.getPackageName(), medium ? R.layout.monggle_widget_medium : R.layout.monggle_widget_small);
        SharedPreferences store = context.getSharedPreferences(MonggleWidgetPlugin.STORE_NAME, Context.MODE_PRIVATE);
        try {
            JSONObject snapshot = new JSONObject(store.getString(MonggleWidgetPlugin.SNAPSHOT_KEY, "{}"));
            JSONArray tasks = snapshot.optJSONArray("tasks");
            List<WidgetRenderPolicy.Task> parsedTasks = new ArrayList<>();
            if (tasks != null) {
                for (int index = 0; index < tasks.length(); index++) {
                    JSONObject task = tasks.optJSONObject(index);
                    if (task != null) parsedTasks.add(new WidgetRenderPolicy.Task(task.optString("id"), task.optString("title")));
                }
            }
            WidgetRenderPolicy.Result result = WidgetRenderPolicy.render(
                new WidgetRenderPolicy.Snapshot(
                    parsedTasks,
                    snapshot.optString("nudgeLine", "몽글이와 한 가지씩 해봐요"),
                    snapshot.optString("currentMissionId", null),
                    snapshot.optString("commitmentDay", null),
                    snapshot.optString("firstAction", null),
                    snapshot.optString("escalationLevel", null)
                ),
                medium ? WidgetRenderPolicy.Size.MEDIUM : WidgetRenderPolicy.Size.SMALL
            );
            views.setTextViewText(R.id.widget_title, result.titleLine);
            views.setTextColor(R.id.widget_title, Color.parseColor(result.extended ? "#FFE08A" : "#E9DEFF"));
            views.setInt(R.id.widget_root, "setBackgroundResource", result.extended ? R.drawable.monggle_widget_extended_background : R.drawable.monggle_widget_background);
            views.setTextViewText(R.id.widget_first_action, result.firstActionLine);
            views.setViewVisibility(R.id.widget_first_action, result.firstActionLine.isEmpty() ? View.GONE : View.VISIBLE);
            setTask(views, R.id.widget_task_1, result.visibleTasks, 0);
            if (medium) {
                setTask(views, R.id.widget_task_2, result.visibleTasks, 1);
                setTask(views, R.id.widget_task_3, result.visibleTasks, 2);
            }
            String taskId = result.visibleTasks.isEmpty() ? "" : result.visibleTasks.get(0).id;
            bindAction(context, views, R.id.widget_done, "done", taskId, 1);
            bindAction(context, views, R.id.widget_working, "working", taskId, 2);
            bindAction(context, views, R.id.widget_later, "later", taskId, 3);
        } catch (Exception ignored) {
            views.setTextViewText(R.id.widget_title, "오늘 할 일을 앱에서 추가해주세요");
        }
        Intent open = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
        views.setOnClickPendingIntent(R.id.widget_root, PendingIntent.getActivity(context, 9, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE));
        manager.updateAppWidget(id, views);
    }

    private static void setTask(RemoteViews views, int viewId, List<WidgetRenderPolicy.Task> tasks, int index) {
        WidgetRenderPolicy.Task task = index < tasks.size() ? tasks.get(index) : null;
        views.setViewVisibility(viewId, task == null ? View.GONE : View.VISIBLE);
        if (task != null) views.setTextViewText(viewId, task.title);
    }

    private static void bindAction(Context context, RemoteViews views, int viewId, String response, String taskId, int requestCode) {
        Intent action = new Intent(context, MonggleWidgetProvider.class).setAction(ACTION_CHECK_IN)
            .putExtra(EXTRA_RESPONSE, response).putExtra("taskId", taskId);
        views.setOnClickPendingIntent(viewId, PendingIntent.getBroadcast(context, requestCode, action, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE));
    }

    private static void appendEvent(Context context, String response, String taskId) {
        SharedPreferences store = context.getSharedPreferences(MonggleWidgetPlugin.STORE_NAME, Context.MODE_PRIVATE);
        try {
            JSONArray events = new JSONArray(store.getString(MonggleWidgetPlugin.COMPLETION_EVENTS_KEY, "[]"));
            JSONObject event = new JSONObject().put("taskId", taskId).put("response", response).put("completedAt", Instant.now().toString());
            events.put(event);
            int misses = NativeMasteryPolicy.onResponse(store.getInt(MonggleWidgetPlugin.MASTERY_MISSES_KEY, 0), response);
            store.edit().putString(MonggleWidgetPlugin.COMPLETION_EVENTS_KEY, events.toString())
                .putInt(MonggleWidgetPlugin.MASTERY_MISSES_KEY, misses)
                .putString(MonggleWidgetPlugin.MASTERY_TASK_KEY, taskId)
                .putBoolean(MonggleWidgetPlugin.MASTERY_ANSWERED_KEY, true).apply();
        } catch (Exception ignored) {}
    }
}
