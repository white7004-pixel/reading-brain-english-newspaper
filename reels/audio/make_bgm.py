"""
리딩브레인 쇼츠용 오리지널 시네마틱 BGM 생성기.
외부 샘플/트랙을 쓰지 않고 전부 합성하므로 저작권이 깨끗하다.

영상 타임라인(30s @30fps, 전환 10프레임 겹침 반영):
  Hook      0.00 – 2.50
  Problem   2.17 – 7.17
  Shift     6.83 – 12.33   (빌드업)
  Evidence 12.00 – 23.00   (결과물 5컷: 12.0 / 14.2 / 16.4 / 18.6 / 20.8)
  CTA      22.67 – 30.00   (해소 + 로고)
"""

import numpy as np
import struct

SR = 44100
DUR = 30.0
N = int(SR * DUR)
t = np.arange(N) / SR
rng = np.random.default_rng(7)

mix = np.zeros(N, dtype=np.float64)


def idx(sec):
    return int(sec * SR)


def add(buf, start_sec, data, gain=1.0):
    i = idx(start_sec)
    if i >= len(buf):
        return
    n = min(len(data), len(buf) - i)
    buf[i:i + n] += data[:n] * gain


def adsr(n, a, d, s_level, r):
    """샘플 수 n짜리 ADSR 엔벨로프."""
    a_n, d_n, r_n = int(a * SR), int(d * SR), int(r * SR)
    s_n = max(0, n - a_n - d_n - r_n)
    parts = [
        np.linspace(0, 1, a_n, endpoint=False) ** 1.6 if a_n else np.array([]),
        np.linspace(1, s_level, d_n, endpoint=False) if d_n else np.array([]),
        np.full(s_n, s_level),
        (np.linspace(1, 0, r_n) ** 2.2) * s_level if r_n else np.array([]),
    ]
    e = np.concatenate([p for p in parts if len(p)])
    return np.resize(e, n)


def tone(freq, dur, harm_profile, detunes=(0.0, 0.004, -0.004), vib=0.0028, vib_hz=4.7):
    """하모닉 합성 + 앙상블 디튠 + 비브라토 = 현/합창 느낌."""
    n = int(dur * SR)
    tt = np.arange(n) / SR
    out = np.zeros(n)
    vibrato = 1.0 + vib * np.sin(2 * np.pi * vib_hz * tt) * np.minimum(tt / 0.6, 1.0)
    for dt in detunes:
        f = freq * (1 + dt) * vibrato
        phase = 2 * np.pi * np.cumsum(f) / SR + rng.uniform(0, 2 * np.pi)
        for h, amp in enumerate(harm_profile, start=1):
            if amp:
                out += amp * np.sin(h * phase)
    return out / (len(detunes) * sum(harm_profile))


STRINGS = [1.0, 0.52, 0.34, 0.21, 0.13, 0.08, 0.05]
CHOIR = [1.0, 0.30, 0.16, 0.07, 0.04]
BRASS = [1.0, 0.70, 0.48, 0.33, 0.22, 0.14, 0.09, 0.06]


def chord(start, dur, freqs, amp, profile=STRINGS, a=0.28, r=0.9):
    n = int(dur * SR)
    env = adsr(n, a, 0.25, 0.86, r)
    for f in freqs:
        # 낮은 음은 조금 더 크게
        w = 1.0 if f > 120 else 1.25
        add(mix, start, tone(f, dur, profile) * env, amp * w)


def sub(start, dur, freq, amp, a=0.01, r=0.5):
    """서브 베이스 — 웅장함의 바닥."""
    n = int(dur * SR)
    tt = np.arange(n) / SR
    sig = np.sin(2 * np.pi * freq * tt) + 0.28 * np.sin(2 * np.pi * 2 * freq * tt)
    add(mix, start, sig * adsr(n, a, 0.2, 0.9, r), amp)


def impact(start, amp=1.0, pitch_hi=92.0, pitch_lo=34.0, dur=2.0):
    """트레일러 임팩트: 서브 스윕 + 노이즈 버스트."""
    n = int(dur * SR)
    tt = np.arange(n) / SR
    sweep = pitch_lo + (pitch_hi - pitch_lo) * np.exp(-tt * 9.0)
    body = np.sin(2 * np.pi * np.cumsum(sweep) / SR) * np.exp(-tt * 2.6)
    click = rng.normal(0, 1, n) * np.exp(-tt * 46.0)
    # 노이즈를 저역 쪽으로 (간단한 이동평균 LPF)
    k = 18
    click = np.convolve(click, np.ones(k) / k, mode="same")
    add(mix, start, body * 0.95 + click * 0.42, amp)


