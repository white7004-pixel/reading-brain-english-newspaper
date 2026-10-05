import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { FONT } from "../fonts";
import type { Beat, ComicProps, Line, Timeline } from "./types";

const OUT = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const EASE = Easing.bezier(0.16, 1, 0.3, 1);
const RED = "#E5484D";

/* *강조* 마크업 → 강조색 span */
const rich = (text: string, hi: string): React.ReactNode =>
  text.split("*").map((part, i) =>
    i % 2 ? (
      <span key={i} style={{ color: hi }}>
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );

/* 아래에서 톡 튀어오르는 등장 */
const usePop = (delay = 0, len = 10) => {
  const f = useCurrentFrame() - delay;
  return {
    opacity: interpolate(f, [0, 4], [0, 1], { ...OUT, easing: EASE }),
    scale: interpolate(f, [0, len * 0.6, len], [0.82, 1.06, 1], { ...OUT, output: "perceptual-scale" }),
    translate: "0px " + interpolate(f, [0, len], [36, 0], { ...OUT, easing: Easing.out(Easing.cubic) }) + "px",
  };
};

/* ───────── 공통 크롬: 상단 에피소드 태그 + 학원 눈썹 ───────── */
const Chrome: React.FC<{ tl: Timeline }> = ({ tl }) => (
  <>
    <div
      style={{
        position: "absolute",
        top: 236,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: tl.academy.colors.accent,
          color: tl.academy.colors.bg,
          fontWeight: 800,
          fontSize: 38,
          padding: "10px 32px",
          borderRadius: 999,
        }}
      >
        <span>
          {tl.series} {tl.episode}
        </span>
        <span style={{ opacity: 0.55 }}>|</span>
        <span>{tl.topic}</span>
      </div>
    </div>
  </>
);

/* ───────── 하단 자막: 화자 태그 + 큰 글씨 (말하는 순간 팝) ───────── */
const Caption: React.FC<{ tl: Timeline; line: Line; local: number }> = ({ tl, line, local }) => {
  const cast = tl.cast[line.who];
  const pop = usePop(local, 9);
  return (
    <Interactive.Div
      name="Caption"
      style={{
        position: "absolute",
        left: 50,
        right: 50,
        top: 1300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        fontFamily: FONT,
        ...pop,
      }}
    >
      {cast?.name ? (
        <div
          style={{
            background: cast.color ?? "#fff",
            color: "#1B2A4A",
            fontWeight: 800,
            fontSize: 38,
            padding: "6px 28px",
            borderRadius: 999,
          }}
        >
          {cast.name}
        </div>
      ) : null}
      <div
        style={{
          background: "rgba(255,255,255,0.97)",
          color: "#14203A",
          fontWeight: 800,
          fontSize: 60,
          lineHeight: 1.3,
          textAlign: "center",
          padding: "20px 40px",
          borderRadius: 28,
          boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
          wordBreak: "keep-all",
        }}
      >
        {rich(line.text, "#B8860B")}
      </div>
    </Interactive.Div>
  );
};

/* 현재 시각의 대사 */
const useActive = (beat: Beat, fps: number) => {
  const frame = useCurrentFrame();
  const t = beat.start + frame / fps;
  let idx = 0;
  beat.lines.forEach((l, i) => {
    if (t >= l.start - 0.02) idx = i;
  });
  const line = beat.lines[idx];
  return { idx, line, local: Math.round((line.start - beat.start) * fps) };
};

/* ───────── 컷(패널) — 말하는 캐릭터로 카메라 이동 ───────── */
const PanelBeat: React.FC<{ tl: Timeline; beat: Extract<Beat, { type: "panel" | "hook" }>; dim?: boolean }> = ({
  tl,
  beat,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { line } = useActive(beat, fps);
  const W = 1000;
  const H = 840;
  const ASPECT = 1.5;

  // 각 대사 시작 프레임을 키프레임으로 초점 보간
  const keys = beat.lines.map((l) => Math.round((l.start - beat.start) * fps));
  const fx = beat.lines.map((l) => l.focus?.[0] ?? 0.5);
  const fy = beat.lines.map((l) => l.focus?.[1] ?? 0.5);
  const kf: number[] = [];
  const vx: number[] = [];
  const vy: number[] = [];
  keys.forEach((k, i) => {
    if (i > 0) {
      kf.push(k - 1);
      vx.push(fx[i - 1]);
      vy.push(fy[i - 1]);
    }
    kf.push(i === 0 ? 0 : k + 12);
    vx.push(fx[i]);
    vy.push(fy[i]);
  });
  const dur = Math.round((beat.end - beat.start) * fps);
  kf.push(dur);
  vx.push(fx[fx.length - 1]);
  vy.push(fy[fy.length - 1]);
  const ease = { ...OUT, easing: Easing.inOut(Easing.cubic) };
  const cx = kf.length > 1 ? interpolate(frame, kf, vx, ease) : fx[0];
  const cy = kf.length > 1 ? interpolate(frame, kf, vy, ease) : fy[0];

  const zoom = interpolate(frame, [0, dur], [1.0, 1.05], OUT);
  const h = H * zoom;
  const w = h * ASPECT;
  const left = Math.min(0, Math.max(W - w, W / 2 - cx * w));
  const top = Math.min(0, Math.max(H - h, H / 2 - cy * h));
  const enter = usePop(0, 8);
  const art = (beat as { art: string }).art;

  return (
    <AbsoluteFill>
      <Interactive.Div
        name="PanelCard"
        style={{
          position: "absolute",
          left: 40,
          top: 380,
          width: W,
          height: H,
          borderRadius: 40,
          overflow: "hidden",
          border: "8px solid #fff",
          boxSizing: "content-box",
          marginLeft: -8,
          marginTop: -8,
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          backgroundColor: "#000",
          ...enter,
        }}
      >
        <Img
          src={staticFile(`ep/${tl.id}/${art}.jpg`)}
          style={{ position: "absolute", left, top, width: w, height: h, maxWidth: "none" }}
        />
      </Interactive.Div>
      <Caption key={line.start} tl={tl} line={line} local={Math.round((line.start - beat.start) * fps)} />
    </AbsoluteFill>
  );
};

/* ───────── 훅: 틀린 일기장 ───────── */
const HookBeat: React.FC<{ tl: Timeline; beat: Extract<Beat, { type: "hook" }> }> = ({ tl, beat }) => {
  const frame = useCurrentFrame();
  const t1 = usePop(0, 10);
  const t2 = usePop(8, 12);
  const underline = (i: number) => interpolate(frame, [26 + i * 10, 38 + i * 10], [0, 1], { ...OUT, easing: EASE });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile(`ep/${tl.id}/${beat.art}.jpg`)}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(18px)", opacity: 0.28 }}
        />
      </AbsoluteFill>
      <Interactive.Div
        name="HookTitle"
        style={{
          position: "absolute",
          top: 400,
          left: 60,
          right: 60,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 104,
          lineHeight: 1.22,
          color: "#fff",
          textShadow: "0 6px 30px rgba(0,0,0,0.5)",
          wordBreak: "keep-all",
          ...t1,
        }}
      >
        {beat.title}
      </Interactive.Div>
      <Interactive.Div
        name="Diary"
        style={{
          position: "absolute",
          top: 790,
          left: 90,
          right: 90,
          background: tl.academy.colors.paper,
          borderRadius: 28,
          padding: "60px 56px",
          fontFamily: "'Courier New', Pretendard, monospace",
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          rotate: "-1.5deg",
          ...t2,
        }}
      >
        {beat.diary.map((row, i) => {
          const parts = row.split("*");
          return (
            <div key={i} style={{ fontSize: 64, fontWeight: 700, color: "#14203A", lineHeight: 1.6 }}>
              {parts.map((p, j) =>
                j % 2 ? (
                  <span key={j} style={{ position: "relative", color: RED }}>
                    {p}
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: 4,
                        height: 7,
                        width: "100%",
                        background: RED,
                        borderRadius: 4,
                        transformOrigin: "left",
                        scale: underline(i) + " 1",
                      }}
                    />
                  </span>
                ) : (
                  <React.Fragment key={j}>{p}</React.Fragment>
                ),
              )}
            </div>
          );
        })}
      </Interactive.Div>
    </AbsoluteFill>
  );
};

