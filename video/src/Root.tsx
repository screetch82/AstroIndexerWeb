import React from "react";
import { Composition } from "remotion";
import { Announcement } from "./Announcement";
import { TutorialBackfocus } from "./Tutorial";
import { Overlay } from "./Overlay";
import manifest from "./manifest.json";
import tutorialBackfocus from "./tutorial_backfocus.json";

const TOTAL = manifest.segments.reduce((n, s) => n + s.beatFrames, 0);
const TUT_BACKFOCUS = tutorialBackfocus.segments.reduce((n, s) => n + s.beatFrames, 0);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 16:9 for YouTube */}
      <Composition
        id="Announcement"
        component={Announcement}
        durationInFrames={TOTAL}
        fps={manifest.fps}
        width={1920}
        height={1080}
      />
      {/* 9:16 for YouTube Shorts / Reels / TikTok */}
      <Composition
        id="AnnouncementVertical"
        component={Announcement}
        durationInFrames={TOTAL}
        fps={manifest.fps}
        width={1080}
        height={1920}
      />
      {/* Pilot feature tutorial (zoom-to-highlight over a screenshot) */}
      <Composition
        id="TutorialBackfocus"
        component={TutorialBackfocus}
        durationInFrames={TUT_BACKFOCUS}
        fps={tutorialBackfocus.fps}
        width={1920}
        height={1080}
      />
      {/* Transparent graphics overlay — composited over live screencap by ffmpeg */}
      <Composition
        id="Overlay"
        component={Overlay}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ label: "Backfocus Manager", caption: "Build from the vendor inventory" }}
      />
    </>
  );
};
