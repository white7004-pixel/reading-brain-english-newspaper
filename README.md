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

## Operator Runbook

See `docs/operator-runbook.md` for daily use and recovery steps.
