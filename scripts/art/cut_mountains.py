"""Crop the Gemini shan shui banner below its extra sun and save it on its own cream paper.

The page fades its edges with a CSS mask (.ink-mountains in globals.css), so no transparency is needed.
"""
import os
import cv2

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "..", "public", "illustrations")
os.makedirs(OUT, exist_ok=True)

img = cv2.imread(os.path.join(HERE, "gemini", "mountains.png"))
H, W = img.shape[:2]
# Gemini drew two suns; keep the band below the upper one, down to the foot of the hills.
img = img[int(H * 0.34):int(H * 0.97)]
img = cv2.resize(img, (1600, round(1600 * img.shape[0] / W)), interpolation=cv2.INTER_AREA)
path = os.path.join(OUT, "shanshui.webp")
cv2.imwrite(path, img, [cv2.IMWRITE_WEBP_QUALITY, 82])
print(path, img.shape, os.path.getsize(path))
