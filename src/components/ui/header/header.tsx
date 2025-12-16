import {
  HEADER_LINKS as links,
  SOCIALS_LINKS as socialLinks,
} from "../../../utils/constants";
import { HeaderLink } from "./headerLink/headerLink";
import LanguagePicker from "../languagePicker/languagePicker";
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import "./header.css";
import { NavLink } from "react-router";
import { Logo } from "../logo/logo";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const windowWidth = window.innerWidth;

  return (
    <div className={`c-header ${className ? className : ""}`}>
      <NavLink to={"/"} className="c-header__logo">
        <img
          className="c-header__logo-img"
          src="/assets/logo.png"
          alt="logo-img"
        />
      </NavLink>
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
      <span>|</span>
      {socialLinks.map(({ url, icon }) => (
        <a href={url} target="_blank" className="c-header__social-link">
          {icon}
        </a>
      ))}
    </div>
  );
};
