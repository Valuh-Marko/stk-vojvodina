import { NavLink } from "react-router";
import "./headerLink.css";
import { useTranslation } from "react-i18next";

type HeaderLinkProps = {
  id: string;
  path: string;
  onClick: () => void;
};

export const HeaderLink = ({ id, path, onClick }: HeaderLinkProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: "navigation" });

  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        isActive ? "c-header__link active" : "c-header__link"
      }
    >
      {t(id)}
    </NavLink>
  );
};
