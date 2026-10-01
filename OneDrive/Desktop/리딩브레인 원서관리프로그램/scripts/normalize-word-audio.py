# -*- coding: utf-8 -*-
"""단어 발음 파일의 소리 크기를 고르고 mp3 로 바꾼다.

    python scripts/normalize-word-audio.py          # 모든 책
    python scripts/normalize-word-audio.py holes    # 한 책만

위키미디어 공용에서 받은 녹음은 화자마다 크기가 제각각이고(.ogg 는 아이폰에서 안 나온다),
앞뒤에 빈 소리가 길게 붙은 것, 같은 단어를 두세 번 말한 것도 있다. 그래서
  1) 말소리가 있는 데만 남기고(첫 번째 발음만)  2) 평균 크기를 TARGET 에 맞추고(찢어지지 않게 리미터)  3) mp3 로 저장한다.
원본은 지우지 않고 assets-orig/audio/<slug>/ 로 옮긴다(배포되지 않는 폴더).
books/<slug>.js 의 audio 경로도 .mp3 로 바꾼다. 출판사 낭독(read/)은 건드리지 않는다.
ffmpeg 가 있어야 한다. 다시 돌려도 된다: 옮겨 둔 원본에서 새로 만든다(TARGET 을 바꿔 크기를 다시 맞출 때).
"""
import io, os, re, sys, glob, shutil, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET = -20.0      # 평균 크기(dB). 작게 들리면 -18 쪽으로 올린다
CEIL = -1.0         # 가장 큰 순간도 이 아래로
FRAME = 0.02        # 크기를 재는 단위(초)
# ponytail: 한 단어(1초 안팎)는 너무 짧아 방송 표준(LUFS) 측정이 안 된다 → 평균 크기(mean_volume)로 맞춘다. 문장 단위 음원이 생기면 loudnorm 으로.
# 맨 앞에서 정수 형식 모노로 만든다: 소수 형식에서 스테레오→모노로 섞으면 ffmpeg 가 크기를 줄여 주지 않아 3dB 커진다
MONO = "aformat=sample_fmts=s16:channel_layouts=mono,aresample=44100"

def run(args):
    return subprocess.run(["ffmpeg", "-hide_banner", "-nostdin"] + args, capture_output=True, text=True, encoding="utf-8", errors="replace")

