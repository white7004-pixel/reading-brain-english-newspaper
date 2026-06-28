from rb_assistant.models import ExtractedItem, ItemKind, Priority
from rb_assistant.summary import build_daily_summary


def item(kind: ItemKind, title: str, priority: Priority = Priority.MEDIUM) -> ExtractedItem:
    return ExtractedItem(
        kind=kind,
        title=title,
        summary=title,
        priority=priority,
        source_chat="원장단톡방",
        source_excerpt=title,
    )


def test_build_daily_summary_groups_items():
    summary = build_daily_summary(
        [
            item(ItemKind.TASK, "상담 준비", Priority.HIGH),
            item(ItemKind.EVENT, "설명회 신청 마감", Priority.HIGH),
            item(ItemKind.MATERIAL, "특강 홍보문.pdf"),
            item(ItemKind.IDEA, "재등록 상담 타이밍"),
        ]
    )

    assert "Top 3 Things To Do" in summary
    assert "상담 준비" in summary
    assert "Upcoming Deadlines And Events" in summary
    assert "New Materials" in summary
    assert "Operation Ideas" in summary
