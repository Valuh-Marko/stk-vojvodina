import { BiNews } from "react-icons/bi";
import { MdOutlineScoreboard } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

export const links = [
  {
    key: "link1",
    label: "Top News",
    category: "topNews",
    icon: <BiNews />,
  },
  {
    key: "link2",
    label: "Scoreboard",
    category: "scoreboard",
    icon: <MdOutlineScoreboard />,
  },
  {
    key: "link3",
    label: "Events",
    category: "events",
    icon: <FaRegCalendarAlt />,
  },
];
