# Making AstroIndexer videos — runbook

The practical "how do I make the next video" guide. (For strategy see
`PIPELINE_PROPOSAL.md`; for a component-by-component reference see `README.md`.)

All commands run from the `video/` directory.

---

## 0. One-time setup

```bash
cd video
npm install                                   # Remotion + React (renders locally)
brew install ffmpeg                            # encode / mux / composite / reframe
python3 -m pip install edge-tts numpy faster-whisper   # VO, music, captions
# optional agent skills for graphics/captions (review before use):
#   npx skills add heygen-com/hyperframes   -> installs to .agents/ (gitignored)
```

Verify: `ffmpeg -version`, `python3 -c "import edge_tts, numpy, faster_whisper"`,
`npx remotion versions`.

---

## 1. Which video am I making?

| Type | Use it for | Base footage | Script → Composition |
|------|-----------|--------------|----------------------|
| **A. Announcement / promo** | releases, feature roundups, launches | screenshots (motion graphics) | `gen_i18n.py` → `Announcement*` |
| **B. Feature tutorial** | "how to use X" from a single screen | one annotated screenshot | `gen_tutorial.py` → `TutorialBackfocus` |
| **C. Live screencast** | real walkthrough of the running app | a screen recording | `AvfoundationRecorder` + `Overlay` + `compose_screencast.sh` |

All three share: **edge-tts brand voice**, the **starfield/teal theme** (`theme.tsx`),
**synthesized music** (`gen_music.py`), and export at **1920×1080 / 30 fps** (or
1080×1920 for Shorts), `--codec=h264 --image-format=png --crf=16`.

---

## 2. Recipe A — Announcement / promo

Content lives in **`gen_i18n.py`** (`LANGS`): per-language on-screen strings **and**
narration, all in one place. Design (accent colours, screenshots, pill colours) is
in `src/Announcement.tsx` (`ACCENT`, `SHOT`, `PILL_COLORS`).

1. **Edit content** — in `gen_i18n.py`, adjust `LANGS[<lang>]`: `intro`, `outro`,
   `beats.<id>` (kicker/title/body/chip/pills), and `vo.<id>` (spoken lines). Put the
   screenshot in `public/shots/` and map it in `SHOT` in `Announcement.tsx`.
2. **Generate VO + manifests:**
   ```bash
   python3 gen_i18n.py                 # all langs  (or: python3 gen_i18n.py en de es)
   for L in en de es; do python3 gen_music.py src/ann.$L.json public/music/bed_$L.wav; done
   ```
3. **Render** (one composition per language + a vertical Short):
   ```bash
   npx remotion render src/index.ts Announcement        out/announcement-en.mp4 --codec=h264 --image-format=png --crf=16
   npx remotion render src/index.ts AnnouncementDE      out/announcement-de.mp4 --codec=h264 --image-format=png --crf=16
   npx remotion render src/index.ts AnnouncementES      out/announcement-es.mp4 --codec=h264 --image-format=png --crf=16
   npx remotion render src/index.ts AnnouncementVertical out/announcement-short.mp4 --codec=h264 --image-format=png --crf=16
   ```

**Add a language:** add a `LANGS` entry (voice + flag emoji + strings + narration),
then register a `Composition` in `src/Root.tsx` (`defaultProps={{ lang: "fr" }}`).
Everything else (flag chip, timing, music) follows automatically.

---

## 3. Recipe B — Feature tutorial (zoom-to-highlight)

Walks a **single screenshot** step by step: the camera zooms/pans to each region
while a lower-third caption and narration explain it.

1. **Author the steps** — copy `gen_tutorial.py`, set `SHOT`, `TITLE`, and the `STEPS`
   list: `(id, [x,y,w,h] region as fractions, caption, narration, head_pad, tail_pad)`.
   Find the `[x,y,w,h]` by eyeballing the screenshot (fractions 0–1). The camera
   **clamps to always cover the frame**, so edge regions won't show black.
2. **Generate + score + render:**
   ```bash
   python3 gen_tutorial.py                                  # VO + src/tutorial_<name>.json
   python3 gen_music.py src/tutorial_<name>.json public/music/tutorial_bed.wav
   npx remotion render src/index.ts TutorialBackfocus out/tutorial-<name>.mp4 --codec=h264 --image-format=png --crf=16
   ```
   (Register a new `Composition` in `Root.tsx` per tutorial, pointing at its JSON.)

Good for Planning, Quality Analysis, Equipment Manager, etc. — one screenshot each.

---

## 4. Recipe C — Live screencast (real app)

The authentic walkthrough. **Base = a screen recording**; Remotion supplies a
transparent graphics track composited on top.

