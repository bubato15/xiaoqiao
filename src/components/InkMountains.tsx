import Image from "next/image";

/**
 * Shan shui banner: pastel misty hills, bamboo, a pagoda and a soft sun.
 * Gemini-drawn art on its own cream paper. The edges fade out with a CSS mask; on light paper it multiplies
 * into the page texture, on dark paper it reads as a lit scroll.
 */
export function InkMountains({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/illustrations/shanshui.webp"
      width={1600}
      height={562}
      alt=""
      aria-hidden
      sizes="100vw"
      className={`ink-mountains block h-auto w-full select-none ${className}`}
      draggable={false}
    />
  );
}
