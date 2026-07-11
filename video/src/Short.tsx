import React from "react";
import {
  AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, staticFile,
  useCurrentFrame, useVideoConfig, interpolate, spring,
} from "remotion";
import { C, FONT, Background } from "./theme";
import data from "./shorts.json";

const W = 1080, H = 1920;
const ZMAX = 2.6; // cap zoom so low-res shots (Sky Atlas) don't smear

type Seg = {
  id: string; kind: "hook" | "beat" | "cta"; audio: string; text: string;
  caption: string; region: number[]; durSec: number; beatFrames: number; audioStartFrame: number;
};
type Short = {
  id: string; feature: string; shot: string; shotW: number; shotH: number;
  music: string; segments: Seg[]; clip?: string;
};

// region [x,y,w,h] (image fractions) -> {Z, tx, ty} for a cover-framed portrait.
// base = scale that makes the source cover the frame; Z zooms into the region,
// clamped to ZMAX; pan is clamped so the image always covers the frame.
function cam(r: number[], shotW: number, shotH: number) {
  const base = Math.max(W / shotW, H / shotH);
  const dispW = shotW * base, dispH = shotH * base;
  const [rx, ry, rw, rh] = r;
  const Z = Math.max(1, Math.min(ZMAX, Math.min(0.9 * W / (rw * dispW), 0.9 * H / (rh * dispH))));
  const cx = rx + rw / 2, cy = ry + rh / 2;
  let tx = W / 2 - cx * dispW * Z, ty = H / 2 - cy * dispH * Z;
  tx = Math.min(0, Math.max(W - dispW * Z, tx));
  ty = Math.min(0, Math.max(H - dispH * Z, ty));
  return { dispW, dispH, Z, tx, ty };
}

const Header: React.FC<{ feature: string }> = ({ feature }) => (
  <div style={{ position: "absolute", top: 54, left: 44, display: "flex", alignItems: "center", gap: 12, zIndex: 5 }}>
    <Img src={staticFile("logo.png")} style={{ width: 40, height: 40 }} />
    <span style={{ fontSize: 30, fontWeight: 800, color: C.txt, fontFamily: FONT }}>AstroIndexer</span>
    <span style={{ fontSize: 28, color: C.mut }}>·</span>
    <span style={{ fontSize: 28, color: C.txt2, fontWeight: 600 }}>{feature}</span>
  </div>
);

const LowerThird: React.FC<{ label: string; caption: string; dur: number }> = ({ label, caption, dur }) => {
  const frame = useCurrentFrame();
  const p = spring({ frame, fps: 30, config: { damping: 200 } });
  const op = interpolate(frame, [0, 10, dur - 10, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", left: 48, right: 48, bottom: 240, opacity: op,
      transform: `translateY(${(1 - p) * 20}px)`, display: "flex",
      background: "rgba(11,15,20,0.86)", backdropFilter: "blur(6px)",
      border: `1px solid ${C.line}`, borderRadius: 18, overflow: "hidden",
      boxShadow: "0 24px 60px rgba(0,0,0,0.55)", fontFamily: FONT,
    }}>
      <div style={{ width: 8, background: `linear-gradient(180deg, ${C.teal}, ${C.blue})` }} />
      <div style={{ padding: "22px 30px 24px 26px" }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.teal, marginBottom: 8 }}>{label}</div>
        <div style={{ fontSize: 52, fontWeight: 800, color: C.txt, letterSpacing: -0.5, lineHeight: 1.08 }}>{caption}</div>
      </div>
    </div>
  );
};

