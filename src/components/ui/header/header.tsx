import { HEADER_LINKS as links } from "../../../utils/constants";
import { HeaderLink } from "./headerLink/headerLink";
import "./header.css";
import LanguagePicker from "../languagePicker/languagePicker";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  return (
    <div className={`c-header ${className ? className : ""}`}>
      <nav className="c-header__nav">
        {links.map(({ key, path }) => (
          <HeaderLink key={key} id={key} path={path} />
        ))}
        <span>|</span>
        <LanguagePicker />
      </nav>
    </div>
  );
};
