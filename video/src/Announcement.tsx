import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { Background, Kicker, C, FONT, useRise } from "./theme";
import manifest from "./manifest.json";

type Pill = { text: string; color: string };
type Beat = {
  kicker: string;
  accent: string;
  title: string;
  body: string;
  shot: string;
  portrait?: boolean;
  chip?: { big: string; small: React.ReactNode };
  pills?: Pill[];
};

// ── Per-feature content (keyed by manifest segment id) ───────────────────
const BEATS: Record<string, Beat> = {
  platesolver: {
    kicker: "Headline feature",
    accent: C.teal,
    title: "A plate solver, built in",
    body: "Native WCS solving with a full SIP distortion model, stored per frame — no external ASTAP or astrometry.net to install.",
    shot: "shots/plate_solver.jpg",
    chip: { big: "18.6%", small: <>lower median solve<br />time than ASTAP</> },
  },
  loupe: {
    kicker: "New",
    accent: C.blue,
    title: "The Inspect Loupe",
    body: "Pixel-peep any sub at 1:1 with live FWHM, HFR and PixInsight-parity metrics — without ever leaving the gallery.",
    shot: "shots/inspect_loupe.jpg",
  },
  stacking: {
    kicker: "New",
    accent: C.teal,
    title: "One-click stacking",
    body: "QA-sorted frames handed straight to PixInsight AutoIntegrate or Siril — ready-made for OSC, broadband and narrowband.",
    shot: "shots/stacking_workflow.jpg",
  },
  detector: {
    kicker: "New",
    accent: C.blue,
    title: "Object Detector",
    body: "Every catalogued object annotated on a solved frame, cross-matched against LEDA, SDSS, MCG and 2MASX.",
    shot: "shots/object_detector.jpg",
  },
  backfocus: {
    kicker: "Expanded",
    accent: C.gold,
    title: "Backfocus Manager",
    body: "Your imaging train drawn to scale, with the exact spacer combination to hit each sensor's required backfocus.",
    shot: "shots/backfocus_manager.jpg",
  },
  mobile: {
    kicker: "New platform",
    accent: C.vio,
    title: "Your library, in your pocket",
    body: "Browse your catalogue and see Scan, QA and ML status on any target — from the field or the couch.",
    shot: "shots/mobile_companion.jpg",
    portrait: true,
    pills: [
      { text: "iOS — live on the App Store", color: C.green },
      { text: "Android — in final review", color: C.blue },
    ],
  },
};

const useVertical = () => {
  const { width, height } = useVideoConfig();
  return height > width;
};

// ── Screenshot with entrance + slow Ken-Burns drift ──────────────────────
const Shot: React.FC<{ src: string; portrait?: boolean; dur: number }> = ({ src, portrait, dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const V = useVertical();
  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.9 } });
  const kb = interpolate(frame, [0, dur], [1.02, 1.09]);
  const drift = interpolate(frame, [0, dur], [-8, 8]);
  const maxWidth = portrait ? (V ? 440 : 400) : V ? 980 : 940;
  const maxHeight = portrait ? (V ? 1000 : 860) : V ? 740 : 620;
  return (
    <div style={{ flex: V ? "none" : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          transform: `scale(${(0.94 + enter * 0.06) * kb}) translateY(${(1 - enter) * 26 + drift}px)`,
          opacity: enter,
          borderRadius: portrait ? 34 : 18,
          overflow: "hidden",
          border: `1px solid ${C.line}`,
          boxShadow: "0 40px 90px rgba(0,0,0,0.6)",
          background: C.card,
        }}
      >
        <Img src={staticFile(src)} style={{ display: "block", maxWidth, maxHeight, width: "auto", height: "auto" }} />
      </div>
    </div>
  );
};

