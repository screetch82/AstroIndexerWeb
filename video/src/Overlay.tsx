import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { C, FONT } from "./theme";

/**
 * Transparent graphics overlay — rendered on its own (alpha) track and
 * composited over an independent base video (a live screen recording) with
 * ffmpeg. This is the layer that turns raw screencap footage into a branded
 * tutorial: header, animated lower-third, and progress bar, no background.
 *
 * Render with alpha:
 *   remotion render src/index.ts Overlay out/overlay.mov \
 *     --codec=prores --prores-profile=4444
 */
export const Overlay: React.FC<{ label?: string; caption?: string }> = ({
  label = "Backfocus Manager",
  caption = "Build from the vendor inventory",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = spring({ frame: frame - 18, fps: 30, config: { damping: 200 } });
  const capOp = interpolate(frame, [18, 30, durationInFrames - 14, durationInFrames], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ fontFamily: FONT, backgroundColor: "transparent" }}>
      {/* header */}
      <div style={{ position: "absolute", top: 40, left: 56, opacity: headOp, display: "flex", alignItems: "center", gap: 11, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.7))" }}>
        <Img src={staticFile("logo.png")} style={{ width: 30, height: 30 }} />
        <span style={{ fontSize: 21, fontWeight: 800, color: "#fff" }}>AstroIndexer</span>
        <span style={{ fontSize: 20, color: "rgba(255,255,255,0.5)" }}>·</span>
        <span style={{ fontSize: 20, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{label}</span>
      </div>

      {/* lower-third */}
      <div style={{
        position: "absolute", left: 70, bottom: 84, opacity: capOp,
        transform: `translateY(${(1 - p) * 20}px)`, display: "flex", alignItems: "stretch",
        background: "rgba(11,15,20,0.86)", border: `1px solid ${C.line}`, borderRadius: 14,
        overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
      }}>
        <div style={{ width: 6, background: `linear-gradient(180deg, ${C.teal}, ${C.blue})` }} />
        <div style={{ padding: "16px 26px 18px 22px" }}>
          <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.teal, marginBottom: 6 }}>{label}</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: C.txt, letterSpacing: -0.5 }}>{caption}</div>
        </div>
      </div>

      {/* progress */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 5 }}>
        <div style={{ width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100], { extrapolateRight: "clamp" })}%`, height: "100%", background: `linear-gradient(90deg, ${C.teal}, ${C.blue})` }} />
      </div>
    </AbsoluteFill>
  );
};
