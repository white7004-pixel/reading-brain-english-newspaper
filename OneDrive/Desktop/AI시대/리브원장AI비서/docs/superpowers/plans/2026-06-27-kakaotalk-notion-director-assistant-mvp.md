# KakaoTalk Notion Director Assistant MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Windows laptop-run MVP that turns selected KakaoTalk group chat text and downloaded files into categorized Notion-ready tasks, events, materials, ideas, and a daily summary.

**Architecture:** Use a small Python package with clear ports: source ingestion, local archive/state, AI extraction, Notion writing, and a CLI launcher. The MVP can run against sample exported/copied chat text first, then adds a defensive PC KakaoTalk clipboard collection prototype for one selected chat room.

**Tech Stack:** Python 3.11+, pytest, pydantic, typer, python-dotenv, httpx, Notion API, OpenAI API, pyperclip, pyautogui.

---

## Scope Check

The full design includes several subsystems: KakaoTalk PC automation, AI classification, Notion database writing, attachment archiving, deduplication, and daily summaries. This plan implements one testable MVP slice:

1. Parse copied or exported KakaoTalk text.
2. Archive raw source and attachment metadata locally.
3. Extract structured items with a deterministic fallback classifier and an OpenAI-backed classifier.
4. Write extracted items to Notion when credentials are configured.
5. Generate a daily summary.
6. Add a basic PC KakaoTalk clipboard collection command that can be manually verified.

KakaoTalk always-on monitoring and KakaoTalk outbound notifications are intentionally deferred.

## File Structure

- Create: `pyproject.toml` - package metadata, dependencies, test config.
- Create: `.env.example` - required environment variables without secrets.
- Create: `README.md` - operator setup and MVP run instructions.
- Create: `src/rb_assistant/__init__.py` - package marker.
- Create: `src/rb_assistant/config.py` - environment and path configuration.
- Create: `src/rb_assistant/models.py` - pydantic data models shared across the app.
- Create: `src/rb_assistant/archive.py` - local raw source archive, file hashing, sync state.
- Create: `src/rb_assistant/parser.py` - KakaoTalk text parsing into message records.
- Create: `src/rb_assistant/classifier.py` - deterministic classifier plus OpenAI extraction port.
- Create: `src/rb_assistant/notion_client.py` - Notion API writer with dry-run mode.
- Create: `src/rb_assistant/summary.py` - daily summary builder.
- Create: `src/rb_assistant/kakaotalk_pc.py` - Windows PC KakaoTalk clipboard automation prototype.
- Create: `src/rb_assistant/cli.py` - Typer CLI commands.
- Create: `tests/fixtures/kakaotalk_sample.txt` - realistic sample chat text.
- Create: `tests/test_parser.py` - parser tests.
- Create: `tests/test_archive.py` - archive and dedup tests.
- Create: `tests/test_classifier.py` - classification tests.
- Create: `tests/test_summary.py` - summary tests.
- Create: `tests/test_cli.py` - CLI dry-run integration test.

## Task 1: Project Scaffold

**Files:**
- Create: `pyproject.toml`
- Create: `.env.example`
- Create: `README.md`
- Create: `src/rb_assistant/__init__.py`
- Create: `src/rb_assistant/config.py`
- Create: `tests/test_config.py`

- [ ] **Step 1: Write the failing config test**

Create `tests/test_config.py`:

```python
from pathlib import Path

from rb_assistant.config import Settings


def test_settings_uses_local_data_dir(tmp_path: Path):
    settings = Settings(data_dir=tmp_path, notion_parent_page_id="page", openai_api_key="key")

    assert settings.raw_dir == tmp_path / "raw"
    assert settings.files_dir == tmp_path / "files"
    assert settings.state_path == tmp_path / "sync_state.json"
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pytest tests/test_config.py -v`

Expected: FAIL with `ModuleNotFoundError: No module named 'rb_assistant'`.

- [ ] **Step 3: Add package metadata and dependencies**

Create `pyproject.toml`:

