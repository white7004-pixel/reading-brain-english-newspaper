from datetime import datetime
from pathlib import Path

from rb_assistant.parser import parse_kakaotalk_text


def test_parse_kakaotalk_text_extracts_messages():
    text = Path("tests/fixtures/kakaotalk_sample.txt").read_text(encoding="utf-8")

    messages = parse_kakaotalk_text(text, source_chat="원장단톡방")

    assert len(messages) == 3
    assert messages[0].source_chat == "원장단톡방"
    assert messages[0].sender == "김원장"
    assert messages[0].sent_at == datetime(2026, 6, 27, 14, 1)
    assert "신청 마감" in messages[0].text


def test_parse_kakaotalk_text_detects_attachment_marker():
    text = Path("tests/fixtures/kakaotalk_sample.txt").read_text(encoding="utf-8")

    messages = parse_kakaotalk_text(text, source_chat="원장단톡방")

    assert messages[1].attachment_names == ["여름방학_특강_홍보문.pdf"]
