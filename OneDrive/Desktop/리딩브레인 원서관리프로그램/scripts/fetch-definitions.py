"""단어의 영영 뜻을 실제 사전에서 받아 온다.

    python scripts/fetch-definitions.py charlottes-web

출처는 위키낱말사전(Wiktionary)이다. 진짜 사전이면서 CC BY-SA 라 학원 인쇄물에 써도 된다.
롱맨·옥스퍼드·메리엄웹스터의 뜻풀이 문장은 저작권이 있어 그대로 옮기지 않는다.

받아 온 뜻은 사전 문장 그대로다. 아이에게 어려운 것이 섞여 있으니
표를 보고 원장이 고른다. 어려워 보이는 것은 ⚠ 로 표시해 준다.
"""
import io, json, html, os, re, sys, time, urllib.parse, urllib.request

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = "https://en.wiktionary.org/api/rest_v1/page/definition/%s"
UA = {"User-Agent": "ReadingBrain-Worksheets/1.0 (academy internal use)"}
POS = {"n.": "Noun", "v.": "Verb", "adj.": "Adjective", "adv.": "Adverb",
       "prep.": "Preposition", "pron.": "Pronoun", "conj.": "Conjunction"}
# 이 단어들이 뜻풀이에 들어 있으면 아이에게 어렵다는 신호다
HARD = re.compile(r"\b(pretentious|unassuming|inexplicable|supernatural|conventional|"
                  r"designating|pertaining|denoting|archaic|obsolete|figuratively|"
                  r"whereby|thereof|one's own|such as to)\b", re.I)
MAXLEN = 95


def get(word):
    req = urllib.request.Request(API % urllib.parse.quote(word), headers=UA)
    return json.loads(urllib.request.urlopen(req, timeout=20).read().decode("utf-8"))


def clean(raw):
    """사전 항목에서 태그·괄호 표시를 걷어내고 한 문장만 남긴다."""
    t = html.unescape(re.sub(r"<[^>]+>", "", raw))
    t = re.sub(r"\s+", " ", t).strip()
    t = re.sub(r"^\((?:[^()]*)\)\s*", "", t)      # 앞에 붙는 (informal) 같은 꼬리표
    t = t.split(" — ")[0]
    first = re.split(r"(?<=[.;])\s", t)[0].strip()
    first = first.rstrip(".;").strip()
    return first


STUB = re.compile(r"^(plural|singular|synonym|alternative (form|spelling)|obsolete form|"
                  r"misspelling|initialism|abbreviation|acronym|inflection|past tense|"
                  r"present participle|comparative|superlative)", re.I)


def senses(word, pos):
    """품사가 맞는 뜻을 사전 차례대로 모은다. 사전은 주된 뜻을 앞에 둔다."""
    want = POS.get(pos, "")
    forms = [word] + ([word[:-1]] if word.endswith("s") else [])
    for w in forms:
        try:
            data = get(w)
        except Exception:
            continue
        out = []
        for entry in data.get("en") or []:
            if want and entry.get("partOfSpeech") != want:
                continue
            for d in entry.get("definitions") or []:
                t = clean(d.get("definition", ""))
                if not t or len(t) < 12 or len(t) > 170 or STUB.match(t):
                    continue      # "plural of salutation" 같은 건 뜻이 아니다
                if t not in out:
                    out.append(t)
        if out:
            return out
    return []


def score(text, hints):
    """책에서 쓰인 뜻을 고른다. 한글 뜻·예문과 겹치는 말이 많을수록 그 뜻이다."""
    words = set(re.findall(r"[a-z]+", text.lower()))
    return sum(1 for h in hints if h in words)


def main(slug):
    path = os.path.join(ROOT, "books", slug + ".js")
    if not os.path.exists(path):
        sys.exit("책 파일이 없습니다: " + path)
    src = io.open(path, encoding="utf-8").read()

    rows = re.findall(r'\{ word: "([^"]+)",\s*pos: "([^"]+)",', src)
    if not rows:
        sys.exit("단어를 읽지 못했습니다.")

    got, missed = 0, []
    for word, pos in rows:
        cands = senses(word, pos)
        time.sleep(0.3)                            # 사전 서버를 두드리지 않는다
        # 책의 예문에서 힌트 단어를 뽑아 그 뜻을 고른다
        m = re.search(r'\{ word: "%s",.*?ex: "([^"]*)"' % re.escape(word), src, re.S)
        hints = set(re.findall(r"[a-z]{4,}", (m.group(1) if m else "").lower()))
        best = max(range(len(cands)), key=lambda i: (score(cands[i], hints), -i)) if cands else -1
        d = cands[best] if cands else ""
        for i, c in enumerate(cands[:4]):
            if i != best:
                print("%-13s %-5s    · %s" % ("", "", c))
        if not d:
            missed.append(word)
            print("%-13s %-5s  —  못 찾음 (지금 뜻 그대로 둡니다)" % (word, pos))
            continue
        flag = "  ⚠ 어려움" if (HARD.search(d) or len(d) > MAXLEN or
                                 word.lower() in d.lower()) else ""
        print("%-13s %-5s  %s%s" % (word, pos, d, flag))

        # 그 단어의 en: 만 바꾼다
        pat = r'(\{ word: "%s",\s*pos: "[^"]+",\s*en: ")[^"]*(")' % re.escape(word)
        src, n = re.subn(pat, lambda m: m.group(1) + d.replace('"', "'") + m.group(2), src, count=1)
        got += n

    # 기본은 '보기만'. 기계가 고른 뜻이 조용히 좋은 뜻을 덮어쓰는 사고를 막는다.
    if "--write" in sys.argv:
        io.open(path, "w", encoding="utf-8").write(src)
        print("\n%d개 갱신. 출처: Wiktionary (CC BY-SA)." % got)
    else:
        print("\n보기만 했습니다. 파일은 그대로입니다.")
        print("· 로 시작하는 줄이 사전의 다른 뜻입니다. 책에서 쓰인 뜻인지 눈으로 고르세요.")
        print("그대로 넣으려면 뒤에 --write 를 붙이세요.")
    if missed:
        print("못 찾은 단어: %s" % ", ".join(missed))
    print("⚠ 표시된 것은 아이에게 어렵습니다. books/%s.js 에서 직접 쉬운 말로 고치세요." % slug)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("사용법: python scripts/fetch-definitions.py <slug> [--write]")
    main(sys.argv[1])
