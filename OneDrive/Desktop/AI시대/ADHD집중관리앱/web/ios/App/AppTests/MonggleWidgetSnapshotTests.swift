import XCTest
@testable import MonggleWidgetExtension

final class MonggleWidgetSnapshotTests: XCTestCase {
    func testMediumEntryContainsOnlyFirstThreeOpenTasks() throws {
        let tasks = (1...4).map { WidgetTask(id: "task-\($0)", title: "Task \($0)") }
        let entry = MonggleEntry(date: Date(), tasks: tasks, nudgeLine: "One at a time")

        XCTAssertEqual(Array(entry.tasks.prefix(3)).count, 3)
    }

    func testExtendedSnapshotPromotesSelectedMissionAndAppliesWidgetPresentation() throws {
        let entry = MonggleSnapshotDecoder.entry(from: [
            "tasks": [
                ["id": "optional", "title": "수학 숙제"],
                ["id": "required", "title": "독서"]
            ],
            "nudgeLine": "몽글이와 한 가지씩 해봐요",
            "currentMissionId": "required",
            "commitmentDay": "2026-08-21",
            "firstAction": "책 펼치기",
            "escalationLevel": "widget"
        ], date: Date(timeIntervalSince1970: 0))

        XCTAssertEqual(entry.orderedTasks.first?.id, "required")
        XCTAssertEqual(entry.titleLine, "오늘 연장 완료 모드 · 2026-08-21")
        XCTAssertEqual(entry.firstActionLine, "첫 행동 · 책 펼치기")
        XCTAssertTrue(entry.isExtended)
    }

    func testLegacySnapshotKeepsOriginalCopyOrderAndStyle() throws {
        let entry = MonggleSnapshotDecoder.entry(from: [
            "tasks": [
                ["id": "optional", "title": "수학 숙제"],
                ["id": "required", "title": "독서"]
            ],
            "nudgeLine": "몽글이와 한 가지씩 해봐요"
        ], date: Date(timeIntervalSince1970: 0))

        XCTAssertEqual(entry.orderedTasks.first?.id, "optional")
        XCTAssertEqual(entry.titleLine, "몽글이와 한 가지씩 해봐요")
        XCTAssertNil(entry.firstActionLine)
        XCTAssertFalse(entry.isExtended)
    }

    func testPreMidnightSnapshotRendersExtendedAfterSeoulMidnightWithoutAppLaunch() throws {
        let snapshot: [String: Any] = [
            "generatedAt": "2026-08-21T14:59:00.000Z",
            "tasks": [["id": "required", "title": "Read"]],
            "nudgeLine": "One at a time",
            "currentMissionId": "required",
            "commitmentDay": "2026-08-21",
            "firstAction": "Open the book",
            "escalationLevel": "push"
        ]
        let afterMidnight = ISO8601DateFormatter().date(from: "2026-08-21T15:01:00Z")!

        let entry = MonggleSnapshotDecoder.entry(from: snapshot, date: afterMidnight)

        XCTAssertTrue(entry.isExtended)
        XCTAssertTrue(entry.titleLine.contains("2026-08-21"))
    }
}