/* ───────── 개념 카드: go → ~~goed~~ → went + 스탬프 ───────── */
const SwapBeat: React.FC<{ tl: Timeline; beat: Extract<Beat, { type: "swap" }> }> = ({ tl, beat }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = Math.round((beat.lines[0].start - beat.start) * fps);
  const card = usePop(0, 10);
  const stampF = frame - (rel + Math.round(3.3 * fps));
  const stamp = {
    opacity: interpolate(stampF, [0, 2], [0, 1], OUT),
    scale: interpolate(stampF, [0, 4, 8], [2.4, 0.92, 1], { ...OUT, easing: Easing.out(Easing.cubic), output: "perceptual-scale" }),
  };
  return (
    <AbsoluteFill>
      <Interactive.Div
        name="SwapCard"
        style={{
          position: "absolute",
          top: 380,
          left: 60,
          right: 60,
          background: tl.academy.colors.paper,
          borderRadius: 40,
          padding: "70px 40px 80px",
          display: "flex",
          flexDirection: "column",
          gap: 56,
          fontFamily: FONT,
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          ...card,
        }}
      >
        {beat.pairs.map(([base, wrong, right], i) => {
          const d = rel + Math.round(i * 1.3 * fps);
          const p = usePop(d, 10); // eslint-disable-line react-hooks/rules-of-hooks
          const strike = interpolate(frame, [d + 12, d + 22], [0, 1], { ...OUT, easing: EASE });
          return (
            <Interactive.Div
              key={base}
              name="SwapRow"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 26, ...p }}
            >
              <span style={{ fontSize: 86, fontWeight: 800, color: "#14203A" }}>{base}</span>
              <span style={{ fontSize: 60, color: "#9AA3B5" }}>→</span>
              <span style={{ position: "relative", fontSize: 70, fontWeight: 700, color: "#9AA3B5" }}>
                {wrong}
                <span
                  style={{
                    position: "absolute",
                    left: -6,
                    top: "52%",
                    height: 8,
                    width: "calc(100% + 12px)",
                    background: RED,
                    borderRadius: 4,
                    transformOrigin: "left",
                    scale: strike + " 1",
                  }}
                />
              </span>
              <span style={{ fontSize: 96, fontWeight: 800, color: "#B8860B" }}>{right}</span>
            </Interactive.Div>
          );
        })}
      </Interactive.Div>
      <Interactive.Div
        name="Stamp"
        style={{
          position: "absolute",
          top: 1010,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          rotate: "-5deg",
          ...stamp,
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 84,
            color: RED,
            border: `10px solid ${RED}`,
            borderRadius: 24,
            padding: "6px 44px",
            background: "rgba(255,255,255,0.92)",
          }}
        >
          {beat.stamp}
        </div>
      </Interactive.Div>
      <Caption tl={tl} line={beat.lines[0]} local={rel} />
    </AbsoluteFill>
  );
};

