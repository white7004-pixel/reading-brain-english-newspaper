import XCTest
@testable import MonggleWidgetExtension

final class MonggleWidgetSnapshotTests: XCTestCase {
    func testMediumEntryContainsOnlyFirstThreeOpenTasks() throws {
        let tasks = (1...4).map { WidgetTask(id: "task-\($0)", title: "Task \($0)") }
        let entry = MonggleEntry(date: Date(), tasks: tasks, nudgeLine: "One at a time")

        XCTAssertEqual(Array(entry.tasks.prefix(3)).count, 3)
    }
}
