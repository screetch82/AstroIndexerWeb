#!/usr/bin/env python3
"""Stage F of the tutorial pipeline: transcribe a rendered video's audio with
Whisper (faster-whisper) and emit a word-accurate SRT. Works on ANY audio —
recorded screencasts included — not just a known script.

Usage: python whisper_srt.py <media_in> <srt_out> [model]
"""
import sys
from faster_whisper import WhisperModel


def ts(t):
    h = int(t // 3600); m = int((t % 3600) // 60); s = t % 60
    return f"{h:02d}:{m:02d}:{int(s):02d},{int((s - int(s)) * 1000):03d}"


def main():
    src = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else "captions.srt"
    model_name = sys.argv[3] if len(sys.argv) > 3 else "base.en"

    model = WhisperModel(model_name, device="cpu", compute_type="int8")
    segments, info = model.transcribe(src, beam_size=5, vad_filter=True,
                                      vad_parameters=dict(min_silence_duration_ms=400))
    lines, n = [], 0
    for seg in segments:
        n += 1
        text = seg.text.strip()
        lines.append(f"{n}\n{ts(seg.start)} --> {ts(seg.end)}\n{text}\n")
    with open(out, "w") as f:
        f.write("\n".join(lines))
    print(f"transcribed {n} segments ({info.language}, {info.duration:.1f}s) -> {out}")


if __name__ == "__main__":
    main()