// ── One feature beat ─────────────────────────────────────────────────────
const FeatureBeat: React.FC<{ beat: Beat; mediaRight: boolean; dur: number }> = ({ beat, mediaRight, dur }) => {
  const frame = useCurrentFrame();
  const V = useVertical();
  const beatOpacity = interpolate(frame, [0, 12, dur - 14, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rk = useRise(3);
  const rt = useRise(8);
  const rb = useRise(14);
  const rc = useRise(20);
  const align = V ? "center" : "flex-start";

  const text = (
    <div style={{ flex: V ? "none" : 1, padding: V ? 0 : "0 30px", maxWidth: V ? 960 : 820, textAlign: V ? "center" : "left" }}>
      <div style={rk}>
        <Kicker color={beat.accent}>{beat.kicker}</Kicker>
      </div>
      <div style={rt}>
        <h1 style={{ margin: "16px 0 0", fontSize: V ? 60 : 74, lineHeight: 1.04, fontWeight: 800, letterSpacing: -1.5, color: C.txt }}>
          {beat.title}
        </h1>
      </div>
      <div style={rb}>
        <p style={{ margin: V ? "18px auto 0" : "22px 0 0", fontSize: 30, lineHeight: 1.42, color: C.txt2, maxWidth: 760 }}>
          {beat.body}
        </p>
      </div>
      {beat.chip && (
        <div style={{ ...rc, textAlign: V ? "center" : "left" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              marginTop: 28,
              padding: "16px 22px",
              borderRadius: 16,
              border: `1px solid ${beat.accent}66`,
              background: `${beat.accent}16`,
            }}
          >
            <span style={{ fontSize: 46, fontWeight: 800, color: beat.accent, letterSpacing: -1.5 }}>{beat.chip.big}</span>
            <span style={{ fontSize: 22, lineHeight: 1.2, color: C.txt2, textAlign: "left" }}>{beat.chip.small}</span>
          </div>
        </div>
      )}
      {beat.pills && (
        <div style={{ ...rc, display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap", justifyContent: align }}>
          {beat.pills.map((p, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 11,
                padding: "12px 20px",
                borderRadius: 999,
                border: `1px solid ${p.color}66`,
                background: `${p.color}14`,
                fontSize: 22,
                fontWeight: 600,
                color: p.color,
              }}
            >
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: p.color }} />
              {p.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const media = <Shot src={beat.shot} portrait={beat.portrait} dur={dur} />;

  return (
    <AbsoluteFill style={{ opacity: beatOpacity }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: V ? "column" : mediaRight ? "row" : "row-reverse",
          alignItems: "center",
          justifyContent: "center",
          padding: V ? "150px 70px 96px" : "120px 100px 96px",
          gap: V ? 44 : 40,
        }}
      >
        {V ? (
          <>
            {media}
            {text}
          </>
        ) : (
          <>
            {text}
            {media}
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};

// ── Intro card ───────────────────────────────────────────────────────────
const Intro: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const V = useVertical();
  const op = interpolate(frame, [0, 14, dur - 16, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const r0 = useRise(2, 20);
  const r1 = useRise(8, 30);
  const r2 = useRise(16, 30);
  const r3 = useRise(26, 24);
  return (
    <AbsoluteFill style={{ opacity: op, alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 60px" }}>
      <div style={{ ...r0, display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
        <Img src={staticFile("logo.png")} style={{ width: 60, height: 60 }} />
        <span style={{ fontSize: 40, fontWeight: 800, color: C.txt, letterSpacing: 0.3 }}>AstroIndexer</span>
      </div>
      <div style={r1}>
        <span
          style={{
            display: "inline-block",
            padding: "9px 20px",
            borderRadius: 999,
            border: `1px solid ${C.teal}55`,
            background: `${C.teal}14`,
            color: C.teal,
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Release Candidate 1 · v1.0.0
        </span>
      </div>
      <h1 style={{ ...r2, margin: "28px 0 0", fontSize: V ? 76 : 104, lineHeight: 1.03, fontWeight: 800, letterSpacing: V ? -2 : -3, color: C.txt, maxWidth: V ? 960 : 1500 }}>
        AstroIndexer 1.0 is{" "}
        <span style={{ background: `linear-gradient(110deg, ${C.teal}, ${C.blue})`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          almost here
        </span>
        .
      </h1>
      <p style={{ ...r3, margin: "30px 0 0", fontSize: V ? 32 : 34, color: C.txt2, maxWidth: 1000, lineHeight: 1.4 }}>
        The biggest step yet toward the full 1.0 launch.
      </p>
    </AbsoluteFill>
  );
};

// ── Outro card ───────────────────────────────────────────────────────────
const Outro: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const V = useVertical();
  const op = interpolate(frame, [0, 16, dur - 20, dur], [0, 1, 1, 0.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const r0 = useRise(2, 20);
  const r1 = useRise(10, 30);
  const r2 = useRise(20, 24);
  const r3 = useRise(30, 20);
  return (
    <AbsoluteFill style={{ opacity: op, alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 60px" }}>
      <div style={{ ...r0, display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
        <Img src={staticFile("logo.png")} style={{ width: 50, height: 50 }} />
        <span style={{ fontSize: 32, fontWeight: 800, color: C.txt }}>AstroIndexer</span>
      </div>
      <h1 style={{ ...r1, margin: 0, fontSize: V ? 70 : 96, fontWeight: 800, letterSpacing: -2.5, color: C.txt }}>Update to 1.0 RC1</h1>
      <div style={{ ...r2, marginTop: 34 }}>
        <span
          style={{
            display: "inline-block",
            padding: "18px 40px",
            borderRadius: 16,
            background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`,
            color: "#06121a",
            fontSize: V ? 30 : 34,
            fontWeight: 800,
            letterSpacing: 0.3,
          }}
        >
          astroindexer.com
        </span>
      </div>
      <p style={{ ...r3, margin: "30px auto 0", fontSize: V ? 23 : 26, color: C.mut, letterSpacing: 0.4, maxWidth: 900, lineHeight: 1.5 }}>
        macOS · Windows · Linux &nbsp;•&nbsp; iOS live on the App Store · Android in final review
      </p>
    </AbsoluteFill>
  );
};

// ── Persistent chrome across the feature beats ───────────────────────────
const Header: React.FC = () => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <div style={{ position: "absolute", top: 54, left: 64, display: "flex", alignItems: "center", gap: 12 }}>
        <Img src={staticFile("logo.png")} style={{ width: 34, height: 34 }} />
        <span style={{ fontSize: 24, fontWeight: 800, color: C.txt }}>AstroIndexer</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 56,
          right: 64,
          padding: "7px 16px",
          borderRadius: 999,
          border: `1px solid ${C.teal}55`,
          background: `${C.teal}14`,
          color: C.teal,
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: "0.12em",
        }}
      >
        1.0 RC1
      </div>
    </AbsoluteFill>
  );
};

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const w = interpolate(frame, [0, durationInFrames - 1], [0, 100], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 5 }}>
      <div style={{ width: `${w}%`, height: "100%", background: `linear-gradient(90deg, ${C.teal}, ${C.blue})` }} />
    </div>
  );
};

// ── Assembly ─────────────────────────────────────────────────────────────
export const Announcement: React.FC = () => {
  const segs = manifest.segments;
  const offsets: number[] = [];
  let acc = 0;
  for (const s of segs) {
    offsets.push(acc);
    acc += s.beatFrames;
  }
  const outroIdx = segs.length - 1;
  const beatsStart = offsets[1];
  const beatsEnd = offsets[outroIdx];
  let featureCounter = 0;

  return (
    <AbsoluteFill style={{ fontFamily: FONT, backgroundColor: C.bg0 }}>
      <Background />

      {/* Ambient music bed (original, synthesized) for the whole piece */}
      <Audio src={staticFile("music/bed.wav")} volume={0.16} />

      {segs.map((s, i) => {
        const isIntro = i === 0;
        const isOutro = i === outroIdx;
        let content: React.ReactNode;
        if (isIntro) {
          content = <Intro dur={s.beatFrames} />;
        } else if (isOutro) {
          content = <Outro dur={s.beatFrames} />;
        } else {
          const mediaRight = featureCounter % 2 === 0;
          featureCounter += 1;
          content = <FeatureBeat beat={BEATS[s.id]} mediaRight={mediaRight} dur={s.beatFrames} />;
        }
        return (
          <Sequence key={s.id} from={offsets[i]} durationInFrames={s.beatFrames} name={s.id}>
            {content}
            <Sequence from={s.audioStartFrame} name={`${s.id}-vo`}>
              <Audio src={staticFile(s.audio)} />
            </Sequence>
          </Sequence>
        );
      })}

      <Sequence from={beatsStart} durationInFrames={beatsEnd - beatsStart} name="header">
        <Header />
      </Sequence>

      <ProgressBar />
    </AbsoluteFill>
  );
};
