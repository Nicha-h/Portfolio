import type { ReactNode } from "react";
import PixelIcon from "./PixelIcon";
import type { PixelIconName } from "./pixelIcons";

/** Pixel-font section heading used inside windows */
export function WindowHeading({ className = "text-[20px] mb-1", children }: { className?: string; children: ReactNode }) {
  return <h2 className={`font-pixel font-semibold ${className}`}>{children}</h2>;
}

export function Badge({ icon, children }: { icon: PixelIconName; children: ReactNode }) {
  return (
    <span className="inline-block font-pixel text-[13px] bg-sun border-2 border-edge rounded-[6px] px-2 py-px my-1.5 [&_a]:text-ink">
      <PixelIcon name={icon} className="mr-1 align-[-3px]" />
      {children}
    </span>
  );
}

export function Bullets({ className = "my-2", items }: { className?: string; items: ReactNode[] }) {
  return (
    <ul className={`list-disc pl-[18px] ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="my-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Chips({ items, label, className = "my-2" }: { items: string[]; label?: string; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label={label}>
      {items.map((item) => (
        <li key={item} className="text-[12px] font-bold border-2 border-edge rounded-[6px] px-[7px] py-px bg-chip">
          {item}
        </li>
      ))}
    </ul>
  );
}
