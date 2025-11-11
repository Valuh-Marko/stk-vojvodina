import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Button } from "../../ui/button/button";
import { HEADER_LINKS as links } from "../../../utils/constants";
import { useTranslation } from "react-i18next";
import "./footer.css";
import { MdDoubleArrow, MdOutlineMail } from "react-icons/md";
import { CiLocationArrow1, CiPhone } from "react-icons/ci";

const Footer = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "navigation" });

  return (
    <footer className="l-footer">
      <div className="c-footer">
        <div className="c-footer__top">
          <p>Ovo je placeholder za sve sponzore koje imamo</p>
          <div className="c-footer__newsletter">
            <input
              className="c-footer__input"
              placeholder="Subscribe to our newsletter"
              type="text"
            />
            <Button className="c-footer__button" variant="secondary">
              Prijavi se
            </Button>
          </div>
          <div className="c-footer__socials">
            <a href="#" className="c-footer__socials-link">
              <FaFacebookF />
            </a>
            <a href="#" className="c-footer__socials-link">
              <FaInstagram />
            </a>
            <a href="#" className="c-footer__socials-link">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div className="c-footer__bottom">
          <h3 className="c-footer__title">STK Vojvodina</h3>
          <h3 className="c-footer__title">Contact</h3>
          <h3 className="c-footer__title">Navigate</h3>
          <div className="c-divider"></div>
          <div className="c-footer__links">
            <a
              href="mailto:stkvojvodinans@gmail.com"
              className="c-footer__link"
            >
              <MdOutlineMail /> <span>stkvojvodinans@gmail.com</span>
            </a>
            <a href="tel:+381631201431" className="c-footer__link">
              <CiPhone />
              <span>+381 63 1201 431</span>
            </a>
            <a
              href="https://maps.app.goo.gl/Tnsk5U5LHTVyfFG19"
              target="_blank"
              className="c-footer__link"
            >
              <CiLocationArrow1 />
              <span>Sutjeska 2 | 21000 Novi Sad</span>
            </a>
          </div>
          <div className="c-footer__navigation">
            {links.map(({ key, path }) => (
              <a key={key} href={path} className="c-footer__navigation-link">
                {t(key)} <MdDoubleArrow className="button__icon" />
              </a>
            ))}
          </div>
          <p className="c-footer__disclaimer">
            © 2025 STK Vojvodina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