def taiko(start, amp=0.6, freq=61.0, dur=0.85):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    f = freq * (1 + 0.55 * np.exp(-tt * 28))
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 7.5)
    skin = rng.normal(0, 1, n) * np.exp(-tt * 60)
    skin = np.convolve(skin, np.ones(10) / 10, mode="same")
    add(mix, start, body + skin * 0.3, amp)


def riser(start, dur, amp=0.5, f0=180.0, f1=1700.0):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    k = (tt / dur) ** 2.1
    f = f0 + (f1 - f0) * k
    noise = rng.normal(0, 1, n)
    # 상승하는 밴드패스 근사: 노이즈 × 상승 톤
    tonal = np.sin(2 * np.pi * np.cumsum(f) / SR)
    sig = (0.55 * tonal + 0.45 * noise * (0.3 + 0.7 * k)) * (k ** 1.1)
    add(mix, start, sig, amp)


def cymbal_swell(start, dur, amp=0.35):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    k = (tt / dur) ** 2.4
    noise = rng.normal(0, 1, n)
    noise = noise - np.convolve(noise, np.ones(40) / 40, mode="same")  # 하이패스 근사
    add(mix, start, noise * k, amp)


def cymbal_crash(start, amp=0.45, dur=2.6):
    n = int(dur * SR)
    tt = np.arange(n) / SR
    noise = rng.normal(0, 1, n)
    noise = noise - np.convolve(noise, np.ones(30) / 30, mode="same")
    add(mix, start, noise * np.exp(-tt * 2.0), amp)


# ─────────────────────────────────────────────────────────────
# 음정
D1, D2, A2, D3, F3, A3, D4, F4, A4 = 36.71, 73.42, 110.0, 146.83, 174.61, 220.0, 293.66, 349.23, 440.0
Bb1, Bb2, Bb3, Bb4 = 58.27, 116.54, 233.08, 466.16
F2, C3, C4, E3, E4, G3, G4 = 87.31, 130.81, 261.63, 164.81, 329.63, 196.0, 392.0

# ── A. 훅 / 긴장 (0.0 – 6.8) ───────────────────────────────
impact(0.00, amp=0.95)
cymbal_crash(0.00, amp=0.30)
sub(0.00, 7.4, D1, 0.30, a=0.05, r=1.2)
chord(0.15, 7.0, [D2, A2, D3], 0.10, CHOIR, a=1.2, r=1.6)
for i, ts in enumerate([1.10, 2.20, 3.30, 4.40, 5.50]):
    taiko(ts, amp=0.20 + i * 0.035, freq=55)
impact(2.17, amp=0.40, pitch_hi=70, dur=1.4)   # Problem 씬 진입

# ── B. 빌드업 (6.8 – 12.0) ─────────────────────────────────
impact(6.83, amp=0.62)                          # Shift 씬 진입
sub(6.83, 5.3, D1, 0.34, a=0.02, r=0.4)
chord(6.83, 5.2, [D2, A2, D3, F3], 0.13, STRINGS, a=1.6, r=0.5)
riser(6.90, 5.05, amp=0.30)
cymbal_swell(9.40, 2.55, amp=0.30)
for ts, a in [(6.83, .38), (8.03, .40), (9.13, .44), (10.03, .48),
              (10.78, .52), (11.33, .56), (11.66, .60)]:
    taiko(ts, amp=a)
# 드롭 직전 호흡
mix[idx(11.86):idx(12.00)] *= np.linspace(1.0, 0.12, idx(12.00) - idx(11.86))

# ── C. 에픽 페이오프 (12.0 – 22.7) — 결과물 5컷 ────────────
BAR = 2.2
CARDS = [12.00, 14.20, 16.40, 18.60, 20.80]
PROG = [
    [D2, D3, F3, A3, D4],        # Dm
    [Bb1, Bb2, D3, F3, Bb3, D4], # Bb
    [F2, C3, F3, A3, C4, F4],    # F
    [C3, G3, C4, E4, G4],        # C
    [D2, A2, D3, F3, A3, D4, F4] # Dm (상승)
]
BASSES = [D1, Bb1, F2 / 2, C3 / 2, D1]

