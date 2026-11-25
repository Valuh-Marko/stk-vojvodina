import type { JSX } from "react";
import type { Category } from "../../../../models/models";
import { TopNews } from "../../../ui/top-news/top-news";
import { Scoreboard } from "../../../ui/scoreboard/scoreboard";
import Events from "../../../pages/events/events";
import {
  getHeroTabId,
  HERO_PANEL_ID,
  SIDEBAR_LINKS as links,
} from "../../../../utils/constants";
import "./content.css";

type ContentProps = {
  className?: string;
  selectedCategory?: Category;
};

export const Content = ({ className, selectedCategory }: ContentProps) => {
  const content: Record<Category, JSX.Element> = {
    topNews: <TopNews />,
    scoreboard: <Scoreboard />,
    events: <Events />,
  };
  const selectedIndex = links.findIndex(({ key }) => key === selectedCategory);

  return (
    <div
      id={HERO_PANEL_ID}
      role="tabpanel"
      aria-labelledby={selectedCategory && getHeroTabId(selectedCategory)}
      className={`c-content ${className ? className : ""}`}
    >
      {/* Every screen stays mounted, so a switch never fades in a loader. */}
      {selectedCategory &&
        links.map(({ key }, index) => (
          <div
            key={key}
            className="c-content__panel"
            data-position={
              index === selectedIndex
                ? "current"
                : index < selectedIndex
                  ? "before"
                  : "after"
            }
            inert={index !== selectedIndex}
          >
            {content[key]}
          </div>
        ))}
    </div>
  );
};
