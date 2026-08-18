import json
import re
from pathlib import Path

import openpyxl


DATA_FILE = Path("data/expressions.js")
SOURCE_NAME = "4-2. \ud328\ud134\uc601\uc5b4-\uae30\uc801\uc758 \uc601\uc5b4\ubb38\uc7a5 \ud2b8\ub808\uc774\ub2dd 800.xlsx"
SOURCE_FILE = Path.home() / "OneDrive" / "Desktop" / SOURCE_NAME


SECTIONS = [
    (1, 21, "31. Training 800 - go 가다"),
    (22, 42, "32. Training 800 - come 오다"),
    (43, 63, "33. Training 800 - run 달리다"),
    (64, 84, "34. Training 800 - walk 걷다"),
    (85, 105, "35. Training 800 - live 살다"),
    (106, 126, "36. Training 800 - work 일하다"),
    (127, 154, "37. Training 800 - There is/are 존재문"),
    (155, 174, "38. Training 800 - be 상태/성질"),
    (175, 194, "39. Training 800 - seem ~처럼 보이다"),
    (195, 214, "40. Training 800 - feel 느끼다"),
    (215, 234, "41. Training 800 - look 보이다"),
    (235, 254, "42. Training 800 - taste 맛이 나다"),
    (255, 274, "43. Training 800 - smell 냄새가 나다"),
    (275, 301, "44. Training 800 - get 상태 변화"),
    (302, 322, "45. Training 800 - become ~이 되다"),
    (323, 344, "46. Training 800 - have 가지다/먹다"),
    (345, 364, "47. Training 800 - need 필요하다"),
    (365, 384, "48. Training 800 - make 만들다"),
    (385, 404, "49. Training 800 - hate 싫어하다"),
    (405, 424, "50. Training 800 - do 하다"),
    (425, 444, "51. Training 800 - enjoy 즐기다"),
    (445, 469, "52. Training 800 - wear 입다/착용하다"),
    (470, 490, "53. Training 800 - buy 사다"),
    (491, 511, "54. Training 800 - give 주다"),
    (512, 532, "55. Training 800 - send 보내다"),
    (533, 553, "56. Training 800 - tell 말하다"),
    (554, 574, "57. Training 800 - ask 묻다"),
    (575, 595, "58. Training 800 - buy 4형식"),
    (596, 616, "59. Training 800 - bring 가져오다"),
    (617, 636, "60. Training 800 - teach 가르치다"),
    (637, 658, "61. Training 800 - show 보여주다"),
    (659, 672, "62. Training 800 - see 지각동사"),
    (673, 686, "63. Training 800 - hear 지각동사"),
    (687, 700, "64. Training 800 - watch 지각동사"),
    (701, 714, "65. Training 800 - want 목적어 to부정사"),
    (715, 728, "66. Training 800 - ask 목적어 to부정사"),
    (729, 742, "67. Training 800 - tell 목적어 to부정사"),
    (743, 763, "68. Training 800 - make 사역동사"),
    (764, 784, "69. Training 800 - let 사역동사"),
    (785, 798, "70. Training 800 - have 목적어 p.p."),
    (799, 812, "71. Training 800 - help 준사역동사"),
    (813, 826, "72. Training 800 - get 목적어 to/p.p."),
]


def load_expressions():
    text = DATA_FILE.read_text(encoding="utf-8")
    match = re.search(r"window\.EXPRESSIONS\s*=\s*(\[.*\]);\s*$", text, re.S)
    if not match:
        raise ValueError("Could not parse data/expressions.js")
    return json.loads(match.group(1))


def normalize_english(text):
    return re.sub(r"\s+", " ", str(text).strip()).casefold()


def section_for_number(number):
    for start, end, label in SECTIONS:
        if start <= number <= end:
            return label
    return "73. Training 800 - 기타"


def main():
    workbook = openpyxl.load_workbook(SOURCE_FILE, read_only=True, data_only=True)
    sheet = workbook.active
    source_sections = {}
    for row in sheet.iter_rows(values_only=True):
        if len(row) < 4 or not row[1] or not row[2]:
            continue
        number = int(row[1])
        source_sections[normalize_english(row[2])] = section_for_number(number)

    expressions = load_expressions()
    updated = 0
    missing = []
    for item in expressions:
        if int(item["id"]) < 364:
            continue
        label = source_sections.get(normalize_english(item["english"]))
        if not label:
            missing.append(item["english"])
            continue
        item["category"] = label
        item["pattern"] = label
        updated += 1

    payload = json.dumps(expressions, ensure_ascii=False, indent=2)
    DATA_FILE.write_text(f"window.EXPRESSIONS = {payload};\n", encoding="utf-8")
    print(f"Updated {updated} Training 800 expressions.")
    if missing:
        print(f"Missing source matches: {len(missing)}")
        for text in missing[:10]:
            print(f"- {text}")


if __name__ == "__main__":
    main()