/* ───────── 다음 편 퀴즈 ───────── */
const QuizBeat: React.FC<{ tl: Timeline; beat: Extract<Beat, { type: "quiz" }> }> = ({ tl, beat }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = Math.round((beat.lines[0].start - beat.start) * fps);
  const label = usePop(0, 10);
  const card = usePop(6, 12);
  const blink = Math.floor(frame / 12) % 2 === 0 ? 1 : 0.25;
  const [pre, post] = beat.sentence.split(/_+/);
  return (
    <AbsoluteFill>
      <Interactive.Div
        name="QuizLabel"
        style={{
          position: "absolute",
          top: 420,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          fontFamily: FONT,
          ...label,
        }}
      >
        <div
          style={{
            background: tl.academy.colors.accent,
            color: tl.academy.colors.bg,
            fontWeight: 800,
            fontSize: 64,
            padding: "14px 54px",
            borderRadius: 999,
          }}
        >
          {beat.label}
        </div>
      </Interactive.Div>
      <Interactive.Div
        name="QuizCard"
        style={{
          position: "absolute",
          top: 620,
          left: 50,
          right: 50,
          background: tl.academy.colors.paper,
          borderRadius: 40,
          padding: "70px 30px",
          textAlign: "center",
          fontFamily: "'Courier New', Pretendard, monospace",
          fontWeight: 700,
          fontSize: 54,
          whiteSpace: "nowrap",
          color: "#14203A",
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          ...card,
        }}
      >
        {pre}
        <span
          style={{
            display: "inline-block",
            width: 200,
            height: 12,
            background: RED,
            borderRadius: 6,
            margin: "0 12px",
            verticalAlign: "-4px",
            opacity: blink,
          }}
        />
        {post}
      </Interactive.Div>
      <Caption tl={tl} line={beat.lines[0]} local={rel} />
    </AbsoluteFill>
  );
};

