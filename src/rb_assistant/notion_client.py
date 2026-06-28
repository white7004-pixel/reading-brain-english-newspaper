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
