import React from "react";
import {
  AbsoluteFill, Audio, Img, Sequence, staticFile,
  useCurrentFrame, useVideoConfig, interpolate, spring,
} from "remotion";
import { Background, Kicker, C, FONT, useRise } from "./theme";
import en from "./ann.en.json";
import de from "./ann.de.json";
import es from "./ann.es.json";

const MANIFESTS: Record<string, any> = { en, de, es };

// Design (language-independent): accent colour, screenshot and app-status colours per beat.
const ACCENT: Record<string, string> = {
  platesolver: C.teal, loupe: C.blue, stacking: C.teal,
  detector: C.blue, backfocus: C.gold, mobile: C.vio,
};
const SHOT: Record<string, string> = {
  platesolver: "shots/plate_solver.jpg", loupe: "shots/inspect_loupe.jpg",
  stacking: "shots/stacking_workflow.jpg", detector: "shots/object_detector.jpg",
  backfocus: "shots/backfocus_manager.jpg", mobile: "shots/mobile_companion.jpg",
};
const PORTRAIT = new Set(["mobile"]);
const PILL_COLORS = [C.green, C.blue];

const useVertical = () => {
  const { width, height } = useVideoConfig();
  return height > width;
};

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
      <div style={{
        transform: `scale(${(0.94 + enter * 0.06) * kb}) translateY(${(1 - enter) * 26 + drift}px)`,
        opacity: enter, borderRadius: portrait ? 34 : 18, overflow: "hidden",
        border: `1px solid ${C.line}`, boxShadow: "0 40px 90px rgba(0,0,0,0.6)", background: C.card,
      }}>
        <Img src={staticFile(src)} style={{ display: "block", maxWidth, maxHeight, width: "auto", height: "auto" }} />
      </div>
    </div>
  );
};

