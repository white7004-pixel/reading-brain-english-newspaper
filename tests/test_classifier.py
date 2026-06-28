from datetime import datetime

from rb_assistant.classifier import RuleBasedClassifier
from rb_assistant.models import ChatMessage, ItemKind


def message(text: str) -> ChatMessage:
    return ChatMessage(source_chat="원장단톡방", sender="김원장", sent_at=datetime(2026, 6, 27, 14, 1), text=text)


def test_classifier_creates_event_for_deadline():
    items = RuleBasedClassifier().classify([message("다음주 화요일 8시에 설명회 신청 마감입니다.")])

    assert items[0].kind == ItemKind.EVENT
    assert "설명회" in items[0].title
    assert items[0].review_needed is True


def test_classifier_creates_material_for_attachment():
    msg = message("첨부파일: 여름방학_특강_홍보문.pdf")
    msg.attachment_names.append("여름방학_특강_홍보문.pdf")

    items = RuleBasedClassifier().classify([msg])

    assert items[0].kind == ItemKind.MATERIAL
    assert items[0].related_file == "여름방학_특강_홍보문.pdf"


def test_classifier_creates_idea_for_strategy_language():
    items = RuleBasedClassifier().classify([message("재등록 상담은 시험 끝난 주 금요일에 바로 잡는 게 좋았습니다.")])

    assert items[0].kind == ItemKind.IDEA
    assert "재등록" in items[0].title
