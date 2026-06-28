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