const FeatureBeat: React.FC<{ id: string; content: any; mediaRight: boolean; dur: number }> = ({ id, content, mediaRight, dur }) => {
  const frame = useCurrentFrame();
  const V = useVertical();
  const accent = ACCENT[id];
  const beatOpacity = interpolate(frame, [0, 12, dur - 14, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rk = useRise(3), rt = useRise(8), rb = useRise(14), rc = useRise(20);
  const align = V ? "center" : "flex-start";

  const text = (
    <div style={{ flex: V ? "none" : 1, padding: V ? 0 : "0 30px", maxWidth: V ? 960 : 820, textAlign: V ? "center" : "left" }}>
      <div style={rk}><Kicker color={accent}>{content.kicker}</Kicker></div>
      <div style={rt}>
        <h1 style={{ margin: "16px 0 0", fontSize: V ? 60 : 74, lineHeight: 1.04, fontWeight: 800, letterSpacing: -1.5, color: C.txt }}>{content.title}</h1>
      </div>
      <div style={rb}>
        <p style={{ margin: V ? "18px auto 0" : "22px 0 0", fontSize: 30, lineHeight: 1.42, color: C.txt2, maxWidth: 760 }}>{content.body}</p>
      </div>
      {content.chipBig && (
        <div style={{ ...rc, textAlign: V ? "center" : "left" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginTop: 28, padding: "16px 22px", borderRadius: 16, border: `1px solid ${accent}66`, background: `${accent}16` }}>
            <span style={{ fontSize: 46, fontWeight: 800, color: accent, letterSpacing: -1.5 }}>{content.chipBig}</span>
            <span style={{ fontSize: 22, lineHeight: 1.2, color: C.txt2, textAlign: "left" }}>
              {String(content.chipSmall || "").split("\n").map((l: string, i: number) => (<React.Fragment key={i}>{i > 0 && <br />}{l}</React.Fragment>))}
            </span>
          </div>
        </div>
      )}
      {content.pills && (
        <div style={{ ...rc, display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap", justifyContent: align }}>
          {content.pills.map((p: string, i: number) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 11, padding: "12px 20px", borderRadius: 999, border: `1px solid ${PILL_COLORS[i]}66`, background: `${PILL_COLORS[i]}14`, fontSize: 22, fontWeight: 600, color: PILL_COLORS[i] }}>
              <span style={{ width: 11, height: 11, borderRadius: "50%", background: PILL_COLORS[i] }} />{p}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  const media = <Shot src={SHOT[id]} portrait={PORTRAIT.has(id)} dur={dur} />;

  return (
    <AbsoluteFill style={{ opacity: beatOpacity }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: V ? "column" : mediaRight ? "row" : "row-reverse", alignItems: "center", justifyContent: "center", padding: V ? "150px 70px 96px" : "120px 100px 96px", gap: V ? 44 : 40 }}>
        {V ? (<>{media}{text}</>) : (<>{text}{media}</>)}
      </div>
    </AbsoluteFill>
  );
};

const Intro: React.FC<{ intro: any; eyebrow: string; dur: number }> = ({ intro, eyebrow, dur }) => {
  const frame = useCurrentFrame();
  const V = useVertical();
  const op = interpolate(frame, [0, 14, dur - 16, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const r0 = useRise(2, 20), r1 = useRise(8, 30), r2 = useRise(16, 30), r3 = useRise(26, 24);
  return (
    <AbsoluteFill style={{ opacity: op, alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 60px" }}>
      <div style={{ ...r0, display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
        <Img src={staticFile("logo.png")} style={{ width: 60, height: 60 }} />
        <span style={{ fontSize: 40, fontWeight: 800, color: C.txt, letterSpacing: 0.3 }}>AstroIndexer</span>
      </div>
      <div style={r1}>
        <span style={{ display: "inline-block", padding: "9px 20px", borderRadius: 999, border: `1px solid ${C.teal}55`, background: `${C.teal}14`, color: C.teal, fontSize: 20, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase" }}>{eyebrow}</span>
      </div>
      <h1 style={{ ...r2, margin: "28px 0 0", fontSize: V ? 76 : 104, lineHeight: 1.03, fontWeight: 800, letterSpacing: V ? -2 : -3, color: C.txt, maxWidth: V ? 960 : 1500 }}>
        {intro.pre}
        <span style={{ background: `linear-gradient(110deg, ${C.teal}, ${C.blue})`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{intro.accent}</span>
        {intro.post}
      </h1>
      <p style={{ ...r3, margin: "30px 0 0", fontSize: V ? 32 : 34, color: C.txt2, maxWidth: 1050, lineHeight: 1.4 }}>{intro.subtitle}</p>
    </AbsoluteFill>
  );
};

const Outro: React.FC<{ outro: any; dur: number }> = ({ outro, dur }) => {
  const frame = useCurrentFrame();
  const V = useVertical();
  const op = interpolate(frame, [0, 16, dur - 20, dur], [0, 1, 1, 0.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const r0 = useRise(2, 20), r1 = useRise(10, 30), r2 = useRise(20, 24), r3 = useRise(30, 20);
  return (
    <AbsoluteFill style={{ opacity: op, alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 60px" }}>
      <div style={{ ...r0, display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
        <Img src={staticFile("logo.png")} style={{ width: 50, height: 50 }} />
        <span style={{ fontSize: 32, fontWeight: 800, color: C.txt }}>AstroIndexer</span>
      </div>
      <h1 style={{ ...r1, margin: 0, fontSize: V ? 70 : 96, fontWeight: 800, letterSpacing: -2.5, color: C.txt }}>{outro.title}</h1>
      <div style={{ ...r2, marginTop: 34 }}>
        <span style={{ display: "inline-block", padding: "18px 40px", borderRadius: 16, background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`, color: "#06121a", fontSize: V ? 30 : 34, fontWeight: 800, letterSpacing: 0.3 }}>{outro.cta}</span>
      </div>
      <p style={{ ...r3, margin: "30px auto 0", fontSize: V ? 23 : 26, color: C.mut, letterSpacing: 0.4, maxWidth: 900, lineHeight: 1.5 }}>{outro.platforms}</p>
    </AbsoluteFill>
  );
};

const Header: React.FC<{ rcChip: string }> = ({ rcChip }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <div style={{ position: "absolute", top: 54, left: 64, display: "flex", alignItems: "center", gap: 12 }}>
        <Img src={staticFile("logo.png")} style={{ width: 34, height: 34 }} />
        <span style={{ fontSize: 24, fontWeight: 800, color: C.txt }}>AstroIndexer</span>
      </div>
      <div style={{ position: "absolute", top: 56, right: 168, padding: "7px 16px", borderRadius: 999, border: `1px solid ${C.teal}55`, background: `${C.teal}14`, color: C.teal, fontSize: 18, fontWeight: 800, letterSpacing: "0.12em" }}>{rcChip}</div>
    </AbsoluteFill>
  );
};

// Persistent language flag (all beats + intro + outro), top-right.
const FlagChip: React.FC<{ flag: string; label: string }> = ({ flag, label }) => (
  <div style={{ position: "absolute", top: 52, right: 56, display: "flex", alignItems: "center", gap: 9, padding: "7px 14px", borderRadius: 999, background: "rgba(11,15,20,0.72)", border: `1px solid ${C.line}`, backdropFilter: "blur(6px)" }}>
    <span style={{ fontSize: 24, lineHeight: 1 }}>{flag}</span>
    <span style={{ fontSize: 16, fontWeight: 800, color: C.txt2, letterSpacing: "0.08em" }}>{label}</span>
  </div>
);

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

export const Announcement: React.FC<{ lang?: string }> = ({ lang = "en" }) => {
  const M = MANIFESTS[lang] || MANIFESTS.en;
  const segs = M.segments;
  const offsets: number[] = [];
  let acc = 0;
  for (const s of segs) { offsets.push(acc); acc += s.beatFrames; }
  const outroIdx = segs.length - 1;
  const beatsStart = offsets[1];
  const beatsEnd = offsets[outroIdx];
  let featureCounter = 0;

  return (
    <AbsoluteFill style={{ fontFamily: FONT, backgroundColor: C.bg0 }}>
      <Background />
      <Audio src={staticFile(`music/bed_${lang}.wav`)} volume={0.16} />

      {segs.map((s: any, i: number) => {
        const isIntro = i === 0, isOutro = i === outroIdx;
        let content: React.ReactNode;
        if (isIntro) content = <Intro intro={M.intro} eyebrow={M.eyebrow} dur={s.beatFrames} />;
        else if (isOutro) content = <Outro outro={M.outro} dur={s.beatFrames} />;
        else {
          const mediaRight = featureCounter % 2 === 0; featureCounter += 1;
          content = <FeatureBeat id={s.id} content={M.beats[s.id]} mediaRight={mediaRight} dur={s.beatFrames} />;
        }
        return (
          <Sequence key={s.id} from={offsets[i]} durationInFrames={s.beatFrames} name={`${lang}-${s.id}`}>
            {content}
            <Sequence from={s.audioStartFrame} name={`${s.id}-vo`}><Audio src={staticFile(s.audio)} /></Sequence>
          </Sequence>
        );
      })}

      <Sequence from={beatsStart} durationInFrames={beatsEnd - beatsStart} name="header"><Header rcChip={M.rcChip} /></Sequence>
      <FlagChip flag={M.flag} label={M.label} />
      <ProgressBar />
    </AbsoluteFill>
  );
};