/* ───────── CTA: 학원 로고 + 행동 한 줄 ───────── */
const CtaBeat: React.FC<{ tl: Timeline; beat: Extract<Beat, { type: "cta" }> }> = ({ tl }) => {
  const logo = usePop(0, 14);
  const name = usePop(14, 10);
  const pill = usePop(34, 10);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", fontFamily: FONT }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 40, alignItems: "center", marginTop: -50 }}>
        <Interactive.Div
          name="Logo"
          style={{ background: "#fff", borderRadius: 32, padding: "44px 56px", ...logo }}
        >
          <Img src={staticFile(tl.academy.logo)} style={{ width: 470, height: "auto" }} />
        </Interactive.Div>
        <Interactive.Div name="AcademyName" style={{ fontWeight: 800, fontSize: 66, color: "#fff", ...name }}>
          {tl.academy.name}
        </Interactive.Div>
        <Interactive.Div
          name="CtaPill"
          style={{
            background: tl.academy.colors.accent,
            color: tl.academy.colors.bg,
            fontWeight: 800,
            fontSize: 48,
            padding: "18px 44px",
            borderRadius: 22,
            ...pill,
          }}
        >
          {tl.academy.cta}
        </Interactive.Div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────── 에피소드 ───────── */
export const ComicEpisode: React.FC<ComicProps> = ({ timeline: tl, audio }) => {
  const { fps } = useVideoConfig();
  const bg = tl.academy.colors.bg;
  return (
    <AbsoluteFill
      style={{ background: `linear-gradient(180deg, ${bg} 0%, #101b33 100%)`, fontFamily: FONT }}
    >
      <Audio src={staticFile(`ep/${tl.id}/${audio === "full" ? "soundtrack" : "voiceonly"}.wav`)} />
      <Chrome tl={tl} />
      {tl.beats.map((beat, i) => {
        const from = Math.round(beat.start * fps);
        const len = Math.round(beat.end * fps) - from;
        return (
          <Sequence key={i} from={from} durationInFrames={len} premountFor={fps}>
            {beat.type === "hook" ? <HookBeat tl={tl} beat={beat} /> : null}
            {beat.type === "panel" ? <PanelBeat tl={tl} beat={beat} /> : null}
            {beat.type === "swap" ? <SwapBeat tl={tl} beat={beat} /> : null}
            {beat.type === "quiz" ? <QuizBeat tl={tl} beat={beat} /> : null}
            {beat.type === "cta" ? <CtaBeat tl={tl} beat={beat} /> : null}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
