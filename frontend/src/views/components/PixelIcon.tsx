import { palette, pixelIcons, type PixelIconName } from "./pixelIcons";

// Merge each row's same-colour pixels into one rect so the SVG stays small
function toRects(rows: string[]) {
  const rects: { x: number; y: number; w: number; fill: string }[] = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; ) {
      const ch = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === ch) end++;
      if (ch !== ".") rects.push({ x, y, w: end - x, fill: palette[ch] });
      x = end;
    }
  });
  return rects;
}

const cache = new Map<PixelIconName, ReturnType<typeof toRects>>();

interface PixelIconProps {
  name: PixelIconName;
  /** Rendered size in px; keep to multiples of 16 (or 16 itself) so pixels stay crisp */
  size?: number;
  className?: string;
}

/** Decorative 16x16 pixel-art icon */
export default function PixelIcon({ name, size = 16, className = "" }: PixelIconProps) {
  if (!cache.has(name)) cache.set(name, toRects(pixelIcons[name]));
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={`inline-block shrink-0 ${className}`}
    >
      {cache.get(name)!.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  );
}
