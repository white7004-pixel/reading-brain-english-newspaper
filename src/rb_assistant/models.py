from datetime import datetime
from enum import StrEnum
from pathlib import Path

from pydantic import BaseModel, Field


class ItemKind(StrEnum):
    TASK = "task"
    EVENT = "event"
    MATERIAL = "material"
    IDEA = "idea"
    REVIEW = "review"


class Priority(StrEnum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class ChatMessage(BaseModel):
    source_chat: str
    sender: str
    sent_at: datetime
    text: str
    attachment_names: list[str] = Field(default_factory=list)

    @property
    def fingerprint(self) -> str:
        return f"{self.source_chat}|{self.sent_at.isoformat()}|{self.sender}|{self.text}"


class ExtractedItem(BaseModel):
    kind: ItemKind
    title: str
    summary: str
    priority: Priority = Priority.MEDIUM
    source_chat: str
    source_excerpt: str
    due_date: str | None = None
    event_datetime: str | None = None
    registration_deadline: str | None = None
    material_type: str | None = None
    related_file: str | None = None
    suggested_next_action: str | None = None
    confidence: float = 0.6
    review_needed: bool = False


class ArchivedFile(BaseModel):
    path: Path
    sha256: str
    size_bytes: int
