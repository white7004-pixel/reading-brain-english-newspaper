"""원서 표지를 자동으로 받아 온다.

    python scripts/fetch-cover.py charlottes-web

books/<slug>.js 의 title·author 로 Open Library 를 찾아
assets/covers/<slug>.jpg 로 저장하고, 그 파일의 cover 값을 채운다.

표지를 못 찾으면 아무것도 바꾸지 않고 이유를 말한다. 지어내지 않는다.
"""
import io, json, os, re, sys, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = {"User-Agent": "ReadingBrain-Worksheets/1.0 (academy internal use)"}


def get(url, binary=False):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=25) as r:
        return r.read() if binary else json.loads(r.read().decode("utf-8"))


def field(src, name):
    m = re.search(r'\n\s*%s:\s*"((?:[^"\\]|\\.)*)"' % name, src)
    return m.group(1).replace('\\"', '"') if m else ""


def find_cover(title, author):
    """제목·작가가 맞고 판본이 가장 많은 책을 고른다 = 그 책의 대표 표지.

    title=/author= 로 거르면 정작 원본이 빠지는 경우가 있어 q= 로 통째 검색한다.
    """
    q = urllib.parse.urlencode({
        "q": "%s %s" % (title, author), "limit": "20",
        "fields": "title,author_name,cover_i,first_publish_year,edition_count",
    })
    docs = get("https://openlibrary.org/search.json?" + q).get("docs", [])
    norm = lambda s: re.sub(r"[^a-z0-9]", "", (s or "").lower())
    surname = norm(author.split()[-1]) if author else ""

    # 부제("Flat Stanley: His Original Adventure!")·괄호("(Magic Tree House #1)")는 떼고 비교한다
    short = lambda s: norm(re.split(r"[:(]", s or "")[0])

    def by_author(d):
        names = [norm(n) for n in d.get("author_name") or []]
        return bool(d.get("cover_i")) and (not surname or any(surname in n for n in names))

    # 작가가 안 맞는 책은 절대 고르지 않는다 — 엉뚱한 잡지 표지가 들어온 적이 있다
    pool = ([d for d in docs if by_author(d) and norm(d.get("title")) == norm(title)]
            or [d for d in docs if by_author(d) and short(d.get("title")) == short(title)])
    if not pool:
        return None, None
    best = max(pool, key=lambda d: d.get("edition_count", 0))
    return best["cover_i"], best


def main(slug):
    path = os.path.join(ROOT, "books", slug + ".js")
    if not os.path.exists(path):
        sys.exit("책 파일이 없습니다: " + path)
    src = io.open(path, encoding="utf-8").read()
    title, author = field(src, "title"), field(src, "author")
    if not title:
        sys.exit("title 을 읽지 못했습니다.")

    cover_id, doc = find_cover(title, author)
    if not cover_id:
        sys.exit('표지를 못 찾았습니다: "%s" — assets/covers/%s.jpg 에 직접 넣어 주세요.' % (title, slug))

    # L 이 가장 크지만 Open Library 의 큰 이미지 서버는 자주 죽는다. M 으로 내려간다.
    img = None
    for size in ("L", "M", "S"):
        try:
            got = get("https://covers.openlibrary.org/b/id/%d-%s.jpg" % (cover_id, size), binary=True)
        except Exception as e:
            print("  %s 실패 (%s)" % (size, e))
            continue
        if len(got) > 3000:                   # 자리표시용 회색 이미지가 이만 합니다
            img = got
            break
    if img is None:
        sys.exit("표지 파일을 받지 못했습니다 (cover_i=%d). assets/covers/%s.jpg 에 직접 넣어 주세요."
                 % (cover_id, slug))

    out_dir = os.path.join(ROOT, "assets", "covers")
    os.makedirs(out_dir, exist_ok=True)
    rel = "assets/covers/%s.jpg" % slug
    with open(os.path.join(ROOT, rel), "wb") as f:
        f.write(img)

    src = re.sub(r'\n(\s*)cover:\s*"[^"]*"', '\n\\1cover: "%s"' % rel, src, count=1)
    io.open(path, "w", encoding="utf-8").write(src)
    print("표지 저장: %s  (%s, %d판, %.0fKB)"
          % (rel, doc.get("title"), doc.get("edition_count", 0), len(img) / 1024))


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("사용법: python scripts/fetch-cover.py <slug>")
    main(sys.argv[1])