```toml
[project]
name = "reading-brain-director-assistant"
version = "0.1.0"
description = "KakaoTalk to Notion assistant for a Reading Brain academy director"
requires-python = ">=3.11"
dependencies = [
  "httpx>=0.27.0",
  "openai>=1.40.0",
  "pydantic>=2.8.0",
  "python-dotenv>=1.0.1",
  "typer>=0.12.3",
  "rich>=13.7.1",
  "pyperclip>=1.9.0",
  "pyautogui>=0.9.54"
]

[project.optional-dependencies]
dev = ["pytest>=8.2.0", "pytest-mock>=3.14.0"]

[project.scripts]
rb-assistant = "rb_assistant.cli:app"

[build-system]
requires = ["setuptools>=70.0"]
build-backend = "setuptools.build_meta"

[tool.setuptools.packages.find]
where = ["src"]

[tool.pytest.ini_options]
pythonpath = ["src"]
testpaths = ["tests"]
```

- [ ] **Step 4: Add settings implementation**

Create `src/rb_assistant/__init__.py`:

```python
__all__ = ["__version__"]

__version__ = "0.1.0"
```

Create `src/rb_assistant/config.py`:

```python
from dataclasses import dataclass
import os
from pathlib import Path

from dotenv import load_dotenv


@dataclass(frozen=True)
class Settings:
    data_dir: Path
    notion_parent_page_id: str
    openai_api_key: str
    notion_token: str | None = None
    notion_tasks_db_id: str | None = None
    notion_events_db_id: str | None = None
    notion_materials_db_id: str | None = None
    notion_ideas_db_id: str | None = None
    selected_chat_name: str | None = None

    @property
    def raw_dir(self) -> Path:
        return self.data_dir / "raw"

    @property
    def files_dir(self) -> Path:
        return self.data_dir / "files"

    @property
    def state_path(self) -> Path:
        return self.data_dir / "sync_state.json"


def load_settings() -> Settings:
    load_dotenv()
    data_dir = Path(os.getenv("RB_ASSISTANT_DATA_DIR", ".rb_assistant_data")).resolve()
    return Settings(
        data_dir=data_dir,
        notion_parent_page_id=os.getenv("NOTION_PARENT_PAGE_ID", ""),
        openai_api_key=os.getenv("OPENAI_API_KEY", ""),
        notion_token=os.getenv("NOTION_TOKEN"),
        notion_tasks_db_id=os.getenv("NOTION_TASKS_DB_ID"),
        notion_events_db_id=os.getenv("NOTION_EVENTS_DB_ID"),
        notion_materials_db_id=os.getenv("NOTION_MATERIALS_DB_ID"),
        notion_ideas_db_id=os.getenv("NOTION_IDEAS_DB_ID"),
        selected_chat_name=os.getenv("KAKAOTALK_CHAT_NAME"),
    )
```

- [ ] **Step 5: Add operator environment template and README**

Create `.env.example`:

```bash
RB_ASSISTANT_DATA_DIR=.rb_assistant_data
OPENAI_API_KEY=replace_me
NOTION_TOKEN=replace_me
NOTION_PARENT_PAGE_ID=replace_me
NOTION_TASKS_DB_ID=
NOTION_EVENTS_DB_ID=
NOTION_MATERIALS_DB_ID=
NOTION_IDEAS_DB_ID=
KAKAOTALK_CHAT_NAME=replace_with_selected_group_chat_name
```

Create `README.md`:

```markdown
# Reading Brain Director Assistant

This MVP organizes selected KakaoTalk academy-director group chat content into Notion.

## Setup

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -e ".[dev]"
copy .env.example .env
```

Fill in `.env` with OpenAI and Notion credentials.

## First Safe Run

```powershell
rb-assistant sync-file tests/fixtures/kakaotalk_sample.txt --dry-run
```

Use dry-run before connecting real Notion databases.
```

- [ ] **Step 6: Run the config test**

Run: `pytest tests/test_config.py -v`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add pyproject.toml .env.example README.md src/rb_assistant/__init__.py src/rb_assistant/config.py tests/test_config.py
git commit -m "chore: scaffold director assistant project"
```

## Task 2: Shared Models and KakaoTalk Parser

**Files:**
- Create: `src/rb_assistant/models.py`
- Create: `src/rb_assistant/parser.py`
- Create: `tests/fixtures/kakaotalk_sample.txt`
- Create: `tests/test_parser.py`

- [ ] **Step 1: Write the parser fixture**

Create `tests/fixtures/kakaotalk_sample.txt`:

```text
2026. 6. 27. 오후 2:01, 김원장 : 다음주 화요일 8시에 리딩 설명회 신청 마감입니다.
2026. 6. 27. 오후 2:04, 박원장 : 첨부파일: 여름방학_특강_홍보문.pdf
2026. 6. 27. 오후 2:10, 이원장 : 재등록 상담은 시험 끝난 주 금요일에 바로 잡는 게 좋았습니다.
```

