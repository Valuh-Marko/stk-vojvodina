import type { JSX } from "react";
import "./sidebar-link.css";
import type { IconType } from "react-icons";
import { useTranslation } from "react-i18next";

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
    <div
      className={`c-sidebar-link ${selected ? "selected" : ""}`}
      onClick={onClick}
      key={linkKey}
    >
      <div className="c-sidebar-link__icon">
        {typeof icon === "function" ? icon({}) : icon}
      </div>
      <div className="c-sidebar-link__label">{t(linkKey)}</div>
    </div>
  );
};
