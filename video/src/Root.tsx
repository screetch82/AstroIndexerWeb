import React from "react";
import { Composition } from "remotion";
import { Announcement } from "./Announcement";
import manifest from "./manifest.json";

const TOTAL = manifest.segments.reduce((n, s) => n + s.beatFrames, 0);

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
    </>
  );
};
