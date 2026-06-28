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