- [ ] **Step 2: Write the failing parser tests**

Create `tests/test_parser.py`:

```python
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
```

- [ ] **Step 3: Run tests to verify failure**

Run: `pytest tests/test_parser.py -v`

Expected: FAIL with missing `rb_assistant.parser` or missing models.

- [ ] **Step 4: Implement shared models**

Create `src/rb_assistant/models.py`:

```python
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
```

- [ ] **Step 5: Implement parser**

Create `src/rb_assistant/parser.py`:

```python
from datetime import datetime
import re

from rb_assistant.models import ChatMessage


LINE_RE = re.compile(
    r"^(?P<date>\d{4}\. \d{1,2}\. \d{1,2}\.) (?P<ampm>오전|오후) "
    r"(?P<hour>\d{1,2}):(?P<minute>\d{2}), (?P<sender>[^:]+) : (?P<text>.*)$"
)
ATTACHMENT_PREFIX = "첨부파일:"


def _parse_korean_datetime(date_text: str, ampm: str, hour_text: str, minute_text: str) -> datetime:
    year, month, day = [int(part.strip()) for part in date_text.replace(".", " ").split()]
    hour = int(hour_text)
    minute = int(minute_text)
    if ampm == "오후" and hour != 12:
        hour += 12
    if ampm == "오전" and hour == 12:
        hour = 0
    return datetime(year, month, day, hour, minute)


def parse_kakaotalk_text(text: str, source_chat: str) -> list[ChatMessage]:
    messages: list[ChatMessage] = []
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line:
            continue
        match = LINE_RE.match(line)
        if not match:
            if messages:
                messages[-1].text = f"{messages[-1].text}\n{line}"
            continue
        body = match.group("text").strip()
        attachment_names: list[str] = []
        if body.startswith(ATTACHMENT_PREFIX):
            attachment_names = [body.removeprefix(ATTACHMENT_PREFIX).strip()]
        messages.append(
            ChatMessage(
                source_chat=source_chat,
                sender=match.group("sender").strip(),
                sent_at=_parse_korean_datetime(
                    match.group("date"),
                    match.group("ampm"),
                    match.group("hour"),
                    match.group("minute"),
                ),
                text=body,
                attachment_names=attachment_names,
            )
        )
    return messages
```

- [ ] **Step 6: Run parser tests**

Run: `pytest tests/test_parser.py -v`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/rb_assistant/models.py src/rb_assistant/parser.py tests/fixtures/kakaotalk_sample.txt tests/test_parser.py
git commit -m "feat: parse kakaotalk chat text"
```

## Task 3: Local Archive, File Hashing, and Sync State

**Files:**
- Create: `src/rb_assistant/archive.py`
- Create: `tests/test_archive.py`

- [ ] **Step 1: Write failing archive tests**

Create `tests/test_archive.py`:

```python
from datetime import datetime
from pathlib import Path

from rb_assistant.archive import LocalArchive
from rb_assistant.models import ChatMessage


def test_archive_raw_text_and_state(tmp_path: Path):
    archive = LocalArchive(tmp_path)
    message = ChatMessage(
        source_chat="원장단톡방",
        sender="김원장",
        sent_at=datetime(2026, 6, 27, 14, 1),
        text="신청 마감입니다.",
    )

    raw_path = archive.save_raw_text("원장단톡방", "hello")
    archive.mark_processed([message])

    assert raw_path.exists()
    assert archive.was_processed(message)


def test_archive_hashes_files(tmp_path: Path):
    source = tmp_path / "source.pdf"
    source.write_bytes(b"sample")
    archive = LocalArchive(tmp_path / "data")

    archived = archive.archive_file(source)

    assert archived.sha256 == "af2bdbe1aa9b6ec1e2adе1d694f41fc71a831d0268e9891562113d8a62add1bf".replace("е", "e")
    assert archived.path.exists()
```

- [ ] **Step 2: Run tests to verify failure**

Run: `pytest tests/test_archive.py -v`

Expected: FAIL with missing `LocalArchive`.

- [ ] **Step 3: Implement archive**

Create `src/rb_assistant/archive.py`:

```python
from datetime import datetime
import hashlib
import json
from pathlib import Path
import shutil

from rb_assistant.models import ArchivedFile, ChatMessage


