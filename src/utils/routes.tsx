// src/config/navigation.ts
import { BiNews } from "react-icons/bi";
import { MdOutlineScoreboard } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { lazy } from "react";

export const APP_ROUTES = {
  home: {
    key: "home",
    path: "/",
    component: lazy(() => import("../components/pages/homepage/homepage")),
  },
  events: {
    key: "events",
    path: "/events",
    component: lazy(() => import("../components/pages/events/events")),
  },
  gallery: {
    key: "gallery",
    path: "/gallery",
    component: lazy(() => import("../components/pages/gallery/gallery")),
  },
  contact: {
    key: "contact",
    path: "/contact",
    component: lazy(() => import("../components/pages/contact/contact")),
  },
  topNews: { key: "topNews", path: "/top-news", icon: BiNews },
  scoreboard: {
    key: "scoreboard",
    path: "/scoreboard",
    icon: <MdOutlineScoreboard />,
  },
  calendar: {
    key: "calendar",
    path: "/calendar",
    icon: <FaRegCalendarAlt />,
  },
} as const;