for i, (ts, freqs) in enumerate(zip(CARDS, PROG)):
    grow = 1.0 + i * 0.07
    impact(ts, amp=(0.85 if i == 0 else 0.60) * grow)
    cymbal_crash(ts, amp=0.26 * grow)
    chord(ts, BAR + 0.5, freqs, 0.145 * grow, STRINGS, a=0.10, r=0.45)
    chord(ts, BAR + 0.5, freqs[2:], 0.055 * grow, CHOIR, a=0.35, r=0.6)
    sub(ts, BAR + 0.2, BASSES[i], 0.34 * grow, a=0.01, r=0.3)
    # 박자: 한 마디 4박 + 8분음표 드라이브
    for b in range(4):
        taiko(ts + b * (BAR / 4), amp=(0.56 if b == 0 else 0.33) * grow)
        if i >= 1:
            taiko(ts + b * (BAR / 4) + BAR / 8, amp=0.15 * grow, freq=70, dur=0.4)

riser(21.35, 1.35, amp=0.40, f0=260, f1=2300)
cymbal_swell(21.35, 1.32, amp=0.34)

# ── D. 해소 / CTA (22.67 – 30.0) ───────────────────────────
impact(22.67, amp=1.0, pitch_hi=98)
cymbal_crash(22.67, amp=0.46, dur=4.0)
sub(22.67, 7.1, Bb1, 0.36, a=0.01, r=2.4)
chord(22.67, 4.2, [Bb2, F3, Bb3, D4, F4], 0.165, BRASS, a=0.12, r=1.0)   # Bb 장조
chord(22.67, 4.2, [Bb3, D4, F4, Bb4], 0.075, CHOIR, a=0.5, r=1.2)
for b in range(4):
    taiko(22.67 + b * (BAR / 4), amp=0.50 if b == 0 else 0.30)
taiko(24.87, amp=0.52)

chord(24.87, 5.1, [F2, C3, F3, A3, C4, F4], 0.175, BRASS, a=0.35, r=3.4)  # F 장조 해소
chord(24.87, 5.1, [F3, A3, C4, F4, A4], 0.080, CHOIR, a=0.8, r=3.6)
sub(24.87, 5.0, F2 / 2, 0.30, a=0.05, r=3.0)
cymbal_crash(24.87, amp=0.30, dur=4.0)

# ─────────────────────────────────────────────────────────────
# 리버브 (지수 감쇠 노이즈 IR, FFT 컨볼루션) — 홀 느낌
def reverb(signal, decay=0.42, length=1.8, seed=3):
    r = np.random.default_rng(seed)
    m = int(length * SR)
    tt = np.arange(m) / SR
    ir = r.normal(0, 1, m) * np.exp(-tt / decay)
    ir[: int(0.012 * SR)] *= np.linspace(0, 1, int(0.012 * SR))  # 프리딜레이
    ir /= np.sqrt(np.sum(ir ** 2))
    size = 1
    while size < len(signal) + m:
        size *= 2
    wet = np.fft.irfft(np.fft.rfft(signal, size) * np.fft.rfft(ir, size))[: len(signal)]
    return wet


wet_l = reverb(mix, seed=3)
wet_r = reverb(mix, seed=11)
WET = 0.26
left = mix * (1 - WET * 0.5) + wet_l * WET
right = mix * (1 - WET * 0.5) + wet_r * WET

# 살짝의 스테레오 폭 (하스 효과, 8 샘플)
d = 8
right = np.concatenate([np.zeros(d), right[:-d]])

stereo = np.stack([left, right], axis=1)

# 전체 페이드: 시작 0.05s, 끝 1.2s (스킬 규칙: 끝 30프레임 = 1.0s 이상 페이드아웃)
fi, fo = int(0.05 * SR), int(1.2 * SR)
stereo[:fi] *= np.linspace(0, 1, fi)[:, None]
stereo[-fo:] *= (np.linspace(1, 0, fo) ** 1.5)[:, None]

# 부드러운 리미팅 후 정규화
stereo = np.tanh(stereo * 1.25) / np.tanh(1.25)
peak = np.max(np.abs(stereo))
stereo = stereo / peak * 0.97

pcm = (stereo * 32767).astype("<i2")
data = pcm.tobytes()
hdr = (
    b"RIFF" + struct.pack("<I", 36 + len(data)) + b"WAVEfmt "
    + struct.pack("<IHHIIHH", 16, 1, 2, SR, SR * 2 * 2, 4, 16)
    + b"data" + struct.pack("<I", len(data))
)
out = "public/bgm.wav"
with open(out, "wb") as f:
    f.write(hdr + data)
print("wrote", out, "%.1f MB" % ((len(data) + 44) / 1024 / 1024), "peak %.3f" % peak)
