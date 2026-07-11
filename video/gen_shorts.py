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
# region fractions are of the SOURCE image; tune against the real screenshots.
SHORTS = [
    {
        "id": "gallery", "feature": "Gallery", "shot": "shots/gallery.jpg",
        "segments": [
            ("hook", "hook", [0, 0, 1, 1], "",
             "Thousands of light frames, scattered across a dozen drives. Good luck finding anything."),
            ("beat", "search", [0.20, 0.02, 0.56, 0.14], "One searchable library",
             "The Gallery brings every frame you have ever shot into one searchable library — by target, filter, session, even moon phase."),
            ("beat", "cards", [0.24, 0.30, 0.40, 0.52], "Real FITS previews",
             "And these are not file icons — every card is a real preview, straight from the FITS data."),
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
