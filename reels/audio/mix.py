"""내레이션(public/vo/*.wav) + 오리지널 BGM(public/bgm.wav) 더킹 믹스.

사용: cd reels && python3 audio/mix.py
 → public/soundtrack.wav (완성본), public/voiceonly.wav (인스타 앱에서 유행곡을 얹는 용)

더킹은 '선행(look-ahead)' 방식: 말이 시작되기 LOOKAHEAD초 전에 BGM을 내려
첫 음절이 임팩트 꼬리에 묻히지 않게 한다.
"""
import json, struct
import numpy as np

SR = 44100
N = int(SR * 30.0)
LOOKAHEAD = 0.10      # 초 — 말보다 먼저 BGM을 낮춘다
HOLD = 0.30           # 초 — 말 끝난 뒤에도 더킹 유지(단어 사이 쉼)
DUCK_DEPTH = 0.84     # 말할 때 BGM이 (1-0.84)=16% 로 → 약 -16 dB
BGM_GAIN = 0.42


def rw(path):
    d = open(path, "rb").read()
    i = d.find(b"fmt "); ch = struct.unpack("<H", d[i + 10:i + 12])[0]
    j = d.find(b"data"); n = struct.unpack("<I", d[j + 4:j + 8])[0]
    a = np.frombuffer(d[j + 8:j + 8 + n], dtype="<i2").astype(np.float64) / 32768
    return a.reshape(-1, ch) if ch > 1 else a.reshape(-1, 1)


def ww(path, arr):
    pcm = (arr * 32767).astype("<i2").tobytes()
    open(path, "wb").write(
        b"RIFF" + struct.pack("<I", 36 + len(pcm)) + b"WAVEfmt "
        + struct.pack("<IHHIIHH", 16, 1, arr.shape[1], SR, SR * arr.shape[1] * 2, arr.shape[1] * 2, 16)
        + b"data" + struct.pack("<I", len(pcm)) + pcm)


meta = json.load(open("public/vo/meta.json"))
vo = np.zeros(N)
for x in meta:
    c = rw(f"public/vo/{x['id']}.wav")[:, 0]
    c = c / (np.abs(c).max() + 1e-9) * 0.92
    f = int(0.008 * SR); c[:f] *= np.linspace(0, 1, f); c[-f:] *= np.linspace(1, 0, f)
    i = int(x["start"] * SR); n = min(len(c), N - i); vo[i:i + n] += c[:n]

# 말 엔벨로프 → 선행 이동 → 비대칭 스무딩(빠른 하강, 느린 복귀)
w = int(0.05 * SR)
env = np.convolve(np.abs(vo), np.ones(w) / w, mode="same")
gate = np.clip(env / 0.12, 0, 1)
# 홀드: 말이 끝난 뒤 HOLD초 동안 더킹 유지 → 단어 사이 짧은 쉼에서 BGM이 튀어오르지 않게
active = (gate > 0.25).astype(np.float64)
held = np.convolve(active, np.ones(int(HOLD * SR)), "full")[:N] > 0
gate = np.maximum(gate, held.astype(np.float64))
la = int(LOOKAHEAD * SR)
gate = np.concatenate([gate[la:], np.zeros(la)])

# 임팩트 보호: 컷 시점(HITS)에 말이 없으면 임팩트 첫 HIT_WIN초 동안은 더킹을 풀어 타격감을 살린다
HITS = [0.0, 2.17, 6.83, 12.0, 14.2, 16.4, 18.6, 20.8, 22.67]
HIT_WIN = 0.14
for h in HITS:
    a, b = int(h * SR), int((h + HIT_WIN) * SR)
    lo = max(0, int((h - 0.03) * SR))
    if np.abs(vo[lo:b]).max() < 0.02:        # 그 순간 말이 없을 때만
        gate[a:b] = 0.0
atk, rel = int(0.12 * SR), int(0.45 * SR)
sm = np.zeros(N); cur = 0.0
for i in range(N):
    t = gate[i]
    cur += (t - cur) * ((1.0 / atk) if t > cur else (1.0 / rel)) * 8
    sm[i] = cur
duck = 1.0 - DUCK_DEPTH * np.clip(sm, 0, 1)

bgm = rw("public/bgm.wav")
bgm = np.pad(bgm, ((0, max(0, N - len(bgm))), (0, 0)))[:N]
bgm_d = bgm * duck[:, None] * BGM_GAIN
voice_st = np.stack([vo, vo], axis=1) * 0.80

mix = bgm_d + voice_st
mix = np.tanh(mix * 1.15) / np.tanh(1.15)
mix = mix / (np.abs(mix).max() + 1e-9) * 0.96
fi, fo = int(0.04 * SR), int(1.2 * SR)
mix[:fi] *= np.linspace(0, 1, fi)[:, None]
mix[-fo:] *= (np.linspace(1, 0, fo) ** 1.5)[:, None]
ww("public/soundtrack.wav", mix)

v = np.stack([vo, vo], axis=1) * 0.92
v = v / (np.abs(v).max() + 1e-9) * 0.94
v[:fi] *= np.linspace(0, 1, fi)[:, None]
v[-fo:] *= (np.linspace(1, 0, fo) ** 1.5)[:, None]
ww("public/voiceonly.wav", v)

# ── 명료도 리포트: 말 구간에서 목소리가 BGM보다 얼마나 큰가 ──
db = lambda z: 20 * np.log10(z + 1e-9)
print("줄   시작   목소리 − BGM(전체)   목소리 − BGM(처음 0.6초)")
worst = 99
for x in meta:
    a = int(x["start"] * SR); b = int((x["start"] + x["dur"]) * SR)
    vv = vo[a:b]; bb = (bgm_d[a:b, 0])
    act = np.where(np.abs(vv) > 0.02)[0]
    s0 = act[0] if len(act) else 0
    e = s0 + int(0.6 * SR)
    full_m = db(np.sqrt((vv ** 2).mean())) - db(np.sqrt((bb ** 2).mean()))
    head_m = db(np.sqrt((vv[s0:e] ** 2).mean())) - db(np.sqrt((bb[s0:e] ** 2).mean()))
    worst = min(worst, full_m, head_m)
    print(" %s  %5.2f   %+6.1f dB           %+6.1f dB" % (x["id"], x["start"], full_m, head_m))
print("가장 낮은 값: %+.1f dB (목표 ≥ +9 dB)" % worst)
