"""Key out the green background of the Gemini panda sheet and cut the bottom row into five moods."""
import os
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "..", "public", "xiaoqiao")
os.makedirs(OUT, exist_ok=True)
MOODS = ["happy", "wave", "listen", "cheer", "encourage"]

img = np.asarray(Image.open(os.path.join(HERE, "gemini", "panda.png")).convert("RGB")).astype(np.float32)
H, W, _ = img.shape
r, g, b = img[..., 0], img[..., 1], img[..., 2]
green = g - np.maximum(r, b)
# Pure green background has green ~ 255; the mint belly stays under ~40.
alpha = np.clip(1 - (green - 50) / 110, 0, 1)
# Despill: pull green down to the other channels on soft edges.
spill = alpha < 0.999
g2 = np.where(spill, np.minimum(g, np.maximum(r, b) + 10), g)
rgba = np.dstack([r, g2, b, alpha * 255]).clip(0, 255).astype(np.uint8)

# Bottom row only: the top row is a faded duplicate. Keep connected blobs that reach below 30% height.
import cv2
top = int(H * 0.2)
raw = (alpha[top:] > 0.5).astype(np.uint8)
n, labels, stats, _ = cv2.connectedComponentsWithStats(raw, connectivity=8)
keep = [i for i in range(1, n)
        if stats[i, cv2.CC_STAT_TOP] + stats[i, cv2.CC_STAT_HEIGHT] + top > H * 0.3 and stats[i, cv2.CC_STAT_AREA] > 50]
mask = np.isin(labels, keep)
rgba[:top, ..., 3] = 0
# Keep only pixels close to the kept blobs, so faint leftovers of the top row disappear.
near = cv2.dilate(mask.astype(np.uint8), np.ones((7, 7), np.uint8)) > 0
rgba[top:, ..., 3] = np.where(near, rgba[top:, ..., 3], 0)
cols = mask.sum(0) > 2
segs, start = [], None
for x, on in enumerate(list(cols) + [False]):
    if on and start is None:
        start = x
    elif not on and start is not None:
        segs.append([start, x])
        start = None
# Merge small pieces (stars) into the nearest big neighbour.
big = [s for s in segs if s[1] - s[0] > W * 0.06]
for s in segs:
    if s in big:
        continue
    near = min(big, key=lambda t: min(abs(t[0] - s[1]), abs(s[0] - t[1])))
    near[0], near[1] = min(near[0], s[0]), max(near[1], s[1])
assert len(big) == 5, big

for mood, (x0, x1) in zip(MOODS, big):
    m = mask[:, x0:x1]
    rows = np.where(m.any(1))[0]
    y0, y1 = top + rows[0], top + rows[-1] + 1
    pad = 12
    crop = Image.fromarray(rgba[max(y0 - pad, 0):y1 + pad, max(x0 - pad, 0):x1 + pad])
    crop.thumbnail((512, 512), Image.LANCZOS)
    crop.save(os.path.join(OUT, f"{mood}.webp"), "WEBP", quality=90, method=6)
    print(mood, crop.size)
