import type { JSX } from "react";
import "./sidebar-link.css";

type SidebarLinkProps = {
  key: string;
  label: string;
  icon: JSX.Element;
  selected?: boolean;
  onClick?: () => void;
};

export const SidebarLink = ({
  key,
  label,
  icon,
  selected,
  onClick,
}: SidebarLinkProps) => {
  return (
    <div
      className={`c-sidebar-link ${selected ? "selected" : ""}`}
      onClick={onClick}
      key={key}
    >
      <div className="c-sidebar-link__icon">{icon}</div>
      <div className="c-sidebar-link__label">{label}</div>
    </div>
  );
};
