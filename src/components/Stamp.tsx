/** A red seal that "presses" onto the page; used to celebrate a fully correct reading. */
export function Stamp({ text, size = 64, label }: { text: string; size?: number; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      lang="zh-CN"
      className="stamp han inline-grid place-items-center border-[3px] border-seal font-bold text-seal"
      style={{ width: size, height: size, fontSize: size * 0.5, borderRadius: "4px 7px 3px 6px" }}
    >
      {text}
    </span>
  );
}
