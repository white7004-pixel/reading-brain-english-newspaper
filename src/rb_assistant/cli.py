from pathlib import Path

from rich.console import Console
import typer

from rb_assistant.archive import LocalArchive
from rb_assistant.classifier import RuleBasedClassifier
from rb_assistant.config import load_settings
from rb_assistant.kakaotalk_pc import collect_visible_chat_text
from rb_assistant.notion_client import DryRunNotionWriter, HttpNotionWriter
from rb_assistant.parser import parse_kakaotalk_text
from rb_assistant.summary import build_daily_summary


app = typer.Typer(help="Reading Brain director assistant")
console = Console()


@app.command("sync-file")
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


@app.command("version")
def version() -> None:
    """Show the version of the CLI tool."""
    console.print("rb-assistant 0.1.0")
