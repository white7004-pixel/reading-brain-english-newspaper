"""문법 만화 에피소드 오디오 빌더 (스펙 구동).

사용: cd reels && python3 audio/episode.py episodes/irregular-past/spec.json
 1) 각 대사를 HeyGen TTS 로 생성(캐시: public/ep/<id>/vo/) 후 앞뒤 무음 제거
 2) 대사 길이로 타임라인 계산 → public/ep/<id>/timeline.json  (영상 컴포지션이 읽는다)
 3) 오리지널 합성 BGM + 효과음 + 더킹 믹스 → soundtrack.wav / voiceonly.wav
스펙의 cast[*].voice 만 바꾸면 다른 학원 캐릭터/목소리로 같은 구조를 재사용한다.
"""
import hashlib, json, os, subprocess, struct, sys
import numpy as np

SR = 44100
spec_path = sys.argv[1]
spec = json.load(open(spec_path))
EP = spec["id"]
FPS = spec["fps"]
OUT = f"public/ep/{EP}"
VO = f"{OUT}/vo"
os.makedirs(VO, exist_ok=True)
KEY = open(os.path.expanduser("~/.heygen/key")).read().strip()

LINE_GAP, BEAT_LEAD, BEAT_TAIL = 0.28, 0.35, 0.45


def sh(*a):
    return subprocess.run(a, check=True, capture_output=True, text=True).stdout


def tts(text, voice, speed, lang):
    h = hashlib.md5(f"{text}|{voice}|{speed}|{lang}".encode()).hexdigest()[:10]
    wav = f"{VO}/{h}.wav"
    if os.path.exists(wav):
        return wav
    body = json.dumps({"text": text, "voice_id": voice, "speed": speed, "language": lang})
    r = json.loads(sh("curl", "-sS", "-X", "POST", "https://api.heygen.com/v3/voices/speech",
                      "-H", f"x-api-key: {KEY}", "-H", "content-type: application/json", "-d", body))
    d = r.get("data") or r
    url = d.get("audio_url")
    if not url:
        raise SystemExit(f"TTS 실패: {text!r} → {r}")
    raw = f"{VO}/{h}.src"
    sh("curl", "-sS", "-L", "-o", raw, url)
    sh("ffmpeg", "-y", "-loglevel", "error", "-i", raw, "-ar", str(SR), "-ac", "1",
       "-af", "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,"
              "areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.10,areverse", wav)
    os.remove(raw)
    return wav


def rw(path):
    d = open(path, "rb").read()
    i = d.find(b"fmt "); ch = struct.unpack("<H", d[i + 10:i + 12])[0]
    j = d.find(b"data"); n = struct.unpack("<I", d[j + 4:j + 8])[0]
    a = np.frombuffer(d[j + 8:j + 8 + n], dtype="<i2").astype(np.float64) / 32768
    return a.reshape(-1, ch)[:, 0]


def ww(path, arr):
    pcm = (arr * 32767).astype("<i2").tobytes()
    open(path, "wb").write(
        b"RIFF" + struct.pack("<I", 36 + len(pcm)) + b"WAVEfmt "
        + struct.pack("<IHHIIHH", 16, 1, arr.shape[1], SR, SR * arr.shape[1] * 2, arr.shape[1] * 2, 16)
        + b"data" + struct.pack("<I", len(pcm)) + pcm)


# ── 1) TTS + 타임라인 ──
cursor, clips, beats_out = 0.0, [], []
for b in spec["beats"]:
    start = cursor
    cursor += BEAT_LEAD
    lines_out = []
    for ln in b["lines"]:
        c = spec["cast"][ln["who"]]
        say = ln.get("say") or ln["text"].replace("*", "")
        wav = tts(say, c["voice"], c.get("speed", 1.1), ln.get("lang", "ko"))
        dur = len(rw(wav)) / SR
        lines_out.append({**ln, "start": round(cursor, 3), "dur": round(dur, 3)})
        clips.append((cursor, wav))
        cursor += dur + LINE_GAP
    cursor += BEAT_TAIL - LINE_GAP
    beats_out.append({**b, "lines": lines_out, "start": round(start, 3), "end": round(cursor, 3)})
