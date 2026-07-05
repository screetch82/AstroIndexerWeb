# AstroIndexer video pipeline — enhancement proposal

**Goal:** a repeatable, mostly-automated pipeline for producing **feature tutorial
videos** (Planning · Quality Analytics · Equipment Manager · Backfocus Manager ·
Stacking · Object Detector · Gallery · Autopilot …) plus short promos and vertical
Shorts — narrated in the AstroIndexer brand voice, captioned, lightly graphic'd,
and reproducible when the UI changes.

Written after reviewing the "Claude + video" ecosystem (see *What I consumed*) and
auditing what we already have.

---

## 1. What we already have (assets to build on)

| Asset | Where | Role |
|---|---|---|
| **`tutorial_capture` pipeline** | `Astroindexer/tools/tutorial_capture/` | The spine. Drives the real app via the smoke-test "tour" journey, screen-records (ffmpeg `gdigrab`), emits a UI-event **timeline JSONL**, writes **Sonnet** narration constrained by `glossary.py`, renders **edge-tts `en-GB-LibbyNeural`** per phase, then **ffmpeg-muxes** video + audio + **SRT** and a **YouTube description with chapters**. Storybook YAMLs hold per-phase narration. |
| **Brand voice rules** | `tutorial_capture/glossary.py`, `VOICE_OVER_TRANSCRIPTS_REFERENCE.md` | British, active voice, correct domain terms (FITS/FWHM/HFR/plate solving), **no marketing puff**. Shipped voice = `en-GB-LibbyNeural` @ `+0%`; DE = `de-DE-KatjaNeural`, ES = `es-ES-ElviraNeural`. |
| **Remotion promo project** | `AstroIndexerWeb/video/` | Motion-graphics announcement (intro / feature beats / outro), edge-tts VO, **synthesized music bed**, `gen_captions.py` (SRT + chaptered description). Good for intros/outros/lower-thirds and promos. |
| **Brand system** | `AstroIndexerWeb/css/style.css`, screenshots, logo | Colour tokens, starfield, typography — already mirrored into the Remotion `theme.tsx`. |

**Bottom line:** capture + narration + brand voice are solved. The gaps are
**editing** (rough-cut/trim, on-screen graphics, captions from real audio) and
**cross-platform capture** (macOS).

---

## 2. What I consumed (Claude + video ecosystem)

- **HyperFrames** — HeyGen's open-source *"write HTML, render video, built for agents"*
  framework (`github.com/heygen-com/hyperframes`, Apache-2.0, ~33k★). The important
  find. HTML/CSS/animation → deterministic MP4 via **headless Chrome + ffmpeg**, with
  a **Claude Code skill system**: a `/hyperframes` router plus workflow skills
  (`/embedded-captions`, `/motion-graphics`, `/website-to-video`, `/talking-head-recut`,
  `/faceless-explainer`, `/slideshow`, `/remotion-to-hyperframes`…) and domain skills
  (`/hyperframes-media` = TTS + **Whisper** transcription + caption generation).
  Install: `npx skills add heygen-com/hyperframes`. This is a productized, more
  capable superset of what our Remotion project does by hand.
- **"How I fully automated my video editing (Claude Code)"** (Jason Cooperson) — one raw
  recording → Claude drives the edit end-to-end. Stages worth copying: **Rough Cut
  (trim dead space) → Graphics → Second Pass → Captions → Background Music → Export**
  (built on HyperFrames).
- **Claude `/video`, Higgsfield, Topview, HeyGen avatars** (Brock Mesarich, Rob The AI Guy,
  Sabrina Ramonov, Shane Hummus) — AI **generation** (text-to-video, avatars, b-roll).
  Useful garnish for intros/teasers, but **not** the core for software tutorials, where
  authentic screen capture is the whole point. Park these for promo b-roll only.
- The **Medium article you shared** — Remotion for local render + ElevenLabs for VO.
  We already do the Remotion half locally and beat the VO half with your own
  `en-GB-LibbyNeural` (free, on-brand). No ElevenLabs needed.

**Takeaway:** adopt the **HyperFrames pattern** (agent-native HTML→video, Whisper
captions, ffmpeg edit) as the editing/graphics layer on top of our capture spine.

---

## 3. Proposed pipeline (per feature tutorial)

