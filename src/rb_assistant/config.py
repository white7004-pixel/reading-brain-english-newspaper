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
