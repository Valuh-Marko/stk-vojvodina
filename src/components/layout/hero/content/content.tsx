import type { JSX } from "react";
import type { Category } from "../../../../models/models";
import { TopNews } from "../../../ui/top-news/top-news";
import { Scoreboard } from "../../../ui/scoreboard/scoreboard";
import Events from "../../../pages/events/events";
import { getHeroTabId, HERO_PANEL_ID } from "../../../../utils/constants";
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

  return (
    <div
      id={HERO_PANEL_ID}
      role="tabpanel"
      aria-labelledby={selectedCategory && getHeroTabId(selectedCategory)}
      className={`c-content ${className ? className : ""}`}
    >
      {selectedCategory && content[selectedCategory]}
    </div>
  );
};
