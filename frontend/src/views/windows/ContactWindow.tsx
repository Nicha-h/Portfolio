import type { ComponentType, SVGProps } from "react";
import { GithubSolid, Linkedin2Solid } from "pixelarticons/react";
import { profile } from "@/models/profile";
import PixelIcon from "../components/PixelIcon";
import type { PixelIconName } from "../components/pixelIcons";
import Window from "../components/Window";
import { WindowHeading } from "../components/ui";

// Own icons are PixelIconName; brand logos come from pixelarticons (24x24 grid)
type BrandIcon = ComponentType<SVGProps<SVGSVGElement>>;

const links: { icon: PixelIconName | BrandIcon; color?: string; href: string; label: string; external: boolean }[] = [
  { icon: "envelope", href: `mailto:${profile.email}`, label: profile.email, external: false },
  { icon: GithubSolid, color: "text-ink", href: profile.github.url, label: profile.github.label, external: true },
  { icon: Linkedin2Solid, color: "text-[#0a66c2]", href: profile.linkedin.url, label: profile.linkedin.label, external: true },
];

export default function ContactWindow() {
  return (
    <Window id="contact" taskTitle="contact" barLabel="contact" closeLabel="close contact" theme="alt">
      <WindowHeading>say hi!</WindowHeading>
      <div className="grid gap-2 mt-3">
        {links.map(({ icon: Icon, color, href, label, external }) => (
          <a
            key={href}
            href={href}
            {...(external && { target: "_blank", rel: "noopener" })}
            className="flex items-center gap-1.5 no-underline text-ink border-2 border-edge rounded-[8px] px-3 py-2.5 bg-white shadow-3 hover:bg-sun"
          >
            <span className="inline-flex w-6 h-6 items-center justify-center shrink-0">
              {typeof Icon === "string" ? (
                <PixelIcon name={Icon} />
              ) : (
                <Icon width={24} height={24} shapeRendering="crispEdges" aria-hidden="true" focusable="false" className={color} />
              )}
            </span>
            {label}
          </a>
        ))}
      </div>
    </Window>
  );
}
