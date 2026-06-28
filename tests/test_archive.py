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

    assert archived.sha256 == "af2bdbe1aa9b6ec1e2ade1d694f41fc71a831d0268e9891562113d8a62add1bf"
    assert archived.path.exists()
