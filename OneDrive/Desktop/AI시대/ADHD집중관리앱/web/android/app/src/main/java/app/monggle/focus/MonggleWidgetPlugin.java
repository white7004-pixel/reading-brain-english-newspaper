package app.monggle.focus;

import android.content.Context;
import android.content.SharedPreferences;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "MonggleWidget")
public class MonggleWidgetPlugin extends Plugin {
    static final String STORE_NAME = "monggle_widget_shared";
    static final String SNAPSHOT_KEY = "widget_snapshot_v1";
    static final String COMPLETION_EVENTS_KEY = "widget_completion_events_v1";
    static final String NUDGE_CONFIG_KEY = "widget_nudge_config_v1";

    private SharedPreferences store() {
        return getContext().getSharedPreferences(STORE_NAME, Context.MODE_PRIVATE);
    }

    @PluginMethod
    public void updateWidget(PluginCall call) {
        JSObject snapshot = call.getObject("snapshot");
        if (snapshot == null) {
            call.reject("snapshot is required");
            return;
        }
        store().edit().putString(SNAPSHOT_KEY, snapshot.toString()).apply();
        call.resolve();
    }

    @PluginMethod
    public void scheduleNudges(PluginCall call) {
        store().edit().putString(NUDGE_CONFIG_KEY, call.getData().toString()).apply();
        call.resolve();
    }

    @PluginMethod
    public void getCompletionEvents(PluginCall call) {
        String rawEvents = store().getString(COMPLETION_EVENTS_KEY, "[]");
        JSObject result = new JSObject();
        try {
            result.put("events", new JSArray(rawEvents));
            call.resolve(result);
        } catch (Exception exception) {
            result.put("events", new JSArray());
            call.resolve(result);
        }
    }

    @PluginMethod
    public void clearCompletionEvents(PluginCall call) {
        store().edit().remove(COMPLETION_EVENTS_KEY).apply();
        call.resolve();
    }
}
