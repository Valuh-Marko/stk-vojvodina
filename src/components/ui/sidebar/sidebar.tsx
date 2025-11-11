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
  return (
    <aside className={`c-sidebar ${className}`}>
      <Logo />
      {links.map(({ key, icon }) => (
        <SidebarLink
          key={key}
          icon={icon}
          linkKey={key}
          selected={selectedCategory === key}
          onClick={() => onCategoryChange?.(key as Category)}
        />
      ))}
    </aside>
  );
};