total = round(cursor, 3)
frames = int(np.ceil(total * FPS))
timeline = {**spec, "beats": beats_out, "duration": total, "frames": frames}
json.dump(timeline, open(f"{OUT}/timeline.json", "w"), ensure_ascii=False, indent=1)
print(f"타임라인 {total:.2f}s = {frames}f, 대사 {len(clips)}개")

N = int(SR * (frames / FPS))
t = np.arange(N) / SR
rng = np.random.default_rng(11)


def add(buf, sec, data, g=1.0):
    i = int(sec * SR)
    if i >= len(buf):
        return
    n = min(len(data), len(buf) - i)
    buf[i:i + n] += data[:n] * g


def env(n, a=0.005, r=0.2):
    e = np.ones(n); an = max(1, int(a * SR)); rn = max(1, min(n, int(r * SR)))
    e[:an] = np.linspace(0, 1, an); e[-rn:] *= np.linspace(1, 0, rn) ** 2
    return e


def tone(f, d, kind="pluck"):
    n = int(d * SR); x = np.arange(n) / SR
    if kind == "pluck":
        y = (np.sin(2 * np.pi * f * x) + 0.35 * np.sin(4 * np.pi * f * x) * np.exp(-x * 14)) * np.exp(-x * 7)
    elif kind == "bass":
        y = np.sin(2 * np.pi * f * x) * np.exp(-x * 3.2)
    else:  # bell
        y = (np.sin(2 * np.pi * f * x) + 0.4 * np.sin(2 * np.pi * f * 2.76 * x)) * np.exp(-x * 5)
    return y * env(n, 0.004, min(0.08, d / 3))


# ── 2) 경쾌한 오리지널 BGM (C장조, 112BPM, 코드 C-Am-F-G) ──
BPM = 112; beat = 60 / BPM
chords = [(48, [60, 64, 67]), (45, [57, 60, 64]), (41, [57, 60, 65]), (43, [55, 59, 62])]
mf = lambda m: 440 * 2 ** ((m - 69) / 12)
bgm = np.zeros(N)
bar = 0
while bar * 4 * beat < N / SR:
    root, notes = chords[bar % 4]
    t0 = bar * 4 * beat
    add(bgm, t0, tone(mf(root), 1.9 * beat, "bass"), 0.55)
    add(bgm, t0 + 2 * beat, tone(mf(root), 1.9 * beat, "bass"), 0.45)
    for k in range(8):                                  # 8분음표 마림바 아르페지오
        nt = notes[[0, 1, 2, 1][k % 4]] + (12 if k % 4 == 3 else 0)
        add(bgm, t0 + k * beat / 2, tone(mf(nt + 12), 0.4, "pluck"), 0.30)
    for k in range(4):                                  # 가벼운 킥/햇
        add(bgm, t0 + k * beat, tone(70, 0.15, "bass") * 1.2, 0.35 if k % 2 == 0 else 0.0)
        hat = rng.standard_normal(int(0.03 * SR)) * np.linspace(1, 0, int(0.03 * SR)) ** 2
        add(bgm, t0 + k * beat + beat / 2, hat, 0.10)
    bar += 1
bgm = np.stack([bgm, bgm], axis=1)

# ── 3) 효과음: 장면 전환 pop / 대사 시작 tick / 스탬프 / 정답 chime ──
sfx = np.zeros(N)
for b in beats_out:
    s = b["start"]
    pop = np.sin(2 * np.pi * (400 + 900 * np.exp(-np.arange(int(0.12 * SR)) / SR * 30)) * np.arange(int(0.12 * SR)) / SR)
    add(sfx, s, pop * np.exp(-np.arange(len(pop)) / SR * 28), 0.35)
    if b["type"] == "swap":
        for k in range(len(b["pairs"])):
            add(sfx, b["lines"][0]["start"] + 0.1 + k * 1.3, tone(mf(84 + 4 * k), 0.5, "bell"), 0.35)
        n = int(0.28 * SR); th = (np.sin(2 * np.pi * 70 * np.arange(n) / SR) + 0.5 * rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 40)) * np.exp(-np.arange(n) / SR * 14)
        add(sfx, b["lines"][0]["start"] + 3.3, th, 0.7)
    if b["type"] == "quiz":
        for k, m in enumerate([76, 79, 83]):
            add(sfx, s + 0.1 + k * 0.12, tone(mf(m), 0.5, "bell"), 0.3)
    if b["type"] == "cta":
        for k, m in enumerate([72, 76, 79, 84]):
            add(sfx, s + 0.05 + k * 0.1, tone(mf(m), 0.7, "bell"), 0.3)