1. **Record the app** (macOS; needs Screen Recording permission granted to the
   terminal in System Settings → Privacy & Security). Screen device index is usually
   the `Capture screen` entry from `ffmpeg -f avfoundation -list_devices true -i ""`:
   ```bash
   ffmpeg -f avfoundation -capture_cursor 1 -framerate 30 -i "2:none" \
     -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p raw.mkv   # stop with 'q'
   ```
   (Or drive it programmatically via the app's `tools/tutorial_capture` pipeline —
   `AvfoundationRecorder` is already implemented there.)
2. **Render the overlay with alpha** (graphics only — header, lower-third, progress):
   ```bash
   npx remotion render src/index.ts Overlay out/overlay.mov \
     --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le
   ```
   > `--image-format=png --pixel-format=yuva444p10le` are **required** for alpha —
   > the default jpeg frames flatten transparency to black.
3. **Narration + music** (reuse `gen_tutorial.py` for VO, `gen_music.py` for the bed).
4. **Composite** everything:
   ```bash
   ./compose_screencast.sh raw.mkv out/overlay.mov public/tvo/intro.mp3 \
     public/music/tutorial_bed.wav out/screencast.mp4
   ```
   (ffmpeg overlays the alpha track, mixes VO + ducked music, exports H.264/AAC.)

---

## 5. Captions & YouTube metadata

- **Scripted narration → exact SRT** (recommended): the caption text comes from the
  manifest, so it's letter-perfect. `gen_captions.py` writes `out/*.srt` +
  `out/*-youtube.md` (title + 6 highlights + chapter timestamps). It reads the
  announcement manifest — point it at `src/ann.<lang>.json` for a localized SRT.
- **Recorded/unscripted audio → Whisper SRT:**
  ```bash
  python3 whisper_srt.py out/screencast.mp4 out/screencast.srt
  ```
  Whisper trips on domain terms from mixed audio ("spacers"→"spaces",
  "AstroIndexer"→"Astra-indexer"), so **prefer the manifest SRT whenever the script
  is known**; use Whisper only when it isn't.
- YouTube: upload the `.srt`, paste the `-youtube.md` description, keep the chapters.

---

## 6. Brand rules (don't skip)

Narration + on-screen copy follow the app's `BRAND_VOICE` (`tools/tutorial_capture/
glossary.py`):

- **Voice:** British English (edge-tts), calm and measured, **at `+0%` rate**.
- **Active voice**: "AstroIndexer scores every frame", not "every frame is scored".
- **No marketing puff** — never "powerful", "seamlessly", "intelligent", "robust",
  "cutting-edge", "next-generation", "revolutionise".
- **Correct domain terms**: FITS, XISF, FWHM (in px), HFR, plate solving, SPCC,
  mosaic, quality score, imaging intelligence. Don't invent UI that isn't shown.
- **Numbers spoken correctly per language** — write `18,6 %` for de/es so TTS reads
  the decimal comma; `18.6%` for en.

**Voices (shipped brand voices):**

| Lang | Voice |
|------|-------|
| en | `en-GB-LibbyNeural` |
| de | `de-DE-KatjaNeural` |
| es | `es-ES-ElviraNeural` |

---

## 7. Assets & conventions

```
public/shots/          screenshots used by announcement + tutorials
public/vo_<lang>/       announcement VO (one mp3 per beat)
public/tvo/             tutorial VO
public/music/           bed_<lang>.wav, tutorial_bed.wav  (synthesized, no licensing)
public/logo.png         brand mark
src/ann.<lang>.json     announcement content + timings   (generated)
src/tutorial_*.json     tutorial steps + timings         (generated)
out/                    all renders — gitignored
```

`node_modules/`, `out/`, `.agents/` are gitignored. The generated VO/music/manifests
**are** committed so the project renders after a fresh clone with no regeneration.

Preview & scrub while iterating: `npm run studio`.

---

## 8. Gotchas (learned the hard way)

- **Alpha overlays need PNG frames + a `yuva` pixel format.** `remotion.config`
  uses jpeg (fine/fast for opaque comps); jpeg has no alpha → transparent renders as
  black. For `Overlay` always pass `--image-format=png --pixel-format=yuva444p10le`.
- **ffmpeg `zoompan` on a looped still explodes the duration** — prefer a static
  base + let the Remotion overlay carry the motion, or feed `zoompan` a single frame.
- **Tutorial camera regions**: `target()` clamps the pan so the image always covers
  the frame — tall/edge regions won't show black bars.
- **Music must match length**: always regenerate `gen_music.py <manifest> <out.wav>`
  after the VO changes (total duration comes from the manifest).
- **`say` voice "Flo" is legacy** (macOS-only, robotic) — use edge-tts, not `say`.
- Keep the language flag chip and the "1.0 RC1" chip from overlapping: flag at
  `right:56`, RC1 chip at `right:168` (see `Announcement.tsx`).