class LocalArchive:
    def __init__(self, data_dir: Path):
        self.data_dir = data_dir
        self.raw_dir = data_dir / "raw"
        self.files_dir = data_dir / "files"
        self.state_path = data_dir / "sync_state.json"
        self.raw_dir.mkdir(parents=True, exist_ok=True)
        self.files_dir.mkdir(parents=True, exist_ok=True)

    def _load_state(self) -> dict:
        if not self.state_path.exists():
            return {"processed": []}
        return json.loads(self.state_path.read_text(encoding="utf-8"))

    def _save_state(self, state: dict) -> None:
        self.state_path.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")

    def save_raw_text(self, source_chat: str, text: str) -> Path:
        safe_chat = "".join(ch if ch.isalnum() else "_" for ch in source_chat)
        stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        path = self.raw_dir / f"{stamp}_{safe_chat}.txt"
        path.write_text(text, encoding="utf-8")
        return path

    def was_processed(self, message: ChatMessage) -> bool:
        state = self._load_state()
        return message.fingerprint in set(state.get("processed", []))

    def mark_processed(self, messages: list[ChatMessage]) -> None:
        state = self._load_state()
        processed = set(state.get("processed", []))
        processed.update(message.fingerprint for message in messages)
        state["processed"] = sorted(processed)
        self._save_state(state)

    def archive_file(self, source: Path) -> ArchivedFile:
        digest = hashlib.sha256(source.read_bytes()).hexdigest()
        target = self.files_dir / f"{digest[:12]}_{source.name}"
        if not target.exists():
            shutil.copy2(source, target)
        return ArchivedFile(path=target, sha256=digest, size_bytes=target.stat().st_size)
```

- [ ] **Step 4: Run archive tests**

Run: `pytest tests/test_archive.py -v`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/rb_assistant/archive.py tests/test_archive.py
git commit -m "feat: add local source archive"
```

## Task 4: Classifier and AI Extraction Port

**Files:**
- Create: `src/rb_assistant/classifier.py`
- Create: `tests/test_classifier.py`

- [ ] **Step 1: Write failing classifier tests**

Create `tests/test_classifier.py`:

```python
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
```

- [ ] **Step 2: Run tests to verify failure**

Run: `pytest tests/test_classifier.py -v`

Expected: FAIL with missing `rb_assistant.classifier`.

- [ ] **Step 3: Implement rule-based classifier and AI port**

Create `src/rb_assistant/classifier.py`:

```python
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
```

- [ ] **Step 4: Run classifier tests**

Run: `pytest tests/test_classifier.py -v`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/rb_assistant/classifier.py tests/test_classifier.py
git commit -m "feat: classify chat items"
```

## Task 5: Summary Builder

**Files:**
- Create: `src/rb_assistant/summary.py`
- Create: `tests/test_summary.py`

- [ ] **Step 1: Write failing summary test**

Create `tests/test_summary.py`:

```python
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
```

- [ ] **Step 2: Run test to verify failure**

Run: `pytest tests/test_summary.py -v`

Expected: FAIL with missing `rb_assistant.summary`.

- [ ] **Step 3: Implement summary builder**

Create `src/rb_assistant/summary.py`:

```python
from rb_assistant.models import ExtractedItem, ItemKind, Priority


def build_daily_summary(items: list[ExtractedItem]) -> str:
    tasks = sorted(
        [item for item in items if item.kind == ItemKind.TASK],
        key=lambda item: _priority_rank(item.priority),
    )[:3]
    events = [item for item in items if item.kind == ItemKind.EVENT]
    materials = [item for item in items if item.kind == ItemKind.MATERIAL]
    ideas = [item for item in items if item.kind == ItemKind.IDEA]
    review = [item for item in items if item.review_needed]

    sections = [
        ("Top 3 Things To Do", tasks),
        ("Upcoming Deadlines And Events", events),
        ("New Materials", materials),
        ("Operation Ideas", ideas),
        ("Needs Review", review),
    ]
    lines: list[str] = ["# Daily Director Brief", ""]
    for title, section_items in sections:
        lines.append(f"## {title}")
        if not section_items:
            lines.append("- None")
        else:
            for item in section_items:
                lines.append(f"- [{item.priority}] {item.title}")
        lines.append("")
    return "\n".join(lines).strip()


def _priority_rank(priority: Priority) -> int:
    return {Priority.HIGH: 0, Priority.MEDIUM: 1, Priority.LOW: 2}[priority]
