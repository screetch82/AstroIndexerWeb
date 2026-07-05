#!/usr/bin/env python3
"""Produce the same side-deliverables the app's tutorial_capture pipeline ships:
an SRT caption file and a YouTube description (short intro + 6 highlights +
chapter timestamps). Timings come straight from src/manifest.json."""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(HERE, "src", "manifest.json")) as f:
    man = json.load(f)
FPS = man["fps"]
SEGS = man["segments"]

# cumulative start frame of each beat
offsets, acc = [], 0
for s in SEGS:
    offsets.append(acc)
    acc += s["beatFrames"]


def srt_ts(t):
    h = int(t // 3600); m = int((t % 3600) // 60); s = t % 60
    return f"{h:02d}:{m:02d}:{int(s):02d},{int(round((s - int(s)) * 1000)):03d}"


def yt_ts(t):
    m = int(t // 60); s = int(t % 60)
    return f"{m}:{s:02d}"


# ── SRT: one cue per sentence, timed proportionally inside each beat's VO ──
cues = []
for i, s in enumerate(SEGS):
    start = (offsets[i] + s["audioStartFrame"]) / FPS
    dur = s["durSec"]
    sentences = [x.strip() for x in re.split(r"(?<=[.!?])\s+", s["text"].strip()) if x.strip()]
    total = sum(len(x) for x in sentences) or 1
    t = start
    for sent in sentences:
        d = dur * len(sent) / total
        cues.append((t, t + d, sent))
        t += d

srt = []
for n, (a, b, text) in enumerate(cues, 1):
    srt.append(f"{n}\n{srt_ts(a)} --> {srt_ts(b)}\n{text}\n")
with open(os.path.join(HERE, "out", "AstroIndexer-1.0-RC1.srt"), "w") as f:
    f.write("\n".join(srt))

# ── YouTube description ──────────────────────────────────────────────────
CHAPTERS = {
    "intro": "Introduction",
    "platesolver": "Plate solver, built in",
    "loupe": "Inspect Loupe",
    "stacking": "One-click stacking",
    "detector": "Object Detector",
    "backfocus": "Backfocus Manager",
    "mobile": "Mobile companion apps",
    "outro": "Update to RC1",
}
HIGHLIGHTS = [
    "Built-in plate solver — native WCS with a full SIP distortion model, stored per frame. 18.6% faster median solve than ASTAP, with no external solver to install.",
    "Inspect Loupe — examine any sub at 1:1 with live FWHM, HFR, eccentricity and SNR, plus PixInsight-parity PSF metrics.",
    "One-click stacking — QA-sorted frames handed to PixInsight AutoIntegrate or Siril, with ready-made OSC, broadband and narrowband sequences.",
    "Object Detector — every catalogued object identified on a solved frame, cross-matched against LEDA, SDSS, MCG and 2MASX.",
    "Backfocus Manager — your imaging train drawn to scale, with the exact spacer combination for each sensor's required backfocus.",
    "Companion apps — browse your catalogue and pipeline status on iOS (live on the App Store) and Android (in final review).",
]
TITLE = "AstroIndexer 1.0 RC1 — built-in plate solver, one-click stacking, and mobile companion apps"
INTRO = (
    "AstroIndexer 1.0 Release Candidate 1 is the biggest step yet toward the full 1.0 "
    "release. It adds a plate solver built directly into AstroIndexer, one-click stacking "
    "that drives PixInsight or Siril, an object detector, the Inspect Loupe, an expanded "
    "Backfocus Manager, and companion apps for iOS and Android."
)

lines = [f"# YouTube title\n{TITLE}\n", "# Description\n", INTRO, "", "Highlights:"]
lines += [f"- {h}" for h in HIGHLIGHTS]
lines += ["", "Chapters:"]
for i, s in enumerate(SEGS):
    lines.append(f"{yt_ts(offsets[i] / FPS)} {CHAPTERS.get(s['id'], s['id'])}")
lines += [
    "",
    "Everything runs locally on Windows, macOS, or Linux. Your data never leaves your machine.",
    "astroindexer.com",
]
with open(os.path.join(HERE, "out", "AstroIndexer-1.0-RC1-youtube.md"), "w") as f:
    f.write("\n".join(lines) + "\n")

print(f"wrote out/AstroIndexer-1.0-RC1.srt  ({len(cues)} cues)")
print("wrote out/AstroIndexer-1.0-RC1-youtube.md")
print("\nChapters:")
for i, s in enumerate(SEGS):
    print(f"  {yt_ts(offsets[i]/FPS)}  {CHAPTERS.get(s['id'], s['id'])}")
