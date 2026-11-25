import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { APP_ROUTES } from "./routes";

export const SOCIALS_LINKS = [
  {
    url: "https://www.facebook.com/STK-Vojvodina-354572028011492/",
    icon: <FaFacebookF />,
  },
  {
    url: "https://instagram.com/stkvojvodina?igshid=1swmdf9wrf15u",
    icon: <FaInstagram />,
  },
  {
    url: "https://www.linkedin.com/company/stk-ttc-vojvodina",
    icon: <FaLinkedinIn />,
  },
];

export const HEADER_LINKS = [
  APP_ROUTES.home,
  APP_ROUTES.events,
  APP_ROUTES.gallery,
  APP_ROUTES.contact,
];

export const MOBILE_QUERY = "(max-width: 768px)";

export const HERO_PANEL_ID = "hero-panel";
export const getHeroTabId = (key: string) => "hero-tab-" + key;

export const SIDEBAR_LINKS = [
  APP_ROUTES.topNews,
  APP_ROUTES.scoreboard,
  // APP_ROUTES.calendar,
];