```

- [ ] **Step 4: Run summary test**

Run: `pytest tests/test_summary.py -v`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/rb_assistant/summary.py tests/test_summary.py
git commit -m "feat: build daily director summary"
```

## Task 6: Notion Writer with Dry-Run Mode

**Files:**
- Create: `src/rb_assistant/notion_client.py`
- Create: `tests/test_notion_client.py`

- [ ] **Step 1: Write failing dry-run Notion tests**

Create `tests/test_notion_client.py`:

```python
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
```

- [ ] **Step 2: Run test to verify failure**

Run: `pytest tests/test_notion_client.py -v`

Expected: FAIL with missing `rb_assistant.notion_client`.

- [ ] **Step 3: Implement dry-run and real Notion writer**

Create `src/rb_assistant/notion_client.py`:

```python
from typing import Protocol

import httpx

from rb_assistant.config import Settings
from rb_assistant.models import ExtractedItem, ItemKind


class NotionWriter(Protocol):
    def write_items(self, items: list[ExtractedItem]) -> None:
        ...

    def write_daily_summary(self, markdown: str) -> None:
        ...


class DryRunNotionWriter:
    def __init__(self) -> None:
        self.items: list[ExtractedItem] = []
        self.daily_summaries: list[str] = []

    def write_items(self, items: list[ExtractedItem]) -> None:
        self.items.extend(items)

    def write_daily_summary(self, markdown: str) -> None:
        self.daily_summaries.append(markdown)


class HttpNotionWriter:
    def __init__(self, settings: Settings):
        if not settings.notion_token:
            raise ValueError("NOTION_TOKEN is required for Notion writes.")
        self.settings = settings
        self.client = httpx.Client(
            base_url="https://api.notion.com/v1",
            headers={
                "Authorization": f"Bearer {settings.notion_token}",
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            },
            timeout=30,
        )

    def write_items(self, items: list[ExtractedItem]) -> None:
        for item in items:
            database_id = self._database_for(item.kind)
            if not database_id:
                continue
            payload = {
                "parent": {"database_id": database_id},
                "properties": {
                    "Title": {"title": [{"text": {"content": item.title}}]},
                    "Priority": {"select": {"name": item.priority.value}},
                    "Source chat": {"rich_text": [{"text": {"content": item.source_chat}}]},
                    "Review needed": {"checkbox": item.review_needed},
                },
                "children": [
                    {
                        "object": "block",
                        "type": "paragraph",
                        "paragraph": {"rich_text": [{"type": "text", "text": {"content": item.summary}}]},
                    }
                ],
            }
            response = self.client.post("/pages", json=payload)
            response.raise_for_status()

    def write_daily_summary(self, markdown: str) -> None:
        if not self.settings.notion_parent_page_id:
            return
        payload = {
            "parent": {"page_id": self.settings.notion_parent_page_id},
            "properties": {"title": {"title": [{"text": {"content": "Daily Director Brief"}}]}},
            "children": [
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {"rich_text": [{"type": "text", "text": {"content": markdown[:1900]}}]},
                }
            ],
        }
        response = self.client.post("/pages", json=payload)
        response.raise_for_status()

    def _database_for(self, kind: ItemKind) -> str | None:
        return {
            ItemKind.TASK: self.settings.notion_tasks_db_id,
            ItemKind.EVENT: self.settings.notion_events_db_id,
            ItemKind.MATERIAL: self.settings.notion_materials_db_id,
            ItemKind.IDEA: self.settings.notion_ideas_db_id,
            ItemKind.REVIEW: self.settings.notion_tasks_db_id,
        }[kind]
```

- [ ] **Step 4: Run Notion dry-run tests**

Run: `pytest tests/test_notion_client.py -v`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/rb_assistant/notion_client.py tests/test_notion_client.py
git commit -m "feat: add notion writer port"
```

## Task 7: CLI Sync From File

**Files:**
- Create: `src/rb_assistant/cli.py`
- Create: `tests/test_cli.py`

- [ ] **Step 1: Write failing CLI test**

Create `tests/test_cli.py`:

```python
from typer.testing import CliRunner

from rb_assistant.cli import app


def test_sync_file_dry_run_outputs_summary():
    runner = CliRunner()

    result = runner.invoke(app, ["sync-file", "tests/fixtures/kakaotalk_sample.txt", "--source-chat", "원장단톡방", "--dry-run"])

    assert result.exit_code == 0
    assert "Daily Director Brief" in result.stdout
    assert "New Materials" in result.stdout
