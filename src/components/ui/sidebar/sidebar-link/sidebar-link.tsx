import type { JSX } from "react";
import "./sidebar-link.css";
import type { IconType } from "react-icons";

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
  return (
    <div
      className={`c-sidebar-link ${selected ? "selected" : ""}`}
      onClick={onClick}
      key={linkKey}
    >
      <div className="c-sidebar-link__icon">
        {typeof icon === "function" ? icon({}) : icon}
      </div>
      <div className="c-sidebar-link__label">{linkKey}</div>
    </div>
  );
};
