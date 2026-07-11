#!/usr/bin/env bash
# Render feature Shorts. Usage: ./render_shorts.sh [id ...]  (default: all six)
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f public/music/shorts_bed.wav ]; then
  echo "ERROR: public/music/shorts_bed.wav is missing."
  echo "  Drop your music track there (a >=36s loopable bed), or run:"
  echo "    python3 gen_music.py src/_bedspec.json public/music/shorts_bed.wav"
  exit 1
fi

IDS=("$@")
if [ ${#IDS[@]} -eq 0 ]; then
  IDS=(gallery catalogue quality intelligence skyatlas planner)
fi

mkdir -p out/shorts
for id in "${IDS[@]}"; do
  echo "=== rendering Short-$id ==="
  npx remotion render src/index.ts "Short-$id" "out/shorts/$id.mp4" \
    --codec=h264 --image-format=png --crf=16
  W=$(ffprobe -v error -select_streams v -show_entries stream=width -of csv=p=0 "out/shorts/$id.mp4")
  Hh=$(ffprobe -v error -select_streams v -show_entries stream=height -of csv=p=0 "out/shorts/$id.mp4")
  DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "out/shorts/$id.mp4")
  echo "    $id -> ${W}x${Hh}  ${DUR}s"
  [ "$W" = "1080" ] && [ "$Hh" = "1920" ] || { echo "    !! wrong dimensions"; exit 1; }
done
echo "done."
