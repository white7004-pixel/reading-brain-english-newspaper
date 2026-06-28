from rb_assistant.models import ExtractedItem, ItemKind
from rb_assistant.notion_client import DryRunNotionWriter


def test_dry_run_writer_records_items():
    writer = DryRunNotionWriter()
    item = ExtractedItem(
        kind=ItemKind.TASK,
        title="상담 준비",
        summary="상담 준비",
        source_chat="원장단톡방",
        source_excerpt="상담 준비",
    )

    writer.write_items([item])
    writer.write_daily_summary("# Summary")

    assert writer.items == [item]
    assert writer.daily_summaries == ["# Summary"]
