#!/usr/bin/env bash
# Assemble stage: composite a Remotion alpha overlay + narration + ducked music
# over a base video (a live screen recording from AvfoundationRecorder, or any
# footage). This is the ffmpeg glue that ties live capture + Remotion + edge-tts
# into one tutorial.
#
# Usage: compose_screencast.sh BASE.mp4 OVERLAY.mov VO.mp3 MUSIC.wav OUT.mp4
set -euo pipefail
BASE="$1"; OVERLAY="$2"; VO="$3"; MUSIC="$4"; OUT="$5"
ffmpeg -y -i "$BASE" -i "$OVERLAY" -i "$VO" -i "$MUSIC" \
  -filter_complex "\
    [0:v][1:v]overlay=format=auto[v];\
    [3:a]volume=0.13[m];\
    [2:a][m]amix=inputs=2:duration=first:normalize=0[a]" \
  -map "[v]" -map "[a]" \
  -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p \
  -c:a aac -b:a 256k -shortest "$OUT"
echo "wrote $OUT"
