import React from "react";
import {
  AbsoluteFill, Audio, Img, Sequence, staticFile,
  useCurrentFrame, useVideoConfig, interpolate, spring,
} from "remotion";
import { C, FONT } from "./theme";
import man from "./tutorial_backfocus.json";

const W = 1920, H = 1080;

// region [x,y,w,h] (fractions of the screenshot) -> camera {S, tx, ty}.
// Centres on the region, then clamps the pan so the image always covers the
// frame (no black edges when a region hugs a side).
function target(r: number[]) {
  const [rx, ry, rw, rh] = r;
  const S = Math.max(1, Math.min(0.9 * Math.min(1 / rw, 1 / rh), 7));
  const cx = rx + rw / 2, cy = ry + rh / 2;
  let tx = W / 2 - S * cx * W, ty = H / 2 - S * cy * H;
  tx = Math.min(0, Math.max(W * (1 - S), tx));
  ty = Math.min(0, Math.max(H * (1 - S), ty));
  return { S, tx, ty };
}

const LowerThird: React.FC<{ label: string; caption: string; dur: number }> = ({ label, caption, dur }) => {
  const frame = useCurrentFrame();
  const p = spring({ frame, fps: 30, config: { damping: 200 } });
  const op = interpolate(frame, [0, 10, dur - 10, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", left: 70, bottom: 84, opacity: op,
      transform: `translateY(${(1 - p) * 20}px)`,
      display: "flex", alignItems: "stretch",
      background: "rgba(11,15,20,0.86)", backdropFilter: "blur(6px)",
      border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden",
      boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
    }}>
      <div style={{ width: 6, background: `linear-gradient(180deg, ${C.teal}, ${C.blue})` }} />
      <div style={{ padding: "16px 26px 18px 22px" }}>
        <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.teal, marginBottom: 6 }}>{label}</div>
        <div style={{ fontSize: 34, fontWeight: 800, color: C.txt, letterSpacing: -0.5 }}>{caption}</div>
      </div>
    </div>
  );
};

const TitleCard: React.FC<{ dur: number; kind: "intro" | "outro" }> = ({ dur, kind }) => {
  const frame = useCurrentFrame();
  const intro = kind === "intro";
  const scrim = intro
    ? interpolate(frame, [0, 12, dur - 22, dur], [0.55, 0.55, 0.55, 0], { extrapolateRight: "clamp" })
    : interpolate(frame, [0, 18, dur], [0, 0.6, 0.6], { extrapolateRight: "clamp" });
  const p = spring({ frame: intro ? frame : frame - 6, fps: 30, config: { damping: 200 } });
  const textOp = intro
    ? interpolate(frame, [0, 12, dur - 26, dur - 12], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : interpolate(frame, [6, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(1200px 700px at 50% 45%, rgba(7,10,15,${scrim}), rgba(7,10,15,${Math.min(scrim + 0.15, 0.95)}))` }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center", opacity: textOp }}>
        <div style={{ transform: `translateY(${(1 - p) * 20}px)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", marginBottom: 18 }}>
            <Img src={staticFile("logo.png")} style={{ width: 46, height: 46 }} />
            <span style={{ fontSize: 26, fontWeight: 800, color: C.txt2, letterSpacing: 0.3 }}>AstroIndexer</span>
          </div>
          <div style={{ fontSize: 84, fontWeight: 800, color: C.txt, letterSpacing: -2 }}>{man.title}</div>
          <div style={{ fontSize: 30, color: C.txt2, marginTop: 14 }}>
            {intro ? "Dial in your imaging train" : "astroindexer.com"}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const TutorialBackfocus: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const segs = man.segments as any[];
  const offsets: number[] = [];
  let acc = 0;
  for (const s of segs) { offsets.push(acc); acc += s.beatFrames; }

  // Global zoom-to-highlight camera: hold on each step's region, glide between.
  const times: number[] = [0];
  const Sv: number[] = [], TXv: number[] = [], TYv: number[] = [];
  const t0 = target(segs[0].region);
  Sv.push(t0.S); TXv.push(t0.tx); TYv.push(t0.ty);
  segs.forEach((s, i) => {
    const t = target(s.region);
    const settle = offsets[i] + Math.min(18, s.beatFrames * 0.4);
    const end = offsets[i] + s.beatFrames;
    times.push(settle, end); Sv.push(t.S, t.S); TXv.push(t.tx, t.tx); TYv.push(t.ty, t.ty);
  });
  const S = interpolate(frame, times, Sv, { extrapolateRight: "clamp" });
  const tx = interpolate(frame, times, TXv, { extrapolateRight: "clamp" });
  const ty = interpolate(frame, times, TYv, { extrapolateRight: "clamp" });

  const lastIdx = segs.length - 1;

  return (
    <AbsoluteFill style={{ fontFamily: FONT, backgroundColor: "#05070b" }}>
      <Img src={staticFile(man.shot)} style={{
        position: "absolute", width: W, height: H, transformOrigin: "0 0",
        transform: `translate(${tx}px, ${ty}px) scale(${S})`,
      }} />

      <Audio src={staticFile("music/tutorial_bed.wav")} volume={0.13} />

      {segs.map((s, i) => (
        <Sequence key={s.id} from={offsets[i]} durationInFrames={s.beatFrames} name={s.id}>
          {i === 0 && <TitleCard dur={s.beatFrames} kind="intro" />}
          {i === lastIdx && <TitleCard dur={s.beatFrames} kind="outro" />}
          {s.caption ? <LowerThird label={man.title} caption={s.caption} dur={s.beatFrames} /> : null}
          <Sequence from={s.audioStartFrame} name={`${s.id}-vo`}>
            <Audio src={staticFile(s.audio)} />
          </Sequence>
        </Sequence>
      ))}

      {/* header */}
      <div style={{ position: "absolute", top: 40, left: 56, display: "flex", alignItems: "center", gap: 11 }}>
        <Img src={staticFile("logo.png")} style={{ width: 30, height: 30 }} />
        <span style={{ fontSize: 21, fontWeight: 800, color: C.txt }}>AstroIndexer</span>
        <span style={{ fontSize: 20, color: C.mut }}>·</span>
        <span style={{ fontSize: 20, color: C.txt2, fontWeight: 600 }}>{man.title}</span>
      </div>

      {/* progress */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 5 }}>
        <div style={{ width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100], { extrapolateRight: "clamp" })}%`, height: "100%", background: `linear-gradient(90deg, ${C.teal}, ${C.blue})` }} />
      </div>
    </AbsoluteFill>
  );
};
