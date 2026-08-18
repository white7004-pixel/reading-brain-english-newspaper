import json
import re
from pathlib import Path

import openpyxl


DATA_FILE = Path("data/expressions.js")
SOURCE_NAME = "4-2. \ud328\ud134\uc601\uc5b4-\uae30\uc801\uc758 \uc601\uc5b4\ubb38\uc7a5 \ud2b8\ub808\uc774\ub2dd 800.xlsx"
SOURCE_FILE = Path.home() / "OneDrive" / "Desktop" / SOURCE_NAME
SOURCE_CATEGORY = "\uae30\uc801\uc758 \uc601\uc5b4\ubb38\uc7a5 \ud2b8\ub808\uc774\ub2dd 800"


def load_expressions():
    text = DATA_FILE.read_text(encoding="utf-8")
    match = re.search(r"window\.EXPRESSIONS\s*=\s*(\[.*\]);\s*$", text, re.S)
    if not match:
        raise ValueError("Could not parse data/expressions.js")
    return json.loads(match.group(1))


def tokens_for(text):
    return re.findall(r"[A-Za-z']+|[?.!,]", text)


def normalize_english(text):
    return re.sub(r"\s+", " ", str(text).strip()).casefold()


def main():
    if not SOURCE_FILE.exists():
        raise FileNotFoundError(SOURCE_FILE)

    expressions = load_expressions()
    seen = {normalize_english(item["english"]) for item in expressions}
    next_id = max(int(item["id"]) for item in expressions) + 1

    workbook = openpyxl.load_workbook(SOURCE_FILE, read_only=True, data_only=True)
    sheet = workbook.active
    added = 0
    skipped = 0

    for row in sheet.iter_rows(values_only=True):
        english = str(row[2] or "").strip() if len(row) > 2 else ""
        korean = str(row[3] or "").strip() if len(row) > 3 else ""
        if not english or not korean:
            skipped += 1
            continue

        normalized = normalize_english(english)
        if normalized in seen:
            skipped += 1
            continue

        expressions.append(
            {
                "id": next_id,
                "english": english,
                "korean": korean,
                "category": SOURCE_CATEGORY,
                "pattern": SOURCE_CATEGORY,
                "level": "Brain",
                "tokens": tokens_for(english),
            }
        )
        seen.add(normalized)
        next_id += 1
        added += 1

    payload = json.dumps(expressions, ensure_ascii=False, indent=2)
    DATA_FILE.write_text(f"window.EXPRESSIONS = {payload};\n", encoding="utf-8")
    print(f"Added {added} expressions, skipped {skipped}. Total {len(expressions)}.")


if __name__ == "__main__":
    main()
