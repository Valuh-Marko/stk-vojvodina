import type { JSX } from "react";
import "./sidebar-link.css";
import type { IconType } from "react-icons";
import { useTranslation } from "react-i18next";
import { getHeroTabId, HERO_PANEL_ID } from "../../../../utils/constants";

type SidebarLinkProps = {
  linkKey: string;
  icon: JSX.Element | IconType;
  selected?: boolean;
  onClick?: () => void;
};

export const SidebarLink = ({
  linkKey,
  icon,
  selected,
  onClick,
}: SidebarLinkProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: "navigation" });

  return (
    <button
      type="button"
      role="tab"
      id={getHeroTabId(linkKey)}
      className={`c-sidebar-link ${selected ? "selected" : ""}`}
      aria-label={t(linkKey)}
      aria-selected={Boolean(selected)}
      aria-controls={HERO_PANEL_ID}
      tabIndex={selected ? 0 : -1}
      onClick={onClick}
    >
      <span className="c-sidebar-link__icon">
        {typeof icon === "function" ? icon({}) : icon}
      </span>
      <span className="c-sidebar-link__label">{t(linkKey)}</span>
    </button>
  );
};
