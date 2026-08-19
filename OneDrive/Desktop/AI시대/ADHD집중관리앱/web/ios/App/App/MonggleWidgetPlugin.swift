import Capacitor
import Foundation

final class MonggleBridgeViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginType(MonggleWidgetPlugin.self)
    }
}

@objc(MonggleWidgetPlugin)
public class MonggleWidgetPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "MonggleWidgetPlugin"
    public let jsName = "MonggleWidget"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "updateWidget", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "scheduleNudges", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getCompletionEvents", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "clearCompletionEvents", returnType: CAPPluginReturnPromise)
    ]

    private let snapshotKey = "widget_snapshot_v1"
    private let completionEventsKey = "widget_completion_events_v1"
    private let nudgeConfigKey = "widget_nudge_config_v1"

    private var store: UserDefaults {
        UserDefaults(suiteName: "group.app.monggle.focus") ?? .standard
    }

    @objc func updateWidget(_ call: CAPPluginCall) {
        guard let snapshot = call.getObject("snapshot") else {
            call.reject("snapshot is required")
            return
        }
        store.set(snapshot, forKey: snapshotKey)
        call.resolve()
    }

    @objc func scheduleNudges(_ call: CAPPluginCall) {
        store.set(call.options, forKey: nudgeConfigKey)
        call.resolve()
    }

    @objc func getCompletionEvents(_ call: CAPPluginCall) {
        let events = store.array(forKey: completionEventsKey) ?? []
        call.resolve(["events": events])
    }

    @objc func clearCompletionEvents(_ call: CAPPluginCall) {
        store.removeObject(forKey: completionEventsKey)
        call.resolve()
    }
}
