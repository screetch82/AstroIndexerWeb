import os
import gen_shorts as g


def test_beat_frames_rounds_padded_duration():
    # (0.3 + 2.0 + 0.5) * 30 = 84
    assert g.beat_frames(0.3, 2.0, 0.5, 30) == 84


def test_window_ok_accepts_30s_rejects_short_and_long():
    fps = 30
    assert g.window_ok(30 * fps, fps) is True
    assert g.window_ok(27 * fps, fps) is False   # too short
    assert g.window_ok(40 * fps, fps) is False   # too long


def test_pick_music_prefers_per_short_override(tmp_path):
    (tmp_path / "shorts_bed.wav").write_bytes(b"x")
    assert g.pick_music("gallery", str(tmp_path)) == "music/shorts_bed.wav"
    (tmp_path / "shorts_bed_gallery.wav").write_bytes(b"x")
    assert g.pick_music("gallery", str(tmp_path)) == "music/shorts_bed_gallery.wav"


def test_every_short_has_hook_beats_cta_and_traceable_shot():
    ids = {s["id"] for s in g.SHORTS}
    assert ids == {"gallery", "catalogue", "quality",
                   "intelligence", "skyatlas", "planner"}
    for s in g.SHORTS:
        kinds = [seg[0] for seg in s["segments"]]     # (kind, id, region, caption, text)
        assert kinds[0] == "hook" and kinds[-1] == "cta"
        assert kinds.count("beat") >= 2
        assert s["shot"].startswith("shots/") and s["shot"].endswith(".jpg")