```

- [ ] **Step 2: Run CLI test to verify failure**

Run: `pytest tests/test_cli.py -v`

Expected: FAIL with missing `rb_assistant.cli`.

- [ ] **Step 3: Implement CLI**

Create `src/rb_assistant/cli.py`:

```python
from pathlib import Path

from rich.console import Console
import typer

from rb_assistant.archive import LocalArchive
from rb_assistant.classifier import RuleBasedClassifier
from rb_assistant.config import load_settings
from rb_assistant.notion_client import DryRunNotionWriter, HttpNotionWriter
from rb_assistant.parser import parse_kakaotalk_text
from rb_assistant.summary import build_daily_summary


app = typer.Typer(help="Reading Brain director assistant")
console = Console()


@app.command()
def sync_file(
    path: Path,
    source_chat: str = typer.Option("원장단톡방", help="Selected KakaoTalk room name."),
    dry_run: bool = typer.Option(True, help="Do not write to Notion."),
) -> None:
    settings = load_settings()
    archive = LocalArchive(settings.data_dir)
    text = path.read_text(encoding="utf-8")
    archive.save_raw_text(source_chat, text)
    messages = parse_kakaotalk_text(text, source_chat=source_chat)
    new_messages = [message for message in messages if not archive.was_processed(message)]
    items = RuleBasedClassifier().classify(new_messages)
    summary = build_daily_summary(items)
    writer = DryRunNotionWriter() if dry_run else HttpNotionWriter(settings)
    writer.write_items(items)
    writer.write_daily_summary(summary)
    archive.mark_processed(new_messages)
    console.print(summary)
    console.print(f"\nProcessed messages: {len(new_messages)}")
    console.print(f"Extracted items: {len(items)}")
```

- [ ] **Step 4: Run CLI test**

Run: `pytest tests/test_cli.py -v`

Expected: PASS.

- [ ] **Step 5: Run full test suite**

Run: `pytest -v`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/rb_assistant/cli.py tests/test_cli.py
git commit -m "feat: add file sync command"
```

## Task 8: PC KakaoTalk Clipboard Collection Prototype

**Files:**
- Create: `src/rb_assistant/kakaotalk_pc.py`
- Modify: `src/rb_assistant/cli.py`
- Create: `tests/test_kakaotalk_pc.py`

- [ ] **Step 1: Write failing automation helper tests**

Create `tests/test_kakaotalk_pc.py`:

```python
from rb_assistant.kakaotalk_pc import normalize_clipboard_text


def test_normalize_clipboard_text_strips_noise():
    text = "\ufeff\n2026. 6. 27. 오후 2:01, 김원장 : 신청 마감입니다.\r\n"

    assert normalize_clipboard_text(text) == "2026. 6. 27. 오후 2:01, 김원장 : 신청 마감입니다."
```

- [ ] **Step 2: Run test to verify failure**

Run: `pytest tests/test_kakaotalk_pc.py -v`

Expected: FAIL with missing `rb_assistant.kakaotalk_pc`.

- [ ] **Step 3: Implement defensive clipboard collector**

Create `src/rb_assistant/kakaotalk_pc.py`:

```python
import time

import pyautogui
import pyperclip


def normalize_clipboard_text(text: str) -> str:
    return text.replace("\ufeff", "").replace("\r\n", "\n").strip()


def collect_visible_chat_text(wait_seconds: float = 0.5) -> str:
    pyperclip.copy("")
    pyautogui.hotkey("ctrl", "a")
    time.sleep(wait_seconds)
    pyautogui.hotkey("ctrl", "c")
    time.sleep(wait_seconds)
    text = normalize_clipboard_text(pyperclip.paste())
    if not text:
        raise RuntimeError("No KakaoTalk text was copied. Open the selected chat room and try again.")
    return text
```

- [ ] **Step 4: Add CLI command for manual PC KakaoTalk sync**

Modify `src/rb_assistant/cli.py` by adding the import:

```python
from rb_assistant.kakaotalk_pc import collect_visible_chat_text
```

Add this command below `sync_file`:

