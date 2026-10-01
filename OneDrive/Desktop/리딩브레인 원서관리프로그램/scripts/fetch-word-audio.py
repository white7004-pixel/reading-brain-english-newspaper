"""단어 발음을 진짜 원어민 녹음으로 받아 온다.

    python scripts/fetch-word-audio.py charlottes-web

브라우저 음성(TTS)은 컴퓨터마다 다르고, 영어 음성이 안 깔린 컴퓨터에서는
한국어 음성이 영어를 읽어 버린다. 그래서 소리 파일을 미리 받아 둔다.

출처는 위키미디어 공용(Wikimedia Commons)이다. 사람이 직접 녹음한 것이고
CC 라이선스라 학원에서 써도 된다. 받은 파일은 assets/audio/<slug>/ 에 들어가고
books/<slug>.js 의 각 단어에 audio 경로가 적힌다.

문장 낭독은 여기서 받지 않는다. 그건 쉐도잉 유튜브가 대신한다.
"""
import io, json, os, re, sys, time, urllib.error, urllib.parse, urllib.request

sys.stdout.reconfigure(encoding="utf-8", errors="replace", line_buffering=True)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API  = "https://commons.wikimedia.org/w/api.php?"
# 위키미디어는 프로그램 이름을 안 밝히면 403, 수상해 보이면 429 로 막는다.
# 아래 형태는 통과한다. 개인정보는 넣지 않는다.
UA   = {"User-Agent": "ReadingBrainWorksheets/1.0 Python-urllib/3"}
PAUSE    = 1.2       # 검색 요청 사이 쉬는 시간(초)
DL_PAUSE = 60        # 파일 내려받기 사이. 파일 서버는 1분에 한 개꼴만 받아 준다.
                     # 느리지만 책마다 한 번만 받으면 되는 일이다.
                     # 그래도 막히면 잠시 뒤 같은 명령을 다시 돌린다 — 받은 건 건너뛴다.

# 미국 발음을 먼저 찾는다. 없으면 영국·호주 녹음이라도 받는다.
PATTERNS = [
    "File:En-us-%s.ogg",
    "File:En-us-%s.wav",
    "File:LL-Q1860 (eng)-Vealhurl-%s.wav",      # 영국 화자. 공용에 가장 많다
    "File:En-uk-%s.ogg",
    "File:En-au-%s.ogg",
]


def fetch(url, timeout=25):
    """429(너무 잦은 요청)면 기다렸다가 다시 부른다. 조용히 실패하면
    '녹음이 없는 단어'로 잘못 기록되므로 반드시 재시도한다."""
    for wait in (0, 30, 90):   # 파일 서버는 한참 막아 둔다. 짧게 기다리면 소용없다
        if wait: time.sleep(wait)
        try:
            return urllib.request.urlopen(
                urllib.request.Request(url, headers=UA), timeout=timeout).read()
        except urllib.error.HTTPError as e:
            if e.code not in (429, 503):
                raise
            last = e
    raise last


def api(**kw):
    kw.setdefault("format", "json")
    kw.setdefault("action", "query")
    return json.loads(fetch(API + urllib.parse.urlencode(kw), 20))


class Blocked(Exception):
    """위키미디어가 막은 것. '녹음이 없다' 와는 다르다 — 나중에 다시 돌리면 받는다."""


def by_name(word):
    """정해진 이름 규칙으로 바로 찾는다. 대부분 여기서 끝난다."""
    titles = "|".join(p % word for p in PATTERNS)
    try:
        pages = api(titles=titles, prop="imageinfo", iiprop="url")["query"]["pages"]
    except urllib.error.HTTPError as e:
        raise Blocked(str(e))
    # PATTERNS 순서대로 골라야 미국 발음이 먼저 잡힌다
    want = [p % word for p in PATTERNS]
    got = {pg["title"]: pg["imageinfo"][0]["url"]
           for pg in pages.values() if "imageinfo" in pg}
    for t in want:
        if t in got:
            return got[t]
    return None


