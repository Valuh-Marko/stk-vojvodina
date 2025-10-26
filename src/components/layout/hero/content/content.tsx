import type { JSX } from "react";
import { Events } from "../../../events/events";
import "./content.css";
import type { Category } from "../../../../models/models";
import { TopNews } from "../../../ui/top-news/top-news";
import { Scoreboard } from "../../../ui/scoreboard/scoreboard";

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
    <div className={`c-content ${className ? className : ""}`}>
      {selectedCategory && content[selectedCategory]}
    </div>
  );
};
