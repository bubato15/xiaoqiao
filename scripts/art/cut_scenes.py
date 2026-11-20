"""Cut the Gemini scenario grid into eight rounded panels with transparent corners."""
import os
import cv2
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "..", "public", "scenes")
os.makedirs(OUT, exist_ok=True)
# Usage: python cut_scenes.py <grid>; each grid is 4x2 panels in reading order.
import sys
GRIDS = {
    "scenes": ["tea", "friend", "market", "taxi", "way", "hotel", "doctor", "job"],
    "scenes2": ["family", "weather", "phone", "hobby", "sport", "rent", "haircut", "restaurant"],
    "scenes3": ["clothes", "cook", "complain", "train", "trip", "lost", "airport", "school"],
    "scenes4": ["library", "bank", "meeting", "deal", "vietnam", "movie", "news", "debate"],
    "scenes5": ["waiter", "courier", "pharmacy", "teachvi", "guide", "vet", "farm", "factory"],
    "scenes6": ["nurse", "livestream", "coder", "realestate", "design", "consult", "reporter", "pitch"],
    "scenes7": ["flight", "nails", "frontdesk", "chef", "coach", "teller", "recruit", "customs"],
}
GRID = sys.argv[1] if len(sys.argv) > 1 else "scenes"
IDS = GRIDS[GRID]

img = cv2.imread(os.path.join(HERE, "gemini", GRID + ".png"))
H, W = img.shape[:2]
bg = np.median(img[:20, :].reshape(-1, 3), axis=0)
diff = np.abs(img.astype(np.int16) - bg).sum(2)
mask = (diff > 18).astype(np.uint8)
mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((15, 15), np.uint8))
n, labels, stats, _ = cv2.connectedComponentsWithStats(mask)
panels = sorted(range(1, n), key=lambda i: -stats[i, cv2.CC_STAT_AREA])[:8]
# Reading order: rows by y, then x.
panels.sort(key=lambda i: (round(stats[i, cv2.CC_STAT_TOP] / (H / 4)), stats[i, cv2.CC_STAT_LEFT]))

boxes = []
for i in panels:
    x, y, w, h = (int(stats[i, k]) for k in (cv2.CC_STAT_LEFT, cv2.CC_STAT_TOP, cv2.CC_STAT_WIDTH, cv2.CC_STAT_HEIGHT))
    # Trim thin leaks: keep columns and rows that are mostly panel.
    own = labels[y:y + h, x:x + w] == i
    cols = np.where(own.mean(0) > 0.6)[0]
    rows = np.where(own.mean(1) > 0.6)[0]
    boxes.append([x + cols[0], y + rows[0], cols[-1] - cols[0] + 1, rows[-1] - rows[0] + 1])
# The panels form a regular grid: use the median size, the row's median top and the column's median left.
b = np.array(boxes)
mw, mh = int(np.median(b[:, 2])), int(np.median(b[:, 3]))
for k in range(8):
    b[k, 1] = int(np.median(b[k // 4 * 4:k // 4 * 4 + 4, 1]))
    b[k, 0] = int(np.median(b[k % 4::4, 0]))

for sid, (x, y, _, _) in zip(IDS, b):
    inset = 6
    x, y, w, h = x + inset, y + inset, mw - 2 * inset, mh - 2 * inset
    crop = img[y:y + h, x:x + w].copy()
    if sid == "tea":
        # Paint over the stray "ONLY" lettering on the menu board with the board colour.
        board = crop[int(h * 0.05):int(h * 0.27), int(w * 0.22):int(w * 0.78)]
        dark = np.median(board.reshape(-1, 3)[board.reshape(-1, 3).sum(1) < 200], axis=0)
        cv2.rectangle(crop, (int(w * 0.37), int(h * 0.06)), (int(w * 0.6), int(h * 0.12)), dark.tolist(), -1)
    # Alpha: a clean rounded rectangle matching the drawn panel corners.
    r = int(w * 0.085)
    alpha = np.zeros((h, w), np.uint8)
    cv2.rectangle(alpha, (r, 0), (w - 1 - r, h - 1), 255, -1)
    cv2.rectangle(alpha, (0, r), (w - 1, h - 1 - r), 255, -1)
    for cx, cy in ((r, r), (w - 1 - r, r), (r, h - 1 - r), (w - 1 - r, h - 1 - r)):
        cv2.circle(alpha, (cx, cy), r, 255, -1, lineType=cv2.LINE_AA)
    rgba = np.dstack([crop, alpha])
    rgba = cv2.resize(rgba, (480, round(480 * h / w)), interpolation=cv2.INTER_AREA)
    cv2.imwrite(os.path.join(OUT, f"{sid}.webp"), rgba, [cv2.IMWRITE_WEBP_QUALITY, 88])
    print(sid, (x, y, w, h), rgba.shape[:2])
