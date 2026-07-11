# Feature Shorts batch — design

**Date:** 2026-07-11
**Status:** Approved (design), pending implementation plan
**Author:** Claude + Norman

## Goal

Produce a batch of six vertical feature Shorts for YouTube Shorts and
Instagram Reels, one per core AstroIndexer tab, using the existing Remotion +
Python video pipeline in `video/`. This is the first deliverable in a larger
slate (promo clips and a long-form user tutorial come later).

The old `tutorial_capture` storybooks (in the separate `Astroindexer` repo)
are the **verified fact source** for the six features — their claims were
reviewed and frozen. We do not reuse the old pipeline (it didn't pan out); we
reuse the *content*.

## Decisions locked during brainstorming

| Question | Decision |
|----------|----------|
| First deliverable | Feature Shorts batch (6 Shorts) |
| Visual style | Zoom-to-highlight over the real UI screenshot (Recipe B) |
| Languages | English first; DE/ES localized later once EN is approved |
| Script source | **Fresh** punchy Shorts scripts, using the storybooks as a fact source |
| Batch scope | The 6 storybook tabs (no RC1 tool extras this batch) |
| Build approach | **A** — one parameterized Short composition + one data-driven generator |
| Length | 30s target per Short (28–36s window), 1080×1920 / 30fps |
| Music | One shared loopable bed the user provides; per-feature override optional |

## The six Shorts

Each maps to a tab, a screenshot already in the repo, and the storybook phase
that supplies its verified claims:

| # | Feature | Screenshot | Storybook phase (facts) |
|---|---------|-----------|-------------------------|
| 1 | Gallery | `screenshots/01_Gallery.png` | `tour_gallery` |
| 2 | Catalogue Completion | `screenshots/05_Catalogue_Completion.png` | `tour_catalogue` |
| 3 | Quality Analysis | `screenshots/06_Quality_Analysis.png` | `tour_qa` |
| 4 | Imaging Intelligence | `screenshots/ml_ai_insights.png` (alt: `ml_sensor_heatmap.png`) | `tour_intelligence` |
| 5 | Interactive Sky Atlas | `screenshots/celestial_map.png` | `tour_sky_atlas` |
| 6 | Session Planner | `screenshots/session_planner_v2.png` | `tour_planner` |

Each Short is built from a **single** screenshot (the zoom camera pans one
image). Where a tab has several candidate shots, the alternate is a fallback,
not a second shot in the same Short. Final selection is confirmed during
implementation; region fractions are eyeballed per shot as in
`gen_tutorial.py`.

## Architecture — three layers, matching the existing pipeline

### 1. Content layer — `video/gen_shorts.py`

A single data-driven generator modeled on `gen_tutorial.py`. All six Shorts
live as data in one `SHORTS` list. Each entry:

```python
{
  "id": "gallery",
  "shot": "shots/gallery.jpg",        # copied/resized into public/shots/
  "feature": "Gallery",               # header + lower-third label
  "hook": "You have thousands of frames. You can't find any of them.",
  "steps": [                          # 2-3 zoom regions, fresh short script
    ("wide",   [0,0,1,1],            "", "<vo line>", head, tail),
    ("search", [x,y,w,h], "Search everything", "<vo line>", head, tail),
    ("card",   [x,y,w,h], "Real FITS previews", "<vo line>", head, tail),
  ],
  "cta": "AstroIndexer 1.0 — free trial at astroindexer.com",
}
```

- Fresh, platform-native scripts: a scroll-stopping first line, 2–3 beats, a
  CTA. Every factual claim traces to the storybook phase for that feature.
- Generates edge-tts VO (`en-GB-LibbyNeural`, the pipeline brand voice) into
  `public/svo/<id>/<step>.mp3`, probes durations with ffprobe, and writes one
  manifest per Short: `src/shorts/<id>.json` (same shape as
  `tutorial_backfocus.json`: fps, shot, title, segments with region/caption/
  beatFrames/audioStartFrame).
- Target 30s: the generator sums beat frames and **warns** if a Short falls
  outside 28–36s so scripts can be trimmed before render (mirrors the
  tutorial pipeline's duration discipline).

### 2. Composition layer — `video/src/Short.tsx`

A vertical (1080×1920) adaptation of `Tutorial.tsx`. Reuses the same
zoom-to-highlight camera math (`target(r)` → scale/pan, clamped so the image
always covers the frame) but retargeted to portrait dimensions (`W=1080,
H=1920`). Reuses the starfield/teal `theme.tsx`, the `LowerThird` caption
component, the header lockup, and the progress bar.

Differences from `Tutorial.tsx`:
- Portrait framing; larger caption type for mobile legibility.
- Opening **hook card** (~2.5s): big text, logo, no UI — the scroll-stopper.
- Closing **CTA card** (~3s): logo + "astroindexer.com" + free-trial line.
- Music: `<Audio>` from `public/music/shorts_bed.wav` (or per-feature
  `shorts_bed_<id>.wav` if present), volume ~0.13, trimmed to the Short's
  length with a fade-out; ducked under VO. **User provides the bed.**

The composition reads its manifest by a `shortId` prop, so **one component
renders all six** — no per-feature `.tsx` files.

### 3. Registration + render

- `src/Root.tsx`: register six `Composition`s (`ShortGallery`,
  `ShortCatalogue`, … `ShortPlanner`), each `width={1080} height={1920}`,
  `defaultProps={{ shortId: "gallery" }}`, `durationInFrames` from that
  Short's manifest total. (Or one `Short` composition selected by prop and
  driven per-render — decided in the plan; either keeps Approach A.)
- A small `render_shorts.sh` (mirrors the `MAKING_VIDEOS.md` commands):
  `npx remotion render src/index.ts ShortGallery out/shorts/gallery.mp4
  --codec=h264 --image-format=png --crf=16`, looped over the six ids.
- Side deliverables per Short, reusing `gen_captions.py` conventions: an
  `.srt` and a caption/description blurb for the platform upload.

## Data flow

```
storybook YAML (facts)  ─┐
screenshots/*.png       ─┤
                         ▼
              gen_shorts.py (fresh scripts as data)
                         │  edge-tts VO + ffprobe timing
                         ▼
      public/svo/<id>/*.mp3   +   src/shorts/<id>.json
                         │
   user-provided ──►  public/music/shorts_bed.wav
                         ▼
                Short.tsx  (Remotion, 1080×1920)
                         │  npx remotion render (×6)
                         ▼
     out/shorts/<id>.mp4  +  <id>.srt  +  <id>.txt (caption/desc)
```

## What we reuse vs. build

**Reuse unchanged:** `theme.tsx`, edge-tts brand voice, the zoom camera math,
`LowerThird`, the ffprobe timing pattern, `crf=16` render settings, the
`MAKING_VIDEOS.md` runbook conventions.

**Build new:** `gen_shorts.py`, `src/Short.tsx`, hook/CTA cards, portrait
retargeting, six `src/shorts/*.json` manifests, `render_shorts.sh`, and a
short section appended to `MAKING_VIDEOS.md` (Recipe D — Shorts).

## Error handling / edge cases

- **Region hugs an edge:** already handled — the camera clamps pan so the
  screenshot always covers the frame (no black edges).
- **Script too long/short:** generator warns outside the 28–36s window; the
  atempo speed-fit trick from the tutorial pipeline is a fallback but the
  intent is to trim scripts, not speed them up.
- **Missing music bed:** render should fail loudly with a clear message
  ("drop shorts_bed.wav in public/music/") rather than render silent.
- **Screenshot too low-res for deep zoom:** flagged during region authoring;
  prefer the highest-res screenshot per tab, cap zoom at ~4–5× for Shorts.

## Testing / verification

- **Per Short:** render, then eyeball the MP4 — hook lands in first 2s, each
  zoom region frames the intended UI, captions readable at phone size, VO in
  sync, CTA legible, total 28–36s, audio ducks correctly.
- **Batch:** all six render without error via `render_shorts.sh`; naming and
  aspect ratio (1080×1920) confirmed with `ffprobe`.
- **Content check:** every spoken claim traces to its storybook phase.

## Out of scope (this batch)

- DE/ES localization (planned next, cheap via the same data pattern).
- The 6 RC1 tool Shorts (Backfocus, Plate Solver, etc.).
- The long-form ~7-min user tutorial (separate spec) and 16:9 promo clips.
- Auto-publishing to YouTube/Instagram (manual upload for now).

## Follow-on slate (context, not this spec)

1. **This spec:** 6 EN feature Shorts.
2. Localize the winners to DE/ES.
3. Long-form user tutorial from `app_overview_promo_explanatory_v1.yaml`.
4. 16:9 promo clips from `app_overview_promo_tailored_v1.yaml`.
