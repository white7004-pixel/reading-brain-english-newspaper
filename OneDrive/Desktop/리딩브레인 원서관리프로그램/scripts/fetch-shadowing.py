"""쉐도잉용 유튜브 낭독 영상을 자동으로 찾는다.

    python scripts/fetch-shadowing.py charlottes-web

유튜브를 '조회수 높은 순'으로 검색해서, 그 책의 낭독(read aloud) 영상만 골라
books/<slug>.js 의 shadowing 항목에 넣는다.

조회수만 보고 1등을 집으면 안 된다. 책 제목만 스쳐도 조회수 3억짜리 영상이
먼저 올라온다. 그래서 두 번 거른다.
  1) 영상 제목에 책 제목이 들어 있을 것
  2) 낭독·오디오북 계열일 것 (영화·예고편·노래·리뷰는 버린다)
"""
import io, json, os, re, sys, urllib.parse, urllib.request

sys.stdout.reconfigure(encoding="utf-8", errors="replace")   # 영상 제목에 이모지가 섞인다

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = {
    "User-Agent": ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                   "(KHTML, like Gecko) Chrome/120.0 Safari/537.36"),
    "Accept-Language": "en-US,en;q=0.9",
}
GOOD = ("read aloud", "readaloud", "read-aloud", "story time", "storytime",
        "audiobook", "audio book", "narrat", "chapter", "bedtime story", "listening")
BAD  = ("trailer", "full movie", "movie clip", "official clip", "song", "musical",
        "review", "reaction", "parody", "game", "1 hour of", "compilation",
        # 영어 낭독이라야 쉐도잉이 된다. 더빙·번역판은 버린다.
        "español", "espanol", "spanish", "français", "francais", "french",
        "português", "portugues", "dublado", "한국어", "중국어", "日本語",
        "subtitulado", "sub indo", "hindi", "arabic", "vietsub")
TAKE = 3


def norm(s):
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())


def field(src, name):
    m = re.search(r'\n\s*%s:\s*"((?:[^"\\]|\\.)*)"' % name, src)
    return m.group(1).replace('\\"', '"') if m else ""


def search(query):
    url = ("https://www.youtube.com/results?search_query=%s&sp=CAMSAhAB"   # 조회수 높은 순
           % urllib.parse.quote(query))
    req = urllib.request.Request(url, headers=UA)
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")

    out, seen = [], set()
    for blk in re.findall(r'"videoRenderer":\{.*?(?="videoRenderer":\{|$)', html, re.S):
        vid = re.search(r'"videoId":"([\w-]{11})"', blk)
        ttl = re.search(r'"title":\{"runs":\[\{"text":"((?:[^"\\]|\\.)*)"', blk)
        views = re.search(r'"viewCountText":\{"simpleText":"([^"]+)"', blk)
        chan = re.search(r'"ownerText":\{"runs":\[\{"text":"((?:[^"\\]|\\.)*)"', blk)
        length = re.search(r'"lengthText":\{[^}]*"simpleText":"([^"]+)"', blk)
        if not (vid and ttl) or vid.group(1) in seen:
            continue
        seen.add(vid.group(1))
        out.append({
            "id": vid.group(1),
            "title": json.loads('"%s"' % ttl.group(1)),
            "channel": json.loads('"%s"' % chan.group(1)) if chan else "",
            "views": views.group(1).replace(" views", "") if views else "",
            "length": length.group(1) if length else "",
        })
    return out, url


def views_num(v):
    d = re.sub(r"[^0-9]", "", v.get("views") or "")
    return int(d) if d else 0


def pick(cands, title):
    t = norm(title)
    keep = []
    for c in cands:
        low = c["title"].lower()
        if t not in norm(c["title"]):          # 제목이 안 들어 있으면 다른 영상이다
            continue
        if any(b in low for b in BAD):
            continue
        c["readaloud"] = any(g in low for g in GOOD)
        keep.append(c)
    # 낭독으로 보이는 것 먼저, 그 다음 조회수
    keep.sort(key=lambda c: (c["readaloud"], views_num(c)), reverse=True)
    return keep


def main(slug):
    path = os.path.join(ROOT, "books", slug + ".js")
    if not os.path.exists(path):
        sys.exit("책 파일이 없습니다: " + path)
    src = io.open(path, encoding="utf-8").read()
    title = field(src, "title")
    if not title:
        sys.exit("title 을 읽지 못했습니다.")

    query = '"%s" read aloud' % title
    cands, url = search(query)
    hits = pick(cands, title)
    if not hits:
        sys.exit('낭독 영상을 못 찾았습니다: %s\n  직접 찾아보세요 → %s' % (title, url))

    top = hits[:TAKE]
    for i, v in enumerate(top, 1):
        print("%d. %-58s %10s  %-7s  %s%s"
              % (i, v["title"][:58], v["views"], v["length"], v["channel"],
                 "" if v["readaloud"] else "  (낭독 표시 없음 — 확인 필요)"))

    # QR 코드도 같이 만든다. 학생이 종이에서 바로 찍어 듣게 하려는 것이다.
    # 인쇄는 학원 밖에서도 하므로 그림 파일로 받아 둔다 (인터넷 없이도 인쇄된다).
    qr_rel = ""
    try:
        url = "https://youtu.be/%s" % top[0]["id"]
        api = ("https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&ecc=M&data=%s"
               % urllib.parse.quote(url, safe=""))
        png = urllib.request.urlopen(urllib.request.Request(api, headers=UA), timeout=25).read()
        if len(png) > 200:
            qr_dir = os.path.join(ROOT, "assets", "qr")
            os.makedirs(qr_dir, exist_ok=True)
            qr_rel = "assets/qr/%s.png" % slug
            with open(os.path.join(ROOT, qr_rel), "wb") as f:
                f.write(png)
            print("QR 저장: %s  → %s" % (qr_rel, url))
    except Exception as e:
        print("QR 은 못 만들었습니다 (%s). 링크만 들어갑니다." % e)

    block = ["  shadowing: {",
             '    query: %s,' % json.dumps(query, ensure_ascii=False),
             '    searchUrl: %s,' % json.dumps(url, ensure_ascii=False),
             '    qr: %s,' % json.dumps(qr_rel, ensure_ascii=False),
             "    videos: ["]
    for v in top:
        block.append('      { url: "https://youtu.be/%s", title: %s, channel: %s, views: %s, length: %s },'
                     % (v["id"], json.dumps(v["title"], ensure_ascii=False),
                        json.dumps(v["channel"], ensure_ascii=False),
                        json.dumps(v["views"], ensure_ascii=False),
                        json.dumps(v["length"], ensure_ascii=False)))
    block += ["    ]", "  },"]
    block = "\n".join(block)

    if re.search(r"\n  shadowing: \{.*?\n  \},", src, re.S):
        src = re.sub(r"\n  shadowing: \{.*?\n  \},", "\n" + block, src, count=1, flags=re.S)
    else:
        src = src.replace("\n  // ── ① 단어", "\n" + block + "\n\n  // ── ① 단어", 1)
    io.open(path, "w", encoding="utf-8").write(src)
    print("\nbooks/%s.js 의 shadowing 을 갱신했습니다." % slug)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("사용법: python scripts/fetch-shadowing.py <slug>")
    main(sys.argv[1])
