#!/usr/bin/env python3
"""Pilot feature-tutorial generator: brand-voice VO (edge-tts LibbyNeural) +
a tutorial manifest (per-step region to zoom-highlight + on-screen caption).
Demonstrates the tutorial pipeline over a single annotated screenshot."""
import asyncio, json, os, subprocess
import edge_tts

HERE = os.path.dirname(os.path.abspath(__file__))
VO = os.path.join(HERE, "public", "tvo")
os.makedirs(VO, exist_ok=True)

VOICE = "en-GB-LibbyNeural"
RATE = "+0%"
FPS = 30
SHOT = "shots/backfocus_manager.jpg"
TITLE = "Backfocus Manager"

# id, region [x,y,w,h] as fractions of the screenshot, caption, narration, head, tail
STEPS = [
    ("intro",     [0, 0, 1, 1], "",
     "This is the Backfocus Manager, in the Equipment Manager. It builds your imaging train, draws it to scale, and works out the exact spacers to hit your sensor's backfocus.", 0.4, 0.6),
    ("inventory", [0.0, 0.17, 0.24, 0.78], "Build from the vendor inventory",
     "Start on the left. Add each part of your train from the vendor inventory — adapters, spacers, filter drawers, and your camera. AstroIndexer knows every part's optical length.", 0.35, 0.55),
    ("train",     [0.21, 0.16, 0.52, 0.72], "Drawn to scale, optic to sensor",
     "Your train is drawn to scale, from the reference optic down to the sensor plane, so the spacing is obvious at a glance.", 0.35, 0.55),
    ("tolerance", [0.71, 0.16, 0.29, 0.18], "Under · within · over",
     "The backfocus summary shows your target and tolerance. The under, within, over band tells you at a glance whether you're in spec.", 0.35, 0.55),
    ("details",   [0.71, 0.28, 0.29, 0.24], "Filter-glass + spacer maths",
     "Filter-glass compensation is folded into the maths, and the details panel resolves the spacer combination you need.", 0.35, 0.55),
    ("export",    [0.80, 0.11, 0.18, 0.06], "Export the checklist",
     "When it's dialled in, export the checklist and take it to the scope.", 0.35, 0.55),
    ("outro",     [0, 0, 1, 1], "",
     "That's the Backfocus Manager — dial in your train before you head out.", 0.4, 0.9),
]


def probe(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                        "-of", "csv=p=0", path], capture_output=True, text=True)
    return float(r.stdout.strip())


async def main():
    segs = []
    for sid, region, caption, text, head, tail in STEPS:
        out = os.path.join(VO, f"{sid}.mp3")
        c = edge_tts.Communicate(text=text, voice=VOICE, rate=RATE)
        with open(out, "wb") as f:
            async for ch in c.stream():
                if ch["type"] == "audio":
                    f.write(ch["data"])
        dur = probe(out)
        beat = round((head + dur + tail) * FPS)
        segs.append({"id": sid, "audio": f"tvo/{sid}.mp3", "text": text,
                     "caption": caption, "region": region, "durSec": round(dur, 3),
                     "beatFrames": beat, "audioStartFrame": round(head * FPS)})
        print(f"{sid:10s} {dur:5.2f}s  beat={beat}f")
    total = sum(s["beatFrames"] for s in segs)
    print(f"TOTAL {total}f = {total/FPS:.1f}s")
    with open(os.path.join(HERE, "src", "tutorial_backfocus.json"), "w") as f:
        json.dump({"fps": FPS, "shot": SHOT, "title": TITLE, "segments": segs}, f, indent=2)
    print("wrote src/tutorial_backfocus.json")


asyncio.run(main())
