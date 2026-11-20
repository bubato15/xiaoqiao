/**
 * SVG filters shared by every drawing on the page, rendered once in the root layout.
 * xq-brush roughens stroke edges like a brush on rice paper; xq-wash softens shapes into ink wash.
 * Regions use userSpaceOnUse: with the default bounding-box units a flat line (tone 1) has zero
 * height, so its filter region is empty and the stroke disappears.
 */
export function InkDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        <filter id="xq-brush" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
        </filter>
        <filter id="xq-wash" filterUnits="userSpaceOnUse" x="-10%" y="-50%" width="120%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="3" seed="8" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" result="moved" />
          <feGaussianBlur in="moved" stdDeviation="1.2" />
        </filter>
      </defs>
    </svg>
  );
}
