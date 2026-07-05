#!/usr/bin/env python3
"""Generate the announcement voiceover with the AstroIndexer brand voice
(edge-tts, en-GB-LibbyNeural — same neural voice used by the app's tutorial
narration pipeline). Precise clip length comes from edge-tts WordBoundary
timings, and a manifest times the Remotion composition to the audio."""
import asyncio, json, os, re, subprocess
import edge_tts

FFPROBE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "node_modules", ".bin", "remotion")

def probe_seconds(path):
    """Duration via Remotion's bundled ffprobe (CBR mp3 estimate is accurate)."""
    r = subprocess.run([FFPROBE, "ffprobe", path], capture_output=True, text=True)
    m = re.search(r"Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)", r.stdout + r.stderr)
    h, mn, s = m.groups()
    return int(h) * 3600 + int(mn) * 60 + float(s)

HERE = os.path.dirname(os.path.abspath(__file__))
VO = os.path.join(HERE, "public", "vo")
os.makedirs(VO, exist_ok=True)

VOICE = "en-GB-LibbyNeural"   # canonical AstroIndexer English brand voice
RATE = "+0%"                   # match the shipped voice-over delivery (calm, measured)
FPS = 30

# Brand tone: calm, measured, informative — matched to the shipped app
# voice-over (splash/welcome), not the hyped tutorial promo. See
# VOICE_OVER_TRANSCRIPTS_REFERENCE.md.
SEGMENTS = [
    ("intro",       "AstroIndexer 1.0, Release Candidate 1, is here — the biggest step yet toward the full release.", 0.4, 0.55),
    ("platesolver", "AstroIndexer now includes its own plate solver — native solving with full distortion data, and no external tools to install. Eighteen point six percent faster than ASTAP.", 0.3, 0.5),
    ("loupe",       "The new Inspect Loupe examines any sub at full resolution, with live quality metrics that match PixInsight — right in your gallery.", 0.3, 0.5),
    ("stacking",    "Stacking is now a single click. AstroIndexer sorts your frames by quality, and hands the best of them to PixInsight or Siril, automatically.", 0.3, 0.5),
    ("detector",    "The new Object Detector identifies every catalogued object in a solved frame, and cross-matches them against professional sky surveys.", 0.3, 0.5),
    ("backfocus",   "And the expanded Backfocus Manager draws your imaging train to scale, and finds the exact spacer for every sensor.", 0.3, 0.5),
    ("mobile",      "Your library travels with you, too, with new companion apps for iOS and Android — catalogue and pipeline status always in reach.", 0.3, 0.5),
    ("outro",       "AstroIndexer 1.0, Release Candidate 1. It runs locally, with no subscription. Update at astroindexer.com.", 0.35, 1.0),
]


async def render(text, out_path):
    """Stream TTS to disk (edge-tts neural voice)."""
    c = edge_tts.Communicate(text=text, voice=VOICE, rate=RATE)
    with open(out_path, "wb") as f:
        async for chunk in c.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])


async def main():
    manifest = []
    for sid, text, head, tail in SEGMENTS:
        out = os.path.join(VO, f"{sid}.mp3")
        await render(text, out)
        dur = probe_seconds(out)
        beat_frames = round((head + dur + tail) * FPS)
        manifest.append({
            "id": sid, "audio": f"vo/{sid}.mp3", "text": text,
            "durSec": round(dur, 3),
            "beatFrames": beat_frames,
            "audioStartFrame": round(head * FPS),
        })
        print(f"{sid:12s} speech={dur:5.2f}s  beat={beat_frames:4d}f  ({beat_frames/FPS:.2f}s)")

    total = sum(m["beatFrames"] for m in manifest)
    print(f"\nTOTAL {total} frames = {total/FPS:.1f}s @ {FPS}fps")
    with open(os.path.join(HERE, "src", "manifest.json"), "w") as f:
        json.dump({"fps": FPS, "voice": VOICE, "segments": manifest}, f, indent=2)
    print("wrote src/manifest.json")


asyncio.run(main())
