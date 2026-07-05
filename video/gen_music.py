#!/usr/bin/env python3
"""Synthesize an original ambient pad bed (no third-party samples → no
licensing concerns). Warm I-V-vi-IV progression, soft harmonics, slow swell,
gentle stereo width, matched to the video length. Output: public/music/bed.wav
"""
import json, math, os, wave
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(HERE, "src", "manifest.json")) as f:
    man = json.load(f)
FPS = man["fps"]
TOTAL_FRAMES = sum(s["beatFrames"] for s in man["segments"])
DUR = TOTAL_FRAMES / FPS            # seconds, matches the composition exactly

SR = 44100
CHORD = 4.0                          # seconds per chord
XFADE = 0.9                          # crossfade between chords

# Warm, hopeful Cadd9 - G - Am7 - Fmaj7 (I-V-vi-IV), mid-register pad voicings.
CHORDS = [
    [130.81, 196.00, 261.63, 293.66, 329.63, 392.00],   # Cadd9
    [196.00, 293.66, 392.00, 493.88, 587.33],           # G
    [220.00, 329.63, 392.00, 523.25, 659.25],           # Am7
    [174.61, 261.63, 329.63, 440.00, 523.25],           # Fmaj7
]
SUBS = [65.41, 98.00, 110.00, 87.31]                    # root sub-bass per chord


def synth_chord(freqs, sub, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    # two slightly detuned voices → stereo width / chorus
    out = np.zeros((n, 2), dtype=np.float64)
    for ch, detune in ((0, 1.0009), (1, 0.9991)):
        sig = np.zeros(n)
        for i, f in enumerate(freqs):
            fd = f * detune
            amp = 0.9 / (1.0 + 0.35 * i)               # higher notes softer
            sig += amp * (
                np.sin(2 * np.pi * fd * t)
                + 0.32 * np.sin(2 * np.pi * 2 * fd * t)
                + 0.12 * np.sin(2 * np.pi * 3 * fd * t)
            )
        sig += 0.55 * np.sin(2 * np.pi * sub * detune * t)   # sub-bass
        out[:, ch] = sig
    # raised-cosine fade in/out for glitch-free overlap-add
    xf = int(XFADE * SR)
    if xf > 0:
        ramp = 0.5 * (1 - np.cos(np.linspace(0, np.pi, xf)))
        out[:xf] *= ramp[:, None]
        out[-xf:] *= ramp[::-1][:, None]
    return out


n_total = int((DUR + CHORD + 2 * XFADE + 1) * SR)
buf = np.zeros((n_total, 2), dtype=np.float64)
k = 0
while k * CHORD < DUR:
    seg = synth_chord(CHORDS[k % 4], SUBS[k % 4], CHORD + XFADE)
    start = int(k * CHORD * SR)
    buf[start:start + len(seg)] += seg
    k += 1

buf = buf[: int(DUR * SR)]

# slow amplitude swell (~0.07 Hz)
t = np.arange(len(buf)) / SR
buf *= (0.85 + 0.15 * np.sin(2 * np.pi * 0.07 * t))[:, None]

# global fade in / out
fi, fo = int(2.5 * SR), int(4.0 * SR)
buf[:fi] *= np.linspace(0, 1, fi)[:, None]
buf[-fo:] *= np.linspace(1, 0, fo)[:, None]

# normalize to a modest peak; final level set in Remotion
peak = np.max(np.abs(buf))
buf = buf / peak * 0.8

pcm = (buf * 32767).astype("<i2")
os.makedirs(os.path.join(HERE, "public", "music"), exist_ok=True)
out_path = os.path.join(HERE, "public", "music", "bed.wav")
with wave.open(out_path, "w") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print(f"wrote {out_path}  {DUR:.1f}s stereo {SR}Hz")