def span(frames):
    """20ms 마다의 크기(dB) → 말소리 구간 (시작초, 끝초).
    조용함의 기준은 파일마다 다르다: 그 파일의 바닥 잡음보다 8dB 위(잡음 많은 녹음), 아무리 낮아도 가장 큰 소리의 -45dB, 아무리 높아도 -25dB.
    같은 단어를 되풀이한 녹음은 첫 번째만: 말이 시작된 뒤 0.3초 넘게 조용하면 거기서 끝낸다(t·k 닫힘소리의 틈은 0.1초 안쪽이라 안전)."""
    peak = max(frames)
    floor = sorted(frames)[len(frames) // 10]
    thr = min(max(floor + 8, peak - 45), peak - 25)
    loud = [f > thr for f in frames]
    if True not in loud: return None
    a = loud.index(True); b = a; gap = 0
    for i in range(a, len(loud)):
        if loud[i]: b = i; gap = 0
        else:
            gap += 1
            if gap * FRAME >= 0.3: break
    return max(0, a * FRAME - 0.04), (b + 1) * FRAME + 0.08

def measure(path, af):
    err = run(["-i", path, "-af", af + ",volumedetect", "-f", "null", "-"]).stderr
    m = re.search(r"mean_volume: (-?[\d.]+) dB", err); x = re.search(r"max_volume: (-?[\d.]+) dB", err)
    return (float(m.group(1)), float(x.group(1))) if m and x else None

def envelope(path):
    err = run(["-i", path, "-af", "%s,asetnsamples=%d,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level" % (MONO, int(44100 * FRAME)),
               "-f", "null", "-"]).stderr
    return [-100.0 if "inf" in v else max(-100.0, float(v)) for v in re.findall(r"RMS_level=(-?inf|-?[\d.]+)", err)]

def main():
    slugs = sys.argv[1:] or sorted(os.path.basename(d) for d in glob.glob(os.path.join(ROOT, "assets", "audio", "*")) if os.path.isdir(d))
    n = 0
    for slug in slugs:
        d = os.path.join(ROOT, "assets", "audio", slug)
        olddir = os.path.join(ROOT, "assets-orig", "audio", slug)
        # 원본은 아직 안 옮긴 것 + 이미 옮겨 둔 것. 그래서 TARGET 을 바꿔 다시 돌리면 전부 원본에서 새로 만든다
        for src in sorted(glob.glob(os.path.join(d, "*.*")) + glob.glob(os.path.join(olddir, "*.*"))):
            base, ext = os.path.splitext(os.path.basename(src))
            if ext.lower() not in (".ogg", ".oga", ".wav"): continue
            name = slug + "/" + base
            env = envelope(src); se = span(env) if env else None
            if not se: print("%-28s 읽지 못함 — 그대로 둠" % name); continue
            cut = "%s,atrim=%.3f:%.3f,asetpts=N/SR/TB" % (MONO, se[0], se[1])
            lv = measure(src, cut)
            if not lv: print("%-28s 읽지 못함 — 그대로 둠" % name); continue
            if lv[1] - lv[0] < 6:                       # 말소리는 가장 큰 순간이 평균보다 한참 크다. 아니면 삐 소리·잡음이다
                print("%-28s 말소리가 아닌 것 같음 — 건너뜀 (책 파일에서 audio 를 빼면 기계 음성이 읽는다)" % name); continue
            gain = TARGET - lv[0]; dur = min(se[1], len(env) * FRAME) - se[0]
            out = os.path.join(d, base + ".mp3")
            r = run(["-y", "-i", src, "-af", "%s,afade=t=in:d=0.01,afade=t=out:st=%.3f:d=0.06,volume=%.1fdB,alimiter=limit=%.3f:level=disabled"
                     % (cut, max(0, dur - 0.06), gain, 10 ** (CEIL / 20)), "-b:a", "96k", out])
            if r.returncode or not os.path.getsize(out): print("%-28s 변환 실패 — 그대로 둠" % name); continue
            if os.path.dirname(src) == d: os.makedirs(olddir, exist_ok=True); shutil.move(src, os.path.join(olddir, base + ext))
            print("%-28s %6.1f → %5.1f dB (%+5.1f)  %.2f초" % (name, lv[0], TARGET, gain, dur)); n += 1
        # 책 파일의 경로를 mp3 로. mp3 가 실제로 있는 것만 바꾼다
        p = os.path.join(ROOT, "books", slug + ".js")
        if not os.path.exists(p): continue
        s = io.open(p, encoding="utf-8").read()
        fix = lambda m: m.group(1) + ".mp3" if os.path.exists(os.path.join(d, m.group(2) + ".mp3")) else m.group(0)
        t = re.sub(r'(assets/audio/%s/([^"/]+))\.(?:ogg|oga|wav)(?=")' % re.escape(slug), fix, s)
        if t != s: io.open(p, "w", encoding="utf-8", newline="\n").write(t)
    print("바꾼 파일 %d개" % n)

def selftest():
    near = lambda x, y: abs(x - y) < 1e-6
    q, s = [-60.0] * 10, [-10.0] * 20                   # 0.2초 조용 + 0.4초 말
    a, b = span(q + s + q); assert near(a, 0.16) and near(b, 0.68), (a, b)
    a, b = span(q + s + q * 2 + s + q); assert near(b, 0.68), "되풀이한 녹음은 첫 번째만"
    a, b = span(q + s + q[:5] + s + q); assert near(b, 1.18), "0.1초 틈(닫힘소리)은 한 단어다"
    n45 = [-45.0] * 15; a, b = span(n45 + s + n45); assert near(a, 0.26) and near(b, 0.78), "잡음이 깔린 녹음도 말소리만"

if __name__ == "__main__":
    selftest(); main()