// Hook / CTA branded card: starfield + screenshot "contained" as a framed band + big text.
const Card: React.FC<{ short: Short; kind: "hook" | "cta"; text: string; dur: number }> = ({ short, kind, text, dur }) => {
  const frame = useCurrentFrame();
  const p = spring({ frame, fps: 30, config: { damping: 200 } });
  const op = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bandH = 620;
  const scale = Math.min(1, (W - 120) / short.shotW); // contain by width inside the band
  return (
    <AbsoluteFill style={{ fontFamily: FONT, opacity: op }}>
      <Background />
      <div style={{ position: "absolute", top: 470, left: 60, right: 60, height: bandH,
        borderRadius: 22, overflow: "hidden", border: `1px solid ${C.line}`,
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center",
        background: C.bg1 }}>
        <Img src={staticFile(short.shot)} style={{ width: short.shotW * scale, height: short.shotH * scale }} />
      </div>
      <div style={{ position: "absolute", left: 60, right: 60, top: kind === "hook" ? 150 : 1180,
        transform: `translateY(${(1 - p) * 24}px)`, textAlign: "center" }}>
        {kind === "cta" && (
          <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", marginBottom: 20 }}>
            <Img src={staticFile("logo.png")} style={{ width: 52, height: 52 }} />
            <span style={{ fontSize: 34, fontWeight: 800, color: C.txt2 }}>AstroIndexer</span>
          </div>
        )}
        <div style={{ fontSize: kind === "hook" ? 66 : 60, fontWeight: 800, color: C.txt, letterSpacing: -1, lineHeight: 1.1 }}>{text}</div>
        {kind === "cta" && <div style={{ fontSize: 40, color: C.teal, marginTop: 22, fontWeight: 700 }}>astroindexer.com</div>}
      </div>
    </AbsoluteFill>
  );
};

const StillShort: React.FC<{ short: Short }> = ({ short }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const segs = short.segments;

  const offsets: number[] = [];
  let acc = 0;
  for (const s of segs) { offsets.push(acc); acc += s.beatFrames; }

  // camera keyframes for the beat segments (hook/cta render their own cards)
  const times: number[] = [0];
  const Zv: number[] = [], TXv: number[] = [], TYv: number[] = [];
  const c0 = cam(segs[0].region, short.shotW, short.shotH);
  Zv.push(c0.Z); TXv.push(c0.tx); TYv.push(c0.ty);
  segs.forEach((s, i) => {
    const c = cam(s.region, short.shotW, short.shotH);
    const settle = offsets[i] + Math.min(18, s.beatFrames * 0.4);
    const end = offsets[i] + s.beatFrames;
    times.push(settle, end); Zv.push(c.Z, c.Z); TXv.push(c.tx, c.tx); TYv.push(c.ty, c.ty);
  });
  const Z = interpolate(frame, times, Zv, { extrapolateRight: "clamp" });
  const tx = interpolate(frame, times, TXv, { extrapolateRight: "clamp" });
  const ty = interpolate(frame, times, TYv, { extrapolateRight: "clamp" });
  const disp = cam([0, 0, 1, 1], short.shotW, short.shotH); // dispW/dispH are region-independent

  const musicVol = interpolate(frame, [0, 20, durationInFrames - 30, durationInFrames],
    [0, 0.13, 0.13, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ fontFamily: FONT, backgroundColor: C.bg0 }}>
      {/* full-bleed UI layer (visible during beats; cards paint over it for hook/cta) */}
      <Img src={staticFile(short.shot)} style={{
        position: "absolute", width: disp.dispW, height: disp.dispH, transformOrigin: "0 0",
        transform: `translate(${tx}px, ${ty}px) scale(${Z})`,
      }} />

      <Audio src={staticFile(short.music)} volume={musicVol} />

      {segs.map((s, i) => (
        <Sequence key={s.id} from={offsets[i]} durationInFrames={s.beatFrames} name={s.id}>
          {s.kind === "hook" && <Card short={short} kind="hook" text={s.text} dur={s.beatFrames} />}
          {s.kind === "cta" && <Card short={short} kind="cta" text={s.text} dur={s.beatFrames} />}
          {s.kind === "beat" && s.caption ? <LowerThird label={short.feature} caption={s.caption} dur={s.beatFrames} /> : null}
          <Sequence from={s.audioStartFrame} name={`${s.id}-vo`}>
            <Audio src={staticFile(s.audio)} />
          </Sequence>
        </Sequence>
      ))}

      <Header feature={short.feature} />

      {/* progress bar */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 6 }}>
        <div style={{ width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100], { extrapolateRight: "clamp" })}%`, height: "100%", background: `linear-gradient(90deg, ${C.teal}, ${C.blue})` }} />
      </div>
    </AbsoluteFill>
  );
};

// ── Clip mode: live app recording in a device band, captions above/below ──
const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 6 }}>
      <div style={{ width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100], { extrapolateRight: "clamp" })}%`, height: "100%", background: `linear-gradient(90deg, ${C.teal}, ${C.blue})` }} />
    </div>
  );
};

