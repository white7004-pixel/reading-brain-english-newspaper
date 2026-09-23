# E북 쪽 그림 만들기:  python scripts/make-ebook.py <slug> "<내지 PDF>" "<표지 PDF>"
# 인쇄용 PDF 에는 잘라내기 표시와 색 막대가 붙어 있다. PDF 안의 TrimBox(실제 책 크기)만 잘라
# assets/ebook/<slug>/p01.jpg ~ pNN.jpg 로 저장한다. 표지 PDF 첫 쪽은 뒤표지|앞표지가 나란히 있는
# 펼침이라 오른쪽 절반(앞표지)만 잘라 p00.jpg 와 assets/covers/<slug>.jpg 로 둔다.
# 크기는 앞서 만든 lets-celebrate-birthdays 와 맞춘다(가로 758px 안팎, JPG 82).
import sys, os, io
import pdfplumber

slug, inner_pdf, cover_pdf = sys.argv[1], sys.argv[2], sys.argv[3]
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
out = os.path.join(root, "assets", "ebook", slug)
os.makedirs(out, exist_ok=True)
os.makedirs(os.path.join(root, "assets", "covers"), exist_ok=True)
WIDTH = 758

def trim_box(pg):
    a = pg.page_obj.attrs
    box = a.get("TrimBox") or a.get("CropBox") or a.get("MediaBox")
    x0, y0, x1, y1 = [float(v) for v in box]
    # pdfplumber 는 위에서 아래로 센다. PDF 상자는 아래에서 위로 센다 — 뒤집는다
    h = float(pg.height)
    return (x0, h - y1, x1, h - y0)

def save(pg, box, path):
    x0, y0, x1, y1 = box
    res = WIDTH / (x1 - x0) * 72
    im = pg.crop(box).to_image(resolution=res).original.convert("RGB")
    im.save(path, "JPEG", quality=82, optimize=True)
    return im.size, os.path.getsize(path)

total = 0
with pdfplumber.open(inner_pdf) as pdf:
    for i, pg in enumerate(pdf.pages, 1):
        size, n = save(pg, trim_box(pg), os.path.join(out, "p%02d.jpg" % i))
        total += n
    pages = len(pdf.pages)

with pdfplumber.open(cover_pdf) as pdf:
    pg = pdf.pages[0]
    x0, y0, x1, y1 = trim_box(pg)
    front = ((x0 + x1) / 2, y0, x1, y1)           # 오른쪽 절반이 앞표지
    size, n = save(pg, front, os.path.join(out, "p00.jpg"))
    save(pg, front, os.path.join(root, "assets", "covers", slug + ".jpg"))
    total += n

print("%s: 내지 %d쪽 + 표지 → %s (%.1fMB)" % (slug, pages, out, total / 1e6))
assert pages >= 1 and total < 6e6, "그림이 너무 크거나 없다"
