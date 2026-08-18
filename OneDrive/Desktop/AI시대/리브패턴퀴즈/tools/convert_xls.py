import json
import re
from pathlib import Path

import xlrd


SOURCE = Path.home() / "Downloads" / "초등필수영어표현엑셀파일.xls"
OUTPUT = Path("data/expressions.js")


PATTERNS = [
    ("01. 인사와 소개 패턴", [r"^(hello|hi|good morning|good afternoon|good evening|nice to meet|glad to meet|pleased to meet)", r"name"]),
    ("02. I am / I'm 패턴", [r"^(i am|i'm)\b"]),
    ("03. You are / Are you 패턴", [r"^(you are|you're|are you)\b"]),
    ("04. This is / That is 패턴", [r"^(this is|that is|these are|those are)\b"]),
    ("05. He / She / It is 패턴", [r"^(he is|she is|it is|he's|she's|it's)\b"]),
    ("06. There is / There are 패턴", [r"^there (is|are)\b"]),
    ("07. I like / want / have 패턴", [r"^i (like|want|have|need|love|know|think|feel|see|hear)\b"]),
    ("08. Can I / Can you 패턴", [r"^can (i|you|we|he|she|they)\b", r"^could (i|you|we|he|she|they)\b"]),
    ("09. May I / Would you 패턴", [r"^may i\b", r"^would you\b", r"^will you\b", r"^please\b"]),
    ("10. Do you / Does he 패턴", [r"^do (i|you|we|they)\b", r"^does (he|she|it)\b", r"^did (i|you|he|she|we|they)\b"]),
    ("11. What 의문문 패턴", [r"^what\b", r"^what's\b", r"^what is\b"]),
    ("12. Who / Whose 의문문 패턴", [r"^(who|whose)\b", r"^who's\b", r"^who is\b"]),
    ("13. Where 의문문 패턴", [r"^where\b", r"^where's\b", r"^where is\b"]),
    ("14. When / What time 패턴", [r"^when\b", r"^what time\b"]),
    ("15. Why / How 의문문 패턴", [r"^(why|how)\b", r"^how's\b", r"^how is\b"]),
    ("16. 명령문 / 요청 패턴", [r"^(open|close|look|listen|read|write|sit|stand|come|go|turn|put|take|give|show|tell|help|try|be careful)\b"]),
    ("17. 감정 / 상태 표현 패턴", [r"\b(happy|sad|angry|tired|hungry|thirsty|sick|fine|okay|great|sorry|thank)\b"]),
    ("18. 시간 / 날짜 / 날씨 패턴", [r"\b(today|tomorrow|yesterday|week|month|year|time|weather|sunny|rainy|cloudy|hot|cold|warm|cool)\b"]),
    ("19. 장소 / 이동 패턴", [r"\b(go|come|home|school|park|library|classroom|store|here|there)\b"]),
    ("20. 기본 회화 응답 패턴", [r"^(yes|no|sure|of course|okay|all right|thanks|thank you|you're welcome|sorry)\b"]),
]


def pattern_for(text: str, number: int) -> str:
    normalized = text.lower().strip()
    for label, checks in PATTERNS:
        if any(re.search(check, normalized) for check in checks):
            return label
    if normalized.endswith("?"):
        return "21. 기타 질문 패턴"
    if number <= 120:
        return "22. 기초 문장 패턴"
    if number <= 240:
        return "23. 확장 문장 패턴"
    return "24. 실전 회화 패턴"


def difficulty(number: int) -> str:
    if number <= 120:
        return "Seed"
    if number <= 240:
        return "Leaf"
    return "Brain"


def main() -> None:
    workbook = xlrd.open_workbook(str(SOURCE))
    sheet = workbook.sheet_by_name("문장")
    rows = []
    for row_idx in range(1, sheet.nrows):
        number = int(sheet.cell_value(row_idx, 1))
        english = str(sheet.cell_value(row_idx, 2)).strip()
        korean = str(sheet.cell_value(row_idx, 3)).strip()
        if not english or not korean:
            continue
        pattern = pattern_for(english, number)
        rows.append(
            {
                "id": number,
                "english": english,
                "korean": korean,
                "category": pattern,
                "pattern": pattern,
                "level": difficulty(number),
                "tokens": re.findall(r"[A-Za-z']+|[?.!,]", english),
            }
        )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(rows, ensure_ascii=False, indent=2)
    OUTPUT.write_text(f"window.EXPRESSIONS = {payload};\n", encoding="utf-8")
    print(f"Wrote {len(rows)} expressions to {OUTPUT}")


if __name__ == "__main__":
    main()
