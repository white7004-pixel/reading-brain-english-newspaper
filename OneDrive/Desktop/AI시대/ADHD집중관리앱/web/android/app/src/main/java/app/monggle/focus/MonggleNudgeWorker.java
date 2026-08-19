package app.monggle.focus;

import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;
import androidx.work.Worker;
import androidx.work.WorkerParameters;
import java.time.LocalTime;
import org.json.JSONArray;
import org.json.JSONObject;

public class MonggleNudgeWorker extends Worker {
    static final String CHANNEL_ID = "monggle_nudges";
    static final int NOTIFICATION_ID = 4101;

    public MonggleNudgeWorker(@NonNull Context context, @NonNull WorkerParameters params) { super(context, params); }

    @NonNull @Override public Result doWork() {
        Context context = getApplicationContext();
        SharedPreferences store = context.getSharedPreferences(MonggleWidgetPlugin.STORE_NAME, Context.MODE_PRIVATE);
        try {
            JSONObject config = new JSONObject(store.getString(MonggleWidgetPlugin.NUDGE_CONFIG_KEY, "{}"));
            if (NudgeSchedulePolicy.isQuiet(LocalTime.now(), LocalTime.parse(config.optString("quietHoursStart", "23:00")), LocalTime.parse(config.optString("quietHoursEnd", "07:00")))) return Result.success();
            JSONObject snapshot = new JSONObject(store.getString(MonggleWidgetPlugin.SNAPSHOT_KEY, "{}"));
            JSONArray tasks = snapshot.optJSONArray("tasks");
            if (tasks == null || tasks.length() == 0) return Result.success();
            JSONObject firstTask = tasks.getJSONObject(0);
            String taskId = firstTask.optString("id");
            String title = firstTask.optString("title");
            String previousTask = store.getString(MonggleWidgetPlugin.MASTERY_TASK_KEY, "");
            int misses = taskId.equals(previousTask)
                ? NativeMasteryPolicy.onPrompt(store.getInt(MonggleWidgetPlugin.MASTERY_MISSES_KEY, 0), store.getBoolean(MonggleWidgetPlugin.MASTERY_ANSWERED_KEY, true))
                : 0;
            NativeMasteryPolicy.Tone tone = NativeMasteryPolicy.tone(misses);
            store.edit().putString(MonggleWidgetPlugin.MASTERY_TASK_KEY, taskId)
                .putInt(MonggleWidgetPlugin.MASTERY_MISSES_KEY, misses)
                .putBoolean(MonggleWidgetPlugin.MASTERY_ANSWERED_KEY, false).apply();
            NotificationManager manager = context.getSystemService(NotificationManager.class);
            if (android.os.Build.VERSION.SDK_INT >= 26) {
                manager.createNotificationChannel(new NotificationChannel(CHANNEL_ID, "몽글이 확인", NotificationManager.IMPORTANCE_DEFAULT));
            }
            Intent open = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
            PendingIntent content = PendingIntent.getActivity(context, 10, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
            NotificationCompat.Builder notification = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher).setContentTitle("몽글이가 물어봐요")
                .setContentText(NativeMasteryPolicy.message(tone, title)).setStyle(new NotificationCompat.BigTextStyle().bigText(NativeMasteryPolicy.message(tone, title))).setContentIntent(content).setAutoCancel(true);
            if (ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED || android.os.Build.VERSION.SDK_INT < 33) {
                manager.notify(NOTIFICATION_ID, notification.build());
            }
        } catch (Exception ignored) {}
        return Result.success();
    }
}
