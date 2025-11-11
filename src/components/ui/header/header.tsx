import { HEADER_LINKS as links } from "../../../utils/constants";
import { HeaderLink } from "./headerLink/headerLink";
import LanguagePicker from "../languagePicker/languagePicker";
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import "./header.css";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const windowWidth = window.innerWidth;

  return (
    <div className={`c-header ${className ? className : ""}`}>
      <div className="c-header__toggle" onClick={() => setIsOpen(!isOpen)}>
        <IoIosMenu />
      </div>
      <nav
        className="c-header__nav"
        style={{
          display: isOpen || windowWidth > 768 ? "flex" : "none",
        }}
      >
        {links.map(({ key, path }) => (
          <HeaderLink
            key={key}
            id={key}
            path={path}
            onClick={() => setIsOpen(!isOpen)}
          />
        ))}
      </nav>
      <span>|</span>
      <LanguagePicker />
    </div>
  );
};
