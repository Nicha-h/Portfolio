import type { ReactNode } from "react";
import type { WindowTheme } from "@/models/portfolio";

const barTheme: Record<WindowTheme, string> = {
  default: "bg-bar text-white",
  alt: "bg-bar2 text-ink",
  mint: "bg-mint text-ink",
};

const barButton =
  "w-[26px] h-[26px] border-2 border-edge rounded-[7px] bg-white font-pixel text-[15px] leading-none cursor-pointer text-ink hover:bg-sun coarse:w-[34px] coarse:h-[34px] coarse:text-[18px] phone:w-[38px] phone:h-[38px] phone:text-[19px] phone:rounded-[10px]";

const defaultPadding = "pt-[18px] px-5 pb-5 tablet:pt-4 tablet:px-[18px] tablet:pb-[18px]";

interface WindowProps {
  id: string;
  /** Label for the taskbar button */
  taskTitle: string;
  barLabel: string;
  closeLabel: string;
  theme?: WindowTheme;
  /** Projects open from the folder and get a back button on phones */
  backToProjects?: boolean;
  widthClassName?: string;
  contentClassName?: string;
  paddingClassName?: string;
  children: ReactNode;
}

/**
 * A draggable desktop window. Closed until the window manager sets data-state="open";
 * on phones it becomes a full-screen app sheet.
 */
export default function Window({
  id,
  taskTitle,
  barLabel,
  closeLabel,
  theme = "default",
  backToProjects = false,
  widthClassName = "w-[440px]",
  contentClassName = "",
  paddingClassName = defaultPadding,
  children,
}: WindowProps) {
  const titleId = `t-${id.replace(/^p-/, "")}`;
  return (
    <section
      id={id}
      data-title={taskTitle}
      role="dialog"
      aria-labelledby={titleId}
      className={`win absolute ${widthClassName} max-w-[calc(100vw-24px)] max-h-[calc(100dvh-76px)] bg-win border-2 border-edge rounded-[12px] shadow-6 hidden data-[state=open]:flex flex-col motion-safe:data-[state=open]:animate-pop phone:fixed! phone:left-[10px]! phone:right-[10px]! phone:top-[calc(38px+env(safe-area-inset-top))]! phone:bottom-[calc(96px+env(safe-area-inset-bottom))]! phone:w-auto! phone:max-w-none phone:max-h-none phone:rounded-[18px] phone:motion-safe:data-[state=open]:animate-sheet`}
    >
      <div
        className={`titlebar flex items-center justify-between py-1.5 pr-2 pl-3 border-b-2 border-edge rounded-t-[10px] cursor-grab select-none touch-none ${barTheme[theme]} coarse:py-2 coarse:pr-2.5 coarse:pl-3 phone:rounded-t-[16px] phone:cursor-default phone:py-2 phone:pr-2.5 phone:pl-3.5`}
      >
        <span id={titleId} className="font-pixel text-[15px] coarse:text-[16px]">
          {barLabel}
        </span>
        <div className="btns flex gap-1.5">
          {backToProjects && (
            <button data-back aria-label="back to projects" className={`${barButton} hidden phone:inline-grid phone:place-items-center`}>
              ‹
            </button>
          )}
          <button data-close aria-label={closeLabel} className={barButton}>
            ×
          </button>
        </div>
      </div>
      <div
        className={`content overflow-auto ${paddingClassName} [&_p+p]:mt-[10px] outline-none focus-visible:outline-3 focus-visible:outline-focus focus-visible:-outline-offset-3 phone:flex-1 ${contentClassName}`}
        tabIndex={-1}
      >
        {children}
      </div>
    </section>
  );
}
