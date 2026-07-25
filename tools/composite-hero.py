#!/usr/bin/env python3
"""
Composite an app screenshot into the green-screen phone plate.

    python3 tools/composite-hero.py [screenshot.png]

Inputs
    screenshots/mobile_app_hand.png        the chroma-key plate (hand + telescope)
    screenshots/mobile_companion_phone.png the screenshot to place, by default

Output
    screenshots/mobile_hero_composite.png  full resolution
    screenshots/mobile_hero_composite.jpg  1800px wide, what the page loads

Re-run this whenever the app screenshot changes. Requires pillow + numpy.

Three things here are less obvious than they look, and each one was a visible
bug before it was fixed:

  1. TWO keys, not one. A tight key finds the screen corners reliably. A looser
     key is needed to catch the antialiased rim, which otherwise survives as a
     bright green halo around the screen.

  2. The loose key is SPATIALLY GATED to the area around the screen. Applied
     globally it also matches shadowed skin and punches black speckles into
     the hand.

  3. The loose key has a BRIGHTNESS FLOOR. The rim is bright green; the shadow
     where the thumb meets the phone edge is not. Without the floor that shadow
     gets keyed too and leaves a dark blob on the hand.
"""
import sys
import pathlib
import numpy as np
from PIL import Image, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parent.parent
PLATE = ROOT / "screenshots" / "mobile_app_hand.png"
SHOT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else \
    ROOT / "screenshots" / "mobile_companion_phone.png"
OUT_PNG = ROOT / "screenshots" / "mobile_hero_composite.png"
OUT_JPG = ROOT / "screenshots" / "mobile_hero_composite.jpg"

for p in (PLATE, SHOT):
    if not p.exists():
        sys.exit("missing input: %s" % p)

plate = Image.open(PLATE).convert("RGB")
W, H = plate.size
a = np.asarray(plate).astype(int)
r, g, b = a[..., 0], a[..., 1], a[..., 2]

# 1 · tight key — confident green only, used to locate the screen
tight = (g > 100) & (g > r * 1.4) & (g > b * 1.4)
if not tight.any():
    sys.exit("no green screen detected in %s" % PLATE.name)

# 2 · spatial gate — confine the loose pass to the neighbourhood of the screen
gate = np.asarray(
    Image.fromarray((tight * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(41))
) > 0

# 3 · loose key — catches the rim, with a brightness floor to spare skin shadow
loose = (g > 90) & (g > r * 1.15) & (g > b * 1.15) & gate
key = tight | loose

# Screen corners: extremes of (x+y) and (x-y) give the corners of a rotated rect.
ys, xs = np.nonzero(tight)
s, d = xs + ys, xs - ys
tl = (int(xs[s.argmin()]), int(ys[s.argmin()]))
br = (int(xs[s.argmax()]), int(ys[s.argmax()]))
tr = (int(xs[d.argmax()]), int(ys[d.argmax()]))
bl = (int(xs[d.argmin()]), int(ys[d.argmin()]))


def find_coeffs(dst, src):
    """Perspective coefficients mapping dst -> src.

    PIL samples the SOURCE for every OUTPUT pixel, so the transform has to be
    expressed output->input. That is why dst is the first argument.
    """
    M = []
    for (dx, dy), (sx, sy) in zip(dst, src):
        M.append([dx, dy, 1, 0, 0, 0, -sx * dx, -sx * dy])
        M.append([0, 0, 0, dx, dy, 1, -sy * dx, -sy * dy])
    A = np.array(M, dtype=float)
    B = np.array(src, dtype=float).reshape(8)
    return np.linalg.solve(A.T @ A, A.T @ B)


cx = (tl[0] + tr[0] + br[0] + bl[0]) / 4.0
cy = (tl[1] + tr[1] + br[1] + bl[1]) / 4.0


def grow(p, px=4):
    """Push a corner outward from the centre, so the warped screenshot extends
    under the rim rather than stopping short of it."""
    vx, vy = p[0] - cx, p[1] - cy
    L = (vx * vx + vy * vy) ** 0.5
    return (p[0] + vx / L * px, p[1] + vy / L * px)


shot = Image.open(SHOT).convert("RGB")
sw, sh = shot.size
coeffs = find_coeffs([grow(tl), grow(tr), grow(br), grow(bl)],
                     [(0, 0), (sw, 0), (sw, sh), (0, sh)])
warped = shot.transform((W, H), Image.PERSPECTIVE, coeffs, Image.BICUBIC)

mask = Image.fromarray((key * 255).astype(np.uint8))
mask = (mask.filter(ImageFilter.MedianFilter(5))
            .filter(ImageFilter.MaxFilter(5))
            .filter(ImageFilter.GaussianBlur(1.0)))
out = Image.composite(warped, plate, mask)

# De-spill: the green screen threw green light onto the fingers. In a ring just
# outside the screen, pull the green channel back toward the r/b average.
o = np.asarray(out).astype(float)
ring = np.asarray(
    mask.filter(ImageFilter.MaxFilter(21)).filter(ImageFilter.GaussianBlur(18))
).astype(float) / 255.0
ring = np.clip(ring - np.asarray(mask).astype(float) / 255.0, 0, 1)
rb = (o[..., 0] + o[..., 2]) / 2.0
o[..., 1] -= np.clip(o[..., 1] - rb, 0, None) * ring
out = Image.fromarray(np.clip(o, 0, 255).astype(np.uint8))

out.save(OUT_PNG)
out.resize((1800, int(1800 * H / W)), Image.LANCZOS).save(OUT_JPG, quality=88)

f = np.asarray(out).astype(int)
residual = ((f[..., 1] > 80) & (f[..., 1] > f[..., 0] * 1.25)
            & (f[..., 1] > f[..., 2] * 1.25)).mean()

qw = ((tr[0] - tl[0]) ** 2 + (tr[1] - tl[1]) ** 2) ** 0.5
qh = ((bl[0] - tl[0]) ** 2 + (bl[1] - tl[1]) ** 2) ** 0.5
print("plate      %s  %dx%d" % (PLATE.name, W, H))
print("screenshot %s  %dx%d  aspect %.4f" % (SHOT.name, sw, sh, sw / sh))
print("screen quad          %.0fx%.0f  aspect %.4f" % (qw, qh, qw / qh))
print("keyed                %.2f%% of frame" % (100 * key.mean()))
print("residual green       %.4f%%  (should be 0)" % (100 * residual))
if abs((sw / sh) - (qw / qh)) > 0.05:
    print("note: aspect mismatch of %.1f%% — the warp stretches slightly"
          % (100 * abs((sw / sh) / (qw / qh) - 1)))
print("wrote %s and %s" % (OUT_PNG.name, OUT_JPG.name))
