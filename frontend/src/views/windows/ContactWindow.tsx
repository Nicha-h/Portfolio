import { profile } from "@/models/profile";
import PixelIcon from "../components/PixelIcon";
import type { PixelIconName } from "../components/pixelIcons";
import Window from "../components/Window";
import { WindowHeading } from "../components/ui";

const links: { icon: PixelIconName; href: string; label: string; external: boolean }[] = [
  { icon: "envelope", href: `mailto:${profile.email}`, label: profile.email, external: false },
  { icon: "octopus", href: profile.github.url, label: profile.github.label, external: true },
  { icon: "briefcase", href: profile.linkedin.url, label: profile.linkedin.label, external: true },
];

export default function ContactWindow() {
  return (
    <Window id="contact" taskTitle="contact" barLabel="contact" closeLabel="close contact" theme="alt">
      <WindowHeading>say hi!</WindowHeading>
      <div className="grid gap-2 mt-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            {...(link.external && { target: "_blank", rel: "noopener" })}
            className="block no-underline text-ink border-2 border-edge rounded-[8px] px-3 py-2.5 bg-white shadow-3 hover:bg-sun"
          >
            <PixelIcon name={link.icon} className="mr-1.5 align-[-3px]" />
            {link.label}
          </a>
        ))}
      </div>
    </Window>
  );
}
