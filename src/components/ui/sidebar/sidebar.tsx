import type { KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { SidebarLink } from "./sidebar-link/sidebar-link";
import { SIDEBAR_LINKS as links } from "../../../utils/constants";
import { Logo } from "../logo/logo";
import type { Category } from "../../../models/models";
import "./sidebar.css";

type SidebarProps = {
  className?: string;
  selectedCategory?: string;
  onCategoryChange?: (category: Category) => void;
};

export const Sidebar = ({
  className,
  selectedCategory,
  onCategoryChange,
}: SidebarProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: "navigation" });

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]')
    );
    const current = tabs.indexOf(event.target as HTMLElement);
    const targets: Record<string, number> = {
      ArrowDown: current + 1,
      ArrowUp: current - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    const target = targets[event.key];
    if (target === undefined) return;

    event.preventDefault();
    const next = (target + tabs.length) % tabs.length;
    tabs[next].focus();
    onCategoryChange?.(links[next].key as Category);
  };

  return (
    <aside className={`c-sidebar ${className ? className : ""}`}>
      <Logo />
      <div
        className="c-sidebar__tabs"
        role="tablist"
        aria-orientation="vertical"
        aria-label={t("homepage-sections")}
        onKeyDown={handleKeyDown}
      >
        {links.map(({ key, icon }) => (
          <SidebarLink
            key={key}
            icon={icon}
            linkKey={key}
            selected={selectedCategory === key}
            onClick={() => onCategoryChange?.(key as Category)}
          />
        ))}
      </div>
    </aside>
  );
};
