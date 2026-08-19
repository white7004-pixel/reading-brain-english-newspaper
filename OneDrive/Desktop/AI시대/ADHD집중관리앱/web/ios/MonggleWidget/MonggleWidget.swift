import AppIntents
import SwiftUI
import WidgetKit

struct WidgetTask: Codable, Identifiable {
    let id: String
    let title: String
}

struct MonggleEntry: TimelineEntry {
    let date: Date
    let tasks: [WidgetTask]
    let nudgeLine: String
}

struct MonggleTimelineProvider: TimelineProvider {
    func placeholder(in context: Context) -> MonggleEntry {
        MonggleEntry(date: Date(), tasks: [WidgetTask(id: "sample", title: "지금 할 일 하나")], nudgeLine: "몽글이와 한 가지씩 해봐요")
    }

    func getSnapshot(in context: Context, completion: @escaping (MonggleEntry) -> Void) {
        completion(loadEntry())
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<MonggleEntry>) -> Void) {
        let entry = loadEntry()
        completion(Timeline(entries: [entry], policy: .after(Date().addingTimeInterval(30 * 60))))
    }

    private func loadEntry() -> MonggleEntry {
        let store = UserDefaults(suiteName: "group.app.monggle.focus") ?? .standard
        guard let dictionary = store.dictionary(forKey: "widget_snapshot_v1"),
              let rawTasks = dictionary["tasks"] as? [[String: Any]] else {
            return MonggleEntry(date: Date(), tasks: [], nudgeLine: "오늘 할 일을 앱에서 추가해주세요")
        }
        let tasks = rawTasks.prefix(3).compactMap { item -> WidgetTask? in
            guard let id = item["id"] as? String, let title = item["title"] as? String else { return nil }
            return WidgetTask(id: id, title: title)
        }
        return MonggleEntry(date: Date(), tasks: tasks, nudgeLine: dictionary["nudgeLine"] as? String ?? "몽글이와 한 가지씩 해봐요")
    }
}

struct MonggleWidgetView: View {
    @Environment(\.widgetFamily) private var family
    let entry: MonggleEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(entry.nudgeLine).font(.caption.bold()).foregroundStyle(.white.opacity(0.8))
            ForEach(Array(entry.tasks.prefix(family == .systemSmall ? 1 : 3))) { task in
                Text(task.title).font(family == .systemSmall ? .headline : .subheadline).foregroundStyle(.white).lineLimit(1)
            }
            Spacer(minLength: 2)
            if let task = entry.tasks.first {
                HStack(spacing: 5) {
                    Button(intent: CompleteTaskIntent(taskID: task.id)) { Text("했어") }
                    Button(intent: KeepWorkingIntent(taskID: task.id)) { Text("하는 중") }
                    Button(intent: RemindLaterIntent(taskID: task.id)) { Text("나중에") }
                }.font(.caption2)
            }
        }
        .containerBackground(for: .widget) { LinearGradient(colors: [Color(red: 0.2, green: 0.12, blue: 0.35), Color(red: 0.44, green: 0.32, blue: 0.72)], startPoint: .topLeading, endPoint: .bottomTrailing) }
    }
}

struct MonggleWidget: Widget {
    let kind = "MonggleWidget"
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: MonggleTimelineProvider()) { entry in MonggleWidgetView(entry: entry) }
            .configurationDisplayName("몽글이 오늘 할 일")
            .description("지금 할 일을 하나씩 확인해요.")
            .supportedFamilies([.systemSmall, .systemMedium])
    }
}

@main
struct MonggleWidgetBundle: WidgetBundle {
    var body: some Widget { MonggleWidget() }
}
