"use client";

import type { ReactNode } from "react";
import { useWindowManager } from "@/controllers/useWindowManager";
import { profile } from "@/models/profile";
import { apps } from "./components/HomeScreen";
import PixelIcon from "./components/PixelIcon";

const dockBg: Record<string, string> = {
  about: "bg-sun",
  projects: "bg-leaf",
  skills: "bg-blush",
  resume: "bg-cream",
  contact: "bg-sky",
};
const dockButton =
  "w-12 h-12 border-2 border-edge rounded-[14px] text-[24px] cursor-pointer shadow-2 text-ink active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";
const quickLink =
  "flex-none no-underline text-ink text-[13px] border-2 border-edge rounded-[6px] bg-sun px-2.5 py-[3px] hover:bg-white";

/** The desktop chrome (status bar, taskbar, dock, tooltip) around the server-rendered windows. */
export default function Desktop({ children }: { children: ReactNode }) {
  const { tasks, topId, clock, tipRef, focusTask } = useWindowManager();

  return (
    <>
      <div
        aria-hidden="true"
        className="statusbar hidden phone:flex fixed top-0 inset-x-0 h-[calc(32px+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] px-[18px] items-center justify-between font-pixel text-[14px] z-[10001]"
      >
        <span>{clock}</span>
        <span className="flex items-center gap-1">
          <PixelIcon name="dot" />
          open to work
        </span>
      </div>

      <main
        id="desktop"
        className="desktop absolute inset-x-0 top-0 bottom-12 phone:top-[calc(32px+env(safe-area-inset-top))] phone:bottom-[calc(88px+env(safe-area-inset-bottom))] phone:overflow-y-auto phone:px-4 phone:pt-2 phone:pb-10"
      >
        {children}
      </main>

      <div className="taskbar fixed inset-x-0 bottom-0 h-12 bg-[rgba(255,253,247,.94)] border-t-2 border-edge flex items-center gap-2 px-2.5 z-[9999] phone:hidden">
        <button
          data-open="about"
          aria-label="open about"
          className="font-pixel text-[15px] border-2 border-edge rounded-[8px] bg-bar2 text-ink px-3 py-1 cursor-pointer shadow-2"
        >
          <PixelIcon name="flower" className="mr-1 align-[-3px]" />
          {profile.shortName.toLowerCase()}
        </button>
        <div role="group" aria-label="open windows" className="tasks flex gap-1.5 flex-1 overflow-x-auto p-1">
          {tasks.map((task) => (
            <button
              key={task.id}
              aria-pressed={task.id === topId}
              onClick={() => focusTask(task.id)}
              className={`font-pixel text-[13px] border-2 rounded-[6px] px-2.5 py-[3px] cursor-pointer whitespace-nowrap coarse:px-3 coarse:py-1.5 ${
                task.id === topId
                  ? "border-edge bg-lilac text-ink shadow-2"
                  : "border-dashed border-soft/45 bg-white/50 text-soft hover:border-solid hover:border-edge hover:bg-white hover:text-ink"
              }`}
            >
              {task.title}
            </button>
          ))}
        </div>
        <a className={quickLink} href={`mailto:${profile.email}`}>
          <PixelIcon name="envelope" className="mr-1 align-[-3px]" />
          <span className="narrow:hidden">{profile.email}</span>
          <span className="hidden narrow:inline">email me</span>
        </a>
        <a className={quickLink} href={profile.github.url} target="_blank" rel="noopener">
          GitHub
        </a>
        <span aria-hidden="true" className="font-pixel text-[14px]">
          {clock}
        </span>
      </div>

      <nav
        aria-label="dock"
        className="dock hidden phone:flex fixed left-3 right-3 bottom-[calc(12px+env(safe-area-inset-bottom))] h-[72px] bg-[rgba(255,253,247,.9)] backdrop-blur-[10px] border-2 border-edge rounded-[22px] shadow-4 justify-around items-center z-[10001]"
      >
        <button data-home aria-label="home" className={`${dockButton} bg-white`}>
          <PixelIcon name="home" size={32} />
        </button>
        {apps.map((app) => (
          <button key={app.id} data-open={app.id} aria-label={app.id} className={`${dockButton} ${dockBg[app.id]}`}>
            <PixelIcon name={app.icon} size={32} />
          </button>
        ))}
      </nav>

      <div
        ref={tipRef}
        aria-hidden="true"
        className="fixed z-[20000] pointer-events-none font-pixel text-[13px] text-white bg-ink px-2.5 py-1 rounded-[7px] shadow-[3px_3px_0_var(--color-bar2)] whitespace-nowrap opacity-0 translate-y-1 scale-70 origin-[var(--ox,50%)_100%] data-show:opacity-100 data-show:translate-y-0 data-show:scale-100 data-below:origin-[var(--ox,50%)_0] after:content-[''] after:absolute after:left-[var(--ax,50%)] after:top-full after:-ml-1.5 after:border-6 after:border-transparent after:border-t-ink data-below:after:top-auto data-below:after:bottom-full data-below:after:border-t-transparent data-below:after:border-b-ink motion-safe:[transition:opacity_.12s,translate_.22s_cubic-bezier(.34,1.56,.64,1),scale_.22s_cubic-bezier(.34,1.56,.64,1)]"
      />
    </>
  );
}
