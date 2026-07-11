import React from "react";
import { Composition } from "remotion";
import { Announcement } from "./Announcement";
import { TutorialBackfocus } from "./Tutorial";
import { Overlay } from "./Overlay";
import { Short } from "./Short";
import annEn from "./ann.en.json";
import annDe from "./ann.de.json";
import annEs from "./ann.es.json";
import tutorialBackfocus from "./tutorial_backfocus.json";
import shorts from "./shorts.json";

const total = (m: any) => m.segments.reduce((n: number, s: any) => n + s.beatFrames, 0);
const TUT_BACKFOCUS = tutorialBackfocus.segments.reduce((n, s) => n + s.beatFrames, 0);
const shortFrames = (id: string) =>
  shorts.shorts.find((s) => s.id === id)!.segments.reduce((n, s) => n + s.beatFrames, 0);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 16:9 announcement, one per language (flag chip auto-set) */}
      <Composition id="Announcement" component={Announcement} durationInFrames={total(annEn)} fps={annEn.fps} width={1920} height={1080} defaultProps={{ lang: "en" }} />
      <Composition id="AnnouncementDE" component={Announcement} durationInFrames={total(annDe)} fps={annDe.fps} width={1920} height={1080} defaultProps={{ lang: "de" }} />
      <Composition id="AnnouncementES" component={Announcement} durationInFrames={total(annEs)} fps={annEs.fps} width={1920} height={1080} defaultProps={{ lang: "es" }} />

      {/* 9:16 Short (English) */}
      <Composition id="AnnouncementVertical" component={Announcement} durationInFrames={total(annEn)} fps={annEn.fps} width={1080} height={1920} defaultProps={{ lang: "en" }} />

      {/* Pilot feature tutorial */}
      <Composition id="TutorialBackfocus" component={TutorialBackfocus} durationInFrames={TUT_BACKFOCUS} fps={tutorialBackfocus.fps} width={1920} height={1080} />

      {/* Transparent graphics overlay for live screencast compositing */}
      <Composition id="Overlay" component={Overlay} durationInFrames={180} fps={30} width={1920} height={1080} defaultProps={{ label: "Backfocus Manager", caption: "Build from the vendor inventory" }} />

      {/* 9:16 feature Shorts — one per core tab */}
      {shorts.shorts.map((s) => (
        <Composition
          key={s.id}
          id={`Short-${s.id}`}
          component={Short}
          durationInFrames={shortFrames(s.id)}
          fps={shorts.fps}
          width={1080}
          height={1920}
          defaultProps={{ shortId: s.id }}
        />
      ))}
    </>
  );
};
