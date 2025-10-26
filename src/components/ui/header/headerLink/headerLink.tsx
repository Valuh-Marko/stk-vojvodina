import { NavLink } from "react-router";
import "./headerLink.css";

type HeaderLinkProps = {
  id: string;
  path: string;
};

export const HeaderLink = ({ id, path }: HeaderLinkProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? "c-header__link active" : "c-header__link"
      }
    >
      {id}
    </NavLink>
  );
};