sfx = np.stack([sfx, sfx], axis=1)

# ── 4) 말 엔벨로프로 BGM 더킹 후 믹스 ──
vo = np.zeros(N)
for st, wav in clips:
    c = rw(wav); c = c / (np.abs(c).max() + 1e-9) * 0.92
    f = int(0.008 * SR); c[:f] *= np.linspace(0, 1, f); c[-f:] *= np.linspace(1, 0, f)
    i = int(st * SR); n = min(len(c), N - i); vo[i:i + n] += c[:n]
w = int(0.05 * SR)
e = np.convolve(np.abs(vo), np.ones(w) / w, mode="same")
gate = np.clip(e / 0.12, 0, 1)
held = np.convolve((gate > 0.25).astype(float), np.ones(int(0.25 * SR)), "full")[:N] > 0
gate = np.maximum(gate, held.astype(float))
la = int(0.10 * SR)
gate = np.concatenate([gate[la:], np.zeros(la)])
sm = np.zeros(N); cur = 0.0; atk, rel = int(0.12 * SR), int(0.40 * SR)
for i in range(N):
    tg = gate[i]; cur += (tg - cur) * ((1.0 / atk) if tg > cur else (1.0 / rel)) * 8; sm[i] = cur
duck = 1.0 - 0.80 * np.clip(sm, 0, 1)
vst = np.stack([vo, vo], axis=1) * 0.85
mix = bgm * duck[:, None] * 0.26 + sfx * 0.55 + vst
mix = np.tanh(mix * 1.1) / np.tanh(1.1)
mix = mix / (np.abs(mix).max() + 1e-9) * 0.96
fi, fo = int(0.03 * SR), int(0.9 * SR)
mix[:fi] *= np.linspace(0, 1, fi)[:, None]; mix[-fo:] *= np.linspace(1, 0, fo)[:, None]


def to_lufs(path, arr, target=-14.0):
    """통합 라우드니스를 목표값(-14 LUFS, 쇼츠/릴스 기준)으로 맞춰 다시 쓴다."""
    ww(path, arr)
    out = subprocess.run(["ffmpeg", "-i", path, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    cur = float([l for l in out.splitlines() if "I:" in l][-1].split("I:")[1].split("LUFS")[0])
    arr = arr * 10 ** ((target - cur) / 20)
    ww(path, arr)
    print(f"{os.path.basename(path)}: {cur:.1f} → {target:.1f} LUFS, peak {np.abs(arr).max():.2f}")


to_lufs(f"{OUT}/soundtrack.wav", mix)
v = np.stack([vo, vo], axis=1); v = v / (np.abs(v).max() + 1e-9) * 0.94
v[:fi] *= np.linspace(0, 1, fi)[:, None]; v[-fo:] *= np.linspace(1, 0, fo)[:, None]
to_lufs(f"{OUT}/voiceonly.wav", v)

db = lambda z: 20 * np.log10(z + 1e-9)
worst = 99
for b in beats_out:
    for ln in b["lines"]:
        a, z = int(ln["start"] * SR), int((ln["start"] + ln["dur"]) * SR)
        m = db(np.sqrt((vo[a:z] ** 2).mean())) - db(np.sqrt(((bgm * duck[:, None] * 0.26 + sfx * 0.55)[a:z, 0] ** 2).mean()))
        worst = min(worst, m)
print("목소리−(BGM+효과음) 최저 %+.1f dB (목표 ≥ +9)" % worst)
