import AppIntents
import Foundation
import WidgetKit

private enum WidgetEventStore {
    static func append(taskID: String, response: String) {
        let store = UserDefaults(suiteName: "group.app.monggle.focus") ?? .standard
        var events = store.array(forKey: "widget_completion_events_v1") as? [[String: Any]] ?? []
        events.append(["taskId": taskID, "response": response, "completedAt": ISO8601DateFormatter().string(from: Date())])
        store.set(events, forKey: "widget_completion_events_v1")
        WidgetCenter.shared.reloadAllTimelines()
    }
}

struct CompleteTaskIntent: AppIntent {
    static let title: LocalizedStringResource = "했어"
    @Parameter(title: "Task ID") var taskID: String
    init() { taskID = "" }
    init(taskID: String) { self.taskID = taskID }
    func perform() async throws -> some IntentResult { WidgetEventStore.append(taskID: taskID, response: "done"); return .result() }
}

struct KeepWorkingIntent: AppIntent {
    static let title: LocalizedStringResource = "하는 중"
    @Parameter(title: "Task ID") var taskID: String
    init() { taskID = "" }
    init(taskID: String) { self.taskID = taskID }
    func perform() async throws -> some IntentResult { WidgetEventStore.append(taskID: taskID, response: "working"); return .result() }
}

struct RemindLaterIntent: AppIntent {
    static let title: LocalizedStringResource = "나중에"
    @Parameter(title: "Task ID") var taskID: String
    init() { taskID = "" }
    init(taskID: String) { self.taskID = taskID }
    func perform() async throws -> some IntentResult { WidgetEventStore.append(taskID: taskID, response: "later"); return .result() }
}
