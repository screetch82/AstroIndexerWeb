# Feature Shorts Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce six vertical (1080×1920) feature Shorts for YouTube Shorts / Instagram Reels — Gallery, Catalogue Completion, Quality Analysis, Imaging Intelligence, Sky Atlas, Session Planner — from the existing Remotion pipeline in `video/`.

**Architecture:** One data-driven Python generator (`gen_shorts.py`) writes brand-voice VO and a single combined manifest (`src/shorts.json`); one portrait Remotion composition (`src/Short.tsx`) renders any Short by id using a portrait-aware zoom-to-highlight camera; `src/Root.tsx` registers one Composition per Short; `render_shorts.sh` renders all six and verifies output. Maximum reuse of the tutorial pipeline (`theme.tsx`, edge-tts voice, ffprobe timing, `gen_music.py`).

**Tech Stack:** Remotion 4 (React 18, TypeScript), Python 3 (edge-tts, ffprobe/ffmpeg, numpy), pytest for the generator's pure logic.

## Global Constraints

- **Dimensions:** every Short is **1080×1920, 30 fps**, `--codec=h264 --image-format=png --crf=16`.
- **Length:** each Short totals **28–36 s** (target 30 s); the generator warns outside that window.
- **Voice:** edge-tts **`en-GB-LibbyNeural`**, `rate="+0%"` (the pipeline brand voice).
- **Theme:** import brand tokens from `src/theme.tsx` (`C`, `FONT`, `Background`); never hard-code brand colours.
- **Language:** English only this batch. Design data so a `lang` axis can be added later without restructuring.
- **Fact source:** every spoken claim must trace to the matching storybook phase in `Astroindexer/tools/tutorial_capture/storybooks/app_overview_promo_tailored_v1.yaml`. Do not invent capabilities.
- **CTA copy (verbatim, all six):** end line is `"AstroIndexer — free trial at astroindexer dot com."`; CTA card sub-text is `astroindexer.com`.
- **Music:** composition reads `public/music/shorts_bed.wav` (user's ElevenLabs track), overridable per Short by `public/music/shorts_bed_<id>.wav`. Never render silent — the render script guards on the bed's presence.
- All shell/python commands run **from the `video/` directory** unless stated otherwise.

---

## File Structure

**Create:**
- `video/gen_shorts.py` — generator: six scripts as data → VO + `src/shorts.json` + `src/_bedspec.json`.
- `video/tests/test_gen_shorts.py` — pytest for the generator's pure functions.
- `video/src/Short.tsx` — portrait zoom-to-highlight composition, renders any Short by `shortId`.
- `video/src/shorts.json` — generated combined manifest (all six Shorts). *(generated, committed)*
- `video/src/_bedspec.json` — generated tiny manifest to size the fallback music bed. *(generated, committed)*
- `video/gen_shorts_meta.py` — per-Short `.srt` + platform caption/description side-files.
- `video/render_shorts.sh` — music guard + render loop + ffprobe verification.

**Modify:**
- `video/src/Root.tsx` — register one `Composition` per Short from `shorts.json`.
- `video/MAKING_VIDEOS.md` — append "Recipe D — Feature Shorts".

**Generated assets (not hand-written):**
- `video/public/shots/<id>.jpg` — the six prepared screenshots (Task 1).
- `video/public/svo/<id>/<segid>.mp3` — VO clips (Task 2).
- `video/public/music/shorts_bed.wav` — fallback bed until the user drops their track (Task 3).
- `video/out/shorts/<id>.mp4` / `.srt` / `.txt` — deliverables (Tasks 6–7).

**Screenshot → Short map (dims from `ffprobe`):**

| id | feature | source screenshot | dims | storybook phase |
|----|---------|-------------------|------|-----------------|
| `gallery` | Gallery | `screenshots/01_Gallery.png` | 2860×1624 | tour_gallery |
| `catalogue` | Catalogue Completion | `screenshots/05_Catalogue_Completion.png` | 2845×1627 | tour_catalogue |
| `quality` | Quality Analysis | `screenshots/06_Quality_Analysis.png` | 3800×2100 | tour_qa |
| `intelligence` | Imaging Intelligence | `screenshots/ml_ai_insights.png` | 4024×2380 | tour_intelligence |
| `skyatlas` | Interactive Sky Atlas | `screenshots/celestial_map.png` | **1400×900** | tour_sky_atlas |
| `planner` | Session Planner | `screenshots/session_planner_v2.png` | 2859×1621 | tour_planner |

> **Sky Atlas caveat:** `celestial_map.png` is only 1400×900 — far lower than the others. At portrait cover it already upscales ~2.1×, so deep zoom will look soft. The camera clamps zoom to `ZMAX` (Task 4) to limit this. If a higher-res sky-atlas capture exists, prefer it; otherwise accept mild softness and keep the Sky Atlas zoom shallow.

---

### Task 1: Prepare the six screenshots into `public/shots/`

Copy and downscale the six source PNGs into `video/public/shots/<id>.jpg` at a sane max width (2600px, quality 90) so renders stay fast without losing zoom detail. Sky Atlas is left at native size.

**Files:**
- Create: `video/public/shots/gallery.jpg`, `catalogue.jpg`, `quality.jpg`, `intelligence.jpg`, `skyatlas.jpg`, `planner.jpg`

**Interfaces:**
- Produces: six JPGs at `public/shots/<id>.jpg` that Task 2 references by that exact path.

- [ ] **Step 1: Convert the six screenshots**

Run from `video/`:

```bash
mkdir -p public/shots
declare -A SRC=(
  [gallery]=01_Gallery.png
  [catalogue]=05_Catalogue_Completion.png
  [quality]=06_Quality_Analysis.png
  [intelligence]=ml_ai_insights.png
  [skyatlas]=celestial_map.png
  [planner]=session_planner_v2.png
)
for id in "${!SRC[@]}"; do
  ffmpeg -y -i "../screenshots/${SRC[$id]}" \
    -vf "scale='min(2600,iw)':-2" -q:v 2 "public/shots/$id.jpg"
done
```

- [ ] **Step 2: Verify all six exist with sane dimensions**

Run:

```bash
for id in gallery catalogue quality intelligence skyatlas planner; do
  printf "%-14s " "$id"; ffprobe -v error -select_streams v \
    -show_entries stream=width,height -of csv=p=0:s=x "public/shots/$id.jpg"
done
```

Expected: six lines, each `WIDTHxHEIGHT`, all widths ≤ 2600 (skyatlas stays 1400×900). No "No such file" errors.

- [ ] **Step 3: Commit**

```bash
git add video/public/shots/*.jpg
git commit -m "feat(video): prepare six tab screenshots for feature Shorts"
```

---

### Task 2: `gen_shorts.py` — scripts, timing, VO, combined manifest

The generator holds all six Shorts as data (fresh scripts grounded in the storybooks), synthesizes VO, and writes `src/shorts.json` (all six) plus `src/_bedspec.json` (sizes the fallback bed). Pure timing/selection logic is factored into importable functions covered by pytest; all network/ffprobe IO lives under `main()` so importing the module for tests does nothing.

**Files:**
- Create: `video/gen_shorts.py`
- Create: `video/tests/test_gen_shorts.py`

**Interfaces:**
- Produces (pure functions, imported by the test):
  - `beat_frames(head: float, dur: float, tail: float, fps: int) -> int` — `round((head+dur+tail)*fps)`.
  - `window_ok(total_frames: int, fps: int, lo: float = 28.0, hi: float = 36.0) -> bool`.
  - `pick_music(short_id: str, music_dir: str) -> str` — returns `"music/shorts_bed_<id>.wav"` if that file exists in `music_dir`, else `"music/shorts_bed.wav"`.
  - `HEAD_TAIL: dict[str, tuple[float, float]]` — per-kind `(head, tail)` padding: `{"hook": (0.30, 0.55), "beat": (0.35, 0.50), "cta": (0.30, 0.90)}`.
- Produces (manifest schema, consumed by `Short.tsx` and `Root.tsx`):
  - `src/shorts.json` = `{ "fps": 30, "shorts": [ Short, ... ] }`
  - `Short` = `{ "id", "feature", "shot", "shotW", "shotH", "music", "segments": [ Segment, ... ] }`
  - `Segment` = `{ "id", "kind": "hook"|"beat"|"cta", "audio", "text", "caption", "region": [x,y,w,h], "durSec", "beatFrames", "audioStartFrame" }`

- [ ] **Step 1: Write the failing test**

Create `video/tests/test_gen_shorts.py`:

```python
import os
import gen_shorts as g


def test_beat_frames_rounds_padded_duration():
    # (0.3 + 2.0 + 0.5) * 30 = 84
    assert g.beat_frames(0.3, 2.0, 0.5, 30) == 84


def test_window_ok_accepts_30s_rejects_short_and_long():
    fps = 30
    assert g.window_ok(30 * fps, fps) is True
    assert g.window_ok(27 * fps, fps) is False   # too short
    assert g.window_ok(40 * fps, fps) is False   # too long


def test_pick_music_prefers_per_short_override(tmp_path):
    (tmp_path / "shorts_bed.wav").write_bytes(b"x")
    assert g.pick_music("gallery", str(tmp_path)) == "music/shorts_bed.wav"
    (tmp_path / "shorts_bed_gallery.wav").write_bytes(b"x")
    assert g.pick_music("gallery", str(tmp_path)) == "music/shorts_bed_gallery.wav"


def test_every_short_has_hook_beats_cta_and_traceable_shot():
    ids = {s["id"] for s in g.SHORTS}
    assert ids == {"gallery", "catalogue", "quality",
                   "intelligence", "skyatlas", "planner"}
    for s in g.SHORTS:
        kinds = [seg[0] for seg in s["segments"]]     # (kind, id, region, caption, text)
        assert kinds[0] == "hook" and kinds[-1] == "cta"
        assert kinds.count("beat") >= 2
        assert s["shot"].startswith("shots/") and s["shot"].endswith(".jpg")
```

- [ ] **Step 2: Run the test to verify it fails**

Run from `video/`:

```bash
python3 -m pytest tests/test_gen_shorts.py -q
```

Expected: FAIL — `ModuleNotFoundError: No module named 'gen_shorts'` (module not created yet).

- [ ] **Step 3: Write `gen_shorts.py`**

Create `video/gen_shorts.py`. The `SHORTS` data below is the starting script + regions; regions are eyeballed fractions to be tuned in Task 6 against the real screenshots.

```python
#!/usr/bin/env python3
"""Feature Shorts generator. Six vertical Shorts as data: fresh, punchy scripts
grounded in the app_overview_promo storybooks, brand-voice VO (edge-tts Libby),
portrait zoom-to-highlight regions. Writes VO + src/shorts.json + src/_bedspec.json.

Pure helpers (beat_frames/window_ok/pick_music) are import-safe; all IO is in main().
"""
import asyncio, json, os, subprocess
import edge_tts

HERE = os.path.dirname(os.path.abspath(__file__))
VO_ROOT = os.path.join(HERE, "public", "svo")
MUSIC_DIR = os.path.join(HERE, "public", "music")
VOICE = "en-GB-LibbyNeural"
RATE = "+0%"
FPS = 30

# per-kind (head, tail) padding in seconds around each VO clip
HEAD_TAIL = {"hook": (0.30, 0.55), "beat": (0.35, 0.50), "cta": (0.30, 0.90)}

CTA_LINE = "AstroIndexer — free trial at astroindexer dot com."

# Each short: id, feature, shot, [ (kind, seg_id, region[x,y,w,h], caption, narration) ]
# region fractions are of the SOURCE image; tune in Task 6.
SHORTS = [
    {
        "id": "gallery", "feature": "Gallery", "shot": "shots/gallery.jpg",
        "segments": [
            ("hook", "hook", [0, 0, 1, 1], "",
             "Thousands of light frames, scattered across a dozen drives. Good luck finding anything."),
            ("beat", "search", [0.20, 0.02, 0.56, 0.14], "One searchable library",
             "The Gallery pulls every frame you have ever shot into one place — searchable by target, equipment, filter, session, even moon phase."),
            ("beat", "cards", [0.24, 0.30, 0.40, 0.52], "Real FITS previews",
             "And these are not file icons. Every card is a real preview, rendered straight from the FITS data."),
            ("cta", "cta", [0, 0, 1, 1], "",
             "Your whole archive, finally in one place. " + CTA_LINE),
        ],
    },
    {
        "id": "catalogue", "feature": "Catalogue Completion", "shot": "shots/catalogue.jpg",
        "segments": [
            ("hook", "hook", [0, 0, 1, 1], "",
             "How much of the Messier catalogue have you actually shot? Be honest."),
            ("beat", "counters", [0.18, 0.04, 0.62, 0.16], "Captured · partial · missing",
             "Catalogue Completion tracks your progress across Messier, N. G. C., I. C., Caldwell and more — captured, partial, or still waiting."),
            ("beat", "grid", [0.22, 0.30, 0.52, 0.55], "A mission map of the sky",
             "Your own thumbnails fill the grid as you go. A mission map of the sky, target by target."),
            ("cta", "cta", [0, 0, 1, 1], "",
             "See what is left to catch. " + CTA_LINE),
        ],
    },
    {
        "id": "quality", "feature": "Quality Analysis", "shot": "shots/quality.jpg",
        "segments": [
            ("hook", "hook", [0, 0, 1, 1], "",
             "Which of tonight's subs actually belong in your stack?"),
            ("beat", "metrics", [0.04, 0.18, 0.46, 0.64], "FWHM · HFR · SNR · eccentricity",
             "Quality Analysis scores every frame — F. W. H. M., H. F. R., eccentricity, S. N. R., star count and background."),
            ("beat", "calib", [0.50, 0.18, 0.46, 0.64], "Calibrated to PixInsight",
             "Calibrated to PixInsight's SubframeSelector within ten percent, so the numbers you already trust just carry over."),
            ("cta", "cta", [0, 0, 1, 1], "",
             "Stop judging by eye. " + CTA_LINE),
        ],
    },
    {
        "id": "intelligence", "feature": "Imaging Intelligence", "shot": "shots/intelligence.jpg",
        "segments": [
            ("hook", "hook", [0, 0, 1, 1], "",
             "Your data has been trying to tell you something for years."),
            ("beat", "patterns", [0.04, 0.14, 0.50, 0.72], "Every session, read at once",
             "Imaging Intelligence reads every session at once — tracking drift, focus health, gradients, moon impact, optical issues."),
            ("beat", "insight", [0.54, 0.14, 0.42, 0.62], "Tilt, vignetting, plain advice",
             "The sensor heatmap exposes tilt and vignetting you cannot see in a single frame, then turns it into plain, practical advice."),
            ("cta", "cta", [0, 0, 1, 1], "",
             "Let your archive talk back. " + CTA_LINE),
        ],
    },
    {
        "id": "skyatlas", "feature": "Interactive Sky Atlas", "shot": "shots/skyatlas.jpg",
        "segments": [
            ("hook", "hook", [0, 0, 1, 1], "",
             "Will that target actually fit your camera? Find out before you are freezing outside."),
            ("beat", "fov", [0.34, 0.28, 0.32, 0.42], "Your real field of view",
             "The Interactive Sky Atlas projects your real field of view onto the sky — frame targets and plan mosaics in advance."),
            ("beat", "coverage", [0.08, 0.10, 0.84, 0.80], "Coverage across the sphere",
             "Check your coverage across the whole celestial sphere. It is not files on disk — it is your journey across the night sky."),
            ("cta", "cta", [0, 0, 1, 1], "",
             "Plan it before you shoot it. " + CTA_LINE),
        ],
    },
    {
        "id": "planner", "feature": "Session Planner", "shot": "shots/planner.jpg",
        "segments": [
            ("hook", "hook", [0, 0, 1, 1], "",
             "It is clear tonight. What should you actually image?"),
            ("beat", "inputs", [0.03, 0.18, 0.42, 0.72], "Ephemerides + weather + your rig",
             "The Session Planner weighs Skyfield ephemerides and Meteoblue weather against your rig, your location, and the moon."),
            ("beat", "ranked", [0.46, 0.18, 0.50, 0.72], "Tonight's best target",
             "Out comes the best target for tonight — ranked, and matched to your remaining catalogue goals."),
            ("cta", "cta", [0, 0, 1, 1], "",
             "Stop guessing. Make every clear night count. " + CTA_LINE),
        ],
    },
]


def beat_frames(head, dur, tail, fps):
    return round((head + dur + tail) * fps)


def window_ok(total_frames, fps, lo=28.0, hi=36.0):
    return lo <= total_frames / fps <= hi


def pick_music(short_id, music_dir):
    per = f"shorts_bed_{short_id}.wav"
    if os.path.exists(os.path.join(music_dir, per)):
        return f"music/{per}"
    return "music/shorts_bed.wav"


def probe_dur(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", path], capture_output=True, text=True)
    return float(r.stdout.strip())


def probe_dims(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v",
                        "-show_entries", "stream=width,height", "-of", "csv=p=0:s=x", path],
                       capture_output=True, text=True)
    w, h = r.stdout.strip().split("x")
    return int(w), int(h)


async def synth(text, out):
    c = edge_tts.Communicate(text=text, voice=VOICE, rate=RATE)
    with open(out, "wb") as f:
        async for ch in c.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])


async def build_short(short):
    sid = short["id"]
    vo_dir = os.path.join(VO_ROOT, sid)
    os.makedirs(vo_dir, exist_ok=True)
    shot_path = os.path.join(HERE, "public", short["shot"])
    shotW, shotH = probe_dims(shot_path)
    segs = []
    for kind, seg_id, region, caption, text in short["segments"]:
        head, tail = HEAD_TAIL[kind]
        mp3 = os.path.join(vo_dir, f"{seg_id}.mp3")
        await synth(text, mp3)
        dur = probe_dur(mp3)
        segs.append({
            "id": seg_id, "kind": kind, "audio": f"svo/{sid}/{seg_id}.mp3",
            "text": text, "caption": caption, "region": region,
            "durSec": round(dur, 3), "beatFrames": beat_frames(head, dur, tail, FPS),
            "audioStartFrame": round(head * FPS),
        })
    total = sum(s["beatFrames"] for s in segs)
    flag = "OK " if window_ok(total, FPS) else "!! "
    print(f"{flag}{sid:13s} {total:4d}f = {total/FPS:5.1f}s  ({shotW}x{shotH})")
    return {"id": sid, "feature": short["feature"], "shot": short["shot"],
            "shotW": shotW, "shotH": shotH, "music": pick_music(sid, MUSIC_DIR),
            "segments": segs}


async def main():
    os.makedirs(VO_ROOT, exist_ok=True)
    built = [await build_short(s) for s in SHORTS]
    with open(os.path.join(HERE, "src", "shorts.json"), "w") as f:
        json.dump({"fps": FPS, "shorts": built}, f, indent=2)
    # size the fallback bed to the longest short + 1s pad
    longest = max(sum(s["beatFrames"] for s in b["segments"]) for b in built)
    with open(os.path.join(HERE, "src", "_bedspec.json"), "w") as f:
        json.dump({"fps": FPS, "segments": [{"beatFrames": longest + FPS}]}, f, indent=2)
    any_bad = [b["id"] for b in built
               if not window_ok(sum(s["beatFrames"] for s in b["segments"]), FPS)]
    print("wrote src/shorts.json + src/_bedspec.json")
    if any_bad:
        print(f"WARNING: outside 28-36s window: {', '.join(any_bad)} — trim scripts.")


if __name__ == "__main__":
    asyncio.run(main())
```

- [ ] **Step 4: Run the test to verify it passes**

Run from `video/`:

```bash
python3 -m pytest tests/test_gen_shorts.py -q
```

Expected: PASS (4 passed).

- [ ] **Step 5: Generate VO + manifests for real**

Run from `video/`:

```bash
python3 gen_shorts.py
```

Expected: six `OK`/`!!` lines then `wrote src/shorts.json + src/_bedspec.json`. Any `!!` line (or the trailing WARNING) means that Short is outside 28–36 s — trim that Short's narration in `SHORTS` and re-run until all six read `OK`. Confirms `public/svo/<id>/*.mp3`, `src/shorts.json`, `src/_bedspec.json` exist.

- [ ] **Step 6: Commit**

```bash
git add video/gen_shorts.py video/tests/test_gen_shorts.py \
        video/src/shorts.json video/src/_bedspec.json video/public/svo
git commit -m "feat(video): gen_shorts.py + six Short scripts, VO, and manifests"
```

---

### Task 3: Fallback music bed (reuse `gen_music.py`)

Renders can't run without `public/music/shorts_bed.wav`. Until the user drops their ElevenLabs track, synthesize a placeholder bed sized to the longest Short by pointing the existing `gen_music.py` at `src/_bedspec.json`.

**Files:**
- Create: `video/public/music/shorts_bed.wav` *(generated placeholder; user overwrites later)*

**Interfaces:**
- Consumes: `src/_bedspec.json` from Task 2.
- Produces: `public/music/shorts_bed.wav` at the path `Short.tsx` (Task 4) and `render_shorts.sh` (Task 6) expect.

- [ ] **Step 1: Synthesize the placeholder bed**

Run from `video/`:

```bash
python3 gen_music.py src/_bedspec.json public/music/shorts_bed.wav
```

Expected: `wrote .../public/music/shorts_bed.wav  <N>.Ns stereo 44100Hz`, where N is ≥ the longest Short's length.

- [ ] **Step 2: Verify duration covers the longest Short**

Run:

```bash
ffprobe -v error -show_entries format=duration -of csv=p=0 public/music/shorts_bed.wav
```

Expected: a number ≥ the largest per-Short seconds printed in Task 2 Step 5.

- [ ] **Step 3: Commit**

```bash
git add video/public/music/shorts_bed.wav
git commit -m "feat(video): placeholder Shorts music bed (swap for ElevenLabs track)"
```

> The user's real bed simply overwrites `public/music/shorts_bed.wav` later — no code change, re-render only.

---

### Task 4: `src/Short.tsx` — portrait zoom-to-highlight composition

One composition renders any Short by `shortId`. Hook and CTA segments are branded cards over the starfield (screenshot shown "contained" so the whole UI is visible without cropping); middle "beat" segments are full-bleed cover framing with a portrait-aware zoom to the region and a lower-third caption. Music plays from the Short's `music` path with a fade-out.

**Files:**
- Create: `video/src/Short.tsx`

**Interfaces:**
- Consumes: `src/shorts.json` (schema from Task 2); the `shortId: string` prop.
- Produces: `export const Short: React.FC<{ shortId: string }>` — imported by `Root.tsx` (Task 5).

- [ ] **Step 1: Write `Short.tsx`**

Create `video/src/Short.tsx`:

```tsx
import React from "react";
import {
  AbsoluteFill, Audio, Img, Sequence, staticFile,
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
  music: string; segments: Seg[];
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

export const Short: React.FC<{ shortId: string }> = ({ shortId }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const short = (data.shorts as Short[]).find((s) => s.id === shortId)!;
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
```

- [ ] **Step 2: Type-check the composition**

Run from `video/`:

```bash
npx tsc --noEmit -p tsconfig.json
```

Expected: no errors referencing `Short.tsx`. (Pre-existing errors elsewhere, if any, are out of scope — confirm none mention `Short.tsx` or `shorts.json`.)

- [ ] **Step 3: Commit**

```bash
git add video/src/Short.tsx
git commit -m "feat(video): portrait Short composition with zoom camera + hook/CTA cards"
```

---

### Task 5: Register the six Shorts in `Root.tsx`

**Files:**
- Modify: `video/src/Root.tsx`

**Interfaces:**
- Consumes: `Short` from `Short.tsx`; `shorts.json`.
- Produces: six compositions `Short_gallery` … `Short_planner`, each 1080×1920.

- [ ] **Step 1: Add the import and registrations**

In `video/src/Root.tsx`, add after the existing imports (near line 9):

```tsx
import { Short } from "./Short";
import shorts from "./shorts.json";
```

Add a helper alongside the existing `total`/`TUT_BACKFOCUS` (near line 12):

```tsx
const shortFrames = (id: string) =>
  shorts.shorts.find((s) => s.id === id)!.segments.reduce((n, s) => n + s.beatFrames, 0);
```

Add these compositions inside the `<> … </>` (after the Overlay composition, before the closing `</>`):

```tsx
      {/* 9:16 feature Shorts — one per core tab */}
      {shorts.shorts.map((s) => (
        <Composition
          key={s.id}
          id={`Short_${s.id}`}
          component={Short}
          durationInFrames={shortFrames(s.id)}
          fps={shorts.fps}
          width={1080}
          height={1920}
          defaultProps={{ shortId: s.id }}
        />
      ))}
```

- [ ] **Step 2: Verify the compositions register**

Run from `video/`:

```bash
npx remotion compositions src/index.ts
```

Expected: the list includes `Short_gallery`, `Short_catalogue`, `Short_quality`, `Short_intelligence`, `Short_skyatlas`, `Short_planner` (each 1080x1920). No errors.

- [ ] **Step 3: Commit**

```bash
git add video/src/Root.tsx
git commit -m "feat(video): register six feature Short compositions"
```

---

### Task 6: `render_shorts.sh` — guard, render, verify

Guards on the music bed, renders all six (or a subset passed as args), and verifies each output is 1080×1920 and within the 28–36 s window.

**Files:**
- Create: `video/render_shorts.sh`
- Create: `video/out/shorts/<id>.mp4` *(rendered)*
- **Region-tuning happens here:** watch each render and adjust that Short's `region` fractions in `gen_shorts.py`, re-run `gen_shorts.py`, re-render.

**Interfaces:**
- Consumes: `public/music/shorts_bed.wav`; the `Short_<id>` compositions.
- Produces: `out/shorts/<id>.mp4` for all six.

- [ ] **Step 1: Write `render_shorts.sh`**

Create `video/render_shorts.sh`:

```bash
#!/usr/bin/env bash
# Render feature Shorts. Usage: ./render_shorts.sh [id ...]  (default: all six)
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f public/music/shorts_bed.wav ]; then
  echo "ERROR: public/music/shorts_bed.wav is missing."
  echo "  Drop your ElevenLabs track there, or run:"
  echo "    python3 gen_music.py src/_bedspec.json public/music/shorts_bed.wav"
  exit 1
fi

IDS=("$@")
if [ ${#IDS[@]} -eq 0 ]; then
  IDS=(gallery catalogue quality intelligence skyatlas planner)
fi

mkdir -p out/shorts
for id in "${IDS[@]}"; do
  echo "=== rendering Short_$id ==="
  npx remotion render src/index.ts "Short_$id" "out/shorts/$id.mp4" \
    --codec=h264 --image-format=png --crf=16
  read -r W Hh <<<"$(ffprobe -v error -select_streams v \
    -show_entries stream=width,height -of csv=p=0:s=' ' "out/shorts/$id.mp4")"
  DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "out/shorts/$id.mp4")
  echo "    $id -> ${W}x${Hh}  ${DUR}s"
  [ "$W" = "1080" ] && [ "$Hh" = "1920" ] || { echo "    !! wrong dimensions"; exit 1; }
done
echo "done."
```

- [ ] **Step 2: Make it executable and render all six**

Run from `video/`:

```bash
chmod +x render_shorts.sh
./render_shorts.sh
```

Expected: six `=== rendering Short_<id> ===` blocks, each ending `-> 1080x1920  <28–36>s`, then `done.` Six MP4s in `out/shorts/`.

- [ ] **Step 3: Eyeball each Short and tune regions**

Open each `out/shorts/<id>.mp4`. For each, confirm: the hook lands in the first ~2 s; each beat's zoom frames the intended UI region (not empty margins or the wrong panel); captions are readable at phone size; VO stays in sync; the CTA card shows the logo, headline, and `astroindexer.com`; audio ducks under VO and fades out.

Where a zoom misses, adjust that Short's `region` `[x,y,w,h]` fractions in `gen_shorts.py`, then:

```bash
python3 gen_shorts.py && ./render_shorts.sh <id>
```

Repeat until all six read well. (Sky Atlas will be softest — keep its zoom shallow.)

- [ ] **Step 4: Commit the tuned regions and the renders**

```bash
git add video/render_shorts.sh video/gen_shorts.py video/src/shorts.json video/out/shorts
git commit -m "feat(video): render script + tuned regions for the six feature Shorts"
```

---

### Task 7: Per-Short captions and platform descriptions

Reuse the SRT approach from `gen_captions.py` to emit `.srt` plus a `.txt` upload blurb (title, one-line description, hashtags) per Short.

**Files:**
- Create: `video/gen_shorts_meta.py`
- Create: `video/out/shorts/<id>.srt`, `video/out/shorts/<id>.txt` *(generated)*

**Interfaces:**
- Consumes: `src/shorts.json`.
- Produces: `out/shorts/<id>.srt` and `out/shorts/<id>.txt` for all six.

- [ ] **Step 1: Write `gen_shorts_meta.py`**

Create `video/gen_shorts_meta.py`:

```python
#!/usr/bin/env python3
"""Per-Short side-deliverables: an .srt caption file and a .txt platform blurb.
Timings come straight from src/shorts.json (same convention as gen_captions.py)."""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out", "shorts")
os.makedirs(OUT, exist_ok=True)
with open(os.path.join(HERE, "src", "shorts.json")) as f:
    data = json.load(f)
FPS = data["fps"]

HASHTAGS = "#astrophotography #astronomy #deepsky #astroimaging #AstroIndexer"


def srt_ts(t):
    h = int(t // 3600); m = int((t % 3600) // 60); s = t % 60
    return f"{h:02d}:{m:02d}:{int(s):02d},{int(round((s - int(s)) * 1000)):03d}"


for short in data["shorts"]:
    segs = short["segments"]
    offsets, acc = [], 0
    for s in segs:
        offsets.append(acc); acc += s["beatFrames"]
    cues = []
    for i, s in enumerate(segs):
        start = (offsets[i] + s["audioStartFrame"]) / FPS
        sentences = [x.strip() for x in re.split(r"(?<=[.!?])\s+", s["text"].strip()) if x.strip()]
        total = sum(len(x) for x in sentences) or 1
        t = start
        for sent in sentences:
            d = s["durSec"] * len(sent) / total
            cues.append((t, t + d, sent))
            t += d
    with open(os.path.join(OUT, f"{short['id']}.srt"), "w") as f:
        for n, (a, b, text) in enumerate(cues, 1):
            f.write(f"{n}\n{srt_ts(a)} --> {srt_ts(b)}\n{text}\n\n")
    hook = segs[0]["text"]
    with open(os.path.join(OUT, f"{short['id']}.txt"), "w") as f:
        f.write(f"{short['feature']} — AstroIndexer\n\n{hook}\n\n"
                f"AstroIndexer turns your FITS/XISF archive into an analysis-ready, "
                f"searchable library. Free trial at astroindexer.com\n\n{HASHTAGS}\n")
    print(f"wrote out/shorts/{short['id']}.srt + .txt")
```

- [ ] **Step 2: Generate and verify**

Run from `video/`:

```bash
python3 gen_shorts_meta.py
ls out/shorts/*.srt out/shorts/*.txt | wc -l   # expect 12
head -6 out/shorts/gallery.srt
```

Expected: `wrote …` for all six, `12`, and a well-formed first SRT cue (index `1`, a `-->` timestamp line, the hook sentence).

- [ ] **Step 3: Commit**

```bash
git add video/gen_shorts_meta.py video/out/shorts/*.srt video/out/shorts/*.txt
git commit -m "feat(video): per-Short SRT captions + platform description blurbs"
```

---

### Task 8: Document Recipe D in `MAKING_VIDEOS.md`

**Files:**
- Modify: `video/MAKING_VIDEOS.md`

- [ ] **Step 1: Append the Recipe D section**

Add to the end of `video/MAKING_VIDEOS.md`:

```markdown
---

## 5. Recipe D — Feature Shorts (9:16, batch)

Six vertical feature Shorts (Gallery, Catalogue, Quality, Intelligence, Sky
Atlas, Planner) for YouTube Shorts / Instagram Reels. Content is data in
**`gen_shorts.py`** (`SHORTS`): per-Short id, feature, screenshot, and a
`(kind, id, region, caption, narration)` tuple per segment. `kind` is
`hook` | `beat` | `cta`; `hook`/`cta` render branded cards, `beat` renders a
full-bleed zoom to `region` (`[x,y,w,h]` image fractions).

1. **Prepare screenshots** — `public/shots/<id>.jpg` (see the ffmpeg loop in
   the plan). One landscape screenshot per Short.
2. **Edit content** — adjust the `SHORTS` scripts/regions in `gen_shorts.py`.
   Keep every Short in the **28–36 s** window (the generator warns otherwise).
3. **Generate VO + manifests:**
   ```bash
   python3 gen_shorts.py            # VO + src/shorts.json + src/_bedspec.json
   ```
4. **Music** — drop a loopable bed at `public/music/shorts_bed.wav` (one bed
   covers all six; `shorts_bed_<id>.wav` overrides one). No bed yet? Synthesize
   a placeholder: `python3 gen_music.py src/_bedspec.json public/music/shorts_bed.wav`.
5. **Render + verify** (all six, or pass ids):
   ```bash
   ./render_shorts.sh                # or: ./render_shorts.sh planner skyatlas
   ```
6. **Captions + blurbs:** `python3 gen_shorts_meta.py` → `out/shorts/<id>.srt` + `.txt`.

**Tune a zoom:** edit that Short's `region` in `gen_shorts.py`, re-run
`gen_shorts.py`, then `./render_shorts.sh <id>`.

**Add a Short:** append a `SHORTS` entry (+ its `public/shots/<id>.jpg`);
`Root.tsx` registers it automatically from `shorts.json`.

**Localize later:** the scripts live in one place per Short — a `lang` axis can
be layered on `SHORTS` and a per-language VO dir, mirroring `gen_i18n.py`.
```

- [ ] **Step 2: Commit**

```bash
git add video/MAKING_VIDEOS.md
git commit -m "docs(video): Recipe D — feature Shorts runbook"
```

---

## Self-Review

**Spec coverage:**
- Six Shorts, the exact tab list → Task 1 map + Task 2 `SHORTS`. ✓
- Zoom-to-highlight over real UI → Task 4 `cam()` + beat framing. ✓
- 1080×1920 / 30fps / crf=16 → Global Constraints, Task 5 registration, Task 6 verify. ✓
- 30 s (28–36 window) → `window_ok`, Task 2 Step 5, Task 6 verify. ✓
- Fresh scripts grounded in storybooks → Task 2 `SHORTS` + fact-source constraint. ✓
- Brand voice / theme reuse → `VOICE` const, `theme.tsx` imports. ✓
- One shared music bed + per-Short override + never-silent → `pick_music`, Task 3, `render_shorts.sh` guard. ✓
- EN-first, localizable later → Global Constraints + Recipe D note. ✓
- Side deliverables (SRT + description) → Task 7. ✓
- Data-driven Approach A (one generator + one composition) → Tasks 2, 4, 5. ✓
- Sky Atlas low-res risk → File Structure caveat + `ZMAX` + Task 6 Step 3 note. ✓
- Missing-music fail-loud → `render_shorts.sh` guard (Task 6). ✓

**Placeholder scan:** No TBD/TODO; every code step shows complete file content or a concrete diff. Region fractions are explicit starting values with a defined tuning step (Task 6 Step 3), not placeholders.

**Type consistency:** Manifest schema (`id/kind/audio/text/caption/region/durSec/beatFrames/audioStartFrame`; Short `id/feature/shot/shotW/shotH/music/segments`) is identical across Task 2 (writer), Task 4 (`Seg`/`Short` types), Task 5 (`shortFrames`), and Task 7 (reader). `cam()` returns `{dispW,dispH,Z,tx,ty}` and is used consistently. `Short` composition ids are `Short_<id>` in Tasks 5 and 6. `pick_music` / `_bedspec.json` / `shorts_bed.wav` paths match across Tasks 2, 3, 4, 6.