```
 (A) STORYBOARD        one storybook YAML per feature: phases (tabs/actions) +
                       narration hints, brand-voice constrained (glossary.py)
        |
 (B) CAPTURE           drive the real app (scripted UI journey), record 1080p/4K,
                       emit UI-event timeline JSONL for sync
        |
 (C) NARRATE           edge-tts en-GB-LibbyNeural @ +0%, per phase; duration-fit
        |
 (D) ROUGH CUT   *NEW* auto-trim silence/dead-space, align cuts to UI events,
                       concatenate phases
        |
 (E) GRAPHICS    *NEW* HTML→video overlays composited over the screen recording:
                       intro/outro, lower-thirds (feature + tip), zoom-to-highlight
                       callouts on the active UI element, progress bar, brand starfield
        |
 (F) CAPTIONS    *NEW* Whisper transcribe final VO -> word-level SRT (+ optional
                       burned-in animated captions for retention)
        |
 (G) MUSIC             synthesized ambient bed (gen_music) or licensed track, ducked
        |
 (H) EXPORT            16:9 master + auto-reframed 9:16 Short + thumbnail +
                       YouTube title/description/chapters (we already generate these)
        |
 (I) QA / DETERMINISM  golden-frame regression + preview loop; re-render on UI change
```

`*NEW*` = the capabilities to add. A–C and H's metadata already exist.

---

## 4. Tooling decisions

- **Keep `tutorial_capture`** as the capture + narration spine (it already knows the
  app journeys, timeline, brand voice, and VO).
- **Add an editing/graphics layer** — recommend **HyperFrames** (agent-native, HTML
  overlays, `/embedded-captions`, Whisper, ffmpeg, deterministic) rather than growing
  the bespoke ffmpeg assembler. Our existing Remotion project can be reused as-is or
  migrated with `/remotion-to-hyperframes`.
- **Standardise the stack:** edge-tts LibbyNeural (voice) · **ffmpeg** (encode/mux/reframe)
  · **Whisper** (captions) · HTML→video (HyperFrames/Remotion) for graphics ·
  synthesized/licensed music.
- **Finish the macOS capture path** (`avfoundation`) so tutorials can also be produced
  on this Mac — today capture is Windows-only (`gdigrab`).

---

## 5. Upskilling — what to add to my toolkit

This is the concrete "make Claude capable of the whole pipeline" list:

1. **Install ffmpeg** on this machine (`brew install ffmpeg`) — currently missing; it's
   the backbone of every edit/mux/reframe step.
2. **Install HyperFrames skills** — `npx skills add heygen-com/hyperframes` — to gain
   `/embedded-captions`, `/motion-graphics`, `/website-to-video`, `/talking-head-recut`,
   and the media/TTS/caption skills as first-class Claude Code capabilities.
3. **Add Whisper** (`whisper.cpp` or `faster-whisper`) for word-level transcription →
   accurate captions and silence detection for auto rough-cut.
4. **Build an AstroIndexer "video kit"** (reusable HTML/Remotion components): brand
   intro/outro, lower-third, **zoom-to-highlight callout** (Ken Burns on the active UI
   element — our signature move), caption style, and music beds. Brand tokens already
   exist in `theme.tsx`.
5. **A `/ai-tutorial` orchestration skill** (or extend `tutorial_capture`) that runs the
   whole A→I chain for a named feature, so producing a new tutorial is one command +
   review.
6. **macOS capture** — implement the `avfoundation` recorder path.

---

## 6. Roadmap

| Phase | Outcome |
|---|---|
| **0 — Tooling** | Install ffmpeg + Whisper; install HyperFrames skills; implement macOS `avfoundation` capture. |
| **1 — Pilot** | Produce ONE tutorial end-to-end (suggest **Backfocus Manager** — visually rich to-scale train — or **Planning**). Establish the brand kit: intro/outro, lower-thirds, zoom-highlight, caption style, music. |
| **2 — Templatise** | Storybooks + batch production for Quality Analytics, Equipment Manager, Planning, Stacking, Object Detector, Gallery, Autopilot. |
| **3 — Distribute** | Auto-Shorts (best 30–60s, reframed 9:16), thumbnails, publish workflow, DE/ES localisation via edge-tts Katja/Elvira. |
| **4 — Maintain** | Deterministic re-render on UI changes; keep the channel current as features evolve. |

---

## 7. Recommended next step

Green-light **Phase 0 + a Phase-1 pilot**: I install ffmpeg + HyperFrames + Whisper,
finish the macOS capture path, and produce one full **Backfocus Manager** (or
**Planning**) tutorial — capture → narrate (LibbyNeural) → rough-cut → graphics →
captions → music → 16:9 + Short — as the template every other feature video is cloned
from.

*What I actually consumed for this: the HyperFrames repository (full README), the
YouTube result set, and each candidate video's description + chapter breakdown. Spoken
transcripts didn't load in-browser, but the descriptions + the authoritative HyperFrames
source carried the substance.*