const ClipCaption: React.FC<{ label: string; caption: string; dur: number }> = ({ label, caption, dur }) => {
  const frame = useCurrentFrame();
  const p = spring({ frame, fps: 30, config: { damping: 200 } });
  const op = interpolate(frame, [0, 10, dur - 10, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", left: 48, right: 48, top: 1320, opacity: op,
      transform: `translateY(${(1 - p) * 20}px)`, display: "flex",
      background: "rgba(11,15,20,0.86)", backdropFilter: "blur(6px)",
      border: `1px solid ${C.line}`, borderRadius: 18, overflow: "hidden",
      boxShadow: "0 24px 60px rgba(0,0,0,0.55)", fontFamily: FONT,
    }}>
      <div style={{ width: 8, background: `linear-gradient(180deg, ${C.teal}, ${C.blue})` }} />
      <div style={{ padding: "22px 30px 24px 26px" }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.teal, marginBottom: 8 }}>{label}</div>
        <div style={{ fontSize: 50, fontWeight: 800, color: C.txt, letterSpacing: -0.5, lineHeight: 1.08 }}>{caption}</div>
      </div>
    </div>
  );
};

const ClipText: React.FC<{ kind: "hook" | "cta"; text: string; dur: number }> = ({ kind, text, dur }) => {
  const frame = useCurrentFrame();
  const p = spring({ frame, fps: 30, config: { damping: 200 } });
  const op = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", left: 60, right: 60, top: kind === "hook" ? 110 : 1330,
      opacity: op, transform: `translateY(${(1 - p) * 22}px)`, textAlign: "center", fontFamily: FONT,
    }}>
      {kind === "cta" && (
        <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", marginBottom: 16 }}>
          <Img src={staticFile("logo.png")} style={{ width: 48, height: 48 }} />
          <span style={{ fontSize: 32, fontWeight: 800, color: C.txt2 }}>AstroIndexer</span>
        </div>
      )}
      <div style={{ fontSize: kind === "hook" ? 62 : 56, fontWeight: 800, color: C.txt, letterSpacing: -1, lineHeight: 1.1 }}>{text}</div>
      {kind === "cta" && <div style={{ fontSize: 38, color: C.teal, marginTop: 18, fontWeight: 700 }}>astroindexer.com</div>}
    </div>
  );
};

const ClipShort: React.FC<{ short: Short }> = ({ short }) => {
  const frame = useCurrentFrame();
  const segs = short.segments;
  const offsets: number[] = [];
  let acc = 0;
  for (const s of segs) { offsets.push(acc); acc += s.beatFrames; }

  const { durationInFrames } = useVideoConfig();
  const musicVol = interpolate(frame, [0, 20, durationInFrames - 30, durationInFrames],
    [0, 0.13, 0.13, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // gentle push-in on the live clip so it never feels static
  const push = interpolate(frame, [0, durationInFrames], [1.0, 1.06], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ fontFamily: FONT, backgroundColor: C.bg0 }}>
      <Background />

      {/* live app recording in a rounded device band */}
      <div style={{
        position: "absolute", top: 330, left: 40, right: 40, height: 950,
        borderRadius: 24, overflow: "hidden", border: `1px solid ${C.line}`,
        boxShadow: "0 34px 90px rgba(0,0,0,0.62)", background: C.bg1,
      }}>
        <OffthreadVideo src={staticFile(short.clip!)} muted
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${push})` }} />
      </div>

      <Audio src={staticFile(short.music)} volume={musicVol} />

      {segs.map((s, i) => (
        <Sequence key={s.id} from={offsets[i]} durationInFrames={s.beatFrames} name={s.id}>
          {s.kind === "hook" && <ClipText kind="hook" text={s.text} dur={s.beatFrames} />}
          {s.kind === "cta" && <ClipText kind="cta" text={s.text} dur={s.beatFrames} />}
          {s.kind === "beat" && s.caption ? <ClipCaption label={short.feature} caption={s.caption} dur={s.beatFrames} /> : null}
          <Sequence from={s.audioStartFrame} name={`${s.id}-vo`}>
            <Audio src={staticFile(s.audio)} />
          </Sequence>
        </Sequence>
      ))}

      <Header feature={short.feature} />
      <ProgressBar />
    </AbsoluteFill>
  );
};

export const Short: React.FC<{ shortId: string }> = ({ shortId }) => {
  const short = (data.shorts as Short[]).find((s) => s.id === shortId)!;
  return short.clip ? <ClipShort short={short} /> : <StillShort short={short} />;
};
