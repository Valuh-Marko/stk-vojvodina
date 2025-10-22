import { SidebarLink } from "./sidebar-link/sidebar-link";
import { links } from "./constants";
import { Logo } from "../logo/logo";
import type { Category } from "../../models/models";

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
      {links.map(({ key, label, category, icon }) => (
        <SidebarLink
          icon={icon}
          key={key}
          label={label}
          selected={selectedCategory === category}
          onClick={() => onCategoryChange?.(category as Category)}
        />
      ))}
    </aside>
  );
};
