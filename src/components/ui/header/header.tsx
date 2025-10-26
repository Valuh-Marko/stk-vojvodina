import { HEADER_LINKS as links } from "../../../utils/constants";
import { HeaderLink } from "./headerLink/headerLink";
import "./header.css";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  return (
    <div className={`c-header ${className ? className : ""}`}>
      <nav className="c-header__nav">
        {links.map(({ key, path }) => (
          <HeaderLink id={key} path={path} />
        ))}
      </nav>
    </div>
  );
};
