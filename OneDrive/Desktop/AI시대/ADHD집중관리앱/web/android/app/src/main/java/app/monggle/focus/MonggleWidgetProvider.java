package app.monggle.focus;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.RemoteViews;
import java.time.Instant;
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
            int count = tasks == null ? 0 : tasks.length();
            views.setTextViewText(R.id.widget_title, snapshot.optString("nudgeLine", "몽글이와 한 가지씩 해봐요"));
            setTask(views, R.id.widget_task_1, tasks, 0);
            if (medium) {
                setTask(views, R.id.widget_task_2, tasks, 1);
                setTask(views, R.id.widget_task_3, tasks, 2);
            }
            String taskId = count > 0 ? tasks.optJSONObject(0).optString("id") : "";
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

    private static void setTask(RemoteViews views, int viewId, JSONArray tasks, int index) {
        JSONObject task = tasks == null ? null : tasks.optJSONObject(index);
        views.setViewVisibility(viewId, task == null ? View.GONE : View.VISIBLE);
        if (task != null) views.setTextViewText(viewId, task.optString("title"));
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
