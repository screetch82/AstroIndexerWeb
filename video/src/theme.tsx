import React from "react";
import { AbsoluteFill, useCurrentFrame, spring } from "remotion";

// ── Brand tokens (mirrored from the site's css/style.css :root) ──────────
export const C = {
  bg0: "#070a0f",
  bg1: "#0b0f14",
  card: "#121c28",
  line: "rgba(255,255,255,0.10)",
  txt: "#e7eef8",
  txt2: "rgba(231,238,248,0.76)",
  mut: "rgba(231,238,248,0.55)",
  teal: "#49c6bf",
  gold: "#f0b429",
  blue: "#5aa7ff",
  vio: "#b08cff",
  green: "#59d98e",
};

export const FONT =
  "'Helvetica Neue', 'Inter', ui-sans-serif, system-ui, -apple-system, Arial, sans-serif";

// ── Deterministic starfield (seeded once so it never flickers per frame) ──
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(20260705);
const STARS = Array.from({ length: 140 }, () => ({
  x: rnd() * 100,
  y: rnd() * 100,
  r: rnd() * 1.7 + 0.4,
  o: rnd() * 0.5 + 0.25,
  sp: rnd() * 0.05 + 0.015,
  ph: rnd() * Math.PI * 2,
}));

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: `
          radial-gradient(1400px 620px at 22% -8%, rgba(73,198,191,0.16), transparent 60%),
          radial-gradient(1200px 520px at 92% 4%, rgba(240,180,41,0.07), transparent 55%),
          radial-gradient(1000px 700px at 60% 120%, rgba(90,167,255,0.08), transparent 60%),
          linear-gradient(180deg, ${C.bg0}, ${C.bg1} 40%, ${C.bg0})`,
      }}
    >
      {STARS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.r * 2,
            height: s.r * 2,
            borderRadius: "50%",
            background: "#fff",
            opacity: s.o * (0.55 + 0.45 * Math.sin(frame * s.sp + s.ph)),
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

// ── Animation helpers ────────────────────────────────────────────────────
/** Spring-based rise: fades + slides an element up, with an optional delay. */
export function useRise(delay = 0, distance = 26, fps = 30) {
  const frame = useCurrentFrame();
  const p = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, mass: 0.7 },
  });
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * distance}px)`,
  } as React.CSSProperties;
}

export const Kicker: React.FC<{ color: string; children: React.ReactNode; style?: React.CSSProperties }> = ({
  color,
  children,
  style,
}) => (
  <div
    style={{
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      fontSize: 22,
      fontWeight: 800,
      color,
      ...style,
    }}
  >
    {children}
  </div>
);
