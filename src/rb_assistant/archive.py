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
