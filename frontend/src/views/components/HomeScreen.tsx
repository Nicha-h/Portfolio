import { projects } from "@/models/portfolio";
import { profile } from "@/models/profile";
import PixelIcon from "./PixelIcon";
import type { PixelIconName } from "./pixelIcons";

/** Home-screen cards; only shown on phones */
const widget =
  "widget hidden phone:block relative bg-win border-2 border-edge rounded-[18px] shadow-5 text-ink no-underline font-normal";

export const apps: { id: string; label: string; icon: PixelIconName; bg: string }[] = [
  { id: "about", label: "about.txt", icon: "smile", bg: "bg-sun" },
  { id: "projects", label: "projects", icon: "folder", bg: "bg-leaf" },
  { id: "skills", label: "skills", icon: "toolbox", bg: "bg-blush" },
  { id: "resume", label: "resume", icon: "document", bg: "bg-cream" },
  { id: "contact", label: "contact", icon: "envelope", bg: "bg-sky" },
];

export function WelcomeWidgets() {
  return (
    <>
      <a className={`${widget} px-[18px] py-4 mt-1.5 mb-[22px]`} href="#about" data-open="about">
        <span className="block font-pixel text-[12px] text-soft">
          <PixelIcon name="flower" className="mr-1 align-[-3px]" />
          welcome
        </span>
        <span className="block font-pixel font-semibold text-[28px] leading-[1.05] mt-1 mb-0.5">
          hi, i&apos;m {profile.shortName} <PixelIcon name="smile" size={32} className="align-[-5px]" />
        </span>
        <span className="block font-bold text-[13px] text-soft mb-1.5">
          {profile.name} · CS @ {profile.universityShort}
        </span>
        <span className="block text-[14px]">
          Backend &amp; full-stack developer, open to internships. Tap an app to look around.
        </span>
      </a>
      <button
        type="button"
        data-open="resume"
        className={`${widget} w-full font-pixel text-[15px] text-left cursor-pointer -mt-2 mb-[22px] px-[18px] py-3`}
      >
        <PixelIcon name="document" className="mr-1 align-[-3px]" />read my full resume <span aria-hidden="true">›</span>
      </button>
    </>
  );
}

export function AppIcons() {
  return (
    <nav
      aria-label="apps"
      className="icons absolute left-[18px] top-[18px] grid gap-[14px] tablet:left-3 tablet:top-[14px] tablet:gap-[10px] phone:static phone:grid-cols-5 phone:gap-x-1 phone:gap-y-[18px]"
    >
      {apps.map((app) => (
        <button
          key={app.id}
          data-open={app.id}
          className="w-[86px] flex flex-col items-center gap-1 cursor-pointer font-pixel text-[13px] text-ink px-0.5 py-1.5 rounded-[8px] hover:bg-white/50 focus-visible:bg-white/50 coarse:py-2 tablet:w-[82px] phone:w-auto phone:text-[12px]"
        >
          <span
            aria-hidden="true"
            className={`w-12 h-12 border-2 border-edge rounded-[10px] grid place-items-center text-[24px] shadow-3 ${app.bg} phone:w-14 phone:h-14 phone:rounded-[16px] phone:text-[26px]`}
          >
            <PixelIcon name={app.icon} size={32} />
          </span>
          {app.label}
        </button>
      ))}
    </nav>
  );
}

export function RecentProjectsWidget() {
  return (
    <section aria-labelledby="recent-h" className={`${widget} px-[18px] py-4 mt-[26px]`}>
      <h2 id="recent-h" className="font-pixel text-[12px] font-normal text-soft mb-2">
        <PixelIcon name="flower" className="mr-1 align-[-3px]" />recent projects
      </h2>
      {projects.map((project) => (
        <button
          key={project.id}
          data-open={project.id}
          className="leading-[inherit] flex w-full justify-between items-center gap-2.5 text-left border-t-2 border-dashed border-dash first-of-type:border-t-0 py-2.5 px-0.5 text-ink cursor-pointer"
        >
          <span>
            <b className="block font-pixel text-[16px] font-semibold">{project.recent.name}</b>
            <small className="text-soft text-[12.5px]">{project.recent.summary}</small>
          </span>
          <span aria-hidden="true" className="font-pixel text-[18px]">
            ›
          </span>
        </button>
      ))}
    </section>
  );
}
