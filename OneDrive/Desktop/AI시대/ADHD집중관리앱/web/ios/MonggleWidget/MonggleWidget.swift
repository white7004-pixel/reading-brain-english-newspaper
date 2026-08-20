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
    let currentMissionId: String?
    let commitmentDay: String?
    let firstAction: String?
    let escalationLevel: String?

    init(date: Date, tasks: [WidgetTask], nudgeLine: String, currentMissionId: String? = nil, commitmentDay: String? = nil, firstAction: String? = nil, escalationLevel: String? = nil) {
        self.date = date
        self.tasks = tasks
        self.nudgeLine = nudgeLine
        self.currentMissionId = currentMissionId
        self.commitmentDay = commitmentDay
        self.firstAction = firstAction
        self.escalationLevel = escalationLevel
    }

    var isExtended: Bool { escalationLevel == "widget" }

    var orderedTasks: [WidgetTask] {
        guard let currentMissionId,
              let selectedIndex = tasks.firstIndex(where: { $0.id == currentMissionId }) else { return tasks }
        var ordered = tasks
        let selected = ordered.remove(at: selectedIndex)
        ordered.insert(selected, at: 0)
        return ordered
    }

    var titleLine: String {
        guard isExtended else { return nudgeLine }
        guard let commitmentDay, !commitmentDay.isEmpty else { return "오늘 연장 완료 모드" }
        return "오늘 연장 완료 모드 · \(commitmentDay)"
    }

    var firstActionLine: String? {
        guard let firstAction = firstAction?.trimmingCharacters(in: .whitespacesAndNewlines), !firstAction.isEmpty else { return nil }
        return "첫 행동 · \(firstAction)"
    }
}

struct MonggleSnapshotDecoder {
    static func entry(from dictionary: [String: Any]?, date: Date = Date()) -> MonggleEntry {
        guard let dictionary,
              let rawTasks = dictionary["tasks"] as? [[String: Any]] else {
            return MonggleEntry(date: date, tasks: [], nudgeLine: "오늘 할 일을 앱에서 추가해주세요")
        }
        let tasks = rawTasks.prefix(3).compactMap { item -> WidgetTask? in
            guard let id = item["id"] as? String, let title = item["title"] as? String else { return nil }
            return WidgetTask(id: id, title: title)
        }
        return MonggleEntry(
            date: date,
            tasks: tasks,
            nudgeLine: dictionary["nudgeLine"] as? String ?? "몽글이와 한 가지씩 해봐요",
            currentMissionId: dictionary["currentMissionId"] as? String,
            commitmentDay: dictionary["commitmentDay"] as? String,
            firstAction: dictionary["firstAction"] as? String,
            escalationLevel: dictionary["escalationLevel"] as? String
        )
    }
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
        return MonggleSnapshotDecoder.entry(from: store.dictionary(forKey: "widget_snapshot_v1"))
    }
}

struct MonggleWidgetView: View {
    @Environment(\.widgetFamily) private var family
    let entry: MonggleEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(entry.titleLine).font(.caption.bold()).foregroundStyle(entry.isExtended ? Color(red: 1, green: 0.88, blue: 0.54) : .white.opacity(0.8))
            ForEach(Array(entry.orderedTasks.prefix(family == .systemSmall ? 1 : 3))) { task in
                Text(task.title).font(family == .systemSmall ? .headline : .subheadline).foregroundStyle(.white).lineLimit(1)
            }
            if let firstActionLine = entry.firstActionLine {
                Text(firstActionLine).font(.caption2.bold()).foregroundStyle(Color(red: 1, green: 0.95, blue: 0.78)).lineLimit(1)
            }
            Spacer(minLength: 2)
            if let task = entry.orderedTasks.first {
                HStack(spacing: 5) {
                    Button(intent: CompleteTaskIntent(taskID: task.id)) { Text("했어") }
                    Button(intent: KeepWorkingIntent(taskID: task.id)) { Text("하는 중") }
                    Button(intent: RemindLaterIntent(taskID: task.id)) { Text("나중에") }
                }.font(.caption2)
            }
        }
        .containerBackground(for: .widget) {
            LinearGradient(
                colors: entry.isExtended
                    ? [Color(red: 0.25, green: 0.12, blue: 0.37), Color(red: 0.54, green: 0.31, blue: 0.62)]
                    : [Color(red: 0.2, green: 0.12, blue: 0.35), Color(red: 0.44, green: 0.32, blue: 0.72)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        }
        .overlay {
            if entry.isExtended {
                RoundedRectangle(cornerRadius: 20).stroke(Color(red: 1, green: 0.88, blue: 0.54), lineWidth: 2)
            }
        }
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
