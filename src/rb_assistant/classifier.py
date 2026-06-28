import json
from typing import Protocol

from openai import OpenAI

from rb_assistant.models import ChatMessage, ExtractedItem, ItemKind, Priority


class Classifier(Protocol):
    def classify(self, messages: list[ChatMessage]) -> list[ExtractedItem]:
        ...


class RuleBasedClassifier:
    def classify(self, messages: list[ChatMessage]) -> list[ExtractedItem]:
        items: list[ExtractedItem] = []
        for message in messages:
            text = message.text
            if message.attachment_names:
                items.append(
                    ExtractedItem(
                        kind=ItemKind.MATERIAL,
                        title=message.attachment_names[0],
                        summary=text,
                        source_chat=message.source_chat,
                        source_excerpt=text[:300],
                        material_type="file",
                        related_file=message.attachment_names[0],
                        confidence=0.8,
                    )
                )
            elif any(keyword in text for keyword in ["마감", "설명회", "세미나", "신청", "특강"]):
                items.append(
                    ExtractedItem(
                        kind=ItemKind.EVENT,
                        title=_short_title(text),
                        summary=text,
                        priority=Priority.HIGH if "마감" in text else Priority.MEDIUM,
                        source_chat=message.source_chat,
                        source_excerpt=text[:300],
                        review_needed=True,
                        confidence=0.65,
                    )
                )
            elif any(keyword in text for keyword in ["해야", "확인", "준비", "보내", "전화"]):
                items.append(
                    ExtractedItem(
                        kind=ItemKind.TASK,
                        title=_short_title(text),
                        summary=text,
                        source_chat=message.source_chat,
                        source_excerpt=text[:300],
                        review_needed=True,
                        confidence=0.6,
                    )
                )
            elif any(keyword in text for keyword in ["좋았습니다", "효과", "추천", "방법", "전략", "재등록"]):
                items.append(
                    ExtractedItem(
                        kind=ItemKind.IDEA,
                        title=_short_title(text),
                        summary=text,
                        source_chat=message.source_chat,
                        source_excerpt=text[:300],
                        suggested_next_action="Review whether this can apply to Reading Brain.",
                        confidence=0.7,
                    )
                )
        return items


class OpenAIClassifier:
    def __init__(self, api_key: str, model: str = "gpt-4.1-mini"):
        self.client = OpenAI(api_key=api_key)
        self.model = model

    def classify(self, messages: list[ChatMessage]) -> list[ExtractedItem]:
        payload = [message.model_dump(mode="json") for message in messages]
        response = self.client.responses.create(
            model=self.model,
            input=[
                {
                    "role": "system",
                    "content": "Extract only useful academy director tasks, events, materials, and ideas. Return JSON list.",
                },
                {"role": "user", "content": json.dumps(payload, ensure_ascii=False)},
            ],
        )
        data = json.loads(response.output_text)
        return [ExtractedItem.model_validate(item) for item in data]


def _short_title(text: str) -> str:
    clean = text.replace("\n", " ").strip()
    return clean[:40] + ("..." if len(clean) > 40 else "")
