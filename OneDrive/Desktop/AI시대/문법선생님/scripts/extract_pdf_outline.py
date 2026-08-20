from pathlib import Path
import re
import sys

import pdfplumber


source, output = map(Path, sys.argv[1:3])
with pdfplumber.open(source) as pdf:
    lines = [f"pages={len(pdf.pages)}"]
    # 목차는 앞부분에 있으므로 전체 본문을 읽지 않고 처음 35쪽만 조사한다.
    for number, page in enumerate(pdf.pages[:35], 1):
        text = page.extract_text() or ""
        for line in text.splitlines():
            clean = " ".join(line.split())
            if re.search(r"(?:CHAPTER|Chapter|UNIT|Unit|대단원|중단원)", clean):
                lines.append(f"p.{number}: {clean}")

output.parent.mkdir(parents=True, exist_ok=True)
output.write_text("\n".join(lines), encoding="utf-8")
