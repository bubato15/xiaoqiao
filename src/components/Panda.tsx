import Image from "next/image";

export type PandaMood = "happy" | "wave" | "listen" | "cheer" | "encourage";

/**
 * XiaoQiao, the baby panda mascot. Purely decorative unless a label is given.
 * Art: Gemini-drawn PNGs with transparent backgrounds in public/xiaoqiao/<mood>.webp (about 0.8 wide per 1 tall).
 * `size` is the box height in px; the art keeps its own width inside a square-ish box so layouts stay put.
 */
export function Panda({
  mood = "happy",
  size = 120,
  label,
  className = "",
  preload = false,
}: {
  mood?: PandaMood;
  size?: number;
  label?: string;
  className?: string;
  preload?: boolean;
}) {
  const motion = mood === "cheer" ? "panda-cheer" : mood === "wave" ? "panda-wave panda-idle" : "panda-idle";

  return (
    <Image
      src={`/xiaoqiao/${mood}.webp`}
      width={size}
      height={size}
      alt={label ?? ""}
      aria-hidden={label ? undefined : true}
      preload={preload}
      draggable={false}
      className={`shrink-0 object-contain select-none ${motion} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
