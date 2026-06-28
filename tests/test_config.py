from pathlib import Path

from rb_assistant.config import Settings


def test_settings_uses_local_data_dir(tmp_path: Path):
    settings = Settings(data_dir=tmp_path, notion_parent_page_id="page", openai_api_key="key")

    assert settings.raw_dir == tmp_path / "raw"
    assert settings.files_dir == tmp_path / "files"
    assert settings.state_path == tmp_path / "sync_state.json"