```python
@app.command()
def sync_visible_kakaotalk(
    source_chat: str = typer.Option("원장단톡방", help="Selected KakaoTalk room name."),
    dry_run: bool = typer.Option(True, help="Do not write to Notion."),
) -> None:
    settings = load_settings()
    archive = LocalArchive(settings.data_dir)
    console.print("Open the selected PC KakaoTalk room, click inside the message area, then press Enter.")
    input()
    text = collect_visible_chat_text()
    raw_path = archive.save_raw_text(source_chat, text)
    messages = parse_kakaotalk_text(text, source_chat=source_chat)
    new_messages = [message for message in messages if not archive.was_processed(message)]
    items = RuleBasedClassifier().classify(new_messages)
    summary = build_daily_summary(items)
    writer = DryRunNotionWriter() if dry_run else HttpNotionWriter(settings)
    writer.write_items(items)
    writer.write_daily_summary(summary)
    archive.mark_processed(new_messages)
    console.print(summary)
    console.print(f"\nRaw text saved to: {raw_path}")
    console.print(f"Processed messages: {len(new_messages)}")
    console.print(f"Extracted items: {len(items)}")
```

- [ ] **Step 5: Run automation helper test**

Run: `pytest tests/test_kakaotalk_pc.py -v`

Expected: PASS.

- [ ] **Step 6: Run full test suite**

Run: `pytest -v`

Expected: PASS.

- [ ] **Step 7: Manually verify on Windows laptop**

Run:

```powershell
rb-assistant sync-visible-kakaotalk --source-chat "원장단톡방" --dry-run
```

Expected: The command waits for Enter, copies visible PC KakaoTalk text, saves raw text under `.rb_assistant_data/raw`, prints a daily summary, and does not write to Notion.

- [ ] **Step 8: Commit**

```bash
git add src/rb_assistant/kakaotalk_pc.py src/rb_assistant/cli.py tests/test_kakaotalk_pc.py
git commit -m "feat: collect visible kakaotalk text"
```

## Task 9: Operator Documentation and Safety Checks

**Files:**
- Modify: `README.md`
- Create: `docs/operator-runbook.md`

- [ ] **Step 1: Add runbook content**

Create `docs/operator-runbook.md`:

```markdown
# Operator Runbook

## Daily Use

1. Open the personal laptop.
2. Confirm PC KakaoTalk is logged in.
3. Open the selected academy-director group chat.
4. Run:

```powershell
rb-assistant sync-visible-kakaotalk --source-chat "원장단톡방" --dry-run
```

5. Review the summary.
6. If the summary looks correct and Notion IDs are configured, run:

```powershell
rb-assistant sync-visible-kakaotalk --source-chat "원장단톡방" --no-dry-run
```

## Recovery

- If no text is copied, click inside the KakaoTalk message area and run again.
- If results are duplicated, remove `.rb_assistant_data/sync_state.json` only after backing up `.rb_assistant_data/raw`.
- If Notion writes fail, run with `--dry-run` and check `.env` database IDs.

## Privacy

Only collect rooms selected by the director. Do not send raw group chat exports to other chat rooms.
```

- [ ] **Step 2: Update README with runbook link**

Append to `README.md`:

```markdown
## Operator Runbook

See `docs/operator-runbook.md` for daily use and recovery steps.
```

- [ ] **Step 3: Run full test suite**

Run: `pytest -v`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add README.md docs/operator-runbook.md
git commit -m "docs: add operator runbook"
```

## Self-Review

Spec coverage:

- Selected KakaoTalk group chat source: covered by Tasks 2, 7, and 8.
- Laptop-run sync workflow: covered by Tasks 7, 8, and 9.
- Local raw archive and sync state: covered by Task 3.
- Attachment metadata and file hashing: covered by Task 3 and material classification in Task 4.
- AI extraction path: covered by Task 4, with rule-based fallback and OpenAI port.
- Notion writing: covered by Task 6.
- Daily summary: covered by Task 5.
- Defensive recovery messages: covered by Task 8 and Task 9.

Deferred by design:

- Full automatic file downloads from KakaoTalk attachment UI.
- Always-on monitoring.
- KakaoTalk outbound notifications.
- Automatic Notion database creation.

Placeholder scan:

- No placeholder markers are used.
- Each code-producing step includes concrete code.
- Each test step includes exact commands and expected result.

Type consistency:

- `ChatMessage`, `ExtractedItem`, `ItemKind`, and `Priority` are defined in Task 2 and reused consistently.
- `LocalArchive`, `RuleBasedClassifier`, `DryRunNotionWriter`, and `build_daily_summary` signatures match their use in CLI tasks.
