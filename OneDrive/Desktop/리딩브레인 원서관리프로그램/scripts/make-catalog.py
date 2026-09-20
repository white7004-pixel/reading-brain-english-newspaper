# -*- coding: utf-8 -*-
"""전체 도서 목록 엑셀 → catalog.js · catalog-sum.js
    python scripts/make-catalog.py "C:/Users/white/Downloads/전체 도서 목록2026-09-20.xlsx"
표지 번호는 scripts/catalog-covers.json 이 있으면 끼워 넣는다(없으면 0)."""
import io, os, re, sys, json, zipfile
from xml.etree import ElementTree as ET

NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def rows(path):
    z = zipfile.ZipFile(path)
    shared = ["".join(si.itertext()) for si in ET.parse(z.open("xl/sharedStrings.xml")).getroot()]
    for _, el in ET.iterparse(z.open("xl/worksheets/sheet1.xml")):
        if el.tag != NS + "row": continue
        d = {}
        for c in el.findall(NS + "c"):
            col = re.match(r"[A-Z]+", c.get("r")).group(); t = c.get("t"); v = c.find(NS + "v")
            val = shared[int(v.text)] if t == "s" and v is not None else (v.text if v is not None else "")
            if val: d[col] = val.strip()
        if d: yield d
        el.clear()

def num(s, d=0):
    try: return float(s)
    except (TypeError, ValueError): return d

def main():
    src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.expanduser("~"), "Downloads", "전체 도서 목록2026-09-20.xlsx")
    data = list(rows(src))[1:]                      # 첫 줄은 머리글
    covers = {}
    cp = os.path.join(ROOT, "scripts", "catalog-covers.json")
    if os.path.exists(cp): covers = json.load(io.open(cp, encoding="utf-8"))

    ser = sorted(set(r.get("E", "") for r in data))
    gen = sorted(set(r.get("J", "") for r in data))
    th  = sorted(set(r.get("K", "") for r in data))
    si = dict((s, i) for i, s in enumerate(ser)); gi = dict((s, i) for i, s in enumerate(gen)); ti = dict((s, i) for i, s in enumerate(th))

    books, sums = [], []
    for r in data:
        no = r.get("C", "")
        lex = int(num(r.get("G")))
        bl = num(r.get("H"))
        nf = 1 if (r.get("I", "").lower() == "nonfiction") else 0
        books.append([no, r.get("D", ""), si[r.get("E", "")], r.get("F", ""), lex, bl, nf,
                      gi[r.get("J", "")], ti[r.get("K", "")], r.get("L", ""), int(covers.get(no, 0))])
        sums.append(r.get("M", ""))

    head = "// 학원 장서 목록. scripts/make-catalog.py 가 엑셀에서 만든다 — 손으로 고치지 않는다.\n"
    body = json.dumps({"series": ser, "genre": gen, "theme": th, "books": books}, ensure_ascii=False, separators=(",", ":"))
    out = head + "var CATALOG = " + body + ";\n" + io.open(os.path.join(ROOT, "scripts", "catalog-tail.js"), encoding="utf-8").read()
    io.open(os.path.join(ROOT, "catalog.js"), "w", encoding="utf-8", newline="\n").write(out)

    s = ("// 책 한 줄 요약. catalog.js 의 books 와 첨자가 같다. 필요할 때만 읽는다.\nvar CATALOG_SUM = "
         + json.dumps(sums, ensure_ascii=False, separators=(",", ":")) + ";\n"
         + 'if (typeof window !== "undefined") window.CATALOG_SUM = CATALOG_SUM;\n')
    io.open(os.path.join(ROOT, "catalog-sum.js"), "w", encoding="utf-8", newline="\n").write(s)
    print("catalog.js %d권 · 시리즈 %d · 장르 %d · 주제 %d · 표지 %d"
          % (len(books), len(ser), len(gen), len(th), sum(1 for b in books if b[10])))

if __name__ == "__main__":
    main()
