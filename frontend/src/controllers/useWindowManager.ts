"use client";

import { useEffect, useRef, useState } from "react";

export interface Task {
  id: string;
  title: string;
}

type Mode = "phone" | "tablet" | "desktop";

export const PHONE_QUERY = "(max-width: 760px), (max-height: 500px) and (pointer: coarse)";
const SKILLS_VIEW_KEY = "nicha-skills-view";

/**
 * Drives the desktop: opening/closing/dragging windows, the default layout per screen size,
 * the taskbar, the skill tooltips and the clock. Windows are server-rendered `.win` elements;
 * this hook works on them directly so their content stays in the initial HTML.
 */
export function useWindowManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [topId, setTopId] = useState<string | null>(null);
  const [clock, setClock] = useState("");
  const tipRef = useRef<HTMLDivElement>(null);
  const focusTaskRef = useRef<(id: string) => void>(() => {});

  useEffect(() => {
    const tip = tipRef.current!;
    const ac = new AbortController();
    const { signal } = ac;

    const phoneMQ = matchMedia(PHONE_QUERY);
    const modeOf = (): Mode => (phoneMQ.matches ? "phone" : innerWidth <= 1100 ? "tablet" : "desktop");
    let mode: Mode | null = null;
    let z = 10;
    let cascade = 0;
    let topWin: HTMLElement | null = null;
    let userArranged = false;
    const openers = new WeakMap<HTMLElement, Element | null>();
    const wins = [...document.querySelectorAll<HTMLElement>(".win")];
    const $ = (id: string) => document.getElementById(id) as HTMLElement;
    const contentOf = (w: HTMLElement) => w.querySelector<HTMLElement>(".content")!;
    const isOpen = (w: HTMLElement) => w.dataset.state === "open";
    const setOpen = (w: HTMLElement, open: boolean) => {
      if (open) w.dataset.state = "open";
      else delete w.dataset.state;
    };
    const desk = $("desktop");
    // the desktop area in page px; on big screens the page is CSS-zoomed (globals.css), so this is smaller than innerWidth
    const area = () => {
      const W = desk.offsetWidth;
      return { W, H: desk.offsetHeight, left: W <= 1100 ? 104 : 120 };
    };
    // pointer events and getBoundingClientRect report screen px; divide by this to get page px
    const zoom = () => desk.getBoundingClientRect().width / desk.offsetWidth || 1;
    const fits = (w: HTMLElement, l: number, t: number) => {
      const { W, H } = area();
      return l + w.offsetWidth <= W - 8 && t + w.offsetHeight <= H - 8;
    };

    // would window w at (l, t) overlap the open window with this id?
    const covers = (w: HTMLElement, l: number, t: number, id: string) => {
      const o = $(id);
      return (
        isOpen(o) &&
        l < o.offsetLeft + o.offsetWidth &&
        l + w.offsetWidth > o.offsetLeft &&
        t < o.offsetTop + o.offsetHeight &&
        t + w.offsetHeight > o.offsetTop
      );
    };

    function place(w: HTMLElement, l: number, t: number) {
      w.style.left = l + "px";
      w.style.top = t + "px";
    }
    function clamp(w: HTMLElement) {
      if (mode === "phone" || !isOpen(w)) return;
      const { W, H } = area();
      place(
        w,
        Math.max(0, Math.min(W - Math.min(w.offsetWidth, W), w.offsetLeft)),
        Math.max(0, Math.min(H - 60, w.offsetTop)),
      );
    }

    function renderTasks() {
      setTasks(wins.filter(isOpen).map((w) => ({ id: w.id, title: w.dataset.title ?? w.id })));
      setTopId(topWin?.id ?? null);
    }

    function front(w: HTMLElement) {
      w.style.zIndex = String(++z);
      if (w !== topWin) {
        topWin = w;
        renderTasks();
      }
    }

    // where a newly opened window should appear: project apps beside the folder, skills under about
    function placeNew(w: HTMLElement) {
      const { W, H, left } = area();
      const p = $("projects");
      const a = $("about");
      let spot: [number, number];
      if (w.id.startsWith("p-") && isOpen(p)) {
        // keep the folder's tiles visible: below the folder if there's room, otherwise shifted right
        const k = cascade++ % 4;
        const below: [number, number] = [p.offsetLeft, p.offsetTop + p.offsetHeight + 16];
        spot =
          fits(w, ...below) && !covers(w, ...below, "contact")
            ? [below[0] + k * 26, below[1]]
            : [
                Math.min(W - w.offsetWidth - 12, p.offsetLeft + 120 + k * 26),
                Math.min(H - w.offsetHeight - 12, p.offsetTop + 50 + k * 26),
              ];
      } else if (w.id === "skills" && isOpen(a) && fits(w, a.offsetLeft, a.offsetTop + a.offsetHeight + 18)) {
        spot = [a.offsetLeft, a.offsetTop + a.offsetHeight + 18];
      } else {
        const k = cascade++ % 5;
        spot = [Math.min(W - w.offsetWidth - 12, left + 60 + k * 30), Math.min(H - w.offsetHeight - 12, 30 + k * 28)];
      }
      place(w, Math.max(0, spot[0]), Math.max(8, spot[1]));
      w.dataset.placed = "1";
    }

    function open(id: string, fromUser = true) {
      const w = $(id);
      if (fromUser) {
        userArranged = true;
        openers.set(w, document.activeElement);
      }
      if (!isOpen(w)) {
        setOpen(w, true);
        if (mode !== "phone" && !w.dataset.placed) placeNew(w);
        renderTasks();
      }
      front(w);
      if (fromUser) contentOf(w).focus({ preventScroll: true });
    }
    function close(w: HTMLElement, restoreFocus = true) {
      if (!isOpen(w)) return;
      setOpen(w, false);
      if (topWin === w) topWin = null;
      renderTasks();
      const opener = openers.get(w);
      if (restoreFocus && opener instanceof HTMLElement && document.contains(opener) && opener.offsetParent !== null) {
        opener.focus({ preventScroll: true });
      }
    }

    // stack windows top to bottom, measuring each one; a window that would not fully fit above the
    // taskbar is left closed instead of overlapping (the taskbar email link covers contact)
    function stack(items: [id: string, x: number, width?: number][], top: number) {
      const { H } = area();
      const GAP = 18;
      let y = top;
      for (const [id, x, width] of items) {
        const w = $(id);
        w.style.width = width ? width + "px" : "";
        setOpen(w, true);
        if (y + w.offsetHeight > H - 10) {
          setOpen(w, false);
          w.style.width = "";
          break;
        }
        place(w, x, y);
        w.dataset.placed = "1";
        front(w);
        y += w.offsetHeight + GAP;
      }
    }

    // default arrangement for each screen size
    function arrange() {
      wins.forEach((w) => {
        setOpen(w, false);
        w.style.width = w.style.left = w.style.top = "";
        delete w.dataset.placed;
      });
      cascade = 0;
      topWin = null;
      if (mode === "phone") {
        renderTasks();
        return;
      }
      const { W, left } = area();
      if (mode === "desktop") {
        // two columns: about + skills on the left, projects + contact on the right
        // staggered tops look relaxed on tall screens; on short ones both columns move up together
        const bx = Math.min(620, W - 470);
        const desk = (topL: number, topR: number) => {
          wins.forEach((w) => setOpen(w, false));
          stack([["about", 150], ["skills", 150]], topL);
          stack([["projects", bx], ["contact", bx + 80, 340]], topR);
        };
        desk(40, 90);
        if (!isOpen($("contact"))) desk(24, 24);
      } else {
        const ww = Math.min(440, W - left - 24);
        if (W - left >= ww * 2 + 36) {
          // ipad landscape: side by side
          stack([["about", left, ww], ["skills", left, ww]], 16);
          stack([["projects", left + ww + 24, ww], ["contact", left + ww + 24, 320]], 16);
        } else {
          // ipad portrait: one column with a staggered x so it still feels like a desktop
          stack([["about", left, ww], ["projects", W - ww - 16, ww], ["contact", W - 336, 320]], 16);
        }
      }
      front($("about"));
      renderTasks();
    }

    // re-flow the default layout on resize/rotation until the visitor has arranged things themselves
    function onResize() {
      const m = modeOf();
      document.body.dataset.mode = m;
      if (m !== mode) {
        mode = m;
        userArranged = false;
        arrange();
      } else if (!userArranged) arrange();
      else wins.forEach(clamp);
    }

    focusTaskRef.current = (id) => {
      const w = $(id);
      front(w);
      contentOf(w).focus({ preventScroll: true });
    };

    document.querySelectorAll<HTMLElement>("[data-open]").forEach((b) =>
      b.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          open(b.dataset.open!);
        },
        { signal },
      ),
    );
    document.querySelectorAll<HTMLElement>("[data-close]").forEach((b) =>
      b.addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          userArranged = true;
          close(b.closest<HTMLElement>(".win")!);
        },
        { signal },
      ),
    );
    document.querySelectorAll<HTMLElement>("[data-back]").forEach((b) =>
      b.addEventListener(
        "click",
        (e) => {
          e.stopPropagation();
          close(b.closest<HTMLElement>(".win")!, false);
          open("projects");
        },
        { signal },
      ),
    );
    document
      .querySelector("[data-home]")
      ?.addEventListener("click", () => wins.forEach((w) => close(w, false)), { signal });
    wins.forEach((w) => w.addEventListener("pointerdown", () => front(w), { signal }));
    addEventListener(
      "keydown",
      (e) => {
        if (e.key !== "Escape") return;
        if (tipFor) {
          tipFor.blur();
          hideTip();
          return;
        }
        if (!topWin) return;
        close(topWin);
      },
      { signal },
    );

    // drag windows by their title bar (mouse, pen or finger) everywhere except phones
    document.querySelectorAll<HTMLElement>(".titlebar").forEach((bar) => {
      bar.addEventListener(
        "pointerdown",
        (e) => {
          if (mode === "phone" || (e.target as Element).closest("button")) return;
          const w = bar.parentElement!;
          const k = zoom();
          const sx = e.clientX / k - w.offsetLeft;
          const sy = e.clientY / k - w.offsetTop;
          bar.setPointerCapture(e.pointerId);
          bar.style.cursor = "grabbing";
          const move = (ev: PointerEvent) => {
            userArranged = true;
            hideTip();
            w.style.left = Math.max(-w.offsetWidth + 80, Math.min(innerWidth / k - 80, ev.clientX / k - sx)) + "px";
            w.style.top = Math.max(0, Math.min(innerHeight / k - 110, ev.clientY / k - sy)) + "px";
          };
          const up = () => {
            bar.removeEventListener("pointermove", move);
            bar.style.cursor = "";
          };
          bar.addEventListener("pointermove", move);
          bar.addEventListener("pointerup", up, { once: true });
          bar.addEventListener("pointercancel", up, { once: true });
        },
        { signal },
      );
    });

    let tipFor: HTMLElement | null = null;
    function showTip(el: HTMLElement) {
      tipFor = el;
      tip.textContent = el.dataset.tip ?? "";
      positionTip();
      requestAnimationFrame(() => (tip.dataset.show = ""));
    }
    function positionTip() {
      if (!tipFor) return;
      const k = zoom();
      const b = tipFor.getBoundingClientRect();
      const r = { left: b.left / k, top: b.top / k, bottom: b.bottom / k, width: b.width / k };
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const x = Math.max(8, Math.min(innerWidth / k - tw - 8, r.left + r.width / 2 - tw / 2));
      const below = r.top - th - 10 < 8;
      if (below) tip.dataset.below = "";
      else delete tip.dataset.below;
      tip.style.left = x + "px";
      tip.style.top = (below ? r.bottom + 10 : r.top - th - 10) + "px";
      // keep the arrow pointing at the logo even when the label is nudged away from a screen edge
      const ax = r.left + r.width / 2 - x;
      tip.style.setProperty("--ax", ax + "px");
      tip.style.setProperty("--ox", ax + "px");
    }
    function hideTip(el?: HTMLElement) {
      if (!el || el === tipFor) {
        delete tip.dataset.show;
        tipFor = null;
      }
    }
    wins.forEach((w) => w.addEventListener("animationend", positionTip, { signal }));

    // skills: logos or a plain list; the list stays findable with Ctrl+F (hidden="until-found")
    const logosView = $("skill-logos");
    const listView = $("skill-list");
    const segButtons = [...document.querySelectorAll<HTMLElement>("[data-view]")];
    function setView(v: "logos" | "list") {
      logosView.hidden = v === "list";
      if (v === "list") listView.removeAttribute("hidden");
      else listView.setAttribute("hidden", "until-found");
      segButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === v)));
      $("skill-hint").textContent = v === "list" ? "every skill as text" : "hover or tap a logo";
      hideTip();
      try {
        localStorage.setItem(SKILLS_VIEW_KEY, v);
      } catch {}
      // the list is taller than the logos: lift the window so it doesn't slide under the taskbar
      const w = $("skills");
      if (mode !== "phone" && isOpen(w)) {
        const { H } = area();
        if (w.offsetTop + w.offsetHeight > H - 8) {
          place(w, w.offsetLeft, Math.max(8, H - w.offsetHeight - 8));
          front(w);
        }
      }
    }
    // the list is server-rendered collapsed; from here on hidden="until-found" collapses it
    listView.setAttribute("hidden", "until-found");
    delete listView.dataset.collapsed;
    segButtons.forEach((b) =>
      b.addEventListener("click", () => setView(b.dataset.view as "logos" | "list"), { signal }),
    );
    listView.addEventListener("beforematch", () => setView("list"), { signal });
    try {
      if (localStorage.getItem(SKILLS_VIEW_KEY) === "list") setView("list");
    } catch {}

    // one tab stop per logo group; arrow keys, Home and End move between logos
    document.querySelectorAll<HTMLElement>("#skill-logos ul").forEach((list) => {
      const items = [...list.querySelectorAll<HTMLElement>("[data-tip]")];
      items.forEach((b, i) => (b.tabIndex = i ? -1 : 0));
      list.addEventListener(
        "keydown",
        (e) => {
          const i = items.indexOf(document.activeElement as HTMLElement);
          if (i < 0) return;
          const next = ({ ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: items.length - 1 } as Record<string, number>)[e.key];
          if (next === undefined) return;
          e.preventDefault();
          const j = (next + items.length) % items.length;
          items[i].tabIndex = -1;
          items[j].tabIndex = 0;
          items[j].focus();
        },
        { signal },
      );
    });
    document.querySelectorAll<HTMLElement>("[data-tip]").forEach((el) => {
      el.addEventListener("pointerenter", (e) => {
        if (e.pointerType === "mouse") showTip(el);
      }, { signal });
      el.addEventListener("pointerleave", (e) => {
        if (e.pointerType === "mouse" && document.activeElement !== el) hideTip(el);
      }, { signal });
      el.addEventListener("focus", () => showTip(el), { signal });
      el.addEventListener("blur", () => hideTip(el), { signal });
    });
    document
      .querySelectorAll(".content")
      .forEach((c) => c.addEventListener("scroll", () => hideTip(), { passive: true, signal }));
    addEventListener(
      "pointerdown",
      (e) => {
        if (!(e.target as Element).closest("[data-tip]")) hideTip();
      },
      { signal },
    );

    let rt: ReturnType<typeof setTimeout> | undefined;
    addEventListener(
      "resize",
      () => {
        clearTimeout(rt);
        rt = setTimeout(onResize, 120);
      },
      { signal },
    );

    const tick = () => setClock(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const clockTimer = setInterval(tick, 30000);
    onResize();
    // fonts change window heights; re-run the default layout once they're in
    document.fonts?.ready.then(() => {
      if (!signal.aborted && !userArranged) arrange();
    });

    return () => {
      ac.abort();
      clearInterval(clockTimer);
      clearTimeout(rt);
    };
  }, []);

  return { tasks, topId, clock, tipRef, focusTask: (id: string) => focusTaskRef.current(id) };
}