def by_search(word):
    """이름 규칙에 안 맞는 것은 검색으로 한 번 더 찾는다."""
    try:
        r = api(list="search", srsearch='filetype:audio intitle:"%s" English pronunciation' % word,
                srnamespace=6, srlimit=8)["query"]["search"]
    except urllib.error.HTTPError as e:
        raise Blocked(str(e))
    # 제목에 그 단어가 통째로 들어 있어야 한다. thundering 으로 thunder 를 받으면 안 된다
    pat = re.compile(r"(^|[-_ (])%s([-_ .)]|$)" % re.escape(word), re.I)
    for hit in r:
        t = hit["title"]
        if not pat.search(t.rsplit(".", 1)[0]):
            continue
        try:
            pages = api(titles=t, prop="imageinfo", iiprop="url")["query"]["pages"]
            for pg in pages.values():
                if "imageinfo" in pg:
                    return pg["imageinfo"][0]["url"]
        except Exception:
            pass
    return None


def download(url, path):
    data = fetch(url, 30)
    if len(data) < 1500:          # 너무 작으면 소리가 아니다
        raise ValueError("파일이 너무 작습니다 (%d바이트)" % len(data))
    io.open(path, "wb").write(data)
    return len(data)


def main(slug):
    path = os.path.join(ROOT, "books", slug + ".js")
    if not os.path.exists(path):
        sys.exit("책 파일이 없습니다: " + path)
    src = io.open(path, encoding="utf-8").read()

    words = re.findall(r'\{ word: "([^"]+)"', src)
    if not words:
        sys.exit("단어를 읽지 못했습니다.")

    outdir = os.path.join(ROOT, "assets", "audio", slug)
    os.makedirs(outdir, exist_ok=True)

    got, missed, blocked, done = 0, [], [], []
    for w in words:
        # 이미 받아 둔 단어는 건너뛴다. 429 로 끊겼을 때 다시 돌리면 나머지만 받는다.
        have = [e for e in (".ogg", ".oga", ".wav", ".mp3")
                if os.path.exists(os.path.join(outdir, w.lower() + e))]
        if have and ('audio: "assets/audio/%s/%s%s"' % (slug, w.lower(), have[0])) in src:
            print("%-13s 이미 있음" % w)
            got += 1
            continue
        try:
            url = by_name(w) or by_search(w)
        except Blocked as e:
            blocked.append(w)
            print("%-13s 서버가 막음 — 나중에 다시 돌리면 받습니다" % w)
            continue
        time.sleep(PAUSE)                     # 공용 서버를 두드리지 않는다
        if not url:
            missed.append(w)
            print("%-13s 녹음이 없습니다 (공용에 그 단어 녹음 자체가 없음)" % w)
            continue
        clean = url.split("?")[0]
        ext = os.path.splitext(clean)[1].lower() or ".ogg"
        rel = "assets/audio/%s/%s%s" % (slug, w.lower(), ext)
        try:
            time.sleep(DL_PAUSE)
            size = download(clean, os.path.join(ROOT, rel))
        except Exception as e:
            blocked.append(w)
            print("%-13s 내려받기 막힘 — 나중에 다시" % w)
            continue

        who = "미국" if "En-us" in clean else ("영국" if "Vealhurl" in clean or "En-uk" in clean else "영어권")
        print("%-13s %-4s %5.0fKB  %s" % (w, who, size / 1024, os.path.basename(clean)))

        done.append((w, rel))

    # 받는 데 몇십 분 걸리니 그사이 고친 내용을 덮지 않도록 쓰기 직전에 다시 읽는다
    src = io.open(path, encoding="utf-8").read()
    for w, rel in done:
        # pos 바로 뒤에 넣는다. 예문 안의 {{ }} 를 닫는 괄호로 잘못 잡지 않는
        # 유일하게 안전한 자리다. 이미 있으면 바꾼다.
        anchor = r'(\{ word: "%s",\s*pos: "[^"]*",)(\s*audio: "[^"]*",)?' % re.escape(w)
        src, n = re.subn(anchor, lambda m: m.group(1) + ' audio: "%s",' % rel, src, count=1)
        got += n
    io.open(path, "w", encoding="utf-8").write(src)
    print("\n%d개 넣었습니다. 출처: Wikimedia Commons (사람이 녹음한 것, CC)." % got)
    if missed:
        print("녹음이 없는 단어: %s" % ", ".join(missed))
        print("  → 공용에 없습니다. 화면에서 브라우저 음성으로 읽습니다.")
    if blocked:
        print("서버가 막은 단어: %s" % ", ".join(blocked))
        print("  → 잠시 뒤 같은 명령을 다시 돌리면 이것들만 다시 받습니다.")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("사용법: python scripts/fetch-word-audio.py <slug>")
    main(sys.argv[1])
